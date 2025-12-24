import Link from 'next/link';
import { getLocalData } from "@/lib/data.server";
import { RiCalendarLine } from 'react-icons/ri';

export default async function BlogPage() {
    const articles = await getLocalData('articles');

    return (
        <main className="min-h-screen pt-32 pb-20 container mx-auto px-6 max-w-3xl">
            <h1 className="text-4xl font-bold mb-12">الكتابة والأفكار</h1>

            <div className="space-y-10">
                {articles.map((article) => (
                    <Link key={article._id} href={`/blog/${article.slug.current}`} className="group block border-b border-border pb-10">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                            <RiCalendarLine className="w-4 h-4" />
                            <time>{article.date}</time>
                            <span>•</span>
                            <span>{article.readTime}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                            {article.title}
                        </h2>
                        <p className="text-muted-foreground">
                            {/* Truncate content or add snippet field in sanity later */}
                            Click to read more...
                        </p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
