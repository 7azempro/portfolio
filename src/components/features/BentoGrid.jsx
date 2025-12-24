'use client';

import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemAnim = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    }
};

const BentoCard = ({ item }) => {
    const baseClasses = "relative bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden hover:bg-white/[0.05] transition-colors group";
    const spanClasses = clsx(
        item.colSpan === 2 ? "md:col-span-2" : "md:col-span-1",
        item.rowSpan === 2 ? "md:row-span-2" : "md:row-span-1"
    );

    const Content = () => (
        <div className="p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
                <div>
                    {item.subtitle && <span className="text-white/40 text-sm font-medium uppercase tracking-wider">{item.subtitle}</span>}
                    <h3 className="text-2xl font-semibold mt-2 group-hover:text-[var(--accent-color)] transition-colors">{item.title}</h3>
                </div>
                {item.type !== 'list' && <ArrowUpRight className="text-white/20 group-hover:text-white transition-colors" />}
            </div>

            <div className="mt-8">
                {item.type === 'list' && (
                    <div className="flex flex-wrap gap-2">
                        {item.items.map((tag, i) => (
                            <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-sm text-white/70 border border-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                {item.content && <p className="text-white/60">{item.content}</p>}
            </div>
        </div>
    );

    if (item.url) {
        return (
            <motion.div variants={itemAnim} className={clsx(baseClasses, spanClasses)}>
                <Link href={item.url} className="block h-full">
                    <Content />
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div variants={itemAnim} className={clsx(baseClasses, spanClasses)}>
            <Content />
        </motion.div>
    );
};

const BentoGrid = ({ data }) => {
    if (!data || !data.items) return null;

    return (
        <section className="px-[5vw] py-20">
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
            >
                {data.items.map((item) => (
                    <BentoCard key={item.id} item={item} />
                ))}
            </motion.div>
        </section>
    );
};

export default BentoGrid;
