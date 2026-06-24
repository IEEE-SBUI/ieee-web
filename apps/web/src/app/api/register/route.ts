import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/src/utils/supabase/admin";
import { appendToGoogleSheet } from "@/src/lib/google-sheets";

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

    // Initialize Supabase Admin client
    const supabase = createAdminClient();

    // Check for duplicate email
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

    // Insert record into Supabase registrations table
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
      // Check if it's a unique constraint violation (duplicate key)
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

    // Sync to Google Sheet
    const timestamp = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

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
      data.preferred_societies ? data.preferred_societies.join(", ") : "",
    ];

    // Await sheets sync to ensure completion before serverless function finishes execution
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
