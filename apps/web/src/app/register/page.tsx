import { client } from "@/src/sanity/client";
import { createAdminClient } from "@/src/utils/supabase/admin";
import RegisterForm, { RegistrationSettings } from "./RegisterForm";

// Force dynamic to retrieve the latest configurations and database records on request time
export const dynamic = "force-dynamic";

async function getRegistrationSettings(): Promise<RegistrationSettings> {
  try {
    const query = `*[_type == "registrationSettings"][0] {
      title,
      description,
      lineGroupUrl,
      contactPersons[] {
        name,
        phone,
        lineId
      }
    }`;
    const settings = await client.fetch<RegistrationSettings | null>(query);
    return settings || {};
  } catch (error) {
    console.error(
      "Failed to fetch registration settings from Sanity, falling back to defaults:",
      error
    );
    return {};
  }
}

async function getSocietiesFromSupabase() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("societies")
      .select("name, price")
      .eq("active", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("Supabase error fetching societies:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Failed to fetch societies from Supabase:", error);
    return [];
  }
}

export default async function RegisterPage() {
  const settings = await getRegistrationSettings();
  const societies = await getSocietiesFromSupabase();
  return <RegisterForm settings={settings} societies={societies} />;
}
