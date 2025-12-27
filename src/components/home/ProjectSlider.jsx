/* eslint-disable @next/next/no-img-element */
'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll } from 'framer-motion';
import { PiArrowUpRightLight, PiArrowRightLight, PiEye } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getSafeImage } from '@/lib/constants';
import millify from 'millify';

// Minimal Fallback for safety (Client-side only if server fails entirely)
const FALLBACK_PROJECTS = [];

// --- Sub-Components ---

// Helper to safely get localized text from flat structure
const getLoc = (item, field, lang) => {
    // field: 'title', 'desc', 'category'
    // item: { title: '...', title_en: '...' }
    if (lang === 'ar') return item[field] || item[`${field}_ar`] || "";
    return item[`${field}_en`] || item[field] || "";
};

function ProjectCard({ project, lang }) {
    return (
        <Link href={`/works/${project.slug?.current}`} className="block group relative h-full">
            <div className="border border-foreground/10 bg-background h-full flex flex-col hover:border-blue-500/50 transition-colors duration-500">
                {/* Image Section */}
                <div className="relative aspect-[16/9] overflow-hidden border-b border-foreground/10 bg-muted">
                    <img
                        src={getSafeImage(project.thumbnail)}
                        alt={getLoc(project, 'title', lang)}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 backdrop-blur text-[11px] sm:text-xs font-mono text-white/80 border border-white/10 uppercase tracking-widest">
                        {project.year || "2025"}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest rtl:tracking-normal text-blue-500 border border-blue-500/20 bg-blue-500/5 px-2 py-1">
                            {getLoc(project, 'category', lang) || "SYSTEM"}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-muted-foreground opacity-60">
                            <PiEye className="text-sm" />
                            <span>{millify(project.views || 0)}</span>
                        </div>
                    </div>

                    <h3 className="text-3xl font-bold uppercase tracking-tight rtl:tracking-normal mb-4 group-hover:text-blue-500 transition-colors">
                        {getLoc(project, 'title', lang)}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-8">
                        {getLoc(project, 'desc', lang)}
                    </p>

                    <div className="mt-auto pt-6 border-t border-foreground/10 flex justify-between items-center text-xs font-mono uppercase tracking-widest rtl:tracking-normal text-muted-foreground">
                        <span>Project_ID :: {project._id?.slice(0, 4)}</span>
                        <PiArrowRightLight className="w-4 h-4 group-hover:text-blue-500 transition-colors" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

// --- Main Component ---

export default function ProjectSlider({ projects = [], settings = {} }) {
    const displayProjects = projects.length > 0 ? projects : FALLBACK_PROJECTS;
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const { lang } = useLanguage();

    const t = {
        ar: { title: settings?.projects_title || "أعمال مختارة", subtitle: "مشروعات حية" },
        en: { title: settings?.projects_title_en || "Selected Work", subtitle: settings?.projects_subtitle_en || "Live Projects" }
    };
    const content = t[lang];

    // Don't render empty slider
    if (displayProjects.length === 0) return null;

    return (
        <section className="py-32 border-b border-foreground/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 flex items-end justify-between">
                <div>
                    <h2 className="text-6xl md:text-8xl tracking-tighter font-bold mb-4 text-foreground uppercase">
                        {content.title}
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground font-mono uppercase tracking-widest pl-2 border-l-2 border-blue-500">
                        {'//'} {content.subtitle}
                    </p>
                </div>

                <div className="hidden md:flex flex-col gap-6 items-end">
                    <Link href="/works" className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-blue-500 transition-colors">
                        <span>{lang === 'ar' ? 'عرض الكل' : 'VIEW_ALL_WORKS'}</span>
                        <PiArrowRightLight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>

                    <div className="flex flex-col gap-2 items-end">
                        <span className="text-[11px] sm:text-xs font-mono text-muted-foreground uppercase tracking-widest">SCROLL_X</span>
                        <div className="w-48 h-0.5 bg-foreground/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-500"
                                style={{ scaleX: scrollXProgress, transformOrigin: lang === 'ar' ? "right" : "left" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="container mx-auto px-6 md:hidden mb-4 flex justify-end">
                <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest uppercase text-blue-500 animate-pulse">
                    <span>{lang === 'ar' ? 'اسحب' : 'SWIPE'}</span>
                    <PiArrowRightLight className={`w-3 h-3 ${lang === 'ar' ? 'rotate-180' : ''}`} />
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex gap-8 overflow-x-auto px-6 pb-20 snap-x snap-mandatory scrollbar-hide pt-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {displayProjects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="min-w-[85vw] md:min-w-[600px] snap-center"
                    >
                        <ProjectCard project={project} lang={lang} />
                    </motion.div>
                ))}
            </div>
        </section >
    );
}
