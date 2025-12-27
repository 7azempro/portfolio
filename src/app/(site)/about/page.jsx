import { getLocalData } from '@/lib/data.server';
import AboutClient from './AboutClient';

export const metadata = {
    title: 'About | عني - Hazem Gamal',
    description: 'Product Design Engineer & UX/UI Designer | مهندس تصميم وتجربة المستخدم'
};

export default async function AboutPage() {
    const aboutData = await getLocalData('about');
    return <AboutClient data={aboutData} />;
}
