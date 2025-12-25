'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { useLanguage } from '@/lib/context/LanguageContext';

const loadingMessages = {
    en: [
        "INITIALIZING SYSTEM...",
        "LOADING ASSETS...",
        "ESTABLISHING SECURE CONNECTION...",
        "RENDERING UI...",
        "SYSTEM READY."
    ],
    ar: [
        "جاري تهيئة النظام...",
        "تحميل الملفات...",
        "تأمين الاتصال...",
        "تجهيز الواجهة...",
        "النظام جاهز."
    ]
};

export default function Preloader() {
    const { lang } = useLanguage();
    const messages = loadingMessages[lang];
    const [count, setCount] = useState(0);
    const [messageIndex, setMessageIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Counter Animation
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsComplete(true), 800); // Slight delay before exit
                    return 100;
                }
                // Randomize increment for "realistic" loading feel
                const increment = Math.floor(Math.random() * 5) + 1;
                return Math.min(prev + increment, 100);
            });
        }, 30);

        // Message Cycler
        const messageInterval = setInterval(() => {
            setMessageIndex(prev => (prev + 1) % messages.length);
        }, 400);

        return () => {
            clearInterval(interval);
            clearInterval(messageInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom bezier for "Curtain" feel
                    className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#050505] text-white p-4 md:p-8 overflow-hidden font-mono"
                >
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />

                    {/* Top Bar */}
                    <div className={`relative z-10 flex justify-between items-start text-xs md:text-sm uppercase tracking-widest opacity-50 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <span>{lang === 'ar' ? 'إقلاع النظام // v2.0' : 'System Boot // v2.0'}</span>
                        <span>7azempro</span>
                    </div>

                    {/* Center Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center flex-grow gap-8">

                        {/* ENHANCED LOGO CONTAINER */}
                        <div className="relative flex flex-col items-center transform scale-125 md:scale-150">
                            {/* Rotating/Pulsing Diamond */}
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                    scale: [1, 1.1, 1],
                                    boxShadow: ["0 0 20px rgba(59, 130, 246, 0.3)", "0 0 40px rgba(59, 130, 246, 0.6)", "0 0 20px rgba(59, 130, 246, 0.3)"]
                                }}
                                transition={{
                                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="w-16 h-16 bg-gradient-to-tr from-blue-600 to-cyan-400 rotate-45 rounded-xl border border-blue-400/30 backdrop-blur-sm z-20"
                            />

                            {/* Logo Text */}
                            <div className="flex items-center gap-1 mt-6 overflow-hidden" style={{ fontFamily: 'var(--font-jakarta)' }}>
                                <motion.span
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                                    className="text-3xl font-bold tracking-tighter text-white"
                                >
                                    7azem
                                </motion.span>
                                <motion.span
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
                                    className="text-3xl font-light text-blue-400"
                                >
                                    pro
                                </motion.span>
                            </div>
                        </div>

                        {/* Loading Percentage (Smaller now, below logo) */}
                        <div className="font-mono text-blue-500/80 text-lg mt-4">
                            <motion.span
                                key={count}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                [{count.toString().padStart(3, '0')}%]
                            </motion.span>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className={`relative z-10 flex justify-between items-end text-xs md:text-sm uppercase tracking-widest ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>

                        {/* Dynamic Message */}
                        <div className={`flex flex-col gap-1 ${lang === 'ar' ? 'items-end' : ''}`}>
                            <span className="opacity-50">{lang === 'ar' ? 'الحالة:' : 'Status:'}</span>
                            <motion.span
                                key={messageIndex}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-blue-400 font-semibold"
                            >
                                {count === 100 ? (lang === 'ar' ? "النظام جاهز." : "SYSTEM READY.") : `> ${messages[messageIndex]}`}
                            </motion.span>
                        </div>

                        {/* Progress Bar Line */}
                        <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-100 ease-out" style={{ width: `${count}%` }} />
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
