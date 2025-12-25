import { RiCodeBoxLine } from "react-icons/ri";
import { getIcon } from "../../components/ui/IconMapper";

export const tech = {
    name: 'tech',
    title: 'Tech Stack Item',
    type: 'document',
    icon: RiCodeBoxLine,
    fields: [
        {
            name: 'name',
            title: 'Technology Name',
            type: 'string',
            description: 'Optional. If empty, the name will be inferred from the Icon Type.'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Frontend', value: 'frontend' },
                    { title: 'Backend', value: 'backend' },
                    { title: 'Database', value: 'database' },
                    { title: 'DevOps & Cloud', value: 'devops' },
                    { title: 'Tools & Design', value: 'tools' }
                ]
            },
            initialValue: 'frontend'
        },
        {
            name: 'iconKey',
            title: 'Icon Type',
            type: 'string',
            description: 'Select the icon to display',
            options: {
                list: [
                    { title: 'React', value: 'react' },
                    { title: 'Next.js', value: 'nextjs' },
                    { title: 'TypeScript', value: 'typescript' },
                    { title: 'Tailwind CSS', value: 'tailwind' },
                    { title: 'Node.js', value: 'nodejs' },
                    { title: 'Python', value: 'python' },
                    { title: 'Figma', value: 'figma' },
                    { title: 'Git', value: 'git' },
                    { title: 'WordPress', value: 'wordpress' },
                    { title: 'Sanity', value: 'sanity' },
                    { title: 'Framer Motion', value: 'framer' },
                    { title: 'GSAP', value: 'gsap' },
                    { title: 'GitHub', value: 'github' },
                    { title: 'HTML5', value: 'html' },
                    { title: 'CSS3', value: 'css' },
                    { title: 'JavaScript', value: 'javascript' },
                    { title: 'MongoDB', value: 'mongodb' },
                    { title: 'PostgreSQL', value: 'postgres' },
                    { title: 'Firebase', value: 'firebase' },
                    { title: 'Supabase', value: 'supabase' },
                    { title: 'Docker', value: 'docker' },
                    { title: 'AWS', value: 'aws' },
                    { title: 'Vue.js', value: 'vue' },
                    { title: 'Angular', value: 'angular' },
                    { title: 'Redux', value: 'redux' },
                    { title: 'GraphQL', value: 'graphql' },
                    { title: 'Shopify', value: 'shopify' },
                    { title: 'Prisma', value: 'prisma' },
                    { title: 'Jest', value: 'jest' },
                    { title: 'Cypress', value: 'cypress' },
                    { title: 'Storybook', value: 'storybook' },
                    { title: 'Vercel', value: 'vercel' },
                    { title: 'Linux', value: 'linux' }
                ],
                layout: 'dropdown' // Enforce dropdown UI
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'row',
            title: 'Marquee Row',
            type: 'number',
            options: {
                list: [1, 2],
                layout: 'radio'
            },
            initialValue: 1
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'iconKey'
        },
        prepare({ title, subtitle }) {
            return {
                title: title,
                subtitle: `Key: ${subtitle}`,
                media: getIcon(subtitle) // Render dynamic icon
            }
        }
    }
}
