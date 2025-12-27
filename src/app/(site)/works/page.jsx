import WorksGrid from '@/components/works/WorksGrid';
import { getLocalData } from "@/lib/data.server";
import { Metadata } from 'next';

export const metadata = {
    title: 'Works | الأعمال - Hazem Gamal',
    description: 'Portfolio of Web Design & Development Projects | معرض المشاريع',
    alternates: {
        canonical: '/works'
    }
};

export default async function WorksPage() {
    const projects = await getLocalData('projects');
    const settings = await getLocalData('hero'); // Home Config contains section headers

    return (
        <main className="min-h-screen bg-background">
            <WorksHeader settings={settings} />
            <div className="container mx-auto px-6 pb-20">
                <WorksGrid projects={projects} />
            </div>
        </main>
    );
}

// Client Component for Header Localization
import WorksHeader from '@/components/works/WorksHeader';
