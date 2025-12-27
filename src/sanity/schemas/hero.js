export const hero = {
    name: 'hero',
    title: 'Home Page Config',
    type: 'document',
    fieldsets: [
        { name: 'hero', title: 'Hero Section', options: { collapsible: true, collapsed: false } },
        { name: 'sections', title: 'Section Headers', options: { collapsible: true, collapsed: false } },
        { name: 'system', title: 'System Status', options: { collapsible: true, collapsed: true } }
    ],
    fields: [
        // --- HERO SECTION ---
        {
            name: 'title',
            title: 'Title (Arabic)',
            type: 'text',
            rows: 2,
            fieldset: 'hero',
            validation: Rule => Rule.required()
        },
        {
            name: 'subtitle',
            title: 'Subtitle (Arabic)',
            type: 'string',
            fieldset: 'hero'
        },
        {
            name: 'desc',
            title: 'Description (Arabic)',
            type: 'text',
            rows: 3,
            fieldset: 'hero'
        },
        {
            name: 'availability',
            title: 'Status Text (Arabic)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'متاح للمشاريع'
        },
        {
            name: 'location',
            title: 'Location (Arabic)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'القاهرة، مصر'
        },
        {
            name: 'cta_primary',
            title: 'Primary Button (Arabic)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'ابدأ العمل'
        },
        {
            name: 'cta_secondary',
            title: 'Secondary Button (Arabic)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'معرض الأعمال'
        },

        // --- ENGLISH CONTENT ---
        {
            name: 'title_en',
            title: 'Title (English)',
            type: 'text',
            rows: 2,
            fieldset: 'hero',
            initialValue: 'SYSTEM\nINTERFACE\nARCHITECT.',
            validation: Rule => Rule.required()
        },
        {
            name: 'subtitle_en',
            title: 'Subtitle (English)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'PRECISION. CLARITY. PURPOSE.'
        },
        {
            name: 'desc_en',
            title: 'Description (English)',
            type: 'text',
            rows: 3,
            fieldset: 'hero',
            initialValue: 'Constructing digital infrastructures that combine technical precision with Swiss minimalist aesthetics.'
        },
        {
            name: 'availability_en',
            title: 'Status Text (English)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'STATUS: AVAILABLE_FOR_WORK'
        },
        {
            name: 'location_en',
            title: 'Location (English)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'CAIRO, EG'
        },
        {
            name: 'cta_primary_en',
            title: 'Primary Button (English)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'INITIATE_PROJECT'
        },
        {
            name: 'cta_secondary_en',
            title: 'Secondary Button (English)',
            type: 'string',
            fieldset: 'hero',
            initialValue: 'VIEW_INDEX'
        },

        // --- SECTION HEADERS ---
        {
            name: 'services_title',
            title: 'Services Title (Arabic)',
            type: 'string',
            fieldset: 'sections',
            initialValue: 'خدماتنا'
        },
        {
            name: 'services_title_en',
            title: 'Services Title (English)',
            type: 'string',
            fieldset: 'sections',
            initialValue: 'SERVICES'
        },
        {
            name: 'services_subtitle_en',
            title: 'Services Subtitle (English)',
            type: 'string',
            fieldset: 'sections',
            description: 'Small text like "// CAPABILITIES"',
            initialValue: '// CAPABILITIES'
        },

        {
            name: 'projects_title',
            title: 'Projects Title (Arabic)',
            type: 'string',
            fieldset: 'sections',
            initialValue: 'أعمال مختارة'
        },
        {
            name: 'projects_title_en',
            title: 'Projects Title (English)',
            type: 'string',
            fieldset: 'sections',
            initialValue: 'Selected Work'
        },
        {
            name: 'projects_subtitle_en',
            title: 'Projects Subtitle (English)',
            type: 'string',
            fieldset: 'sections',
            description: 'Small text like "Live Projects"',
            initialValue: 'Live Projects'
        },

        // --- SYSTEM STATUS ---
        {
            name: 'system_version',
            title: 'System Version',
            type: 'string',
            fieldset: 'system',
            initialValue: 'V3.0.0 SYS_ACTIVE'
        },
        {
            name: 'coordinates',
            title: 'Coordinates',
            type: 'string',
            fieldset: 'system',
            initialValue: '30.0444° N, 31.2357° E'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'title_en'
        }
    }
}
