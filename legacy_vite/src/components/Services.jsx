import React from 'react';
import { motion } from 'framer-motion';
import { Code, PenTool, Layers } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const icons = [<PenTool size={32} />, <Code size={32} />, <Layers size={32} />];
const stacks = [
    ["Figma", "Protopie", "User Testing"],
    ["React", "TypeScript", "Tailwind", "Storybook"],
    ["Tokens", "Documentation", "Governance"]
];

const Services = () => {
    const { t } = useLanguage();

    return (
        <section style={{ padding: '10vh 5vw', background: 'var(--bg-color)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ color: 'var(--text-color)' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>{t.services.title}</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>{t.services.subtitle}</p>
                </div>
                {t.services.items.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{
                            padding: '2rem',
                            border: '1px solid var(--card-border)',
                            borderRadius: '16px', // MoeDesigns style
                            background: 'var(--card-bg)',
                            color: 'var(--text-color)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' // Subtle shadow
                        }}
                    >
                        <div style={{ color: 'var(--accent-color)', marginBottom: '1.5rem' }}>{icons[i]}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{s.title}</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>{s.desc}</p>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            {stacks[i].map(tech => (
                                <span key={tech} style={{
                                    fontSize: '0.8rem',
                                    padding: '6px 12px',
                                    background: 'rgba(127, 127, 127, 0.1)',
                                    borderRadius: '20px',
                                    color: 'var(--text-muted)'
                                }}>{tech}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Services;
