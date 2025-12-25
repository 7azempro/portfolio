import { getLocalData } from "@/lib/data.server";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProjectSlider from "@/components/home/ProjectSlider";
import TechStack from "@/components/home/TechStack";
import Insights from "@/components/home/Insights";

export default async function Home() {
    const heroData = await getLocalData('hero');
    const servicesData = await getLocalData('services');
    const techData = await getLocalData('tech');
    console.log('[Server] Tech Data:', techData.length > 0 ? techData.length + ' items' : 'Empty');
    const projectData = await getLocalData('projects');

    return (
        <main className="min-h-screen">
            <Hero data={heroData} />

            <TechStack data={techData} />

            {/* Services Grid */}
            <div id="services">
                <ServicesGrid services={servicesData} />
            </div>

            {/* Projects Slider */}
            <ProjectSlider projects={projectData} />

            {/* Insights / Articles */}
            <Insights articles={await getLocalData('articles')} />


        </main>
    );
}
