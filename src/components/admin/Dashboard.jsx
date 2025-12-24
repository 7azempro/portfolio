'use client';

import React, { useState, useEffect } from 'react';
import { saveContent, fetchContent } from '../../app/actions';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('hero');
    const [data, setData] = useState(null);
    const [status, setStatus] = useState('');

    const [textValue, setTextValue] = useState('');

    useEffect(() => {
        loadData(activeTab);
    }, [activeTab]);

    async function loadData(key) {
        const content = await fetchContent(key);
        setData(content);
        setTextValue(JSON.stringify(content, null, 2));
        setStatus('');
    }

    async function handleSave() {
        setStatus('Saving...');
        try {
            const parsed = JSON.parse(textValue);
            const res = await saveContent(activeTab, parsed);
            if (res.success) setStatus('Saved!');
            else setStatus('Error: ' + res.error);
        } catch (e) {
            setStatus('Invalid JSON!');
        }
    }

    if (!data) return <div>Loading...</div>;

    return (
        <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-48 flex flex-col gap-2">
                {['hero', 'projects', 'articles', 'bento'].map(key => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`text-left px-4 py-2 rounded ${activeTab === key ? 'bg-blue-600' : 'hover:bg-white/10'}`}
                    >
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                ))}
            </div>

            {/* Editor */}
            <div className="flex-1 bg-white/5 p-6 rounded-xl">
                <div className="flex justify-between mb-6">
                    <h2 className="text-xl font-bold">Editing: {activeTab}</h2>
                    <div className="flex gap-4 items-center">
                        <span className={status === 'Invalid JSON!' ? 'text-red-500' : 'text-green-400'}>{status}</span>
                        <button onClick={handleSave} className="bg-green-600 px-6 py-2 rounded hover:bg-green-500">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* JSON Editor Fallback for V2 (Rapid Prototyping) */}
                    <textarea
                        className="w-full h-[60vh] bg-black/50 font-mono text-sm p-4 rounded border border-white/10 focus:outline-none focus:border-blue-500"
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    />

                    {/* Note: A proper form builder would map the object keys. 
                        For now, raw JSON editing is the most powerful "Developer Admin" 
                        feature requested by power users. */}
                    <p className="text-white/40 text-sm">
                        * Edit the JSON directly. Be careful with syntax.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
