import { RiServiceLine } from "react-icons/ri";
import { getIcon } from "../../components/ui/IconMapper";

export const service = {
    name: 'service',
    title: 'Services',
    type: 'document',
    icon: RiServiceLine,
    fieldsets: [
        { name: 'arabic', title: 'Arabic Content', options: { collapsible: true, collapsed: false } },
        { name: 'english', title: 'English Content', options: { collapsible: true, collapsed: true } },
        { name: 'style', title: 'Styling', options: { collapsible: true, collapsed: false } }
    ],
    fields: [
        // --- Arabic ---
        {
            name: 'title',
            title: 'Title (Arabic)',
            type: 'string',
            fieldset: 'arabic',
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description (Arabic)',
            type: 'text',
            rows: 3,
            fieldset: 'arabic'
        },

        // --- English ---
        {
            name: 'title_en',
            title: 'Title (English)',
            type: 'string',
            fieldset: 'english'
        },
        {
            name: 'description_en',
            title: 'Description (English)',
            type: 'text',
            rows: 3,
            fieldset: 'english'
        },

        // --- Style ---
        {
            name: 'iconKey',
            title: 'Icon Type',
            type: 'string',
            fieldset: 'style',
            options: {
                list: [
                    { title: 'Layout / Web', value: 'web' },
                    { title: 'Mobile Device', value: 'mobile' },
                    { title: 'Server / Backend', value: 'backend' },
                    { title: 'Pen / Design', value: 'design' }
                ],
                layout: 'radio'
            },
            initialValue: 'web'
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'title_en',
            iconKey: 'iconKey'
        },
        prepare({ title, subtitle, iconKey }) {
            return {
                title: title,
                subtitle: subtitle || 'No English Title',
                media: getIcon(iconKey) // Render the actual React Icon in Studio
            }
        }
    }
}
