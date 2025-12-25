import { RiVideoLine } from 'react-icons/ri'

export const lesson = {
    name: 'lesson',
    title: 'Lessons',
    type: 'document',
    icon: RiVideoLine,
    fields: [
        {
            name: 'title',
            title: 'Lesson Title',
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
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            description: 'YouTube, Vimeo, or Mux URL.'
        },
        {
            name: 'duration',
            title: 'Duration (min)',
            type: 'number'
        },
        {
            name: 'isFreePreview',
            title: 'Free Preview?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'resources',
            title: 'Downloadable Resources',
            type: 'array',
            of: [
                { type: 'file', title: 'File' },
                {
                    type: 'object',
                    title: 'External Link',
                    fields: [
                        { name: 'url', title: 'URL', type: 'url' },
                        { name: 'title', title: 'Title', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'content',
            title: 'Content / Notes',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }, { type: 'code' }]
        }
    ]
}
