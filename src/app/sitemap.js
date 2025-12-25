import { getLocalData } from "@/lib/data.server";

export default async function sitemap() {
    const projects = await getLocalData('projects');
    const articles = await getLocalData('articles');
    const baseUrl = 'https://7azem.pro';

    // Static Routes
    const routes = [
        '',
        '/about',
        '/works',
        '/blog',
        '/legal',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Projects
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/works/${project.slug?.current || project.slug}`,
        lastModified: project._updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.9, // High priority for works
    }));

    // Dynamic Articles
    const articleRoutes = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug?.current || article.slug}`,
        lastModified: article._updatedAt || new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [...routes, ...projectRoutes, ...articleRoutes];
}
