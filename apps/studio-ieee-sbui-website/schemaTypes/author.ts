import {defineField, defineType} from 'sanity'

/**
 * Author — reusable author profile.
 *
 * Create author entries once, then reference them from articles.
 * This keeps author information consistent across the site and
 * allows for author profile pages in the future.
 */
export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().error('Author name is required.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated URL-friendly identifier.',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Click "Generate" to create a slug.'),
    }),
    defineField({
      name: 'image',
      title: 'Profile Picture',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'Short biography of the author.',
    }),
  ],
  // Show author name and image in the Studio list view
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
