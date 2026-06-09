import {defineField, defineType} from 'sanity'

/**
 * Category: organizes articles into predefined groups
 *
 * Editors create categories here (e.g. "Technology", "Events", "Research")
 * and then reference them from articles. This prevents inconsistent naming
 * (e.g. "Tech" vs "tech" vs "Technology").
 */
export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Category title is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional short description of what this category covers.',
    }),
  ],
})
