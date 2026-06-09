import {defineType, defineArrayMember} from 'sanity'

/**
 * Block Content: rich text editor for article body content.
 * This defines the rich text editor experience in Sanity Studio,
 * similar to Google Docs (bold, italic, headings, links, images, etc.).
 *
 * @see https://www.sanity.io/docs/block-content
 */
export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Text styles available in the toolbar dropdown
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Heading 2', value: 'h2'},
        {title: 'Heading 3', value: 'h3'},
        {title: 'Heading 4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      // Bulleted and numbered lists
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // Inline text formatting marks
      marks: {
        // Toolbar buttons for text decoration
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strikethrough', value: 'strike-through'},
          {title: 'Code', value: 'code'},
        ],
        // Annotation types (e.g. links)
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: true,
              },
            ],
          },
        ],
      },
    }),
    // Allow embedding images inline within the body text
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Brief description for accessibility (screen readers) and SEO.',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image.',
        },
      ],
    }),
  ],
})
