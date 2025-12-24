import { getLocalData } from "@/lib/data.server";

export default async function AboutPage() {
    // Ideally we fetch 'about' content from Sanity too, currently just hardcoded or from Bento
    const hero = await getLocalData('hero');

    return (
        <main className="min-h-screen pt-32 pb-20 container mx-auto px-6 max-w-4xl">
            <div className="space-y-12">
                <section>
                    <h1 className="text-4xl md:text-6xl font-bold mb-8">عن حازم</h1>
                    <p className="text-xl md:text-2xl leading-relaxed text-muted-foreground">
                        أنا مهندس برمجيات ومصمم منتجات، أركز على بناء تجارب رقمية تجمع بين الأداء العالي والجمال البصري.
                        أؤمن بأن التصميم الجيد هو الذي لا يشعر به المستخدم، بل يستخدمه ببديهية.
                    </p>
                </section>

                <hr className="border-border" />

                <section>
                    <h2 className="text-2xl font-bold mb-6">الخبرات</h2>
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">Senior Product Designer</h3>
                                <p className="text-muted-foreground">TechCompany Inc.</p>
                            </div>
                            <span className="text-sm text-muted-foreground">2022 - Present</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-semibold">Frontend Developer</h3>
                                <p className="text-muted-foreground">CreativeAgency</p>
                            </div>
                            <span className="text-sm text-muted-foreground">2020 - 2022</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
