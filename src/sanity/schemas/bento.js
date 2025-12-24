export const bento = {
    name: 'bento',
    title: 'Bento Grid Items',
    type: 'document',
    fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'subtitle', title: 'Subtitle', type: 'string' },
        { name: 'type', title: 'Type', type: 'string', options: { list: ['project', 'card', 'list', 'socials'] } },
        { name: 'colSpan', title: 'Column Span', type: 'number' },
        { name: 'rowSpan', title: 'Row Span', type: 'number' },
        { name: 'content', title: 'Content', type: 'text' },
        { name: 'items', title: 'List Items', type: 'array', of: [{ type: 'string' }] },
        { name: 'url', title: 'URL', type: 'string' },
    ]
}
