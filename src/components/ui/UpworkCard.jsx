'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { PiSealCheckFill, PiMapPinFill } from 'react-icons/pi';
import { SiUpwork } from 'react-icons/si';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Rising Talent Icon (Custom SVG based on Upwork's design)
const RisingTalentIcon = () => (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 17L1.5 13V5L9 1L16.5 5V13L9 17Z" fill="#14a800" />
        <path d="M9 4V8H11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 14V8H6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function UpworkCard({ isHovered, mousePos = { x: 0, y: 0 } }) {
    const [time, setTime] = useState('');

    useEffect(() => {
        // Cairo Time Update
        const updateTime = () => {
            const now = new Date();
            const options = {
                timeZone: 'Africa/Cairo',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            };
            setTime(new Intl.DateTimeFormat('en-US', options).format(now));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        x: mousePos.x * 0.05, // Subtle Parallax
                        rotateX: mousePos.y * -0.05, // 3D Tilt
                        rotateY: mousePos.x * 0.05
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30
                    }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-[90%] md:w-[380px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-[100] pointer-events-none origin-bottom"
                    style={{
                        boxShadow: '0 20px 50px -10px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    {/* Header Strip */}
                    <div className="h-1.5 bg-[#14a800] w-full" />

                    <div className="p-5 text-left">
                        {/* Header: Name & Verified */}
                        <div className="flex items-center gap-2 mb-4">
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
                                Hazem
                            </h3>
                            <PiSealCheckFill className="text-blue-500 w-5 h-5 drop-shadow-sm" />
                        </div>

                        {/* Profile Row */}
                        <div className="flex items-start gap-4 mb-5">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white dark:border-zinc-800 shadow-md bg-zinc-100">
                                    <Image
                                        src="/assets/hazem-upwork.jpg"
                                        alt="Hazem"
                                        width={64}
                                        height={64}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#14a800] rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
                            </div>

                            {/* Titles & Badge */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-snug font-sans">
                                    UX/UI Designer | Graphic Designer | Web Designer
                                </h4>

                                {/* Redesigned Badge */}
                                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#14a800]/10 border border-[#14a800]/20 rounded-full">
                                    <RisingTalentIcon />
                                    <span className="text-[10px] font-bold text-[#14a800] uppercase tracking-wide font-sans">
                                        Rising Talent
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Footer: Location */}
                        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-medium border-t border-zinc-100 dark:border-zinc-800 pt-4">
                            <PiMapPinFill className="w-4 h-4" />
                            <span>Cairo, Egypt - {time} local time</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
