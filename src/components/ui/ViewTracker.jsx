'use client';

import { useEffect } from 'react';

export default function ViewTracker({ id }) {
    useEffect(() => {
        if (!id) return;

        // Fire and forget - we don't need to wait for the result
        // We use a small timeout to avoid counting rapid bounces or strict strict-mode double fires in dev
        const timer = setTimeout(() => {
            fetch('/api/views', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            }).catch(err => console.error('View tracking failed', err));
        }, 2000); // 2s delay to count as a "view"

        return () => clearTimeout(timer);
    }, [id]);

    return null; // Headless component
}
