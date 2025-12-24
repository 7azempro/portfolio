import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero = () => {
    const { t, lang } = useLanguage();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <section ref={ref} style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5vw', background: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
            <motion.div style={{ y, zIndex: 10 }}>
                <motion.h1
                    key={lang}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 1.1, margin: 0, color: 'var(--text-color)', fontWeight: 800 }}
                >
                    {t.hero.title} <br />
                    <span style={{ color: 'var(--accent-color)' }}>{t.hero.subtitle}</span>
                </motion.h1>
                <motion.p
                    key={lang + 'desc'}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginTop: '2rem' }}
                >
                    Hazem Gamal / {t.role}. <br />
                    {t.hero.desc}
                </motion.p>
                <motion.div
                    key={lang + 'cta'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    style={{ marginTop: '3rem', display: 'flex', gap: '20px' }}
                >
                    <a href="#work" style={{ padding: '15px 30px', background: 'var(--text-color)', color: 'var(--bg-color)', borderRadius: '30px', textDecoration: 'none', fontWeight: 600 }}>{t.hero.cta_case}</a>
                    <a href="#about" style={{ padding: '15px 30px', border: '1px solid var(--card-border)', color: 'var(--text-color)', borderRadius: '30px', textDecoration: 'none' }}>{t.hero.cta_about}</a>
                </motion.div>
            </motion.div>

            {/* Background Texture/Grid could go here */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', opacity: 0.1, background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        </section>
    );
};

export default Hero;
