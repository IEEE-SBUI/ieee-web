import {defineField, defineType} from 'sanity'

export const registrationSettings = defineType({
  name: 'registrationSettings',
  title: 'Registration Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Form Title',
      type: 'string',
      initialValue: 'Join IEEE SBUI',
    }),
    defineField({
      name: 'description',
      title: 'Form Description',
      type: 'text',
      initialValue:
        'Fill out the registration details below to apply for your IEEE Student Branch Universitas Indonesia membership.',
    }),
    defineField({
      name: 'lineGroupUrl',
      title: 'LINE Group URL',
      type: 'url',
    }),
    defineField({
      name: 'contactPersons',
      title: 'Contact Persons',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'contactPerson',
          fields: [
            {name: 'name', type: 'string', title: 'Name'},
            {name: 'phone', type: 'string', title: 'Phone Number'},
            {name: 'lineId', type: 'string', title: 'LINE ID'},
          ],
        },
      ],
    }),
  ],
})
