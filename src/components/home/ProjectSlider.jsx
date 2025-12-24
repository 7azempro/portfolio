'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function ProjectSlider() {
    const containerRef = useRef(null);
    const { scrollXProgress } = useScroll({ container: containerRef });
    const { lang } = useLanguage();

    const projects = [
        {
            _id: '1',
            title: 'Real Estate Platform',
            category: 'UI/UX Design',
            year: '2024',
            link: 'https://www.behance.net/gallery/215394017/Real-Estate-Website-Design',
            desc: 'Complete branding and interface design for a luxury property market.',
            color: 'bg-emerald-500' // Placeholder tone
        },
        {
            _id: '2',
            title: 'Fintech Dashboard',
            category: 'Product Design',
            year: '2024',
            link: 'https://www.behance.net/gallery/215393041/Fintech-Dashboard-App',
            desc: 'High-frequency trading interface with complex data visualization.',
            color: 'bg-blue-600'
        },
        {
            _id: '3',
            title: 'Medical Mobile App',
            category: 'Mobile App',
            year: '2023',
            link: 'https://www.behance.net/gallery/215392105/Medical-Healthcare-App',
            desc: 'Patient-first mobile experience for appointment scheduling.',
            color: 'bg-rose-500'
        },
        {
            _id: '4',
            title: 'Portfolio V2',
            category: 'Web Design',
            year: '2023',
            link: 'https://www.behance.net/hazempro',
            desc: 'Previous iteration of the personal brand identity.',
            color: 'bg-purple-600'
        },
    ];

    const t = {
        ar: { title: "أعمال مختارة", subtitle: "تصفح بيهانس", view: "عرض المشروع" },
        en: { title: "Selected Work", subtitle: "On Behance", view: "View Project" }
    };

    const content = t[lang];

    return (
        <section className="py-32 border-b border-foreground/5 dark:border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 flex items-end justify-between">
                <div>
                    <h2 className="text-6xl md:text-8xl tracking-tighter font-bold mb-4 text-foreground">
                        {content.title}
                    </h2>
                    <p className="text-xl text-muted-foreground font-mono uppercase tracking-widest pl-2 border-l-2 border-blue-500">
                        // {content.subtitle}
                    </p>
                </div>

                {/* Scroll Indicator */}
                <div className="hidden md:flex flex-col gap-2 items-end">
                    <span className="text-xs font-mono text-muted-foreground">SCROLL_X</span>
                    <div className="w-48 h-1 bg-foreground/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-blue-600 dark:bg-blue-500"
                            style={{ scaleX: scrollXProgress, transformOrigin: lang === 'ar' ? "left" : "right" }}
                        />
                    </div>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
                ref={containerRef}
                className="flex gap-12 overflow-x-auto px-6 pb-20 snap-x snap-mandatory scrollbar-hide pt-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                        className="min-w-[90vw] md:min-w-[800px] snap-center group"
                    >
                        {/* Card Wrapper */}
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="block relative">

                            {/* Visual Layer */}
                            <div className={`aspect-[16/9] relative overflow-hidden ${project.color}/5 border border-foreground/10 dark:border-white/10 rounded-xl mb-6`}>
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-tr from-${project.color?.replace('bg-', '') || 'blue-500'}/10 to-transparent group-hover:scale-105 transition-transform duration-1000`} />

                                {/* Overlay Tech Grid */}
                                <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />

                                {/* Mock UI Preview (Abstract Shapes) */}
                                <div className="absolute inset-x-12 bottom-0 h-3/4 bg-background/50 backdrop-blur-sm rounded-t-lg border-t border-x border-foreground/5 dark:border-white/5 shadow-2xl transform translate-y-4 group-hover:translate-y-2 transition-transform duration-700">
                                    <div className="p-6">
                                        <div className="flex gap-2 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-400/50" />
                                            <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                                            <div className="w-3 h-3 rounded-full bg-green-400/50" />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="w-1/3 h-4 bg-foreground/10 rounded" />
                                            <div className="w-full h-32 bg-foreground/5 rounded-lg border border-dashed border-foreground/10" />
                                            <div className="flex gap-4">
                                                <div className="w-1/2 h-20 bg-foreground/5 rounded-lg" />
                                                <div className="w-1/2 h-20 bg-foreground/5 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Action */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/50 backdrop-blur-sm z-20">
                                    <div className="w-24 h-24 rounded-full border border-foreground/20 flex items-center justify-center bg-background transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        <ArrowUpRight className="w-8 h-8 text-foreground" />
                                    </div>
                                </div>

                                {/* Tag Badge */}
                                <div className="absolute top-6 left-6 bg-background/80 backdrop-blur border border-foreground/10 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider z-10">
                                    {project.category}
                                </div>
                            </div>

                            {/* Meta Data Layer (Postcard Style) */}
                            <div className="flex justify-between items-start border-t border-foreground/10 dark:border-white/10 pt-6">
                                <div>
                                    <h3 className="text-4xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-lg">{project.desc}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block text-4xl font-mono font-bold text-foreground/20 group-hover:text-foreground/40 transition-colors">
                                        {project.year}
                                    </span>
                                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Behance_Link</span>
                                </div>
                            </div>

                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
