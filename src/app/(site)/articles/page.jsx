import { getLocalData } from '@/lib/data.server';
import ArticlesView from './ArticlesView';

export const metadata = {
    title: 'Articles',
    description: 'Thoughts on Engineering, Design, and Systems.',
};

export default async function ArticlesPage() {
    const articles = await getLocalData('articles') || [];
    return <ArticlesView articles={articles} />;
}
