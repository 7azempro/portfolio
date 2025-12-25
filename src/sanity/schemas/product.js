import { RiShoppingBag3Line } from 'react-icons/ri'

export const product = {
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: RiShoppingBag3Line,
    fields: [
        {
            name: 'title',
            title: 'Product Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: Rule => Rule.required()
        },
        {
            name: 'price',
            title: 'Price (USD)',
            type: 'number',
            validation: Rule => Rule.required()
        },
        {
            name: 'productType',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Digital Asset', value: 'digital' },
                    { title: 'Service', value: 'service' },
                    { title: 'Physical', value: 'physical' }
                ],
                layout: 'radio'
            },
            initialValue: 'digital'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'images',
            title: 'Product Images',
            type: 'array',
            of: [{ type: 'image' }]
        },
        {
            name: 'sku',
            title: 'SKU',
            type: 'string'
        },
        {
            name: 'variants',
            title: 'Product Variants',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Variant',
                    fields: [
                        { name: 'name', title: 'Variant Name (e.g. Red, XL)', type: 'string' },
                        { name: 'price', title: 'Price Override', type: 'number' },
                        { name: 'sku', title: 'SKU', type: 'string' },
                        { name: 'stock', title: 'Stock Count', type: 'number' }
                    ]
                }
            ]
        },
        {
            name: 'dimensions',
            title: 'Dimensions',
            type: 'object',
            fields: [
                { name: 'width', title: 'Width', type: 'number' },
                { name: 'height', title: 'Height', type: 'number' },
                { name: 'depth', title: 'Depth', type: 'number' },
                { name: 'weight', title: 'Weight (kg)', type: 'number' }
            ],
            hidden: ({ parent }) => parent?.productType === 'digital'
        },
        {
            name: 'seo',
            title: 'SEO Metadata',
            type: 'object',
            options: { collapsible: true, collapsed: true },
            fields: [
                { name: 'metaTitle', title: 'Meta Title', type: 'string' },
                { name: 'metaDesc', title: 'Meta Description', type: 'text', rows: 3 }
            ]
        },
        {
            name: 'stripeId',
            title: 'Stripe Product ID',
            type: 'string',
            description: 'For payment integration later.'
        }
    ]
}
