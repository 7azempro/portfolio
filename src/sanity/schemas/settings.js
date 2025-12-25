import { RiSettings4Line } from "react-icons/ri";

export const settings = {
    name: 'settings',
    title: 'Global Settings',
    type: 'document',
    icon: RiSettings4Line,
    fieldsets: [
        { name: 'general', title: 'General', options: { collapsible: true, collapsed: false } },
        { name: 'seo', title: 'SEO & Meta', options: { collapsible: true, collapsed: false } },
        { name: 'contact', title: 'Contact & Resume', options: { collapsible: true, collapsed: false } }
    ],
    fields: [
        {
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            fieldset: 'general'
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3,
            fieldset: 'seo'
        },
        // --- Contact & Socials ---
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            fieldset: 'contact'
        },
        {
            name: 'resume',
            title: 'Resume (PDF)',
            type: 'file',
            fieldset: 'contact'
        },
        {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            fieldset: 'contact',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'platform', title: 'Platform Name', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'iconKey', title: 'Icon Key (from IconMapper)', type: 'string' }
                    ]
                }
            ]
        },

        // --- Navigation ---
        {
            name: 'mainNav',
            title: 'Main Navigation',
            type: 'array',
            fieldset: 'general',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Label (Arabic)', type: 'string' },
                        { name: 'label_en', title: 'Label (English)', type: 'string' },
                        { name: 'link', title: 'Link / Section ID', type: 'string' }
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'label_en' }
                    }
                }
            ]
        }
    ],
    preview: {
        prepare() {
            return {
                title: 'Global System Settings',
                subtitle: 'Manage site-wide configurations'
            }
        }
    }
}
