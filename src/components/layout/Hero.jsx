'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const itemAnim = {
    hidden: { y: 50, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20
        }
    },
};

const Hero = ({ data }) => {
    // Data passed from Server Component
    if (!data) return null;

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect

    return (
        <section className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background text-foreground px-[5vw] pt-20 pb-16">

            {/* Background Grid (Optional, consistent with theme) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <motion.div
                style={{ y }}
                className="relative z-10 flex flex-col justify-center h-full"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
            >
                <motion.h1 variants={itemAnim} className="text-[clamp(3rem,8vw,7rem)] font-bold leading-[1.3] tracking-tight mb-8 py-4 overflow-visible mix-blend-difference">
                    {data.title} <br />
                    <span className="text-[var(--accent-color)]">{data.subtitle}</span>
                </motion.h1>

                <motion.div variants={itemAnim} className="flex gap-4 items-center mb-12">
                    <div className="h-[1px] w-12 bg-foreground/20 dark:bg-white/20"></div>
                    <p className="text-xl text-foreground/80 dark:text-white/60 max-w-xl leading-relaxed">
                        {data.desc}
                    </p>
                </motion.div>

                <motion.div variants={itemAnim} className="flex flex-wrap gap-6">
                    <button className="px-8 py-4 rounded-full bg-foreground text-background font-medium text-lg hover:scale-105 transition-transform">
                        {data.connect_btn}
                    </button>
                    {/* Secondary Button - Restored from Legacy */}
                    <button className="px-8 py-4 rounded-full border border-foreground/20 hover:border-foreground text-foreground font-medium text-lg hover:bg-foreground/5 transition-all">
                        About Me
                    </button>
                </motion.div>

            </motion.div>
        </section>
    );
};

export default Hero;
