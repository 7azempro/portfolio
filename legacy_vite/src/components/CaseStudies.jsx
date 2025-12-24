import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const colors = ["#1a1a2e", "#16213e"];

const CaseStudies = () => {
    const { t } = useLanguage();

    return (
        <section id="work" style={{ padding: '10vh 5vw', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '4rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '2rem' }}>{t.work.title}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
                {t.work.items.map((study, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        {/* Text Side */}
                        <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                            <span style={{ color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>{study.role}</span>
                            <h3 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{study.title}</h3>

                            <div style={{ margin: '2rem 0', padding: '2rem', borderLeft: document.dir === 'rtl' ? 'none' : '2px solid var(--card-border)', borderRight: document.dir === 'rtl' ? '2px solid var(--card-border)' : 'none' }}>
                                <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-color)' }}>{t.work.context}</strong> {study.problem}</p>
                                <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}><strong style={{ color: 'var(--text-color)' }}>{t.work.solution}</strong> {study.solution}</p>
                                <p style={{ color: 'var(--accent-color)' }}><strong style={{ color: 'var(--text-color)' }}>{t.work.impact}</strong> {study.impact}</p>
                            </div>

                            <button style={{ background: 'transparent', border: '1px solid var(--text-color)', padding: '12px 24px', color: 'var(--text-color)', borderRadius: '30px', cursor: 'pointer' }}>{t.work.view_btn}</button>
                        </div>

                        {/* Visual Side */}
                        <motion.div
                            style={{
                                order: i % 2 === 0 ? 2 : 1,
                                height: '400px',
                                background: 'var(--card-bg)', // Use fluid bg
                                border: '1px solid var(--card-border)',
                                borderRadius: '24px', // Softer radius
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {/* Placeholder for project image */}
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', fontWeight: 900, opacity: 0.1, color: 'var(--text-color)' }}>
                                {i + 1}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CaseStudies;
