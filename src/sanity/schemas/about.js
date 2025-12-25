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
            of: [{
                type: 'object',
                fields: [
                    { name: 'label', title: 'Label (Ar)', type: 'string' },
                    { name: 'label_en', title: 'Label (En)', type: 'string' },
                    { name: 'value', title: 'Value', type: 'string' },
                    { name: 'unit', title: 'Unit (Ar)', type: 'string' },
                    { name: 'unit_en', title: 'Unit (En)', type: 'string' }
                ]
            }]
        },
        {
            name: 'experience',
            title: 'Work Experience',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'role', title: 'Role', type: 'string' },
                    { name: 'company', title: 'Company', type: 'string' },
                    { name: 'year', title: 'Year/Duration', type: 'string' },
                    { name: 'desc', title: 'Description (Ar)', type: 'text' },
                    { name: 'desc_en', title: 'Description (En)', type: 'text' }
                ]
            }]
        },
        {
            name: 'education',
            title: 'Education',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'degree', title: 'Degree', type: 'string' },
                    { name: 'institution', title: 'Institution', type: 'string' },
                    { name: 'year', title: 'Year', type: 'string' }
                ]
            }]
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
