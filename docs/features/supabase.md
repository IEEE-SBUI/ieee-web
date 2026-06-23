# Feature: Supabase Database

Supabase is the database for this project. We use it to store member registrations and the list of IEEE societies with their prices. It runs in the cloud, so there is no local database to set up.

## What it does / rules

- **Registrations table**: Stores every new registration submitted through the `/register` form. Each row has the member's name, email, batch year, faculty, major, phone number, LINE ID, date of birth, origin, membership type, and preferred societies.
- **Societies table**: Stores the list of IEEE societies and their USD prices. The API route reads from this table when formatting the Google Sheet row. If this table is unavailable, the API falls back to the static list in `src/data/ieeeSocieties.ts`.
- **Duplicate check**: The API route checks the `email` column before inserting. If the email already exists, the registration is rejected.
- **Row Level Security (RLS)**: RLS is enabled on the `registrations` table. Public users cannot read or write to it directly. Only the server-side admin client (using the secret key) can insert records.

## How it works

1. A user fills in the registration form at `/register` and clicks submit.
2. The form sends a POST request to `/api/register`.
3. The API route creates an admin Supabase client using the secret key.
4. It checks if the email is already in the `registrations` table.
5. If the email is new, it inserts the registration data.
6. It reads the `societies` table to get current prices, then formats the data for Google Sheets.

## Key files

- `src/utils/supabase/client.ts` — Browser-side Supabase client. Uses the publishable (public) key. Used for client components that need to read public data.
- `src/utils/supabase/server.ts` — Server-side Supabase client. Handles cookies and sessions in server components.
- `src/utils/supabase/admin.ts` — Admin Supabase client. Uses the secret key to bypass RLS. Only used in the API route on the server. Never import this in client components.
- `src/app/api/register/route.ts` — The API route that uses the admin client to insert registrations and read societies.
- `src/data/ieeeSocieties.ts` — Static fallback list of societies and prices, used if the database is unreachable.

## Setup

The following environment variables are required:

- `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project URL. Found in the Supabase dashboard under Project Settings > API.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: The public anon key. Safe to expose in the browser. Found in the same dashboard page.
- `NEXT_PUBLIC_SUPABASE_SECRET_KEY`: The service role key. This key bypasses RLS, so it must never be exposed to the browser. Only used in server-side code (`admin.ts`). Found in the Supabase dashboard under Project Settings > API > Service Role Key.

## Edge cases/limitations

- **Secret key exposure**: If `NEXT_PUBLIC_SUPABASE_SECRET_KEY` is accidentally imported in a client component, it will be bundled into the browser JavaScript and anyone can use it to bypass RLS. Only import `admin.ts` in server-side files (API routes, server components).
- **Fallback pricing**: If the `societies` table is empty or the query fails, the API uses the static list in `ieeeSocieties.ts`. This means prices could be out of date if someone updates the database but forgets to update the static file (or vice versa).
- **RLS blocks direct access**: If you try to read or write to the `registrations` table using the public anon key, Supabase will return an empty result or an error. This is expected. Use the admin client for writes.
- **Duplicate email constraint**: The `registrations` table has a unique constraint on the `email` column. If the duplicate check in the API somehow misses (e.g. a race condition with two simultaneous requests), the database will still reject the second insert with error code `23505`.
