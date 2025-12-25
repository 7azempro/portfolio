import { RiGraduationCapLine } from "react-icons/ri";

export const education = {
    name: 'education',
    title: 'Education',
    type: 'document',
    icon: RiGraduationCapLine,
    fields: [
        {
            name: 'institution',
            title: 'Institution / University',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'degree',
            title: 'Degree / Certificate',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'field',
            title: 'Field of Study',
            type: 'string'
        },
        {
            name: 'startDate',
            title: 'Start Date',
            type: 'date'
        },
        {
            name: 'endDate',
            title: 'End Date', // Or Graduation Date
            type: 'date'
        },
        {
            name: 'logo',
            title: 'Institution Logo',
            type: 'image',
            options: { hotspot: true }
        }
    ],
    preview: {
        select: {
            title: 'degree',
            subtitle: 'institution',
            media: 'logo'
        }
    }
}
