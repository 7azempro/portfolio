export const tech = {
    name: 'tech',
    title: 'Tech Stack',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Technology Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'iconKey',
            title: 'Icon Identifier',
            type: 'string',
            description: 'Enter the exact icon key (e.g., "react", "nextjs", "sanity", "figma", "tailwind", "ts", "node", "github", "framer", "gsap").',
            options: {
                list: [
                    { title: 'Next.js', value: 'nextjs' },
                    { title: 'React', value: 'react' },
                    { title: 'Tailwind', value: 'tailwind' },
                    { title: 'TypeScript', value: 'ts' },
                    { title: 'Framer Motion', value: 'framer' },
                    { title: 'Sanity', value: 'sanity' },
                    { title: 'Figma', value: 'figma' },
                    { title: 'Node.js', value: 'node' },
                    { title: 'GitHub', value: 'github' },
                    { title: 'GSAP', value: 'gsap' },
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'row',
            title: 'Marquee Row',
            type: 'number',
            description: '1 for Top Row, 2 for Bottom Row',
            options: {
                list: [1, 2]
            },
            initialValue: 1,
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'row'
        },
        prepare({ title, subtitle }) {
            return {
                title: title,
                subtitle: `Row ${subtitle}`
            }
        }
    }
}
