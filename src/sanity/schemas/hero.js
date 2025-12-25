export const hero = {
    name: 'hero',
    title: 'Hero Section (Home)',
    type: 'document',
    fields: [
        // --- ARABIC CONTENT ---
        {
            name: 'title',
            title: 'Title (Arabic)',
            type: 'text',
            rows: 2,
            validation: Rule => Rule.required()
        },
        {
            name: 'subtitle',
            title: 'Subtitle (Arabic)',
            type: 'string',
        },
        {
            name: 'desc',
            title: 'Description (Arabic)',
            type: 'text',
            rows: 3
        },
        {
            name: 'roles',
            title: 'Rotating Roles (Arabic)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g., مهندس نظم, مصمم واجهات'
        },
        {
            name: 'availability',
            title: 'Status Text (Arabic)',
            type: 'string',
            initialValue: 'متاح للمشاريع'
        },
        {
            name: 'location',
            title: 'Location (Arabic)',
            type: 'string',
            initialValue: 'القاهرة، مصر'
        },
        {
            name: 'cta_primary',
            title: 'Primary Button (Arabic)',
            type: 'string',
            initialValue: 'ابدأ العمل'
        },
        {
            name: 'cta_secondary',
            title: 'Secondary Button (Arabic)',
            type: 'string',
            initialValue: 'معرض الأعمال'
        },

        // --- ENGLISH CONTENT ---
        {
            name: 'title_en',
            title: 'Title (English)',
            type: 'text',
            rows: 2,
            validation: Rule => Rule.required()
        },
        {
            name: 'subtitle_en',
            title: 'Subtitle (English)',
            type: 'string',
        },
        {
            name: 'desc_en',
            title: 'Description (English)',
            type: 'text',
            rows: 3
        },
        {
            name: 'roles_en',
            title: 'Rotating Roles (English)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g., System Architect, UI Engineer'
        },
        {
            name: 'availability_en',
            title: 'Status Text (English)',
            type: 'string',
            initialValue: 'AVAILABLE_FOR_WORK'
        },
        {
            name: 'location_en',
            title: 'Location (English)',
            type: 'string',
            initialValue: 'CAIRO, EG'
        },
        {
            name: 'cta_primary_en',
            title: 'Primary Button (English)',
            type: 'string',
            initialValue: 'INITIATE_PROJECT'
        },
        {
            name: 'cta_secondary_en',
            title: 'Secondary Button (English)',
            type: 'string',
            initialValue: 'VIEW_INDEX'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'title_en'
        }
    }
}
