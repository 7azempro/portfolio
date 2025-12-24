'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../providers/LanguageProvider';
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
            padding: '120px 5vw 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
        }}>

            {/* ROW 1: Hero Typography */}
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
                            <p style={{ opacity: 0.9 }}>Discover to Deliver</p>
                        </div>
                    </div>
                </Card>

                {/* About/Socials Card */}
                <Card delay={0.3}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '-10px' }}>
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

            {/* ROW 3: Large Featured Card (Tesla Arabic) */}
            <Card delay={0.4} style={{ minHeight: '500px', padding: '0', display: 'flex', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--accent-color)', marginBottom: '16px', fontWeight: 600 }}>FEATURED PROJECT</span>
                    <h2 style={{ fontSize: '3rem', marginBottom: '24px', lineHeight: 1.1 }}>{t.work.items[0].title}</h2>
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
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                    }}>
                        {t.work.view_btn}
                    </button>
                </div>
                <div style={{ flex: 1, background: '#1a1a2e', position: 'relative', overflow: 'hidden' }}>
                    {/* Abstract Visual for Tesla */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(135deg, #cc0000 0%, #000 100%)',
                        opacity: 0.8
                    }}></div>
                    <div style={{ position: 'absolute', bottom: '40px', right: '40px', fontSize: '8rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)' }}>
                        T
                    </div>
                </div>
            </Card>

            {/* ROW 4: Experience & Skills */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px'
            }}>
                {/* Experience Card */}
                <Card delay={0.5} style={{ minHeight: '400px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '24px' }}>{t.experience.title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {t.experience.items.map((item, i) => (
                            <div key={i} style={{ borderLeft: '2px solid var(--card-border)', paddingLeft: '20px' }}>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.role}</h4>
                                <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '4px' }}>{item.company}</div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{item.date}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Skills & Stack Card */}
                <Card delay={0.6} style={{ minHeight: '400px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '24px' }}>{t.skills.title}</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {t.skills.list.map((skill, i) => (
                            <span key={i} style={{
                                padding: '8px 16px',
                                borderRadius: '50px',
                                background: 'var(--bg-color)',
                                border: '1px solid var(--card-border)',
                                fontSize: '0.9rem',
                                color: 'var(--text-muted)'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </Card>
            </section>

            {/* Footer */}
            <footer style={{ marginTop: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>© 2025 Hazem Gamal.</p>
            </footer>

        </div>
    );
};

export default BentoLayout;
