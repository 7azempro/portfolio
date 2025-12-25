export const article = {
    name: 'article',
    title: 'Articles',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title (Arabic)', type: 'string' },
        { name: 'title_en', title: 'Title (English)', type: 'string' },
        { name: 'excerpt', title: 'Excerpt (Arabic)', type: 'text', rows: 3 },
        { name: 'excerpt_en', title: 'Excerpt (English)', type: 'text', rows: 3 },
        { name: 'date', title: 'Date', type: 'date' },
        { name: 'readTime', title: 'Read Time', type: 'string', initialValue: '5 min read' },
        { name: 'linkedinUrl', title: 'LinkedIn Post URL', type: 'url' },
        { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
        // detailed content kept for internal usage if needed later
        { name: 'content', title: 'Full Content (Optional)', type: 'text' },
    ],
}
