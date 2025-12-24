import React from 'react';

const Playground = () => {
    return (
        <section style={{ padding: '10vh 5vw', background: 'var(--bg-color)', color: 'var(--text-color)' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Playground</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Experiments with Motion, 3D, and Code.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{
                        aspectRatio: '1/1',
                        background: 'var(--card-bg)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--card-border)'
                    }}>
                        <span style={{ color: 'var(--text-muted)' }}>Exp {i}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Playground;
