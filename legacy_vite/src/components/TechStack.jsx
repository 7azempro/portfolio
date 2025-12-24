import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './TechStack.module.css';

const TechStack = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });

    // Transform scroll vertical progress into horizontal x movement
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    const tools = [
        { name: "React", desc: "My UI Library of choice" },
        { name: "Typescript", desc: "For robust applications" },
        { name: "Framer Motion", desc: "Animation power" },
        { name: "Node.js", desc: "Backend logic" },
        { name: "Figma", desc: "Design & Prototyping" },
        { name: "Three.js", desc: "3D Experiences" },
    ];

    return (
        <section ref={targetRef} className={styles.scrollSection}>
            <div className={styles.stickyWrapper}>
                <h2 className={styles.sectionTitle}>Technical Arsenal</h2>
                <motion.div style={{ x }} className={styles.cardContainer}>
                    {tools.map((tool, i) => (
                        <div key={i} className={styles.card}>
                            <h3>{tool.name}</h3>
                            <p>{tool.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TechStack;
