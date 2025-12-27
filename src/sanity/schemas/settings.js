import { RiSettings4Line } from "react-icons/ri";

export const settings = {
    name: 'settings',
    title: 'Global Settings',
    type: 'document',
    icon: RiSettings4Line,
    fieldsets: [
        { name: 'general', title: 'General', options: { collapsible: true, collapsed: false } },
        { name: 'appearance', title: 'Appearance (Theme)', options: { collapsible: true, collapsed: false } },
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
            name: 'themeColor',
            title: 'Theme Color (PWA & Brand)',
            type: 'string',
            initialValue: '#030303',
            description: 'Hex code for the browser frame and PWA installation.',
            fieldset: 'appearance'
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
            name: 'authorName',
            title: 'Author Name',
            type: 'string',
            fieldset: 'contact',
            initialValue: 'Hazem Ismail'
        },
        {
            name: 'authorRole',
            title: 'Author Role',
            type: 'string',
            fieldset: 'contact',
            initialValue: 'System Architect'
        },
        {
            name: 'profileImage',
            title: 'Profile Picture (Avatar)',
            type: 'image',
            fieldset: 'contact',
            options: { hotspot: true }
        },
        {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'array',
            fieldset: 'contact',
            of: [{ type: 'socialLink' }]
        },

        // --- Navigation ---
        {
            name: 'mainNav',
            title: 'Main Navigation',
            type: 'array',
            fieldset: 'general',
            of: [{ type: 'navItem' }]
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
