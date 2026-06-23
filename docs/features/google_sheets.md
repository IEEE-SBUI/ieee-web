# Feature: Google Sheets Sync

Every time a new member registers through the `/register` form, the registration data is also appended as a row to a Google Sheet. This gives the committee a live spreadsheet they can view and filter without needing access to the database.

## What it does / rules

- **One-way sync**: Data flows from the website to the Google Sheet. The sheet is append-only from the API's perspective. It never reads from the sheet.
- **Row format**: Each row has 12 columns: Timestamp, Full Name, Batch, Faculty, Major, Email, Phone Number, LINE ID, Date of Birth, Origin, Membership Type, and Preferred Societies.
- **Societies column**: For international members, the preferred societies are listed with their individual USD prices and a total at the end (e.g. `Computer Society ($8), Robotics and Automation ($5) [Total: $13]`). For local members, this column shows `N/A`.
- **Table expansion**: The append uses `USER_ENTERED` mode and targets range `A:L`. This makes the Google Sheet treat the data as if a human typed it, so the existing table formatting (alternating row colors, column widths, header styling) automatically extends to the new row.
- **Non-blocking**: If the Google Sheet credentials are missing or the write fails, the registration still saves to Supabase. The sheet sync logs an error to the console but does not cause the API to return an error to the user.

## How it works

1. The API route at `/api/register` validates and saves the registration to Supabase.
2. It builds a 12-element array with the registration data.
3. It calls `appendToGoogleSheet()` from `src/lib/google-sheets.ts`.
4. That function authenticates using a Google Service Account JWT.
5. It calls the Google Sheets API v4 `spreadsheets.values.append` method to add the row.

## Key files

- `src/lib/google-sheets.ts` — The helper function that handles authentication and the append call.
- `src/app/api/register/route.ts` — The API route that builds the row data and calls the helper.

## Setup

### Environment variables

- `GOOGLE_SHEET_ID`: The ID of the Google Sheet. You can find it in the sheet URL: `https://docs.google.com/spreadsheets/d/<THIS_PART>/edit`.
- `GOOGLE_SERVICE_ACCOUNT_JSON`: The full JSON key file contents for the Google Service Account, pasted as a single-line string. This is used to authenticate with the Sheets API.

### Google Cloud setup

1. Go to the Google Cloud Console and create a project (or use an existing one).
2. Enable the **Google Sheets API** for the project.
3. Create a **Service Account** under IAM & Admin > Service Accounts.
4. Generate a JSON key for the service account. Copy the entire contents of the downloaded JSON file.
5. Paste the JSON into the `GOOGLE_SERVICE_ACCOUNT_JSON` environment variable as a single line.
6. Open your Google Sheet and share it with the service account email (the `client_email` field from the JSON key). Give it **Editor** access.

### Sheet setup

1. Create a Google Sheet with headers in row 1: `Timestamp`, `Full Name`, `Batch`, `Faculty`, `Major`, `Email`, `Phone Number`, `LINE ID`, `Date of Birth`, `Origin`, `Membership Type`, `Preferred Societies`.
2. Select all 12 columns and format them as a table (alternating colors, bold header, etc).
3. The API appends to range `A:L` using `INSERT_ROWS` and `USER_ENTERED`, so the table formatting will automatically extend to new rows.

## Edge cases/limitations

- **Missing credentials**: If `GOOGLE_SHEET_ID` or `GOOGLE_SERVICE_ACCOUNT_JSON` is not set, the function logs a warning and returns without doing anything. The registration still succeeds in the database.
- **Sheet API errors**: If the Sheets API call fails (network issue, expired key, revoked access), the error is logged but the API still returns success to the user. You should check the server logs periodically to make sure sync is working.
- **Row inserted outside the table**: If the sheet's table range does not include the next empty row, the new data might appear below the table instead of inside it. To fix this, make sure the table range in the sheet covers enough rows, or use `A:L` as the range (which the code already does). Using `USER_ENTERED` mode helps the sheet auto-expand the table.
- **No retry logic**: If the append fails, the data is lost from the sheet (it is still in Supabase). There is no retry or queue. If you need guaranteed sync, you would need to add a retry mechanism or a background job.
