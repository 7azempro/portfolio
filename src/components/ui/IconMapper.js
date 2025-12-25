import {
    RiReactjsFill, RiNextjsFill, RiTailwindCssFill, RiGithubFill
} from "react-icons/ri";
import {
    SiFramer, SiSanity, SiFigma, SiTypescript, SiNodedotjs, SiGreensock, SiPython, SiGit,
    SiWordpress, SiHtml5, SiCss3, SiJavascript,
    SiMongodb, SiPostgresql, SiFirebase, SiSupabase,
    SiDocker, SiAmazon, SiVuedotjs, SiAngular,
    SiRedux, SiGraphql, SiShopify, SiPrisma
} from "react-icons/si";

export const IconMap = {
    'react': RiReactjsFill,
    'nextjs': RiNextjsFill,
    'tailwind': RiTailwindCssFill,
    'github': RiGithubFill,
    'framer': SiFramer,
    'sanity': SiSanity,
    'figma': SiFigma,
    'ts': SiTypescript,
    'typescript': SiTypescript, // Alias
    'node': SiNodedotjs,
    'nodejs': SiNodedotjs, // Alias
    'gsap': SiGreensock,
    'python': SiPython,
    'git': SiGit,
    'wordpress': SiWordpress,
    'html': SiHtml5,
    'css': SiCss3,
    'javascript': SiJavascript,
    'js': SiJavascript,
    'mongodb': SiMongodb,
    'postgres': SiPostgresql,
    'postgresql': SiPostgresql,
    'firebase': SiFirebase,
    'supabase': SiSupabase,
    'docker': SiDocker,
    'aws': SiAmazon,
    'vue': SiVuedotjs,
    'angular': SiAngular,
    'redux': SiRedux,
    'graphql': SiGraphql,
    'shopify': SiShopify,
    'prisma': SiPrisma,
    // Default fallback
    'default': RiReactjsFill
};

export const TechLabels = {
    'react': 'React',
    'nextjs': 'Next.js',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'tailwind': 'Tailwind',
    'nodejs': 'Node.js',
    'node': 'Node.js',
    'python': 'Python',
    'figma': 'Figma',
    'git': 'Git',
    'wordpress': 'WordPress',
    'html': 'HTML5',
    'css': 'CSS3',
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'mongodb': 'MongoDB',
    'postgres': 'PostgreSQL',
    'postgresql': 'PostgreSQL',
    'firebase': 'Firebase',
    'supabase': 'Supabase',
    'docker': 'Docker',
    'aws': 'AWS',
    'vue': 'Vue.js',
    'angular': 'Angular',
    'redux': 'Redux',
    'graphql': 'GraphQL',
    'shopify': 'Shopify',
    'prisma': 'Prisma',
    'sanity': 'Sanity',
    'framer': 'Framer',
    'gsap': 'GSAP',
    'github': 'GitHub'
};

export const getIcon = (key) => {
    return IconMap[key] || IconMap['default'];
};
