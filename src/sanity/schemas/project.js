import { RiFolder3Line } from "react-icons/ri";
import ScreenshotGenerator from '../components/ScreenshotGenerator';

export const project = {
    name: 'project',
    title: 'Projects',
    type: 'document',
    icon: RiFolder3Line,
    fieldsets: [
        { name: 'basic', title: 'Basic Info', options: { collapsible: true, collapsed: false } },
        { name: 'arabic', title: 'Arabic Content (Primary)', options: { collapsible: true, collapsed: false } },
        { name: 'english', title: 'English Content', options: { collapsible: true, collapsed: true } },
        { name: 'media', title: 'Media & Styling', options: { collapsible: true, collapsed: false } },
        { name: 'meta', title: 'Metadata & SEO', options: { collapsible: true, collapsed: true } }
    ],
    fields: [
        {
            name: 'seo',
            title: 'SEO & Social',
            type: 'seoDetails',
            fieldset: 'meta'
        },
        {
            name: 'views',
            title: 'View Count',
            type: 'number',
            fieldset: 'meta',
            readOnly: true,
            initialValue: 0
        },
        // --- Core Content (Arabic) ---
        {
            name: 'title',
            title: 'Project Name (Arabic)',
            type: 'string',
            fieldset: 'arabic',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            fieldset: 'arabic',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'category',
            title: 'Category (Arabic)',
            type: 'string',
            fieldset: 'arabic',
            options: {
                list: [
                    { title: 'تطوير ويب', value: 'Web Dev' },
                    { title: 'تطبيق جوال', value: 'Mobile App' },
                    { title: 'نظام داخلي', value: 'System' },
                    { title: 'تصميم', value: 'Design' }
                ]
            }
        },
        {
            name: 'desc',
            title: 'Short Description (Arabic)',
            type: 'text',
            rows: 2,
            fieldset: 'arabic'
        },
        {
            name: 'challenge',
            title: 'The Challenge (Arabic)',
            description: 'What problem were you solving?',
            type: 'text',
            rows: 4,
            fieldset: 'arabic'
        },
        {
            name: 'solution',
            title: 'The Solution (Arabic)',
            description: 'How did you solve it?',
            type: 'text',
            rows: 4,
            fieldset: 'arabic'
        },

        // --- Core Content (English) ---
        {
            name: 'title_en',
            title: 'Project Name (English)',
            type: 'string',
            fieldset: 'english',
            options: {
                aiAssist: {
                    instruction: 'Translate to English. Use "Swiss International Style" naming (Minimal, Descriptive). E.g., "Fintech Dashboard System".'
                }
            }
        },
        {
            name: 'category_en',
            title: 'Category (English)',
            type: 'string',
            fieldset: 'english',
            options: {
                list: [
                    { title: 'Web Dev', value: 'Web Dev' },
                    { title: 'Mobile App', value: 'Mobile App' },
                    { title: 'System', value: 'System' },
                    { title: 'Design', value: 'Design' }
                ]
            }
        },
        {
            name: 'desc_en',
            title: 'Short Description (English)',
            type: 'text',
            rows: 2,
            fieldset: 'english',
            options: {
                aiAssist: {
                    instruction: 'Translate to English. Write a concise, technical executive summary. Focus on the "What" and "Why".'
                }
            }
        },
        {
            name: 'challenge_en',
            title: 'The Challenge (English)',
            type: 'text',
            rows: 4,
            fieldset: 'english',
            options: {
                aiAssist: {
                    instruction: 'Translate to English. Focus on the "Situation" and "Task" (STAR Method). Describe the technical complexity or business constraint clearly.'
                }
            }
        },
        {
            name: 'solution_en',
            title: 'The Solution (English)',
            type: 'text',
            rows: 4,
            fieldset: 'english',
            options: {
                aiAssist: {
                    instruction: 'Translate to English. Focus on the "Action" and "Result" (STAR Method). Highlight specific technologies, architectural decisions, and performance wins.'
                }
            }
        },

        // --- Basic Info & Metadata ---
        {
            name: 'role',
            title: 'My Role',
            type: 'string',
            fieldset: 'basic',
            placeholder: 'e.g., Lead Developer, UI Designer',
            options: {
                list: [
                    { title: 'Full Stack Developer', value: 'Full Stack Developer' },
                    { title: 'Frontend Developer', value: 'Frontend Developer' },
                    { title: 'Backend Developer', value: 'Backend Developer' },
                    { title: 'UI/UX Designer', value: 'UI/UX Designer' }
                ]
            }
        },
        {
            name: 'startedAt',
            title: 'Start Date',
            type: 'date',
            fieldset: 'basic'
        },
        {
            name: 'endedAt',
            title: 'End Date',
            type: 'date',
            fieldset: 'basic'
        },
        {
            name: 'year', // Kept for legacy compatibility/display
            title: 'Display Year',
            type: 'string',
            fieldset: 'basic',
            initialValue: '2025'
        },
        {
            name: 'link',
            title: 'Live Project Link',
            type: 'url',
            fieldset: 'basic'
        },
        {
            name: 'repo',
            title: 'GitHub Repository',
            type: 'url',
            fieldset: 'basic'
        },

        // --- Tech Stack ---
        {
            name: 'techStack',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tech' }] }],
            fieldset: 'basic'
        },

        // --- Media ---
        {
            name: 'color',
            title: 'Brand Color (Tailwind)',
            type: 'string',
            fieldset: 'media',
            description: 'e.g., bg-blue-500 or hex #...',
            initialValue: 'bg-blue-500'
        },
        {
            name: 'screenshotTool',
            title: 'Screenshot Generator',
            type: 'boolean',
            fieldset: 'media',
            description: 'Auto-generate cover image from the project Link.',
            components: {
                input: ScreenshotGenerator
            },
            initialValue: false
        },
        {
            name: 'thumbnail',
            title: 'Main Thumbnail',
            description: 'Appears in grid views',
            type: 'image',
            fieldset: 'media',
            options: { hotspot: true }
        },
        {
            name: 'gallery',
            title: 'Project Gallery',
            description: 'Screenshots/Results for the case study page',
            type: 'array',
            fieldset: 'media',
            of: [{ type: 'image', options: { hotspot: true } }]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
            media: 'thumbnail',
            year: 'year'
        },
        prepare({ title, subtitle, media, year }) {
            return {
                title: title,
                subtitle: `${subtitle || 'No Category'} | ${year || 'N/A'}`,
                media: media
            }
        }
    }
}
