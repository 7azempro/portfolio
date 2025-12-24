export const project = {
    name: 'project',
    title: 'Projects',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title (Arabic)', type: 'string' },
        { name: 'title_en', title: 'Title (English)', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
        { name: 'category', title: 'Category', type: 'string' },
        { name: 'thumbnail', title: 'Thumbnail', type: 'image' },
        { name: 'desc', title: 'Short Description (Arabic)', type: 'text' },
        { name: 'desc_en', title: 'Short Description (English)', type: 'text' },
        { name: 'content', title: 'Content (Arabic)', type: 'text' },
        { name: 'content_en', title: 'Content (English)', type: 'text' },
    ],
}
