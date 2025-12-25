'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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

    return (
        <motion.section
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="min-h-[80vh] flex flex-col justify-center px-[5vw] pt-32 pb-16"
        >
            <motion.h1 variants={itemAnim} className="text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[1.3] tracking-tight mb-8 py-8 overflow-visible">
                {data.title} <br />
                <span className="text-[var(--accent-color)]">{data.subtitle}</span>
            </motion.h1>

            <motion.div variants={itemAnim} className="flex gap-4 items-center">
                <div className="h-[1px] w-12 bg-white/20"></div>
                <p className="text-xl text-white/60 max-w-xl leading-relaxed">
                    {data.desc}
                </p>
            </motion.div>

            <motion.div variants={itemAnim} className="mt-12">
                <button className="px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:scale-105 transition-transform">
                    {data.connect_btn}
                </button>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
