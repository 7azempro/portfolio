'use client';
import Link from 'next/link';
import { RiTwitterXFill, RiLinkedinFill, RiGithubFill, RiMailSendFill, RiWhatsappFill, RiDribbbleFill, RiBehanceFill } from 'react-icons/ri';
import { useLanguage } from '@/lib/context/LanguageContext';
import Logo from '@/components/ui/Logo';

export default function Footer() {
    const { lang } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-foreground/5 dark:border-white/5 bg-background mt-20 transition-colors duration-500">
            <div className="container mx-auto px-6 py-12">
                {/* Mega CTA Section */}
                <div className="relative rounded-3xl bg-foreground text-background overflow-hidden text-center p-12 mb-20 shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/30 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/30 blur-[100px] pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            {lang === 'ar' ? "هل لديك فكرة مشروع؟" : "Have a project idea?"}
                        </h2>
                        <p className="text-xl text-background/80 mb-8 max-w-2xl mx-auto">
                            {lang === 'ar'
                                ? "دعنا نتحدث عن كيفية تحويل رؤيتك إلى واقع رقمي."
                                : "Let's discuss how to turn your vision into a digital reality."}
                        </p>
                        <a
                            href="mailto:contact@7azem.pro"
                            className="inline-block bg-background text-foreground px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
                        >
                            {lang === 'ar' ? "ابدأ اليوم ⚡" : "Start Today ⚡"}
                        </a>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-foreground/5 dark:border-white/5 pt-16">

                    {/* Col 1: Brand & Identity (5 Cols) */}
                    <div className="md:col-span-5 flex flex-col gap-6">
                        <div dir="ltr" className="w-fit">
                            <Logo />
                        </div>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                            {lang === 'ar'
                                ? "مصمم ومطور واجهات مستخدم، أركز على خلق تجارب رقمية تترك أثراً. مقيم في مصر، وأعمل مع العالم."
                                : "UI/UX Designer & Developer focused on creating digital experiences that leave a mark. Based in Egypt, working globally."}
                        </p>

                        {/* Socials - Use foreground/5 for light mode visibility */}
                        <div className="flex gap-3 flex-wrap mt-4">
                            {[
                                { Icon: RiWhatsappFill, link: "http://wa.me/+201019443462", color: "hover:text-green-500" },
                                { Icon: RiDribbbleFill, link: "https://dribbble.com/7azempro", color: "hover:text-pink-500" },
                                { Icon: RiBehanceFill, link: "https://www.behance.net/7azempro", color: "hover:text-blue-600" },
                                { Icon: RiTwitterXFill, link: "https://twitter.com/7azempro", color: "hover:text-foreground" },
                                { Icon: RiLinkedinFill, link: "https://linkedin.com/in/7azempro", color: "hover:text-blue-700" },
                                { Icon: RiGithubFill, link: "https://github.com/7azempro", color: "hover:text-foreground" },
                                { Icon: RiMailSendFill, link: "mailto:hazem.gamal1@outlook.com", color: "hover:text-blue-500" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 bg-foreground/5 dark:bg-white/5 hover:bg-foreground/10 rounded-full transition-colors border border-foreground/5 dark:border-white/5 ${social.color}`}
                                >
                                    <social.Icon className="w-5 h-5 text-foreground" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2: Sitemap (3 Cols) */}
                    <div className="md:col-span-3">
                        <h4 className="font-bold text-lg mb-6 text-foreground">{lang === 'ar' ? "خريطة الموقع" : "Sitemap"}</h4>
                        <ul className="flex flex-col gap-4 text-muted-foreground">
                            <li><Link href="/" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "الرئيسية" : "Home"}</Link></li>
                            <li><Link href="/works" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "الأعمال" : "Works"}</Link></li>
                            <li><Link href="/about" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "عني" : "About"}</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-500 transition-colors">{lang === 'ar' ? "المقالات" : "Blog"}</Link></li>
                        </ul>
                    </div>

                    {/* Col 3: Services List (4 Cols) */}
                    <div className="md:col-span-4">
                        <h4 className="font-bold text-lg mb-6 text-foreground">{lang === 'ar' ? "خدماتي" : "Services"}</h4>
                        <ul className="flex flex-col gap-4 text-muted-foreground">
                            {[
                                { ar: "تصميم واجهات المستخدم (UI/UX)", en: "UI/UX Design" },
                                { ar: "تطوير الويب (Next.js)", en: "Web Development" },
                                { ar: "تطبيقات الموبايل", en: "Mobile Applications" },
                                { ar: "بناء الهوية البصرية", en: "Brand Identity" }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    {lang === 'ar' ? item.ar : item.en}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* GIANT FOOTER SIGNATURE */}
            <div className="mt-20 relative select-none pointer-events-none opacity-10 overflow-hidden" dir="ltr">
                <h1 className="text-[18vw] leading-[0.8] font-black tracking-tighter text-center text-foreground mix-blend-overlay">
                    7AZEMPRO
                </h1>
            </div>

            <div className="mt-12 pt-8 border-t border-foreground/5 dark:border-white/5 text-center md:text-left text-xs text-muted-foreground flex flex-col md:flex-row justify-between items-center pb-8 container mx-auto px-6">
                <p>© {year} 7azempro. {lang === 'ar' ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
                <div className="flex gap-4 mt-4 md:mt-0 font-mono">
                    <span>PRIVACY</span>
                    <span>TERMS</span>
                </div>
            </div>
        </footer>
    );
}

