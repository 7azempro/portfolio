import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Philosophy = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20%" });

    return (
        <section
            ref={ref}
            style={{
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#050505',
                padding: '2rem'
            }}
        >
            <div style={{ maxWidth: '1000px' }}>
                <motion.p
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        lineHeight: 1.2,
                        color: '#888',
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                    }}
                >
                    I am a Multidisciplinary Product Design Engineer. My work lies at the intersection of
                    <motion.span
                        animate={isInView ? { color: '#fff' } : { color: '#444' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ display: 'inline-block', margin: '0 0.5rem', fontWeight: 600 }}
                    >
                        creative expression
                    </motion.span>
                    and
                    <motion.span
                        animate={isInView ? { color: '#5F7AEA' } : { color: '#444' }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        style={{ display: 'inline-block', margin: '0 0.5rem', fontWeight: 600 }}
                    >
                        engineering precision.
                    </motion.span>
                    I don't just design interfaces; I engineer experiences that feel inevitable.
                </motion.p>
            </div>
        </section>
    );
};

export default Philosophy;
