import { RiDoubleQuotesR } from "react-icons/ri";

export const testimonial = {
    name: 'testimonial',
    title: 'Testimonials',
    type: 'document',
    icon: RiDoubleQuotesR,
    fields: [
        {
            name: 'name',
            title: 'Client Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'position',
            title: 'Position / Company',
            type: 'string'
        },
        {
            name: 'quote',
            title: 'Quote (Arabic)',
            type: 'text',
            rows: 3
        },
        {
            name: 'quote_en',
            title: 'Quote (English)',
            type: 'text',
            rows: 3
        },
        {
            name: 'rating',
            title: 'Rating (1-5)',
            type: 'number',
            validation: Rule => Rule.min(1).max(5),
            initialValue: 5
        },
        {
            name: 'photo',
            title: 'Client Photo',
            type: 'image',
            options: { hotspot: true }
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'position',
            media: 'photo'
        }
    }
}
