import React from 'react';
import Dashboard from '../../components/admin/Dashboard';

export const metadata = {
    title: 'Admin | 7azempro',
    robots: 'noindex'
};

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-black text-white p-8">
            <h1 className="text-3xl font-bold mb-8">CMS Dashboard</h1>
            <Dashboard />
        </main>
    );
}
