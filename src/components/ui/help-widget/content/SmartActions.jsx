'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiArrowRightLight, PiFileTextLight, PiProjectorScreenChartLight, PiBriefcaseLight, PiCopyLight } from 'react-icons/pi';
import { useSound } from '@/lib/context/SoundContext';

export default function SmartActions({ lang, setIsOpen }) {
    const pathname = usePathname();
    const router = useRouter();
    const [suggestion, setSuggestion] = useState(null);
    const { playClick, playHover } = useSound();

    // Context Logic
    useEffect(() => {
        // Scanning effect delay
        setSuggestion(null);
        const timer = setTimeout(() => {
            if (pathname === '/') {
                setSuggestion({
                    label: lang === 'ar' ? 'استكشف الأعمال' : 'EXPLORE_WORKS',
                    action: '/works',
                    icon: PiBriefcaseLight
                });
            } else if (pathname === '/works') {
                setSuggestion({
                    label: lang === 'ar' ? 'ابدأ مشروعاً' : 'START_PROJECT',
                    action: 'contact_tab', // Special action
                    icon: PiProjectorScreenChartLight
                });
            } else if (pathname === '/about') {
                setSuggestion({
                    label: lang === 'ar' ? 'تواصل معنا' : 'CONNECT_NOW',
                    action: 'contact_tab',
                    icon: PiArrowRightLight
                });
            } else {
                setSuggestion({
                    label: lang === 'ar' ? 'العودة للرئيسية' : 'RETURN_HOME',
                    action: '/',
                    icon: PiArrowRightLight
                });
            }
        }, 600); // Simulated "Analysis" time

        return () => clearTimeout(timer);
    }, [pathname, lang]);

    const handleAction = () => {
        playClick();
        if (!suggestion) return;

        if (suggestion.action === 'contact_tab') {
            // Switch tabs without closing the widget
            document.getElementById('connect-tab-trigger')?.click();
        } else if (suggestion.action === 'copy_email') {
            navigator.clipboard.writeText('hazem.gamal1@outlook.com');
            setIsOpen(false);
        } else if (suggestion.external) {
            window.open(suggestion.action, '_blank');
        } else {
            router.push(suggestion.action);
            setIsOpen(false);
        }
    };

    if (!suggestion) {
        return (
            <div className="p-3 mb-4 rounded-lg border border-blue-500/20 bg-blue-500/5 flex items-center justify-center gap-2 animate-pulse">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">
                    {lang === 'ar' ? 'جاري تحليل السياق...' : 'ANALYZING_CONTEXT...'}
                </span>
            </div>
        );
    }

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">
                    {lang === 'ar' ? 'اجراء ذكي' : 'SMART_SUGGESTION'}
                </span>
            </div>
            <button
                onClick={handleAction}
                onMouseEnter={playHover}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl flex items-center justify-between shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300"
            >
                <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5 group-hover:translate-x-1 transition-transform">
                        {suggestion.label}
                    </div>
                    <div className="text-[9px] opacity-70 font-mono">
                        {lang === 'ar' ? 'بناءً على موقعك الحالي' : 'BASED_ON_CURRENT_VIEW'}
                    </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <suggestion.icon className="w-4 h-4" />
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </button>
        </div>
    );
}
