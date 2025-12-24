'use client';

import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/actions/contact';
import { useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                padding: '16px 32px',
                borderRadius: '50px',
                background: pending ? 'var(--text-muted)' : 'var(--accent-color)',
                color: '#fff',
                border: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: pending ? 'not-allowed' : 'pointer',
                width: '100%',
                marginTop: '16px'
            }}
        >
            {pending ? 'Sending...' : 'Send Message'}
        </button>
    );
}

export default function ContactForm() {
    const [state, setState] = useState(null);

    async function handleSubmit(formData) {
        const result = await submitContactForm(formData);
        setState(result);
    }

    return (
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
            {state?.success && (
                <div style={{ padding: '16px', background: 'rgba(0, 255, 0, 0.1)', color: '#00ff00', borderRadius: '8px' }}>
                    {state.message}
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Name</label>
                <input
                    name="name"
                    required
                    type="text"
                    style={{
                        padding: '16px',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '12px',
                        color: 'var(--text-color)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</label>
                <input
                    name="email"
                    required
                    type="email"
                    style={{
                        padding: '16px',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '12px',
                        color: 'var(--text-color)',
                        fontSize: '1rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Message</label>
                <textarea
                    name="message"
                    required
                    rows="5"
                    style={{
                        padding: '16px',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '12px',
                        color: 'var(--text-color)',
                        fontSize: '1rem',
                        resize: 'vertical'
                    }}
                />
            </div>

            <SubmitButton />
        </form>
    );
}
