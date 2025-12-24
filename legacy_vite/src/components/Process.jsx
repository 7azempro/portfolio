import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Process = () => {
    const { t } = useLanguage();

    return (
        <section style={{ padding: '10vh 5vw', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>{t.process.title}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                {t.process.steps.map((step, i) => (
                    <div key={i} style={{ borderTop: '1px solid var(--text-muted)', paddingTop: '2rem' }}>
                        <span style={{ fontSize: '3rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block', marginBottom: '1rem' }}>0{i + 1}</span>
                        <h4 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{step.title}</h4>
                        <p style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Process;
