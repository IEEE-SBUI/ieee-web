import { google } from "googleapis";

const sheetId = process.env.GOOGLE_SHEET_ID;

/**
 * Extracts and cleans the Google service account credentials.
 * Handles:
 * - Wrapping single/double quotes around GOOGLE_SERVICE_ACCOUNT_JSON (often added in Vercel UI).
 * - Escaped newlines (\n) in the private key string.
 * - Fallback to individual variables for email and private key if JSON is not defined or fails.
 */
function getCredentials() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (serviceAccountJson) {
    try {
      let cleanedJson = serviceAccountJson.trim();
      // Remove wrapping single quotes
      if (cleanedJson.startsWith("'") && cleanedJson.endsWith("'")) {
        cleanedJson = cleanedJson.slice(1, -1).trim();
      }
      // Remove wrapping double quotes
      if (cleanedJson.startsWith('"') && cleanedJson.endsWith('"')) {
        cleanedJson = cleanedJson.slice(1, -1).trim();
      }

      const credentials = JSON.parse(cleanedJson);
      
      // Clean the private key inside the JSON
      let key = credentials.private_key;
      if (key) {
        key = key.replace(/\\n/g, "\n");
      }

      return {
        email: credentials.client_email || clientEmail,
        key: key || (privateKey ? privateKey.replace(/\\n/g, "\n") : undefined),
      };
    } catch (error) {
      console.error("Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON environment variable:", error);
    }
  }

  // Fallback to separate env variables
  return {
    email: clientEmail,
    key: privateKey ? privateKey.replace(/\\n/g, "\n") : undefined,
  };
}

export async function appendToGoogleSheet(rowValues: any[]) {
  if (!sheetId) {
    console.warn("Google Sheets ID (GOOGLE_SHEET_ID) is not configured. Skipping Sheets sync.");
    return;
  }

  const creds = getCredentials();
  if (!creds.email || !creds.key) {
    console.warn(
      "Google Sheets credentials are not configured or failed to parse. " +
      "Ensure GOOGLE_SERVICE_ACCOUNT_JSON or (GOOGLE_CLIENT_EMAIL/GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY) are set in the environment. " +
      "Skipping Sheets sync."
    );
    return;
  }

  try {
    const auth = new google.auth.JWT({
      email: creds.email,
      key: creds.key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:L",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });
  } catch (error) {
    console.error("Failed to sync registration to Google Sheets:", error);
  }
}