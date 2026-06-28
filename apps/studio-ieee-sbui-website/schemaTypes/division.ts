import {defineField, defineType} from 'sanity'

/**
 * Division: one of the chapter's divisions, grouped under a corridor.
 *
 * References committee members for its manager, vice manager, and staff.
 * Editable only by administrators and developers.
 */
export const division = defineType({
  name: 'division',
  title: 'Division',
  type: 'document',
  // Lock editing for anyone who is not an administrator or developer.
  readOnly: ({currentUser}) =>
    !currentUser?.roles?.some(
      (role) => role.name === 'administrator' || role.name === 'developer',
    ),
  fields: [
    defineField({
      name: 'abbreviation',
      title: 'Abbreviation',
      type: 'string',
      description: 'Short name, e.g. "WebDev" or "RnD".',
      validation: (rule) => rule.required().error('Abbreviation is required.'),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'Full division name, e.g. "Website Development".',
      validation: (rule) => rule.required().error('Full name is required.'),
    }),
    defineField({
      name: 'corridor',
      title: 'Corridor',
      type: 'string',
      description: 'Which corridor this division belongs to.',
      options: {
        list: [
          {title: 'Internal Operations', value: 'Internal Operations'},
          {title: 'Education and Development', value: 'Education and Development'},
          {title: 'Public Relations', value: 'Public Relations'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Corridor is required.'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'What this division does.',
    }),
    defineField({
      name: 'manager',
      title: 'Manager',
      type: 'reference',
      to: [{type: 'committeeMember'}],
    }),
    defineField({
      name: 'viceManagers',
      title: 'Vice Managers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'committeeMember'}]}],
    }),
    defineField({
      name: 'staff',
      title: 'Staff',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'committeeMember'}]}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order within its corridor (ascending).',
    }),
  ],
  // Show "ABBR - Full Name" with the corridor as subtitle in the list view.
  preview: {
    select: {
      abbreviation: 'abbreviation',
      fullName: 'fullName',
      corridor: 'corridor',
    },
    prepare(selection) {
      const {abbreviation, fullName, corridor} = selection
      return {
        title: `${abbreviation} - ${fullName}`,
        subtitle: corridor,
      }
    },
  },
})
