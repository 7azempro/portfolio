import Link from 'next/link';
import { getSortedArticlesData } from '@/lib/articles';
import { ArrowUpRight } from 'lucide-react';

export const metadata = {
    title: 'Articles | Hazem Gamal',
    description: 'Thoughts on product design, engineering, and systems.',
};

export default function Blog() {
    const allArticles = getSortedArticlesData();

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '150px 5vw 60px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '60px', fontWeight: 700 }}>
                Writing.
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
                {allArticles.map(({ id, title, date, excerpt, tags }) => (
                    <Link key={id} href={`/blog/${id}`} style={{ display: 'block' }}>
                        <article style={{
                            padding: '40px',
                            background: 'var(--card-bg)',
                            borderRadius: '24px',
                            border: '1px solid var(--card-border)',
                            height: '100%',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'flex-start' }}>
                                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{date}</span>
                                <ArrowUpRight size={20} color="var(--text-muted)" />
                            </div>

                            <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', lineHeight: 1.3 }}>{title}</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>{excerpt}</p>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                {tags?.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '0.8rem',
                                        padding: '6px 12px',
                                        background: 'rgba(127,127,127, 0.1)',
                                        borderRadius: '50px',
                                        color: 'var(--text-muted)'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}
