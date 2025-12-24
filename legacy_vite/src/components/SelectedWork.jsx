import React from 'react';
import styles from './SelectedWork.module.css';

const projects = [
    { id: 1, title: 'E-Commerce Redesign', category: 'Product Design', color: '#1a1a1a' },
    { id: 2, title: 'Fintech Dashboard', category: 'UX Engineering', color: '#101010' },
    { id: 3, title: 'AI Chat Interface', category: 'Frontend Dev', color: '#0a0a0a' },
];

const SelectedWork = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <h2>Selected Works</h2>
                <p>(2023 - 2025)</p>
            </div>

            <div className={styles.projectList}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.projectItem} style={{ background: project.color }}>
                        <div className={styles.projectContent}>
                            <p className={styles.category}>{project.category}</p>
                            <h3 className={styles.title}>{project.title}</h3>
                        </div>
                        {/* Image Placeholder - Full Width */}
                        <div className={styles.imagePlaceholder}>
                            {/* Replace with actual project images later */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SelectedWork;
