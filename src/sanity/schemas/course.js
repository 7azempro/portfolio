import { RiBookOpenLine } from 'react-icons/ri'

export const course = {
    name: 'course',
    title: 'Courses',
    type: 'document',
    icon: RiBookOpenLine,
    fields: [
        {
            name: 'title',
            title: 'Course Title',
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
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'price',
            title: 'Price (USD)',
            type: 'number',
            description: 'Set to 0 for free courses.'
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image'
        },
        {
            name: 'modules',
            title: 'Modules / Lessons',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'lesson' }] }]
        }
    ]
}
