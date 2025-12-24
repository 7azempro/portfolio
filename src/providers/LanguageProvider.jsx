'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

    const t = translations[lang];

    useEffect(() => {
        document.documentElement.dir = t.dir;
        document.documentElement.lang = lang;
        // Theme switching logic based on lang
        // We can just rely on the CSS [dir="rtl"] selector for theme switching as verified before
    }, [lang, t]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
