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
            name: 'instructor',
            title: 'Instructor',
            type: 'reference',
            to: [{ type: 'about' }]
        },
        {
            name: 'learningOutcomes',
            title: 'What you will learn',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'modules',
            title: 'Curriculum Modules',
            type: 'array',
            of: [
                { type: 'courseModule' }
            ]
        }
    ]
}
