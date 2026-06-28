import {defineField, defineType} from 'sanity'

/**
 * Committee Member: a person in the organization, from the President down to
 * staff.
 *
 * Supports two photo modes:
 *  - "individual" – a solo headshot.
 *  - "duo"        – a shared wide photo with one other member. Set duoPartner
 *                   to point to the other person so the website can render both
 *                   names on a single landscape card.
 *
 * Editable only by administrators and developers.
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
      name: 'photoType',
      title: 'Photo Type',
      type: 'string',
      description:
        'Choose "Duo Photo" if this member shares one photo with exactly one other member.',
      options: {
        list: [
          {title: 'Individual Portrait', value: 'individual'},
          {title: 'Duo Photo (2 people)', value: 'duo'},
          {title: 'Trio Photo (3 people)', value: 'trio'},
        ],
        layout: 'radio',
      },
      initialValue: 'individual',
      validation: (rule) => rule.required().error('Photo type is required.'),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description:
        'Individual Portrait: a headshot of this person only. ' +
        'Duo Photo: a wide shot showing this person and their duo partner together.',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('A photo is required.'),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the photo for accessibility, e.g. "Headshot of John Doe".',
          validation: (rule) => rule.required().error('Alt text is required.'),
        },
      ],
    }),
    defineField({
      name: 'duoPartner',
      title: 'Duo Partner',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      description: 'The other person who appears in the duo photo.',
      // Only visible when Photo Type is set to "duo".
      hidden: ({document}) => document?.photoType !== 'duo',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.photoType !== 'duo') return true
          if (!value) return 'Please select the duo partner.'
          if ((value as {_ref: string})._ref === context.document?._id) {
            return 'A member cannot be their own duo partner.'
          }
          return true
        }),
    }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Optional link to the member LinkedIn profile.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'isLeftInDuo',
      title: 'Is on Left in Duo Photo',
      type: 'boolean',
      description: 'Check this if this member stands on the left side in the shared duo photo.',
      hidden: ({document}) => document?.photoType !== 'duo',
      initialValue: false,
    }),
    defineField({
      name: 'trioPartners',
      title: 'Trio Partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'committeeMember'}]}],
      description: 'The other two people who appear in the trio photo.',
      hidden: ({document}) => document?.photoType !== 'trio',
    }),
    defineField({
      name: 'trioPosition',
      title: 'Trio Photo Position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      hidden: ({document}) => document?.photoType !== 'trio',
    }),
  ],
  // Show name and photo in the Studio list view.
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'photoType',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
        subtitle:
          selection.subtitle === 'duo'
            ? 'Duo Photo'
            : selection.subtitle === 'trio'
              ? 'Trio Photo'
              : 'Individual Portrait',
      }
    },
  },
})
