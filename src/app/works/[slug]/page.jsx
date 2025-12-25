import React from 'react';
import { getLocalData } from '../../../lib/data.server';
import Link from 'next/link';
import { PiArrowLeftLight } from 'react-icons/pi';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const projects = await getLocalData('projects');
    const project = projects.find(p => p.slug === slug);
    return {
        title: project ? `${project.title} | Hazem Gamal` : 'Project Not Found',
    };
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const projects = await getLocalData('projects');
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-4xl text-white/50">Project not found</h1>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[var(--bg-color)]">
            {/* Hero / Header */}
            <div className="pt-32 px-[5vw] pb-20">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
                    <PiArrowLeftLight size={20} />
                    Back to Works
                </Link>

                <h1 className="text-[clamp(3rem,6vw,6rem)] font-bold leading-tight mb-6">
                    {project.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-white/60 text-lg">
                    <span className="px-4 py-1 border border-white/10 rounded-full">{project.category}</span>
                    {/* Dynamically add year or role if available in future data schema */}
                </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-[60vh] bg-gray-800 relative overflow-hidden">
                {/* Use Next/Image in production. For now standard img tag checks basic load */}
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover opacity-80" />
            </div>

            {/* Content */}
            <div className="px-[5vw] py-20 max-w-4xl mx-auto">
                <p className="text-xl leading-relaxed text-white/80">
                    {project.content || project.desc}
                </p>
            </div>
        </article>
    );
}
