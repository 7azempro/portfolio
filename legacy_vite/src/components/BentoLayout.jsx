import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

const Card = ({ children, className = "", style = {}, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={className}
            style={{
                background: 'var(--card-bg)',
                borderRadius: '24px',
                padding: '40px',
                border: '1px solid var(--card-border)',
                overflow: 'hidden',
                position: 'relative',
                ...style
            }}
        >
            {children}
        </motion.div>
    );
};

const BentoLayout = () => {
    const { t, lang } = useLanguage();

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '120px 5vw 40px', // Top padding for navbar
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        }}>

            {/* ROW 1: Hero Typography (Right aligned in AR) */}
            <section style={{ marginBottom: '40px', minHeight: '40vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: 'clamp(3rem, 7vw, 6rem)',
                        lineHeight: 1.1,
                        fontWeight: 700,
                        color: 'var(--text-color)',
                        marginBottom: '24px',
                        maxWidth: '90%'
                    }}
                >
                    {t.hero.title} <br />
                    <span style={{ color: 'var(--accent-color)' }}>{t.hero.subtitle}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-muted)',
                        maxWidth: '600px',
                        lineHeight: 1.6
                    }}
                >
                    {t.hero.desc}
                </motion.p>
            </section>

            {/* ROW 2: The "Three Small Cards" Grid */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {/* Services/Booking Card */}
                <Card delay={0.1}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <ArrowUpRight size={32} color="var(--accent-color)" />
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{lang === 'ar' ? 'اعمل معي' : 'Work with me'}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>{t.contact.email}</p>
                        </div>
                    </div>
                </Card>

                {/* Process/Articles Card */}
                <Card delay={0.2} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ opacity: 0.8 }}>04 Steps</div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{t.process.title}</h3>
                            <p style={{ opacity: 0.9 }}>Discover -> Deliver</p>
                        </div>
                    </div>
                </Card>

                {/* About/Socials Card */}
                <Card delay={0.3}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '-10px' }}>
                            {/* Small avatars or icons could go here */}
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#333' }}></div>
                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#555', marginLeft: '-15px' }}></div>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{t.contact.socials}</h3>
                            <p style={{ color: 'var(--text-muted)' }}>LinkedIn, X, GitHub</p>
                        </div>
                    </div>
                </Card>
            </section>

            {/* ROW 3: Large Featured Card */}
            <Card delay={0.4} style={{ minHeight: '500px', padding: '0', display: 'flex', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--accent-color)', marginBottom: '16px', fontWeight: 600 }}>FEATURED CASE STUDY</span>
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>Fintech Dashboard <br /> Redesign</h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '400px' }}>
                        {t.work.items[0].problem}
                    </p>
                    <button style={{
                        alignSelf: 'flex-start',
                        padding: '16px 32px',
                        borderRadius: '50px',
                        background: 'var(--text-color)',
                        color: 'var(--bg-color)',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                    }}>
                        {t.work.view_btn}
                    </button>
                </div>
                <div style={{ flex: 1, background: '#1a1a2e', position: 'relative' }}>
                    {/* Image Placeholder */}
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'linear-gradient(45deg, #1a1a2e, #5F7AEA)' }}></div>
                </div>
            </Card>

            {/* ROW 4: 2-Column Grid */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px'
            }}>
                {/* Secondary Project 1 */}
                <Card delay={0.5} style={{ minHeight: '400px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Design System</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{t.work.items[1].solution}</p>
                    <div style={{ width: '100%', height: '200px', background: '#e0e0e0', borderRadius: '12px' }}></div>
                </Card>

                {/* Secondary Project 2 (or Playground) */}
                <Card delay={0.6} style={{ minHeight: '400px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Playground</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Experimental labs.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ aspectRatio: '1', background: 'var(--bg-color)', borderRadius: '8px' }}></div>
                        <div style={{ aspectRatio: '1', background: 'var(--bg-color)', borderRadius: '8px' }}></div>
                    </div>
                </Card>
            </section>

            {/* Simple Footer */}
            <footer style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>© 2025 Hazem Gamal.</p>
            </footer>

        </div>
    );
};

export default BentoLayout;
