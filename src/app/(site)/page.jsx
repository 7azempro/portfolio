import { getLocalData } from "@/lib/data.server";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProjectSlider from "@/components/home/ProjectSlider";
import TechStack from "@/components/home/TechStack";
import Insights from "@/components/home/Insights";
import StatsSection from "@/components/home/StatsSection";

export default async function Home() {
    const heroData = await getLocalData('hero');
    const servicesData = await getLocalData('services');
    const techData = await getLocalData('tech');
    console.log('[Server] Tech Data:', techData.length > 0 ? techData.length + ' items' : 'Empty');
    // Fetch most viewed projects for the slider
    const projectData = await getLocalData('popular_projects');
    const aboutData = await getLocalData('about');
    const aggregatedStats = await getLocalData('stats_aggregated');

    return (
        <main className="min-h-screen">
            <Hero data={heroData} />

            <StatsSection stats={aboutData?.stats} liveStats={aggregatedStats} />

            <TechStack data={techData} />

            {/* Services Grid */}
            <div id="services">
                <ServicesGrid services={servicesData} settings={heroData} />
            </div>

            {/* Projects Slider */}
            <ProjectSlider projects={projectData} settings={heroData} />

            {/* Insights / Articles */}
            <Insights
                articles={await getLocalData('popular_articles')}
                settings={await getLocalData('settings')}
            />


        </main>
    );
}
