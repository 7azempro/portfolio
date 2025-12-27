import { RiContactsBookLine } from "react-icons/ri";

export const contact = {
    name: 'contact',
    title: 'Contacts & Leads',
    type: 'document',
    icon: RiContactsBookLine,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            readOnly: true
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string',
            readOnly: true
        },
        {
            name: 'type',
            title: 'Source / Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Resume Download', value: 'resume' },
                    { title: 'Contact Form', value: 'form' },
                    { title: 'Other', value: 'other' }
                ]
            },
            initialValue: 'resume',
            readOnly: true
        },
        {
            name: 'message',
            title: 'Message / Purpose',
            type: 'text',
            readOnly: true
        },
        {
            name: 'createdAt',
            title: 'Date',
            type: 'datetime',
            readOnly: true
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Contacted', value: 'contacted' },
                    { title: 'Archived', value: 'archived' }
                ],
                layout: 'radio'
            },
            initialValue: 'new'
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
            type: 'type'
        },
        prepare({ title, subtitle, type }) {
            const types = {
                resume: '📄 Resume',
                form: '✉️ Message',
                other: '👤 Contact'
            };
            return {
                title: title || 'Anonymous',
                subtitle: `${subtitle} (${types[type] || 'Contact'})`,
                media: RiContactsBookLine
            }
        }
    }
}
