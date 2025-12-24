import ContactForm from '@/components/ContactForm';

export const metadata = {
    title: 'Contact | Hazem Gamal',
    description: 'Get in touch for collaborations.',
};

export default function ContactPage() {
    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '150px 5vw 60px' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '20px', fontWeight: 700 }}>
                Let's Talk.
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '60px', maxWidth: '600px' }}>
                Interested in working together? Drop me a message properly labeled in my database.
            </p>

            <ContactForm />
        </div>
    );
}
