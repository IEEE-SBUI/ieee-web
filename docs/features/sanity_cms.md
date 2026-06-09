# Feature: Sanity CMS Content Model

This feature establishes the structured content model for articles, authors, and categories on the IEEE SBUI website. It allows content writers and editors to manage articles through a dashboard and publish them to the frontend website.

## What it does / rules

- **Managed Schema Types**: The system manages Articles, Authors, and Categories.
- **Title and Slug Requirement**: Every article and author must have a title or name and an associated URL slug. Slugs can be generated automatically from the title or name.
- **Alt Text Requirement**: If an editor uploads an image to an article, they must fill in the alternative text field to ensure accessibility and search engine optimization.
- **Taxonomy Matching**: Articles can be grouped using Categories. Instead of entering free-form tags, editors select categories from a managed list to keep navigation consistent.
- **Roles and Access**: Access to edit or publish content is managed by Sanity roles. Only members invited to the project via the Sanity dashboard can write or publish articles.

## How it works

1. **Schema Definition**: Schemas are declared as TypeScript configurations in the `apps/studio-ieee-sbui-website/schemaTypes` directory.
2. **Drafting Content**: When a user creates or edits an article in the Sanity Studio dashboard, it is saved immediately as a draft in the Sanity Content Lake database.
3. **Publishing**: When the user clicks the Publish button, the draft changes are pushed to the live database.
4. **Data Delivery**: The Next.js frontend queries the live database using GROQ (Sanity's query language) to fetch and display the published articles.

## Setup

The following environment variables are required on the web frontend:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: The unique identifier for the Sanity project.
- `NEXT_PUBLIC_SANITY_DATASET`: The dataset environment name (typically set to production).

## Edge cases/limitations

- **Slug Generation**: If an editor changes an article title, the slug does not update automatically. The editor must manually regenerate the slug to match the new title.
- **Referential Integrity**: The schemas use strong references by default. This means Sanity prevents the deletion of any Author or Category document that is currently referenced by an Article. If a user attempts to delete an Author or Category that is in use, the CMS dashboard will block the action and display a list of the articles referencing it. To proceed with the deletion, the references in those articles must be removed or updated first.
- **Image alt text check**: Validation errors will only display once an image has been selected or uploaded. An empty image field does not trigger the alt text requirement.
