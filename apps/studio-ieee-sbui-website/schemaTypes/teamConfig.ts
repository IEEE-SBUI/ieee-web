import {defineField, defineType} from 'sanity'

/**
 * Team Configuration: stores the executive board and corridor director
 * assignments for a specific academic year.
 *
 * One document per year (enforced via the `year` unique validation).
 * Editable only by administrators and developers.
 */
export const teamConfig = defineType({
  name: 'teamConfig',
  title: 'Team Configuration',
  type: 'document',
  readOnly: ({currentUser}) =>
    !currentUser?.roles?.some(
      (role) => role.name === 'administrator' || role.name === 'developer',
    ),
  fields: [
    defineField({
      name: 'year',
      title: 'Academic Year',
      type: 'string',
      description: 'Academic year this configuration applies to, e.g. "2026". Must be unique.',
      validation: (rule) =>
        rule.required().error('Year is required.').custom(async (value, context) => {
          if (!value) return true
          const {document, getClient} = context
          const client = getClient({apiVersion: '2026-05-15'})
          const existing = await client.fetch(
            `*[_type == "teamConfig" && year == $year && _id != $id][0]._id`,
            {year: value, id: document?._id ?? ''},
          )
          return existing ? 'A Team Configuration for this year already exists.' : true
        }),
    }),
    defineField({
      name: 'president',
      title: 'President',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('President is required.'),
    }),
    defineField({
      name: 'vicePresident',
      title: 'Vice President',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Vice President is required.'),
    }),
    defineField({
      name: 'secretary',
      title: 'Secretary',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Secretary is required.'),
    }),
    defineField({
      name: 'vicesecretary',
      title: 'Vice Secretary',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Vice Secretary is required.'),
    }),
    defineField({
      name: 'treasurer',
      title: 'Treasurer',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Treasurer is required.'),
    }),
    defineField({
      name: 'vicetreasurer',
      title: 'Vice Treasurer',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Vice Treasurer is required.'),
    }),
    
    defineField({
      name: 'directorInternalOps',
      title: 'Director of Internal Operations',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Director of Internal Operations is required.'),
    }),
    defineField({
      name: 'directorEduDev',
      title: 'Director of Education and Development',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Director of Education and Development is required.'),
    }),
    defineField({
      name: 'directorPublicRelations',
      title: 'Director of Public Relations',
      type: 'reference',
      to: [{type: 'committeeMember'}],
      validation: (rule) => rule.required().error('Director of Public Relations is required.'),
    }),
  ],
  preview: {
    select: {
      year: 'year',
      media: 'president.image',
    },
    prepare(selection) {
      return {
        title: `Team ${selection.year ?? '(no year)'}`,
        media: selection.media,
      }
    },
  },
})
