export const article = {
    name: 'article',
    title: 'Articles',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'date', title: 'Date', type: 'date' },
        { name: 'readTime', title: 'Read Time', type: 'string' },
        { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
        { name: 'content', title: 'Content', type: 'text' },
    ],
}
