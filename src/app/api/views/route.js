import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN, // Requires Write Access
    useCdn: false,
    apiVersion: '2024-01-01',
});

export async function POST(req) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        // Atomic increment
        const result = await client
            .patch(id)
            .setIfMissing({ views: 0 })
            .inc({ views: 1 })
            .commit();

        return NextResponse.json({ views: result.views });
    } catch (error) {
        console.error('Sanity View Increment Error:', error);
        return NextResponse.json({ error: 'Failed to increment view' }, { status: 500 });
    }
}
