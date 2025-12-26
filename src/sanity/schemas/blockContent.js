/**
 * This is the schema definition for the rich text fields.
 *
 * With this, you can embed images, code blocks, and other custom types
 * alongside text.
 */
import { RiImageLine, RiCodeBoxLine } from 'react-icons/ri'

export const blockContent = {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            // Styles let you define what blocks can be marked up as. The default
            // set corresponds with HTML tags, but you can override them and
            // add your own.
            styles: [
                { title: 'Normal', value: 'normal' },
                { title: 'H1', value: 'h1' },
                { title: 'H2', value: 'h2' },
                { title: 'H3', value: 'h3' },
                { title: 'H4', value: 'h4' },
                { title: 'Quote', value: 'blockquote' },
            ],
            lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    { title: 'Strong', value: 'strong' },
                    { title: 'Emphasis', value: 'em' },
                    { title: 'Code', value: 'code' },
                    { title: 'Underline', value: 'underline' },
                    { title: 'Strike', value: 'strike-through' },
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
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
                            },
                        ],
                    },
                ],
            },
        },
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        {
            type: 'image',
            icon: RiImageLine,
            options: { hotspot: true },
        },
        {
            type: 'code',
            name: 'code',
            title: 'Code Block',
            icon: RiCodeBoxLine,
            options: {
                withFilename: true,
            }
        }
    ],
}
