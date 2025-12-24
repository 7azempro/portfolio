import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en'); // Default to English

    const toggleLanguage = () => {
        setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
    };

    const t = translations[lang];

    useEffect(() => {
        document.documentElement.dir = t.dir;
        document.documentElement.lang = lang;
    }, [lang, t]);

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
