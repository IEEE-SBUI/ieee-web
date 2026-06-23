import { google } from "googleapis";

const sheetId = process.env.GOOGLE_SHEET_ID;
const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

export async function appendToGoogleSheet(rowValues: any[]) {
  if (!sheetId || !serviceAccountJson) {
    console.warn("Google Sheets ID or Service Account JSON is not configured. Skipping Sheets sync.");
    return;
  }

  try {
    const credentials = JSON.parse(serviceAccountJson);
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
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