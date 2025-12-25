import { getLocalData } from "@/lib/data.server";
import HeroArabic from "@/components/home/HeroArabic";
import ServicesGrid from "@/components/home/ServicesGrid";
import ProjectSlider from "@/components/home/ProjectSlider";
import TechStack from "@/components/home/TechStack";

export default async function Home() {
    const heroData = await getLocalData('hero');
    const servicesData = await getLocalData('services');
    const techData = await getLocalData('tech');
    const projectData = await getLocalData('projects');

    return (
        <main className="min-h-screen">
            <HeroArabic data={heroData} />

            <TechStack data={techData} />

            {/* Services Grid */}
            <div id="services">
                <ServicesGrid services={servicesData} />
            </div>

            {/* Projects Slider */}
            <ProjectSlider projects={projectData} />


        </main>
    );
}
