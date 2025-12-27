import { PiArticle, PiTextT, PiImage, PiLink, PiTag, PiCalendar, PiClock } from 'react-icons/pi';
import OGGeneratorInput from '../components/OGGeneratorInput';

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
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            fieldset: 'content',
            options: {
                source: 'title',
                maxLength: 96,
            },
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
            description: 'Short summary for SEO and Cards (Google/Twitter). Max 160 chars recommended.',
            type: 'text',
            rows: 3,
            fieldset: 'content',
            validation: Rule => Rule.max(200)
        },
        {
            name: 'excerpt_en',
            title: 'Excerpt (English)',
            description: 'English summary for SEO. Important for international sharing.',
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
            name: 'ogGenerator',
            title: 'AI Generator',
            type: 'boolean', // Dummy type
            fieldset: 'media',
            components: {
                input: OGGeneratorInput
            }
        },
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
