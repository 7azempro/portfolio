'use client';
import { useEffect } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function ThemeSync({ rubikFont, jakartaFont }) {
    const { lang } = useLanguage();

    useEffect(() => {
        const root = document.documentElement;

        // Remove existing font classes
        root.classList.remove(rubikFont, jakartaFont);

        if (lang === 'ar') {
            // ARABIC: Light Mode & Rubik (Architect Light)
            root.classList.add('light');
            root.classList.remove('dark');
            root.classList.add(rubikFont);
            root.setAttribute('data-theme', 'light');
            root.setAttribute('dir', 'rtl');
        } else {
            // ENGLISH: Dark Mode & Jakarta (Architect Dark)
            root.classList.add('dark');
            root.classList.remove('light');
            root.classList.add(jakartaFont);
            root.setAttribute('data-theme', 'dark');
            root.setAttribute('dir', 'ltr');
        }
    }, [lang, rubikFont, jakartaFont]);

    return null; // This component renders nothing visually
}
