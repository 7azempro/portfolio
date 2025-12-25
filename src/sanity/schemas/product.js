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
            name: 'stripeId',
            title: 'Stripe Product ID',
            type: 'string',
            description: 'For payment integration later.'
        }
    ]
}
