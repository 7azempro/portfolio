'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiXLight, PiSquaresFourLight } from 'react-icons/pi';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useWidgetState } from './useWidgetState';
import { useScrollDirection } from '@/lib/hooks/useScrollDirection';
// Hook imported correctly

// Content Components
import SystemTab from './content/SystemTab';
import ConnectTab from './content/ConnectTab';
import FocusSpotlight from '../FocusSpotlight';
import ReadingGuide from '../ReadingGuide';

// Translations
const TRANSLATIONS = {
    en: {
        title: "SUPPORT_CENTER",
        subtitle: "SYSTEM_HELP",
        status: "ONLINE",
        email: "SEND_EMAIL",
        legal: "LEGAL_FRAMEWORK",
        about: "ABOUT_SYSTEM",
        connect: "CONNECT",
        tabSystem: "SYSTEM",
        tabContact: "CONNECT",
        utilities: "SYSTEM_UTILITIES",
        copy: "COPY_LINK",
        refresh: "RELOAD",
        accessibility: {
            textScale: "TEXT SCALE",
            color: "Color",
            yellowBlack: "Yel/Blk",
            guide: "Guide",
            reading: "Reading",
            speak: "Speak",
            motion: "Motion",
            sound: "Sound",
            muted: "Muted",
            reset: "Reset",
            contrast: "Contrast",
            invert: "Invert",
            grayscale: "Gray"
        }
    },
    ar: {
        title: "مركز الدعم",
        subtitle: "نظام المساعدة",
        status: "متاح",
        email: "مراسلة بريدية",
        legal: "السياسات والأحكام",
        about: "حول النظام",
        connect: "تواصل معنا",
        tabSystem: "النظام",
        tabContact: "تواصل",
        utilities: "أدوات النظام",
        copy: "نسخ الرابط",
        refresh: "تحديث",
        accessibility: {
            textScale: "حجم النص",
            color: "ألوان",
            yellowBlack: "أصفر/أسود",
            guide: "مسطرة",
            reading: "يقرأ",
            speak: "تحدث",
            motion: "حركة",
            sound: "صوت",
            muted: "صامت",
            reset: "إعادة",
            contrast: "تباين",
            invert: "عكس",
            grayscale: "رمادي"
        }
    }
};

