'use client';
import React from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function LegalPage() {
    const { lang } = useLanguage();

    const t = {
        ar: {
            title: "الشروط والخصوصية",
            updated: "آخر تحديث: ديسمبر 2025",
            privacyTitle: "سياسة الخصوصية",
            privacyContent: [
                "نحن نقدر خصوصيتك. هذا الموقع يجمع الحد الأدنى من البيانات لضمان الأداء والفعالية.",
                "لا يتم جمع أي بيانات شخصية دون موافقة صريحة (مثل نموذج التواصل)."
            ],
            cookiesTitle: "ملفات الارتباط",
            cookiesContent: "نستخدم ملفات ارتباط أساسية لإدارة تفضيلات اللغة والمظهر. أي تحليلات طرف ثالث (إن وجدت) تكون مجهولة المصدر.",
            termsTitle: "شروط الاستخدام",
            ipTitle: "الملكية الفكرية",
            ipContent: "جميع المحتويات، التصاميم، والأكواد في هذا الموقع هي ملكية فكرية لـ 7azempro ما لم يُذكر خلاف ذلك.",
            disclaimerTitle: "إخلاء المسؤولية",
            disclaimerContent: "يتم تقديم هذا الموقع 'كما هو'. بينما نسعى للدقة، لا يمكننا ضمان اكتمال المعلومات المعروضة.",
            contact: "للأسئلة، يرجى التواصل: "
        },
        en: {
            title: "LEGAL",
            updated: "LAST UPDATED: DECEMBER 2025",
            privacyTitle: "Privacy Policy",
            privacyContent: [
                "We value your privacy. This portfolio collects minimal data to ensure performance and functionality.",
                "No personal data is collected without explicit consent (e.g., via the contact form)."
            ],
            cookiesTitle: "Cookies",
            cookiesContent: "We use essential cookies to manage language preferences and theme settings. Third-party analytics (if applicable) are anonymized.",
            termsTitle: "Terms of Use",
            ipTitle: "Intellectual Property",
            ipContent: "All content, designs, and code on this website are the intellectual property of 7azempro unless otherwise noted.",
            disclaimerTitle: "Disclaimer",
            disclaimerContent: "This site is provided 'as is'. While we strive for accuracy, we cannot guarantee the completeness of the information presented.",
            contact: "For questions, please contact: "
        }
    };

    const content = t[lang];

    return (
        <main className="min-h-screen pt-32 pb-20 container mx-auto px-6">
            <div className="max-w-3xl mx-auto space-y-16">

                {/* Header */}
                <div className="border-b border-foreground/10 pb-8">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-4 tracking-tighter mix-blend-difference`}>
                        {content.title}
                    </h1>
                    <p className="text-muted-foreground font-sans uppercase tracking-widest text-sm">
                        {content.updated}
                    </p>
                </div>

                {/* Privacy Policy */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-3">
                        <span className="w-2 h-2 bg-blue-600 rounded-full" />
                        {content.privacyTitle}
                    </h2>
                    <div className="prose dark:prose-invert prose-sm md:prose-base font-sans text-muted-foreground leading-relaxed">
                        {content.privacyContent.map((p, i) => (
                            <p key={i}>{p}</p>
                        ))}
                        <p>
                            <strong>{content.cookiesTitle}:</strong> {content.cookiesContent}
                        </p>
                    </div>
                </section>

                {/* Terms */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-bold uppercase tracking-wide flex items-center gap-3">
                        <span className="w-2 h-2 bg-purple-600 rounded-full" />
                        {content.termsTitle}
                    </h2>
                    <div className="prose dark:prose-invert prose-sm md:prose-base font-sans text-muted-foreground leading-relaxed">
                        <p>
                            <strong>{content.ipTitle}:</strong> {content.ipContent}
                        </p>
                        <p>
                            <strong>{content.disclaimerTitle}:</strong> {content.disclaimerContent}
                        </p>
                    </div>
                </section>

                {/* Contact */}
                <section className="pt-8 border-t border-foreground/10">
                    <p className="text-sm text-foreground/60">
                        {content.contact} <a href="mailto:hazem.gamal1@outlook.com" className="text-foreground hover:underline font-bold">hazem.gamal1@outlook.com</a>
                    </p>
                </section>

            </div>
        </main>
    );
}
