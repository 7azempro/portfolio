'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PiHeadsetLight, PiXLight, PiEnvelopeSimpleLight, PiQuestionLight, PiWhatsappLogoLight,
    PiWheelchairLight, PiEyeClosedLight, PiSunLight, PiPauseLight, PiArrowCounterClockwiseLight
} from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import Link from 'next/link';

export default function HelpWidget() {
    const { lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    // Accessibility State
    const [textScale, setTextScale] = useState(1);
    const [acModes, setAcModes] = useState({
        grayscale: false,
        contrast: false,
        motion: false
    });

    const toggleOpen = () => setIsOpen(!isOpen);

    // Apply A11y Changes
    useEffect(() => {
        const root = document.documentElement;
        // Text Scale
        root.style.fontSize = `${textScale * 100}%`;

        // Classes
        root.classList.toggle('grayscale-mode', acModes.grayscale);
        root.classList.toggle('high-contrast', acModes.contrast);
        root.classList.toggle('reduce-motion', acModes.motion);

    }, [textScale, acModes]);

    const adjustTextScale = (delta) => {
        setTextScale(prev => Math.min(Math.max(prev + delta / 100, 0.8), 1.5)); // Limit 80% - 150%
    };

    const toggleMode = (mode) => {
        setAcModes(prev => ({ ...prev, [mode]: !prev[mode] }));
    };

    const resetA11y = () => {
        setTextScale(1);
        setAcModes({ grayscale: false, contrast: false, motion: false });
    };

    const t = {
        ar: {
            title: "مركز الدعم",
            subtitle: "نظام المساعدة",
            status: "متاح",
            email: "مراسلة بريدية",
            legal: "الشروط والخصوصية",
            about: "حول النظام",
            chat: "المحادثة الفورية",
            connect: "تواصل معنا"
        },
        en: {
            title: "SUPPORT_CENTER",
            subtitle: "SYSTEM_HELP",
            status: "ONLINE",
            email: "SEND_EMAIL",
            legal: "LEGAL_PROTOCOLS",
            about: "ABOUT_SYSTEM",
            chat: "LIVE_CHAT",
            connect: "CONNECT"
        }
    };

    const content = t[lang];

    return (
        <>
            {/* TRIGGER BUTTON */}
            <motion.button
                onClick={toggleOpen}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`fixed bottom-6 z-[9990] w-14 h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow ${lang === 'ar' ? 'left-6' : 'right-6'}`}
            >
                {isOpen ? <PiXLight className="w-6 h-6" /> : <PiHeadsetLight className="w-6 h-6" />}

                {/* Pulse Ring */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full border border-foreground/30 animate-ping opacity-20" />
                )}
            </motion.button>

            {/* PANEL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "circOut" }}
                        className={`fixed bottom-24 z-[9990] w-80 bg-background/80 backdrop-blur-xl border border-foreground/10 rounded-2xl overflow-hidden shadow-2xl ${lang === 'ar' ? 'left-6' : 'right-6'}`}
                    >

                        {/* Header */}
                        <div className="bg-foreground text-background p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-sm tracking-widest uppercase">{content.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-mono opacity-80">{content.status}</span>
                                </div>
                            </div>
                            <PiHeadsetLight className="w-8 h-8 opacity-20" />
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4">

                            {/* Accessibility Controls */}
                            <div className="bg-foreground/5 rounded-lg p-3 space-y-3">
                                <h4 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                    <PiWheelchairLight className="w-4 h-4" />
                                    {lang === 'ar' ? 'أدوات الوصول' : 'ACCESSIBILITY'}
                                </h4>

                                {/* Controls Grid */}
                                <div className="grid grid-cols-2 gap-2">
                                    {/* Text Scale */}
                                    <div className="flex items-center justify-between bg-background border border-foreground/10 rounded px-2 py-1.5 col-span-2">
                                        <button onClick={() => adjustTextScale(-10)} className="w-6 h-6 flex items-center justify-center hover:bg-foreground/5 rounded text-xs">-</button>
                                        <span className="text-[10px] font-mono">{(textScale * 100).toFixed(0)}%</span>
                                        <button onClick={() => adjustTextScale(10)} className="w-6 h-6 flex items-center justify-center hover:bg-foreground/5 rounded text-xs">+</button>
                                    </div>

                                    {/* Toggles */}
                                    <button
                                        onClick={() => toggleMode('grayscale')}
                                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded border transition-colors ${acModes.grayscale ? 'bg-foreground text-background border-foreground' : 'bg-background hover:bg-foreground/5 border-foreground/10'}`}
                                    >
                                        <PiEyeClosedLight className="w-4 h-4" />
                                        <span className="text-[8px] uppercase">Gray</span>
                                    </button>

                                    <button
                                        onClick={() => toggleMode('contrast')}
                                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded border transition-colors ${acModes.contrast ? 'bg-foreground text-background border-foreground' : 'bg-background hover:bg-foreground/5 border-foreground/10'}`}
                                    >
                                        <PiSunLight className="w-4 h-4" />
                                        <span className="text-[8px] uppercase">Contrast</span>
                                    </button>

                                    <button
                                        onClick={() => toggleMode('motion')}
                                        className={`flex flex-col items-center justify-center gap-1 p-2 rounded border transition-colors ${acModes.motion ? 'bg-foreground text-background border-foreground' : 'bg-background hover:bg-foreground/5 border-foreground/10'}`}
                                    >
                                        <PiPauseLight className="w-4 h-4" />
                                        <span className="text-[8px] uppercase">Motion</span>
                                    </button>

                                    <button
                                        onClick={resetA11y}
                                        className="flex flex-col items-center justify-center gap-1 p-2 rounded border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <PiArrowCounterClockwiseLight className="w-4 h-4" />
                                        <span className="text-[8px] uppercase">Reset</span>
                                    </button>
                                </div>
                            </div>

                            <div className="w-full h-px bg-foreground/10" />

                            {/* WhatsApp Action (Priority) */}
                            <a
                                href="https://wa.me/201019443462"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors group"
                            >
                                <div className="w-8 h-8 bg-emerald-500 text-white flex items-center justify-center rounded-md shadow-sm shadow-emerald-500/20 animate-pulse">
                                    <PiWhatsappLogoLight className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400">{content.chat}</h4>
                                    <p className="text-[10px] text-muted-foreground font-sans flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                        {content.status}
                                    </p>
                                </div>
                            </a>

                            {/* Email Action */}
                            <a
                                href="mailto:hazem.gamal1@outlook.com"
                                className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors group border border-transparent hover:border-foreground/5"
                            >
                                <div className="w-8 h-8 bg-blue-500/10 text-blue-500 flex items-center justify-center rounded-md group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                    <PiEnvelopeSimpleLight />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs uppercase tracking-wide">{content.email}</h4>
                                    <p className="text-[10px] text-muted-foreground font-sans">hazem.gamal1@outlook.com</p>
                                </div>
                            </a>

                            {/* Legal Action */}
                            <Link
                                href="/legal"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 p-3 hover:bg-foreground/5 rounded-lg transition-colors group border border-transparent hover:border-foreground/5"
                            >
                                <div className="w-8 h-8 bg-purple-500/10 text-purple-500 flex items-center justify-center rounded-md group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                    <PiQuestionLight />
                                </div>
                                <h4 className="font-bold text-xs uppercase tracking-wide">{content.legal}</h4>
                            </Link>

                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-foreground/5 text-center text-[10px] text-muted-foreground font-mono border-t border-foreground/5">
                            SYSTEM_ID: WIDGET_V1.0
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
