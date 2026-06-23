import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.NEXT_PUBLIC_SUPABASE_SECRET_KEY;

export const createAdminClient = () => {
  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error("Missing Supabase URL or Secret Key environment variables");
  }
  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};
