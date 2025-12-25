import { getLocalData } from '@/lib/data.server';
import AboutClient from './AboutClient';

export const metadata = {
    title: 'About | Hazem Gamal',
    description: 'Product Design Engineer & UX/UI Designer based in Cairo.'
};

export default async function AboutPage() {
    const aboutData = await getLocalData('about');
    return <AboutClient data={aboutData} />;
}
