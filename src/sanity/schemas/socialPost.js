import { RiTwitterXLine } from 'react-icons/ri'

export const socialPost = {
    name: 'socialPost',
    title: 'Social Posts',
    type: 'document',
    icon: RiTwitterXLine,
    fields: [
        {
            name: 'content',
            title: 'Post Content',
            type: 'text',
            rows: 4
        },
        {
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'Twitter / X', value: 'twitter' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Internal', value: 'internal' }
                ],
                layout: 'radio'
            },
            initialValue: 'twitter'
        },
        {
            name: 'date',
            title: 'Published Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image'
        }
    ],
    preview: {
        select: {
            title: 'content',
            subtitle: 'platform',
            media: 'image'
        }
    }
}
