export const about = {
    name: 'about',
    title: 'About / Profile',
    type: 'document',
    fields: [
        {
            name: 'role',
            title: 'Job Title (Arabic)',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'role_en',
            title: 'Job Title (English)',
            type: 'string'
        },
        {
            name: 'location',
            title: 'Location (Arabic)',
            type: 'string'
        },
        {
            name: 'location_en',
            title: 'Location (English)',
            type: 'string'
        },
        {
            name: 'bio',
            title: 'Bio (Arabic)',
            type: 'text',
            rows: 4
        },
        {
            name: 'bio_en',
            title: 'Bio (English)',
            type: 'text',
            rows: 4
        },
        {
            name: 'stats',
            title: 'Key Metrics',
            type: 'array',
            of: [{ type: 'statItem' }]
        },
        {
            name: 'experience',
            title: 'Work Experience',
            type: 'array',
            of: [{ type: 'experienceItem' }]
        },
        {
            name: 'education',
            title: 'Education',
            type: 'array',
            of: [{ type: 'educationItem' }]
        },
        {
            name: 'tools',
            title: 'Tool Stack',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        {
            name: 'cv',
            title: 'CV / Resume (PDF)',
            type: 'file'
        }
    ]
}
