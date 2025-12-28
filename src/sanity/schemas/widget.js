import { defineField, defineType } from 'sanity'
import { RiToggleLine } from "react-icons/ri";

export const widget = defineType({
    name: 'widget',
    title: 'Widgets Config',
    type: 'document',
    icon: RiToggleLine,
    fields: [
        defineField({
            name: 'whatsappNumber',
            title: 'WhatsApp Number',
            type: 'string',
            description: 'International format without +, e.g. 201xxxxxxxxx',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'whatsappIntro',
            title: 'WhatsApp Intro Message',
            type: 'string', // Should use localized string object if available, but string for now is safe
            description: 'Default message when opening chat',
        }),
        defineField({
            name: 'enableLiveChat',
            title: 'Enable Live Chat Widget',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'coffeeText',
            title: 'Coffee Hint Text',
            type: 'string',
            description: 'Text shown in the popup card',
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Widgets Configuration',
            }
        },
    },
})