export default function HelpWidget() {
    const { lang } = useLanguage();
    // Defensive Fallback: If lang is undefined or invalid, default to English
    const content = TRANSLATIONS[lang] || TRANSLATIONS['en'];

    // Custom Hook State
    const {
        isOpen, setIsOpen,
        activeTab, setActiveTab,
        widgetPosition, setWidgetPosition,
        textScale, setTextScale,
        acModes, setAcModes,
        isReading, setIsReading,
        guide, setGuide,
        soundEnabled, setSoundEnabled
    } = useWidgetState();

    // Derived visual position (Mirrors in RTL)
    // If widgetPosition.isRight is true (default):
    // EN: Right side -> isVisuallyRight = true
    // AR: Left side -> isVisuallyRight = false
    const isVisuallyRight = lang === 'ar' ? !widgetPosition.isRight : widgetPosition.isRight;

    // Smart Features: Network Status & Keyboard Shortcuts
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        // Network Listeners
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        // Keyboard Shortcut (Ctrl + /)
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === '/') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            // Escape to close
            if (e.key === 'Escape' && isOpen) setIsOpen(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('keydown', handleKeyDown);

        // Initial Check
        setIsOnline(navigator.onLine);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, setIsOpen]);

    if (!content) return null; // Ultra safe guard

    const scrollDirection = useScrollDirection();
    const hideOffset = widgetPosition.isTop ? -200 : 200;

    return (
        <motion.div
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.1 }}
            onDragEnd={(e, info) => {
                const { x, y } = info.point;
                // Determine quadrant for smart docking
                const isRight = x > window.innerWidth / 2;
                const isTop = y < window.innerHeight / 2;
                setWidgetPosition({ isTop, isRight });
            }}
            animate={{
                x: 0,
                y: scrollDirection === 'down' ? hideOffset : 0,
                opacity: 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-[9995] flex flex-col gap-4 transition-all duration-300
                ${widgetPosition.isTop ? 'top-4 sm:top-6' : 'bottom-4 sm:bottom-6'} 
                bg-transparent
                right-4 left-auto sm:left-auto sm:right-6
                ${isVisuallyRight ? 'sm:items-end' : 'sm:items-start sm:left-6 sm:right-auto'}
            `}
        >
            {/* TRIGGER BUTTON */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isOpen ? "Close Help Widget" : "Open Help Widget"}
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-foreground text-background rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow`}
            >
                {isOpen ? <PiXLight className="w-6 h-6" /> : <PiSquaresFourLight className="w-6 h-6" />}
                {!isOpen && <span className="absolute inset-0 rounded-full border border-foreground/30 animate-ping opacity-20" />}
            </motion.button>



            {/* Visual Aids Overlay */}
            <AnimatePresence>
                {guide === 'spotlight' && <FocusSpotlight />}
                {guide === 'reading' && <ReadingGuide />}
            </AnimatePresence>

            {/* PANEL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: widgetPosition.isTop ? -10 : 10, x: isVisuallyRight ? 10 : -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: widgetPosition.isTop ? -10 : 10, x: isVisuallyRight ? 10 : -10 }}
                        transition={{ duration: 0.2, ease: "circOut" }}
                        className={`
                            absolute 
                            ${widgetPosition.isTop ? 'top-full mt-3' : 'bottom-full mb-3'} 
                            w-[90vw] max-w-[320px] 
                            max-h-[70vh] flex flex-col overflow-hidden 
                            bg-background/80 backdrop-blur-xl backdrop-saturate-150 
                            border border-foreground/10 rounded-2xl shadow-2xl 
                            origin-${widgetPosition.isTop ? 'top' : 'bottom'}-${isVisuallyRight ? 'right' : 'left'}
                        `}
                        // Force alignment to the visual side
                        style={{ [isVisuallyRight ? 'right' : 'left']: 0 }}
                        onPointerDownCapture={(e) => e.stopPropagation()}
                    >
                        {/* Header & Tabs */}
                        <div className="bg-foreground text-background p-2 shrink-0">
                            <div className="flex items-center justify-between mb-3 px-2 pt-2">
                                <div>
                                    <h3 className="font-bold text-sm tracking-widest uppercase">{content.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className="text-[10px] font-mono opacity-80">
                                            {isOnline ? content.status : (lang === 'ar' ? "غير متصل" : "OFFLINE")}
                                        </span>
                                    </div>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                    <PiXLight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex p-1 bg-background/10 rounded-lg">
                                <button
                                    id="system-tab-trigger"
                                    onClick={() => setActiveTab('system')}
                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'system' ? 'bg-background text-foreground shadow-sm' : 'text-background/60 hover:text-background'}`}
                                >
                                    {content.tabSystem}
                                </button>
                                <button
                                    id="connect-tab-trigger"
                                    onClick={() => setActiveTab('contact')}
                                    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'contact' ? 'bg-background text-foreground shadow-sm' : 'text-background/60 hover:text-background'}`}
                                >
                                    {content.tabContact}
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4 space-y-4 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                {activeTab === 'system' ? (
                                    <motion.div key="system" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                                        <SystemTab
                                            content={content}
                                            lang={lang}
                                            isOpen={isOpen}
                                            setIsOpen={setIsOpen} // Added prop
                                            a11y={{
                                                textScale, setTextScale,
                                                acModes, setAcModes,
                                                isReading, setIsReading,
                                                guide, setGuide,
                                                soundEnabled, setSoundEnabled
                                            }}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div key="contact" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                        <ConnectTab
                                            content={content}
                                            lang={lang}
                                            setIsOpen={setIsOpen}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-3 bg-foreground/5 text-center text-[10px] text-muted-foreground font-mono border-t border-foreground/5 shrink-0 flex justify-between items-center px-4">
                            <span>SYS_V2.1</span>
                            <span className="opacity-50">CTRL+/</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
