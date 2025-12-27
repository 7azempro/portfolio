/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PiArrowUpRightLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import { getSafeImage } from '@/lib/constants';

export default function WorksGrid({ projects = [] }) {
    const { lang } = useLanguage();

    // Helper for Localization
    const t = (item, field) => {
        if (!item) return '';
        if (lang === 'en' && item[`${field}_en`]) return item[`${field}_en`];
        return item[field];
    };

    if (projects.length === 0) {
        return (
            <div className="py-20 text-center border border-dashed border-foreground/10 bg-foreground/5 dark:bg-white/5">
                <p className="font-mono text-muted-foreground uppercase tracking-widest">
                    {lang === 'ar' ? 'لا توجد مشاريع حالياً' : 'NO_PROJECTS_FOUND'}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                >
                    <Link href={`/works/${project.slug.current}`} className="block h-full border border-foreground/10 bg-background hover:bg-foreground/5 transition-colors duration-500">
                        {/* Image Container */}
                        <div className="aspect-video w-full overflow-hidden border-b border-foreground/10 relative bg-muted">
                            <img
                                src={getSafeImage(project.thumbnail)}
                                alt={t(project, 'title')}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col h-auto min-h-[280px]">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-blue-500 border border-blue-500/20 bg-blue-500/5 px-2 py-1">
                                    {t(project, 'category') || "SYS_MODULE"}
                                </span>
                                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                    {project.year || "2025"}
                                </span>
                            </div>

                            {/* Title & Desc */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold uppercase tracking-tight mb-4 group-hover:text-blue-500 transition-colors">
                                    {t(project, 'title')}
                                </h2>
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                    {t(project, 'desc')}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="mt-auto flex justify-between items-center pt-6 border-t border-foreground/10">
                                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                                    {lang === 'ar' ? 'عرض التفاصيل' : 'VIEW_CASE_STUDY'}
                                </span>
                                <PiArrowUpRightLight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
