export const settings = {
    name: 'settings',
    title: 'Global Settings',
    type: 'document',
    fields: [
        {
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            initialValue: '7azempro'
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
            validation: Rule => Rule.email()
        },
        {
            name: 'socials',
            title: 'Social Media Links',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', title: 'Platform Name', type: 'string' },
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'iconKey', title: 'Icon Key', type: 'string', options: { list: ['twitter', 'linkedin', 'github', 'behance', 'instagram'] } }
                    ]
                }
            ]
        },
        {
            name: 'resume',
            title: 'Resume / CV',
            type: 'file'
        }
    ]
}
