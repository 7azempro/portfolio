import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();

    return (
        <footer style={{ padding: '10vh 5vw', background: 'var(--bg-color)', color: 'var(--text-color)', borderTop: '1px solid var(--card-border)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '2rem' }}>{t.contact.title}</h2>
                <a href="mailto:contact@hazemgamal.com" style={{ fontSize: '1.5rem', color: 'var(--accent-color)', textDecoration: 'none', marginBottom: '3rem' }}>
                    {t.contact.email} ↗
                </a>

                <div style={{ display: 'flex', gap: '2rem' }}>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Twitter</a>
                    <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
                </div>

                <p style={{ marginTop: '5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>© 2025 Hazem Gamal.</p>
            </div>
        </footer>
    );
};

export default Contact;
