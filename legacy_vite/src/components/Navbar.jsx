import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { lang, toggleLanguage } = useLanguage();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                background: 'var(--nav-bg)',
                backdropFilter: 'blur(12px)',
                borderRadius: '100px',
                padding: '8px 12px', // Tighter pill shape
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid var(--card-border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
            }}
        >
            <div style={{ width: '40px', height: '40px', background: '#333', borderRadius: '50%', overflow: 'hidden' }}>
                <img src="/profile.jpg" alt="Hazem" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ height: '24px', width: '1px', background: 'var(--card-border)', margin: '0 8px' }}></div>

            <div style={{ display: 'flex', gap: '4px' }}>
                <button
                    onClick={toggleLanguage}
                    style={{
                        background: lang === 'en' ? 'var(--text-color)' : 'transparent',
                        color: lang === 'en' ? 'var(--bg-color)' : 'var(--text-muted)',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease'
                    }}
                >
                    English
                </button>
                <button
                    onClick={toggleLanguage}
                    style={{
                        background: lang === 'ar' ? 'var(--text-color)' : 'transparent',
                        color: lang === 'ar' ? 'var(--bg-color)' : 'var(--text-muted)',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s ease'
                    }}
                >
                    عربي
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;
