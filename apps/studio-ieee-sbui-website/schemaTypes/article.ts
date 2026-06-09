import {defineField, defineType} from 'sanity'

/**
 * Article: the main content type for IEEE SBUI Website.
 *
 * Field mapping from requirements:
 *   headline (title) = title (string)
 *   publication date = publishedAt (datetime)
 *   image and caption = mainImage (image with caption)
 *   author = author (reference -> author doc)
 *   summary (1 sentence) = summary (text)
 *   body paragraphs = body (blockContent / Portable Text)
 *   categories/tags = categories (array of references -> category)
 *   (auto) = slug (auto-generated from title)
 */
export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    // Core fields: title, slug, publication date
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      description: 'The article headline/title.',
      validation: (rule) => rule.required().error('Headline is required.'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated URL path. Click "Generate" after entering the headline.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Click "Generate" to create a slug.'),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'datetime',
      description: 'When this article was/will be published.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required().error('Publication date is required.'),
    }),

    // Media field: main image with alt text and caption
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'Featured image for the article.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for accessibility and SEO.',
          validation: (rule) =>
            rule.custom((alt, context) => {
              // Only require alt text if an image has been uploaded
              const parent = context?.parent as {asset?: {_ref?: string}} | undefined
              if (parent?.asset?._ref && !alt) {
                return 'Alt text is required when an image is uploaded.'
              }
              return true
            }),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image.',
        },
      ],
    }),

    // Author: reference to an author document 

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      description: 'Select the author of this article.',
      validation: (rule) => rule.required().error('Author is required.'),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
      description: 'One-sentence summary of the article (used in previews and SEO).',
      validation: (rule) =>
        rule
          .required()
          .error('Summary is required.')
          .max(200)
          .warning('Try to keep the summary under 200 characters.'),
    }),

    // Body content

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'The full article content. Supports bold, italic, headings, links, and images.',
    }),

    // Taxonomy: categories/tags

    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      description: 'Assign one or more categories to this article.',
    }),
  ],

  // Studio list preview

  preview: {
    select: {
      title: 'title',
      authorName: 'author.name',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare(selection) {
      const {title, authorName, media, date} = selection
      const formattedDate = date
        ? new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'No date'

      return {
        title: title || 'Untitled Article',
        subtitle: `${authorName || 'Unknown author'} · ${formattedDate}`,
        media,
      }
    },
  },

  // Default ordering

  orderings: [
    {
      title: 'Publication Date (Newest)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Publication Date (Oldest)',
      name: 'publishedAtAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
