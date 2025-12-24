export const service = {
    name: 'service',
    title: 'Services',
    type: 'document',
    fields: [
        { name: 'title', title: 'Service Title (Arabic)', type: 'string' },
        { name: 'title_en', title: 'Service Title (English)', type: 'string' },
        { name: 'description', title: 'Description (Arabic)', type: 'text' },
        { name: 'description_en', title: 'Description (English)', type: 'text' },
        { name: 'icon', title: 'Icon (Lucide Name)', type: 'string', description: 'e.g., Layout, Code, Smartphone' },
    ]
}
