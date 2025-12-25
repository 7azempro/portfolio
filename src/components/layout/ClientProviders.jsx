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

export default function ClientProviders({ children, fontVariables }) {
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
        <LanguageProvider>
            {/* ThemeSync uses the variables passed from layout */}
            <ThemeSync {...fontVariables} />

            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>

            <Cursor />
            <Header />
            {children}
            <HelpWidget />
            <Footer />
        </LanguageProvider>
    );
}
