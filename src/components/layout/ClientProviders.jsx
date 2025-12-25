'use client';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import ThemeSync from '@/components/layout/ThemeSync';
import Cursor from '@/components/ui/Cursor';
import Preloader from '@/components/ui/Preloader';
import HelpWidget from '@/components/ui/HelpWidget';
import { SoundProvider } from '@/lib/context/SoundContext';

export default function ClientProviders({ children, fontVariables, nav, socials }) {
    const [isLoading, setIsLoading] = useState(true);

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

    return (
        <SoundProvider>
            <LanguageProvider>
                {/* ThemeSync uses the variables passed from layout */}
                <ThemeSync {...fontVariables} />

                <AnimatePresence mode="wait">
                    {isLoading && <Preloader />}
                </AnimatePresence>

                <Cursor />
                <Header nav={nav} />
                {children}
                <HelpWidget />
                <Footer socials={socials} />
            </LanguageProvider>
        </SoundProvider>
    );
}
