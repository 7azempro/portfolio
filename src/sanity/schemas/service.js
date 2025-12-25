export const service = {
    name: 'service',
    title: 'Services',
    type: 'document',
    fields: [
        { name: 'title', title: 'Service Title (Arabic)', type: 'string' },
        { name: 'title_en', title: 'Service Title (English)', type: 'string' },
        { name: 'description', title: 'Description (Arabic)', type: 'text' },
        { name: 'description_en', title: 'Description (English)', type: 'text' },
        {
            name: 'iconKey',
            title: 'Icon Key',
            type: 'string',
            options: {
                list: [
                    { title: 'Web Layout', value: 'web' },
                    { title: 'Mobile Device', value: 'mobile' },
                    { title: 'Backend/Database', value: 'backend' },
                    { title: 'Design/Pen', value: 'design' }
                ]
            }
        },
    ]
}
