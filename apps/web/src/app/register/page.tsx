import dynamic from "next/dynamic";
import { client } from "@/src/sanity/client";
import { createAdminClient } from "@/src/utils/supabase/admin";
import type { RegistrationSettings } from "./RegisterForm";

// Dynamically import the heavy client component so its JS chunk (which includes
// ALL_COUNTRY_CODES and all form state) is split from the critical-path bundle.
// The server still renders the full HTML (ssr: true is the default).
const RegisterForm = dynamic(() => import("./RegisterForm"), { ssr: true });

export const revalidate = 300;

export const metadata = {
  title: "Register for Member",
  description: "Join the first IEEE Student Branch in Indonesia. Register to build technology projects, gain workshops/competitions credits, and network globally.",
};

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
    // Pass Next.js fetch options to leverage the built-in data cache.
    const settings = await client.fetch<RegistrationSettings | null>(
      query,
      {},
      { next: { revalidate: 300 } }
    );
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
  // Run both fetches in parallel — saves the round-trip time of the slower one.
  const [settings, societies] = await Promise.all([
    getRegistrationSettings(),
    getSocietiesFromSupabase(),
  ]);
  return (
    <>
      {/*
        Preload the LCP image so the browser fetches it immediately on first
        byte rather than waiting for JS hydration. RegisterForm is a Client
        Component, so Next.js cannot inject this automatically.
      */}
      <link
        rel="preload"
        as="image"
        href="/banner-2026.webp"
        fetchPriority="high"
      />
      <RegisterForm settings={settings} societies={societies} />
    </>
  );
}

