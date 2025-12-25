'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('en');
    const [t, setT] = useState(translations.en);

    useEffect(() => {
        setT(translations[lang]);
        document.documentElement.lang = lang;
        document.documentElement.dir = translations[lang].dir || 'ltr';
    }, [lang]);

    const toggleLanguage = () => {
        setLang(prev => prev === 'en' ? 'ar' : 'en');
    };

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
