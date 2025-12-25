import { RiBriefcase4Line } from "react-icons/ri";

export const experience = {
    name: 'experience',
    title: 'Experience',
    type: 'document',
    icon: RiBriefcase4Line,
    fields: [
        {
            name: 'company',
            title: 'Company Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'role',
            title: 'Job Role',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'location',
            title: 'Location',
            type: 'string',
            initialValue: 'Remote'
        },
        {
            name: 'startDate',
            title: 'Start Date',
            type: 'date',
            validation: Rule => Rule.required()
        },
        {
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if currently working here'
        },
        {
            name: 'isCurrent',
            title: 'Currently Working Here?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'description',
            title: 'Description (Arabic)',
            type: 'text',
            rows: 3
        },
        {
            name: 'description_en',
            title: 'Description (English)',
            type: 'text',
            rows: 3
        },
        {
            name: 'logo',
            title: 'Company Logo',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'techUsed',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tech' }] }]
        }
    ],
    preview: {
        select: {
            title: 'role',
            subtitle: 'company',
            media: 'logo'
        }
    }
}
