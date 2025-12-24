'use client';
import Marquee from "@/components/ui/Marquee";
import {
    RiReactjsFill, RiNextjsFill, RiTailwindCssFill, RiGithubFill
} from "react-icons/ri";
import {
    SiFramer, SiSanity, SiFigma, SiTypescript, SiNodedotjs, SiGreensock
} from "react-icons/si";
import { useLanguage } from "@/lib/context/LanguageContext";

const TECH_ITEMS_ROW_1 = [
    { name: "NEXT.JS 14", icon: RiNextjsFill },
    { name: "REACT", icon: RiReactjsFill },
    { name: "TAILWIND", icon: RiTailwindCssFill },
    { name: "TYPESCRIPT", icon: SiTypescript },
    { name: "FRAMER MOTION", icon: SiFramer },
];

const TECH_ITEMS_ROW_2 = [
    { name: "SANITY.IO", icon: SiSanity },
    { name: "FIGMA", icon: SiFigma },
    { name: "NODE.JS", icon: SiNodedotjs },
    { name: "GITHUB", icon: RiGithubFill },
    { name: "GSAP", icon: SiGreensock },
];

export default function TechStack() {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    // Reverse direction in Arabic for natural flow (or Keep it if user prefers)
    // Usually, Arabic readers scan Right to Left. 
    // If we want items to "enter" from the reading side, we might want adjusting.
    // Let's invert the velocities.
    const v1 = isAr ? 1 : -1;
    const v2 = isAr ? -1 : 1;

    return (
        <section className="py-12 border-b border-foreground/5 dark:border-white/5 bg-background overflow-hidden relative" dir="ltr">

            {/* Gradient Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="flex flex-col gap-8 opacity-80 hover:opacity-100 transition-opacity duration-500">
                {/* Row 1 */}
                <Marquee baseVelocity={v1}>
                    {TECH_ITEMS_ROW_1.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 mx-4 md:mx-8 text-foreground/40 font-sans text-sm md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap">
                            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </Marquee>

                {/* Row 2 */}
                <Marquee baseVelocity={v2}>
                    {TECH_ITEMS_ROW_2.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 mx-4 md:mx-8 text-foreground/40 font-sans text-sm md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap">
                            <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
