import React from 'react';
import { getLocalData } from '../../../../lib/data.server';
import Link from 'next/link';
import { PiArrowLeftLight, PiArrowUpRightLight, PiFiles, PiCalendarBlank, PiUser, PiDiamondsFour, PiEye } from 'react-icons/pi';
import SmartCompass from '@/components/ui/SmartCompass';
import ViewTracker from '@/components/ui/ViewTracker';
import millify from 'millify';
import { urlFor } from '@/sanity/lib/image';
import { getSafeImage } from '@/lib/constants';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const projects = await getLocalData('projects');
    const project = projects.find(p => p.slug === slug || p.slug?.current === slug);

    if (!project) return { title: 'Project Not Found | 7azempro' };

    const seo = project.seo || {};
    const title = seo.metaTitle || project.title_en || project.title;
    const description = seo.metaDesc || project.desc_en || project.desc || "";

    const image = seo.seoImage ? urlFor(seo.seoImage).width(1200).height(630).url() :
        getSafeImage(project.thumbnail);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            images: [{ url: image, width: 1200, height: 630 }],
            url: seo.canonicalUrl || undefined
        },
        alternates: {
            canonical: seo.canonicalUrl || `/works/${project.slug?.current || project.slug || slug}`
        }
    };
}

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const projects = await getLocalData('projects');
    const project = projects.find(p => p.slug === slug || p.slug?.current === slug);

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[85vh] p-8 text-center space-y-8 relative overflow-hidden bg-[#050505] text-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <h1 className="text-[120px] sm:text-[180px] font-black leading-none opacity-5 select-none font-mono tracking-tighter">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/5">
                            <span className="font-mono text-xl font-bold tracking-widest text-white">NULL</span>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 max-w-lg relative z-10">
                    <h2 className="text-3xl font-bold tracking-tight">Project Declassified</h2>
                    <p className="text-white/60 leading-relaxed">
                        This blueprint is restricted or has been archived. Check your clearance level or try another sector.
                    </p>
                </div>
                <SmartCompass />
            </div>
        );
    }

    // Helper for localized fields (prefer English for UI consistency in this theme, or fallback)
    // In a real bilingual setup we might check a context, but here we enforce 'Swiss' technical English look primarily,
    // or fall back to Arabic content if that's all that exists.
    const title = project.title_en || project.title;
    const desc = project.desc_en || project.desc;
    const category = project.category_en || project.category || 'SYSTEM';
    const challenge = project.challenge_en || project.challenge;
    const solution = project.solution_en || project.solution;

    // Dates
    const year = project.year || '2025';
    const role = project.role || 'Full Stack Engineer';

    return (
        <article className="min-h-screen bg-background text-foreground relative overflow-hidden">
            {/* Swiss Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-foreground/10 z-50 flex items-center px-6 md:px-12 justify-between">
                <Link href="/works" className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-blue-500 transition-colors group">
                    <PiArrowLeftLight className="text-sm" />
                    <span>Back to Index</span>
                </Link>
                <div className="hidden md:flex items-center gap-2 font-mono text-[10px] text-muted-foreground uppercase tracking-widest opacity-50">
                    <span>PROJECT_ID :: {project._id?.slice(0, 8)}</span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                </div>
            </div>

            <div className="pt-32 pb-20 container mx-auto px-6 relative z-10">

                {/* HERO SECTION */}
                <div className="mb-20">
                    <div className="flex flex-col gap-6 mb-12">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 border border-blue-500/30 bg-blue-500/10 text-blue-500 text-[10px] font-mono uppercase tracking-widest rounded-sm">
                                {category}
                            </span>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                                    <span>Live Deployment</span>
                                    <PiArrowUpRightLight />
                                </a>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                            {title}
                        </h1>
                    </div>

                    {/* Industrial Data Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-foreground/10 bg-background/50 backdrop-blur-sm">

                        {/* Cell 1: Role */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">
                                <PiUser className="text-lg opacity-50" />
                                <span>Role</span>
                            </div>
                            <span className="font-bold text-sm uppercase">{role}</span>
                        </div>

                        {/* Cell 2: Year */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">
                                <PiCalendarBlank className="text-lg opacity-50" />
                                <span>Timeline</span>
                            </div>
                            <span className="font-bold text-sm uppercase">{year}</span>
                        </div>

                        {/* Cell 3: Tech Count */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">
                                <PiFiles className="text-lg opacity-50" />
                                <span>Stack</span>
                            </div>
                            <span className="font-bold text-sm uppercase">{project.techStack?.length || 0} Modules</span>
                        </div>

                        {/* Cell 4: Views */}
                        <div className="p-4 md:p-6 border-r border-b border-foreground/10 flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[9px] text-muted-foreground uppercase tracking-widest">
                                <PiEye className="text-lg opacity-50" />
                                <span>Views</span>
                            </div>
                            <span className="font-bold text-sm uppercase">{millify(project.views || 0)}</span>
                        </div>

                        {/* Cell 5: Status (Moved to next row or kept if grid adjustments needed) */}
                        <div className="p-6 border-r border-b border-foreground/10 flex flex-col gap-2 lg:col-span-4 lg:border-t lg:border-b-0 place-items-center flex-row justify-center">
                            <div className="flex items-center gap-2 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                                <PiDiamondsFour className="text-lg opacity-50" />
                                <span>System Status ::</span>
                            </div>
                            <span className="font-bold text-sm uppercase text-green-500">Online / Shipped</span>
                        </div>
                    </div>
                </div>

                <ViewTracker id={project._id} />

                {/* MAIN VISUAL */}
                <div className="mb-24 relative group rounded-sm overflow-hidden border border-foreground/10 bg-muted">
                    <div className="aspect-video w-full relative">
                        <img
                            src={getSafeImage(project.thumbnail)}
                            alt={title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                    </div>
                    {/* Overlay UI */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end border-t border-white/10">
                        <div className="font-mono text-[10px] text-white/70 uppercase tracking-widest">
                            SYS_VISUAL :: MAIN_VIEW
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* Left: Description & Tech */}
                    <div className="lg:col-span-4 flex flex-col gap-12">
                        {/* Description */}
                        <div>
                            <h3 className="font-mono text-xs text-blue-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500" />
                                Executive Summary
                            </h3>
                            <p className="text-lg leading-relaxed text-muted-foreground">
                                {desc}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        {project.techStack?.length > 0 && (
                            <div>
                                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-6 border-t border-foreground/10 pt-6">
                                    Technical Architecture
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <div key={i} className="px-3 py-1.5 border border-foreground/10 bg-foreground/5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:border-blue-500 hover:text-blue-500 transition-colors cursor-default">
                                            {tech.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-col gap-3 pt-6 border-t border-foreground/10">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-foreground/10 hover:bg-foreground hover:text-background transition-all group/link">
                                    <span className="font-bold text-sm uppercase tracking-wide">Launch Project</span>
                                    <PiArrowUpRightLight className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            )}
                            {project.repo && (
                                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 border border-foreground/10 hover:bg-foreground hover:text-background transition-all group/link">
                                    <span className="font-bold text-sm uppercase tracking-wide">Source Code</span>
                                    <PiFiles className="group-hover/link:scale-110 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Case Study (STAR) */}
                    <div className="lg:col-span-8">
                        {/* Challenge */}
                        {challenge && (
                            <div className="mb-16">
                                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4 opacity-50">01 // The Problem</div>
                                <h2 className="text-3xl font-bold uppercase tracking-tight mb-6">Challenge</h2>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-loose">
                                    <p>{challenge}</p>
                                </div>
                            </div>
                        )}

                        {/* Solution */}
                        {solution && (
                            <div className="mb-16">
                                <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4 opacity-50">02 // The Execution</div>
                                <h2 className="text-3xl font-bold uppercase tracking-tight mb-6">Solution</h2>
                                <div className="prose prose-invert max-w-none text-muted-foreground leading-loose">
                                    <p>{solution}</p>
                                </div>
                            </div>
                        )}

                        {/* Fallback if no star content */}
                        {!challenge && !solution && (
                            <div className="p-12 border border-dashed border-foreground/10 flex flex-col items-center justify-center text-center">
                                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Classified Data</div>
                                <p className="text-muted-foreground/50 max-w-md">Detailed case study data is currently unavailable for this legacy project.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* GALLERY GRID */}
                {project.gallery?.length > 0 && (
                    <div className="mt-32 border-t border-foreground/10 pt-20">
                        <div className="flex items-end justify-between mb-12">
                            <h2 className="text-4xl font-bold uppercase tracking-tight">System Gallery</h2>
                            <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                                IMG_COUNT :: {project.gallery.length}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {project.gallery.map((img, i) => (
                                <div key={i} className="group relative aspect-[4/3] bg-muted border border-foreground/10 overflow-hidden">
                                    <img
                                        src={urlFor(img).width(1200).url()}
                                        alt={`Gallery ${i}`}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                                    <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 backdrop-blur text-[9px] font-mono text-white/80 border border-white/10 uppercase tracking-widest">
                                        FIG_0{i + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </article>
    );
}
