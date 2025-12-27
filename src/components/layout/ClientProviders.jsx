'use client';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import { usePathname, useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import ThemeSync from '@/components/layout/ThemeSync';
import Cursor from '@/components/ui/Cursor';
import Preloader from '@/components/ui/Preloader';
import TopLoader from '@/components/ui/TopLoader';
import HelpWidget from '@/components/ui/help-widget';
import LiveChatWidget from '@/components/ui/LiveChatWidget';
import { SoundProvider } from '@/lib/context/SoundContext';

export default function ClientProviders({ children, fontVariables, nav, socials }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isNavigating, setIsNavigating] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Initial Splash Screen
    useEffect(() => {
        // Smooth Scroll
        const lenis = new Lenis();
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Simulate Loading Time (Splash Screen)
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    // Navigation Progress Bar Logic
    useEffect(() => {
        // When path/search changes, navigation is complete
        setIsNavigating(false);
    }, [pathname, searchParams]);

    useEffect(() => {
        // Attach click listeners to all links to trigger loading state
        // This simulates 'nprogress' behavior
        const handleAnchorClick = (e) => {
            const anchor = e.target.closest('a');
            if (
                anchor &&
                anchor.href &&
                anchor.href.startsWith(window.location.origin) &&
                anchor.target !== '_blank' &&
                !anchor.href.includes('#') &&
                anchor.getAttribute('href') !== pathname
            ) {
                setIsNavigating(true);
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, [pathname]);

    return (
        <SoundProvider>
            <LanguageProvider>
                {/* ThemeSync uses the variables passed from layout */}
                <ThemeSync {...fontVariables} />

                {/* 1. Initial Splash Screen */}
                <AnimatePresence mode="wait">
                    {isLoading && <Preloader />}
                </AnimatePresence>

                {/* 2. Navigation Top Loader */}
                <AnimatePresence>
                    {isNavigating && <TopLoader />}
                </AnimatePresence>

                <Cursor />
                <Header nav={nav} />
                {children}

                {/* Global Widgets */}
                <HelpWidget />
                <LiveChatWidget />

                <Footer socials={socials} />
            </LanguageProvider>
        </SoundProvider>
    );
}
