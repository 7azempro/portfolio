export const statItem = {
    name: 'statItem',
    title: 'Stat Item',
    type: 'object',
    fields: [
        { name: 'label', title: 'Label (Ar)', type: 'string' },
        { name: 'label_en', title: 'Label (En)', type: 'string' },
        { name: 'value', title: 'Value', type: 'string' },
        { name: 'unit', title: 'Unit (Ar)', type: 'string' },
        { name: 'unit_en', title: 'Unit (En)', type: 'string' }
    ]
}

export const experienceItem = {
    name: 'experienceItem',
    title: 'Experience Item',
    type: 'object',
    fields: [
        { name: 'role', title: 'Role', type: 'string' },
        { name: 'company', title: 'Company', type: 'string' },
        { name: 'year', title: 'Year/Duration', type: 'string' },
        { name: 'desc', title: 'Description (Ar)', type: 'text' },
        { name: 'desc_en', title: 'Description (En)', type: 'text' }
    ]
}

export const educationItem = {
    name: 'educationItem',
    title: 'Education Item',
    type: 'object',
    fields: [
        { name: 'degree', title: 'Degree', type: 'string' },
        { name: 'institution', title: 'Institution', type: 'string' },
        { name: 'year', title: 'Year', type: 'string' }
    ]
}

// --- SHARED / HOISTED FOR GRAPHQL ---

export const seoDetails = {
    name: 'seoDetails',
    title: 'SEO Metadata',
    type: 'object',
    options: { collapsible: true, collapsed: true },
    fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDesc', title: 'Meta Description', type: 'text', rows: 3 },
        { name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } },
        { name: 'synonyms', title: 'Synonyms', type: 'string' }
    ]
}

export const productVariant = {
    name: 'productVariant',
    title: 'Variant',
    type: 'object',
    fields: [
        { name: 'name', title: 'Variant Name', type: 'string' },
        { name: 'price', title: 'Price Override', type: 'number' },
        { name: 'sku', title: 'SKU', type: 'string' },
        { name: 'stock', title: 'Stock Count', type: 'number' }
    ]
}

export const productDimensions = {
    name: 'productDimensions',
    title: 'Dimensions',
    type: 'object',
    fields: [
        { name: 'width', title: 'Width', type: 'number' },
        { name: 'height', title: 'Height', type: 'number' },
        { name: 'depth', title: 'Depth', type: 'number' },
        { name: 'weight', title: 'Weight (kg)', type: 'number' }
    ]
}

export const socialLink = {
    name: 'socialLink',
    title: 'Social Link',
    type: 'object',
    fields: [
        { name: 'platform', title: 'Platform Name', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
        {
            name: 'iconKey',
            title: 'Icon Key',
            type: 'string',
            options: {
                list: [
                    { title: 'GitHub', value: 'github' },
                    { title: 'Twitter / X', value: 'twitter' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Behance', value: 'behance' },
                    { title: 'Dribbble', value: 'dribbble' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'Facebook', value: 'facebook' }
                ]
            }
        }
    ]
}

export const navItem = {
    name: 'navItem',
    title: 'Navigation Item',
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

export const externalLink = {
    name: 'externalLink',
    title: 'External Link',
    type: 'object',
    fields: [
        { name: 'url', title: 'URL', type: 'url' },
        { name: 'title', title: 'Title', type: 'string' }
    ]
}

export const courseModule = {
    name: 'courseModule',
    title: 'Module',
    type: 'object',
    fields: [
        { name: 'title', title: 'Module Title', type: 'string' },
        {
            name: 'lessons',
            title: 'Lessons',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'lesson' }] }]
        }
    ]
}

export const linkAnnotation = {
    title: 'URL',
    name: 'linkAnnotation',
    type: 'object',
    fields: [
        {
            title: 'URL',
            name: 'href',
            type: 'url',
        },
    ],
}
