'use client';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { PiCoffeeFill, PiXBold } from 'react-icons/pi';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useSound } from '@/lib/context/SoundContext';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import Image from 'next/image';
// ... other imports

export default function LiveChatWidget() {
    const { lang } = useLanguage();
    const messages = CONTACT_CONFIG.messages[lang] || CONTACT_CONFIG.messages['en'];

    const [showHint, setShowHint] = useState(false);
    const [isTyping, setIsTyping] = useState(false); // New State
    const ref = useRef(null);
    const { playHover, playClick } = useSound();

    // Magnetic Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));

        if (distance < 120) {
            x.set((e.clientX - centerX) * 0.3);
            y.set((e.clientY - centerY) * 0.3);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        // Sequence: Wait -> Typing -> Message + Sound -> Auto Hide
        const startTimer = setTimeout(() => {
            setShowHint(true);
            setIsTyping(true);
        }, 1500);

        const typeTimer = setTimeout(() => {
            setIsTyping(false);
            playHover(); // Notification Sound
        }, 3500); // 2 seconds of typing

        // Auto Hide after 8 seconds of showing
        const dismissTimer = setTimeout(() => {
            setShowHint(false);
        }, 11500);

        return () => {
            clearTimeout(startTimer);
            clearTimeout(typeTimer);
            clearTimeout(dismissTimer);
        };
    }, [playHover]);

    return (
        <div ref={ref} className={`fixed z-[9980] ${lang === 'ar' ? 'left-6' : 'right-6'} bottom-20 sm:bottom-24 w-14 h-14`}>
            <motion.div style={{ x: springX, y: springY }} className="relative w-full h-full">

                {/* 1. SMART HINT CARD */}
                <AnimatePresence>
                    {showHint && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 15, rotate: -3 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`absolute bottom-full mb-4 w-60 ${lang === 'ar' ? 'origin-bottom-left left-0' : 'origin-bottom-right right-0'}`}
                        >
                            <div className="relative group cursor-pointer" onClick={() => { playClick(); setShowHint(false); }}>
                                {/* Glass Card */}
                                <div className="bg-background/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] rounded-[20px] p-3 flex items-start gap-4 relative overflow-hidden transition-all hover:bg-background/80">
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none opacity-50" />

                                    {/* Avatar Container */}
                                    <div className="relative shrink-0">
                                        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shadow-sm bg-neutral-100 ring-4 ring-background/20">
                                            <Image
                                                src="/assets/hazem-upwork.jpg"
                                                alt="Hazem"
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Status Dot */}
                                        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background shadow-sm" />
                                    </div>

                                    {/* Text Area */}
                                    <div className={`flex-1 min-w-0 pt-0.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                        <h4 className="text-[12px] font-bold text-foreground mb-0.5 flex items-center justify-between leading-none font-sans">
                                            Hazem
                                            <span className="text-[9px] text-muted-foreground font-medium font-mono tracking-widest opacity-60 uppercase">Now</span>
                                        </h4>

                                        {isTyping ? (
                                            /* Typing Indicator */
                                            <div className="flex items-center gap-1 h-4 opacity-50">
                                                <span className="w-1 h-1 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1 h-1 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1 h-1 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        ) : (
                                            /* Actual Message */
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-[11px] text-muted-foreground/90 leading-relaxed font-sans"
                                            >
                                                {lang === 'ar' ? 'قهوتك علينا! ☕ استشارة مجانية؟' : 'Coffee is on me! ☕ Free consultation?'}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Close Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
                                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity p-1 hover:bg-black/10 rounded-full"
                                    >
                                        <PiXBold className="w-3 h-3" />
                                    </button>
                                </div>

                                {/* Arrow Tail */}
                                <div className={`absolute -bottom-1.5 w-4 h-4 bg-background/60 backdrop-blur-xl border-r border-b border-white/10 rotate-45 transform ml-5 ${lang === 'ar' ? 'left-1' : 'right-1'}`} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 2. MAIN BUTTON */}
                <motion.a
                    href={`https://wa.me/${CONTACT_CONFIG.whatsapp.number}?text=${encodeURIComponent(messages.whatsapp_intro)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-shadow block relative z-10"
                    aria-label="Live Chat on WhatsApp"
                >
                    <SiWhatsapp className="w-6 h-6" />
                    <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />

                    {/* Online Dot */}
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#25D366] border-2 border-background rounded-full flex items-center justify-center">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </span>
                </motion.a>

            </motion.div>
        </div>
    );
}
