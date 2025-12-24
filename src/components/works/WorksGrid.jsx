'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function WorksGrid({ projects }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
            {projects.map((project) => (
                <motion.div variants={item} key={project._id}>
                    <Link href={`/works/${project.slug.current}`} className="group block">
                        <div className="bg-secondary rounded-2xl overflow-hidden aspect-[16/10] mb-6 border border-border group-hover:border-primary/50 transition-colors relative shadow-sm hover:shadow-md">
                            {/* Placeholder */}
                            <div className="flex items-center justify-center h-full text-muted-foreground/50 bg-secondary/50">
                                <span className="text-lg font-medium">{project.title}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-start px-1">
                            <div>
                                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h2>
                                <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">{project.desc}</p>
                            </div>
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all text-primary" />
                        </div>
                    </Link>
                </motion.div>
            ))}
        </motion.div>
    );
}
