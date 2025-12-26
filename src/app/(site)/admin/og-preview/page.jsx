import { getLocalData } from "@/lib/data.server";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { PiDownloadSimple, PiArrowUUpLeft } from "react-icons/pi";

// Force dynamic to ensure we see latest
export const dynamic = 'force-dynamic';

export default async function OgPreviewPage() {
    // Fetch all articles + settings for author image
    const query = `{
        "articles": *[_type == "article"] | order(date desc) { 
            _id, 
            title, 
            title_en, 
            thumbnail { asset-> } 
        },
        "settings": *[_type == "settings"][0] { profileImage { asset-> } }
    }`;

    const { articles, settings } = await client.fetch(query);

    return (
        <main className="min-h-screen bg-background text-foreground p-12 pt-32">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12 flex items-end justify-between border-b border-foreground/10 pb-8">
                    <div>
                        <h1 className="text-4xl font-black uppercase mb-2">OG Image Gallery</h1>
                        <p className="font-mono text-muted-foreground">SYSTEM_GENERATED_ASSETS // PREVIEW_MODE</p>
                    </div>
                    <Link href="/" className="flex items-center gap-2 font-mono text-xs uppercase hover:text-blue-500 transition-colors">
                        <PiArrowUUpLeft className="text-lg" />
                        Back to Site
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {articles.map((article) => {
                        // Construct Dynamic URL
                        const title = article.title_en || article.title;
                        const imageId = article.thumbnail?.asset?._ref;
                        const authorId = settings?.profileImage?.asset?._ref;

                        const ogUrl = `/api/og?title=${encodeURIComponent(title)}&type=ARTICLE&subtitle=READING_ENTRY${imageId ? `&imageId=${imageId}` : ''}${authorId ? `&authorImageId=${authorId}` : ''}`;

                        // Full URL for validity check
                        const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${ogUrl}`;

                        return (
                            <div key={article._id} className="flex flex-col gap-4 group">
                                <div className="border border-foreground/10 rounded-lg overflow-hidden bg-muted aspect-[1200/630] relative shadow-lg group-hover:shadow-blue-500/10 transition-shadow">
                                    <img
                                        src={ogUrl}
                                        alt="OG Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <a
                                            href={ogUrl}
                                            download={`og-${article._id}.png`}
                                            target="_blank"
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-mono text-xs uppercase tracking-widest hover:bg-blue-500 transition-colors"
                                        >
                                            <PiDownloadSimple className="text-lg" />
                                            Open / Save
                                        </a>
                                    </div>
                                </div>
                                <div className="flex justify-between items-start font-mono text-xs text-muted-foreground">
                                    <span className="uppercase tracking-wider truncate max-w-[300px]">{title}</span>
                                    <span className="opacity-50">1200 x 630</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {articles.length === 0 && (
                    <div className="text-center py-20 font-mono text-muted-foreground opacity-50">
                        NO_ARTICLES_FOUND :: INIT_CREATION
                    </div>
                )}
            </div>
        </main>
    );
}
