import { PiArticle, PiTextT, PiImage, PiLink, PiTag, PiCalendar, PiClock } from 'react-icons/pi';

export const article = {
    name: 'article',
    title: 'Articles',
    type: 'document',
    icon: PiArticle,
    fieldsets: [
        { name: 'content', title: 'Content & Localization', options: { collapsible: true, collapsed: false } },
        { name: 'media', title: 'Visual Assets', options: { collapsible: true, collapsed: false } },
        { name: 'meta', title: 'Metadata & SEO', options: { collapsible: true, collapsed: true } },
    ],
    fields: [
        // Content
        {
            name: 'title',
            title: 'Title (Arabic)',
            type: 'string',
            fieldset: 'content',
            icon: PiTextT,
            validation: Rule => Rule.required()
        },
        {
            name: 'title_en',
            title: 'Title (English)',
            type: 'string',
            fieldset: 'content',
            icon: PiTextT
        },
        {
            name: 'excerpt',
            title: 'Excerpt (Arabic)',
            type: 'text',
            rows: 3,
            fieldset: 'content'
        },
        {
            name: 'excerpt_en',
            title: 'Excerpt (English)',
            type: 'text',
            rows: 3,
            fieldset: 'content'
        },
        {
            name: 'content',
            title: 'Content (Arabic)',
            type: 'blockContent',
            fieldset: 'content'
        },
        {
            name: 'content_en',
            title: 'Content (English)',
            type: 'blockContent',
            fieldset: 'content'
        },

        // Media
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            fieldset: 'media',
            icon: PiImage,
            options: { hotspot: true },
            fields: [
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Caption',
                }
            ]
        },

        // Metadata
        {
            name: 'date',
            title: 'Date',
            type: 'datetime',
            fieldset: 'meta',
            icon: PiCalendar,
            initialValue: () => new Date().toISOString()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            fieldset: 'meta',
            options: {
                list: [
                    { title: 'Engineering', value: 'engineering' },
                    { title: 'Design', value: 'design' },
                    { title: 'Tutorial', value: 'tutorial' },
                    { title: 'Thoughts', value: 'thoughts' }
                ]
            }
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            fieldset: 'meta',
            icon: PiTag,
            of: [{ type: 'string' }],
            options: { layout: 'tags' }
        },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'title_en',
            media: 'thumbnail'
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Untitled Article',
                subtitle: subtitle || 'No English Title',
                media: media || PiArticle
            }
        }
    }
}
