import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const LanguageToggle = () => {
    const { lang, toggleLanguage } = useLanguage();

    return (
        <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
                position: 'fixed',
                top: '20px',
                right: lang === 'en' ? '20px' : 'auto',
                left: lang === 'ar' ? '20px' : 'auto', // Swap position based on direction so it stays in "top-corner" relative to reading direction? Or keep it fixed?
                // Actually, let's keep it fixed top-right visually to be distinct or maybe let it float.
                // Let's stick to fixed top-right for consistency, regardless of RTL
                right: '30px',
                left: 'auto',
                zIndex: 9999,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '30px',
                padding: '8px 16px',
                color: '#fff',
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <span style={{ opacity: lang === 'en' ? 1 : 0.5 }}>EN</span>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ opacity: lang === 'ar' ? 1 : 0.5, fontFamily: 'Cairo, sans-serif' }}>عربي</span>
        </motion.button>
    );
};

export default LanguageToggle;
