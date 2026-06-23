import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/src/utils/supabase/admin";
import { appendToGoogleSheet } from "@/src/lib/google-sheets";
import { IEEE_SOCIETIES } from "@/src/data/ieeeSocieties";

const registerSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  batch: z.coerce.number().int().min(1900).max(2100, "Invalid batch year"),
  faculty: z.string().min(1, "Faculty is required"),
  major: z.string().min(1, "Major is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  id_line: z.string().min(1, "LINE ID is required"),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date of birth format (YYYY-MM-DD)"),
  origin: z.enum(["internal", "external"]),
  membership_type: z.enum(["local", "international"]),
  preferred_societies: z.array(z.string()).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Connect to database
    const supabase = createAdminClient();

    // Check if email already exists
    const { data: existing, error: queryError } = await supabase
      .from("registrations")
      .select("id")
      .eq("email", data.email)
      .maybeSingle();

    if (queryError) {
      console.error("Database query error checking duplicate email:", queryError);
      return NextResponse.json(
        { error: "Database error during registration check" },
        { status: 500 }
      );
    }

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Save to database
    const { error: insertError } = await supabase
      .from("registrations")
      .insert({
        full_name: data.full_name,
        batch: data.batch,
        faculty: data.faculty,
        major: data.major,
        email: data.email,
        phone_number: data.phone_number,
        id_line: data.id_line,
        date_of_birth: data.date_of_birth,
        origin: data.origin,
        membership_type: data.membership_type,
        preferred_societies: data.preferred_societies || [],
      });

    if (insertError) {
      console.error("Database insert error:", insertError);
      // Duplicate email (unique constraint violation)
      if (insertError.code === "23505") {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Failed to store registration record" },
        { status: 500 }
      );
    }

    // Format societies with prices for the Google Sheet
    let preferredSocietiesFormatted = "N/A";
    if (data.membership_type === "international") {
      if (data.preferred_societies && data.preferred_societies.length > 0) {
        try {
          // Start with prices from our static list as defaults
          const societyPriceMap = new Map<string, number>(
            IEEE_SOCIETIES.map((soc) => [soc.name, soc.price])
          );

          // Override with database prices if available
          const { data: dbSocieties } = await supabase
            .from("societies")
            .select("name, price")
            .eq("active", true);

          if (dbSocieties) {
            dbSocieties.forEach((soc) => {
              societyPriceMap.set(soc.name, Number(soc.price));
            });
          }

          let totalPrice = 0;
          const formattedItems = data.preferred_societies.map((name) => {
            const price = societyPriceMap.get(name) || 0;
            totalPrice += price;
            return `${name} ($${price})`;
          });
          preferredSocietiesFormatted = `${formattedItems.join(", ")} [Total: $${totalPrice}]`;
        } catch (dbError) {
          console.error("Error mapping societies to prices for sheet sync:", dbError);
          preferredSocietiesFormatted = data.preferred_societies.join(", ");
        }
      } else {
        preferredSocietiesFormatted = "None Selected [Total: $0]";
      }
    }

    // Append row to Google Sheet
    const timestamp = new Date().toISOString();
    const sheetRow = [
      timestamp,
      data.full_name,
      data.batch,
      data.faculty,
      data.major,
      data.email,
      data.phone_number,
      data.id_line,
      data.date_of_birth,
      data.origin,
      data.membership_type,
      preferredSocietiesFormatted,
    ];

    // Wait for sheet write to finish before the function exits
    await appendToGoogleSheet(sheetRow);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server-side error processing registration:", error);
    return NextResponse.json(
      { error: "Internal server error occurred" },
      { status: 500 }
    );
  }
}
