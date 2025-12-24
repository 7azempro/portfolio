'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function WorksGrid({ projects }) {
    const { lang } = useLanguage();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/10 border border-foreground/10">
            {projects.map((project, i) => (
                <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-background group relative"
                >
                    <Link href={`/works/${project.slug.current}`} className="block h-full p-8 md:p-12 hover:bg-foreground/5 transition-colors duration-500 flex flex-col justify-between min-h-[400px]">

                        {/* Top: Header */}
                        <div className="flex justify-between items-start mb-8">
                            <span className="text-xs font-sans uppercase tracking-widest text-muted-foreground border border-foreground/10 px-2 py-1">
                                {project.category?.[lang] || "PROJECT"}
                            </span>
                            <RiArrowRightUpLine className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Middle: Title & Year */}
                        <div className="mt-auto">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 group-hover:translate-x-2 transition-transform duration-500">
                                {project.title}
                            </h2>
                            <p className="text-muted-foreground text-sm font-sans line-clamp-2 max-w-sm mb-6 pl-4 border-l border-foreground/10">
                                {project.desc?.[lang]}
                            </p>

                            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-muted-foreground">
                                <span>{project.year || "2025"}</span>
                                <span className="w-12 h-px bg-foreground/20" />
                                <span>CAIRO, EG</span>
                            </div>
                        </div>

                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-3 h-3 border-b border-l border-foreground/10 opacity-50" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-t border-r border-foreground/10 opacity-50" />
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
