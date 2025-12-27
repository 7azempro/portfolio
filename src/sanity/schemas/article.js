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
            name: 'seo',
            title: 'SEO & Social',
            type: 'seoDetails',
            fieldset: 'meta'
        },
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
            icon: PiTextT,
            options: {
                aiAssist: {
                    instruction: 'Translate the Arabic title to English. Use a technical, punchy "Swiss Design" style. Avoid marketing fluff. Example: "Building a Scalable System" instead of "How we built an amazing system".'
                }
            }
        },
        {
            name: 'excerpt',
            description: 'Short summary for SEO and Cards (Google/Twitter). Max 160 chars recommended.',
            type: 'text',
            rows: 3,
            fieldset: 'content',
            validation: Rule => Rule.max(200),
            options: {
                aiAssist: {
                    instruction: 'Summarize the Arabic content into a concise English executive summary (max 200 chars). Focus strictly on the technical value and problem solved. No buzzwords.'
                }
            }
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
            name: 'ogImage',
            title: 'Open Graph Image',
            description: 'Generated automatically by AI Generator, or upload manually (1200x630).',
            type: 'image',
            fieldset: 'media',
            options: {
                hotspot: true
            }
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            fieldset: 'media',
            icon: PiImage,
            options: {
                hotspot: true,
                aiAssist: {
                    imageInstruction: 'Create an abstract, minimal, Swiss-Style graphic composition. Use dark geometric forms, blueprint lines, and deep navy/black tones. No text. High precision, architectural aesthetic.'
                }
            },
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
            name: 'views',
            title: 'View Count',
            type: 'number',
            fieldset: 'meta',
            readOnly: true,
            initialValue: 0
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            fieldset: 'meta',
            icon: PiTag,
            of: [{ type: 'string' }],
            options: {
                layout: 'tags',
                aiAssist: {
                    instruction: 'Generate 5 technical keywords based on the article content. Focus on technologies, frameworks, and architectural concepts. 1-2 words each.'
                }
            }
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
