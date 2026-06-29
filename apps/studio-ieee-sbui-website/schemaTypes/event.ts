import { defineType, defineField } from 'sanity';

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
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Pill',
      type: 'string',
      description: 'e.g., IoT, Technology, Workshop',
    }),
    defineField({
      name: 'date',
      title: 'Event Date and Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Building A, Room 101 or Zoom Link',
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration Link',
      type: 'url',
      description: 'Where should people go to register?',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A brief summary of the event.',
    }),
    defineField({
      name: 'body',
      title: 'Main Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});