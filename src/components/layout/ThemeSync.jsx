'use client';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function ThemeSync({ ibmFont, jakartaFont }) {
    const { lang } = useLanguage();

    useEffect(() => {
        const root = document.documentElement;

        // Remove existing font classes
        root.classList.remove(ibmFont, jakartaFont);

        if (lang === 'ar') {
            // ARABIC: Light Mode & IBM Plex Sans Arabic
            root.classList.add('light');
            root.classList.remove('dark');
            root.classList.add(ibmFont);
            root.classList.add(jakartaFont); // Keep Jakarta available for logo/English text
            root.setAttribute('data-theme', 'light');
            root.setAttribute('dir', 'rtl');
        } else {
            // ENGLISH: Dark Mode & Jakarta
            root.classList.add('dark');
            root.classList.remove('light');
            root.classList.remove(ibmFont);
            root.classList.add(jakartaFont);
            root.setAttribute('data-theme', 'dark');
            root.setAttribute('dir', 'ltr');
        }
    }, [lang, ibmFont, jakartaFont]);

    return null; // This component renders nothing visually
}
