import {defineField, defineType} from 'sanity'

/**
 * Committee Member: a person in the organization, from the President down to
 * staff.
 *
 * Shared document type: divisions reference it (manager, vice manager, staff)
 * and the Committee page reuses it. Editable only by administrators and
 * developers.
 */
export const committeeMember = defineType({
  name: 'committeeMember',
  title: 'Committee Member',
  type: 'document',
  // Lock editing for anyone who is not an administrator or developer.
  readOnly: ({currentUser}) =>
    !currentUser?.roles?.some(
      (role) => role.name === 'administrator' || role.name === 'developer',
    ),
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Full name of the member.',
      validation: (rule) => rule.required().error('Name is required.'),
    }),
    defineField({
      name: 'image',
      title: 'Profile Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('A profile photo is required.'),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the photo for accessibility and SEO.',
          validation: (rule) => rule.required().error('Alt text is required.'),
        },
      ],
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Optional link to the member LinkedIn profile.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
  ],
  // Show name and photo in the Studio list view.
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
