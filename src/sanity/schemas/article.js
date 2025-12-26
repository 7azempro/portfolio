export const article = {
    name: 'article',
    title: 'Articles',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title (Arabic)', type: 'string' },
        { name: 'title_en', title: 'Title (English)', type: 'string' },
        { name: 'excerpt', title: 'Excerpt (Arabic)', type: 'text', rows: 3 },
        { name: 'excerpt_en', title: 'Excerpt (English)', type: 'text', rows: 3 },
        { name: 'date', title: 'Date', type: 'datetime', initialValue: () => new Date().toISOString() },
        { name: 'readTime', title: 'Read Time', type: 'string', initialValue: '5 min read' },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Engineering', value: 'engineering' },
                    { title: 'Design', value: 'design' },
                    { title: 'Tutorial', value: 'tutorial' },
                    { title: 'Thoughts', value: 'thoughts' }
                ]
            }
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                layout: 'tags'
            }
        },
        { name: 'linkedinUrl', title: 'LinkedIn Post URL', type: 'url' },
        { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
        {
            name: 'content',
            title: 'Content (Arabic)',
            type: 'blockContent'
        },
        {
            name: 'content_en',
            title: 'Content (English)',
            type: 'blockContent'
        },
    ],
}
