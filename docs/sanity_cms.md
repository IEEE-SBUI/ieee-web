# Sanity CMS Developer Guide

This guide explains how the Sanity CMS is structured in this project, how to work with document schemas, and how to configure the rich text editor.

---

## Project Structure

The Sanity CMS code is located in the `apps/studio-ieee-sbui-website` directory. This is a standalone React application that defines the content schema and communicates directly with the Sanity content lake.

The most important directory is `schemaTypes/`, which contains the definitions for all content types:

- `schemaTypes/index.ts`: The registry where all schemas are imported and exported.
- `schemaTypes/article.ts`: The main article schema.
- `schemaTypes/author.ts`: The author profile schema.
- `schemaTypes/category.ts`: The category taxonomy schema.
- `schemaTypes/blockContent.ts`: The configuration for the rich text editor.

---

## Document Schemas

We define schemas using Sanity's builder helpers `defineType` and `defineField` for TypeScript autocomplete and type safety.

### Article Schema (`article.ts`)
This is the main document type. It includes the following fields:
- **Headline (title)**: A string representing the article title. This is required.
- **Slug**: A unique URL path identifier. It generates automatically from the headline field.
- **Publication Date**: A datetime field that defaults to the creation time.
- **Main Image**: An image field with that includes sub-fields for alternative text (alt text) and a caption. The alt text is required if an image is uploaded to ensure accessibility.
- **Author**: A reference field linking to an Author document. This ensures author names are reusable and consistent.
- **Summary**: A text area for a short summary of the article. This is used for previews and SEO meta tags.
- **Body**: A custom blockContent field for rich text paragraphs, headings, and lists.
- **Categories**: An array of references linking to Category documents.

### Author Schema (`author.ts`)
A separate document type for managing writer profiles.
- **Name**: The author's name.
- **Slug**: Generated automatically from the name.
- **Profile Picture**: An image field with hotspot enabled.
- **Bio**: A short biography.

### Category Schema (`category.ts`)
A document type to manage taxonomy terms.
- **Title**: The name of the category (such as Events or Technology).
- **Description**: A short explanation of the category.

### Committee Member Schema (`committeeMember.ts`)
A shared document type for every person in the organization, from the President down to staff. Divisions reference it for their leadership and staff, and the Committee page reuses it.
- **Name**: The member's full name. This is required.
- **Profile Photo**: A required image field with hotspot enabled. It includes a required alt text sub-field for accessibility.
- **LinkedIn URL**: An optional link to the member's LinkedIn profile, validated as a web URL.

This schema is **read-only for users who are not administrators or developers** (role-based access control), so only authorized roles can create or edit member records.

### Division Schema (`division.ts`)
A document type representing a single division, grouped under one of the three corridors. It references Committee Member documents instead of duplicating their details.
- **Abbreviation**: The short division name (such as "WebDev" or "RnD"). This is required.
- **Full Name**: The full division name (such as "Website Development"). This is required.
- **Corridor**: A required dropdown with exactly three options: "Internal Operations", "Education and Development", and "Public Relations".
- **Description**: A text area describing what the division does.
- **Manager**: A reference to a Committee Member who manages the division.
- **Vice Manager**: A reference to a Committee Member who serves as vice manager.
- **Staff**: An array of references to Committee Member documents.
- **Display Order**: A number that controls the division's order within its corridor (ascending).

Like Committee Member, this schema is **read-only for non administrator/developer roles** (role-based access control).

---

## Rich Text Editor (Portable Text)

The article body uses a schema called `blockContent`. In Sanity, rich text is stored as Portable Text, which is a structured JSON format instead of raw HTML or Markdown.

The `blockContent.ts` file configures the text editor toolbar in the Studio:
- **Text Styles**: Standard paragraphs, Heading 2, Heading 3, Heading 4, and Blockquotes.
- **Lists**: Bullet lists and numbered lists.
- **Marks**: Formatting options including bold, italic, underline, strikethrough, and inline code.
- **Links**: Highlighted text can be linked to a URL. The schema includes a toggle to open links in a new tab, which defaults to true.
- **Inline Images**: Editors can embed images directly inside the rich text flow, complete with their own alt text and captions.

---

## How to Add New Schemas

When you need to add a new content type or helper schema, follow these steps:

1. **Create the file**: Add a new TypeScript file in the `schemaTypes` directory. For example, `event.ts` for managing events.
2. **Define the type**: Use `defineType` and `defineField` to structure the fields.
   ```typescript
   import {defineField, defineType} from 'sanity'

   export const event = defineType({
     name: 'event',
     title: 'Event',
     type: 'document',
     fields: [
       defineField({
         name: 'title',
         title: 'Event Title',
         type: 'string',
         validation: (rule) => rule.required(),
       }),
     ],
   })
   ```
3. **Register the schema**: Import the new file in `schemaTypes/index.ts` and add it to the `schemaTypes` export array.
   ```typescript
   import {article} from './article'
   import {author} from './author'
   import {blockContent} from './blockContent'
   import {category} from './category'
   import {event} from './event'

   export const schemaTypes = [article, author, blockContent, category, event]
   ```

---

## Local Development and Deployment

### Running Locally
To start the Sanity Studio on your local machine:
1. Run the command: `npm run dev -w apps/studio-ieee-sbui-website`
2. Open your browser to `http://localhost:3333`

### Deploying the Studio
To deploy the latest schema changes to the hosted Sanity environment so other editors can access them:
1. Run the command: `npm run deploy -w apps/studio-ieee-sbui-website`