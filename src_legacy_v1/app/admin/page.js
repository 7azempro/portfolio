import fs from 'fs';
import path from 'path';

export const metadata = {
    title: 'Admin Dashboard',
};

async function getMessages() {
    const DB_PATH = path.join(process.cwd(), 'src/data/messages.json');
    if (!fs.existsSync(DB_PATH)) return [];

    const content = fs.readFileSync(DB_PATH, 'utf8');
    try {
        return JSON.parse(content);
    } catch {
        return [];
    }
}

export default async function AdminPage() {
    const messages = await getMessages();

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '150px 5vw 60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 700 }}>Dashboard</h1>
                <div style={{ padding: '8px 16px', background: '#22c55e', color: '#000', borderRadius: '50px', fontWeight: 600 }}>
                    Systems Nominal
                </div>
            </div>

            <div style={{ display: 'grid', gap: '20px' }}>
                {messages.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)' }}>No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} style={{
                            padding: '30px',
                            background: 'var(--card-bg)',
                            borderRadius: '16px',
                            border: '1px solid var(--card-border)'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>{msg.name}</h3>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(msg.date).toLocaleDateString()}</span>
                            </div>
                            <div style={{ color: 'var(--accent-color)', marginBottom: '16px', fontSize: '0.9rem' }}>{msg.email}</div>
                            <p style={{ lineHeight: 1.6, color: 'var(--text-muted)' }}>{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
