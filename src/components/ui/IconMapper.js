import {
    RiReactjsFill, RiNextjsFill, RiTailwindCssFill, RiGithubFill
} from "react-icons/ri";
import {
    SiFramer, SiSanity, SiFigma, SiTypescript, SiNodedotjs, SiGreensock
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
    'node': SiNodedotjs,
    'gsap': SiGreensock,
    // Default fallback
    'default': RiReactjsFill
};

export const getIcon = (key) => {
    return IconMap[key] || IconMap['default'];
};
