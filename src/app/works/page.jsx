'use client';
import Link from 'next/link';
// import { ArrowUpRight } from 'lucide-react'; // Unused
import { motion } from 'framer-motion';

// This is a Client Component now for Animation (Data passed as props or fetched in wrapper - simplification: fetch in client or wrap)
// To keep it clean, I'll allow async server component to pass data to a client list component
// BUT simpler: just make the grid client-side animated items, keeping page server.
// Actually, let's keep page server and just animate the simple way:
// Since I can't import framer-motion in server component directly for 'motion.div', 
// I will create a separate 'WorksGrid' client component.

import WorksGrid from '@/components/works/WorksGrid';
import { getLocalData } from "@/lib/data.server";

export default async function WorksPage() {
    const projects = await getLocalData('projects');

    return (
        <main className="min-h-screen pt-32 pb-20 container mx-auto px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">أعمال ومشاريع مختارة</h1>
            <WorksGrid projects={projects} />
        </main>
    );
}
