'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '../providers/LanguageProvider';
import { ArrowUpRight, Linkedin, Github, Twitter, Palette, MessageCircle } from 'lucide-react';

const SocialIcon = ({ name, size = 20 }) => {
    switch (name) {
        case 'LinkedIn': return <Linkedin size={size} />;
        case 'لينكد إن': return <Linkedin size={size} />;
        case 'GitHub': return <Github size={size} />;
        case 'جيت هب': return <Github size={size} />;
        case 'X (Twitter)': return <Twitter size={size} />;
        case 'تويتر': return <Twitter size={size} />;
        case 'اكس': return <Twitter size={size} />;
        case 'Behance': return <Palette size={size} />;
        case 'بيهانس': return <Palette size={size} />;
        case 'WhatsApp': return <MessageCircle size={size} />;
        case 'واتساب': return <MessageCircle size={size} />;
        default: return <ArrowUpRight size={size} />;
    }
};

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
                <Link href="/contact" style={{ display: 'contents' }}>
                    <Card delay={0.1}>
                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                            <ArrowUpRight size={32} color="var(--accent-color)" />
                            <div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{t.hero.connect}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>{t.nav.contact}</p>
                            </div>
                        </div>
                    </Card>
                </Link>

                {/* Process/Articles Card */}
                <Card delay={0.2} style={{ background: 'var(--accent-color)', color: '#fff', border: 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div style={{ opacity: 0.8 }}>{t.process.step_count}</div>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{t.process.title}</h3>
                            <p style={{ opacity: 0.9 }}>{t.process.subtitle}</p>
                        </div>
                    </div>
                </Card>

                {/* About/Socials Card */}
                <Card delay={0.3}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{t.contact.socials_label}</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            {t.contact.social_links && t.contact.social_links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: 'var(--text-muted)',
                                        transition: 'color 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px',
                                        border: '1px solid var(--card-border)',
                                        borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.03)'
                                    }}
                                >
                                    <SocialIcon name={link.name} size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </Card>
            </section>

            {/* ROW 3: Large Featured Card */}
            <Card delay={0.4} style={{ minHeight: '500px', padding: '0', display: 'flex', flexDirection: lang === 'ar' ? 'row-reverse' : 'row' }}>
                <div style={{ flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ color: 'var(--accent-color)', marginBottom: '16px', fontWeight: 600 }}>{t.work.featured_label}</span>
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
                        cursor: 'pointer'
                    }}>
                        {t.work.view_btn}
                    </button>
                </div>
                <div style={{ flex: 1, background: '#1a1a2e', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, opacity: 0.3, background: 'linear-gradient(45deg, #1a1a2e, #5F7AEA)' }}></div>
                </div>
            </Card>

            {/* ROW 4: 2-Column Grid */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '24px'
            }}>
                <Card delay={0.5} style={{ minHeight: '400px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>{t.work.items[1].title}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{t.work.items[1].solution}</p>
                    <div style={{ width: '100%', height: '200px', background: '#e0e0e0', borderRadius: '12px' }}></div>
                </Card>

                <Card delay={0.6} style={{ minHeight: '400px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>{t.playground.title}</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>{t.playground.desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ aspectRatio: '1', background: 'var(--bg-color)', borderRadius: '8px' }}></div>
                        <div style={{ aspectRatio: '1', background: 'var(--bg-color)', borderRadius: '8px' }}></div>
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
