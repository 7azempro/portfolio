
// Swiss "Blueprint" Placeholder
// Dark Navy background with subtle grid and crosshairs
const SVG_PLACEHOLDER = `
<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#020408"/>
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2563EB" stroke-width="0.5" stroke-opacity="0.2"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#grid)" />
  <line x1="0" y1="0" x2="800" y2="600" stroke="#2563EB" stroke-width="1" stroke-opacity="0.1" />
  <line x1="800" y1="0" x2="0" y2="600" stroke="#2563EB" stroke-width="1" stroke-opacity="0.1" />
  <circle cx="400" cy="300" r="50" stroke="#2563EB" stroke-width="1" fill="none" stroke-opacity="0.2" />
  <text x="400" y="300" font-family="monospace" font-size="14" fill="#2563EB" text-anchor="middle" dy="5" opacity="0.5">NO_SIGNAL</text>
</svg>
`.trim().replace(/\n/g, '');


export const FALLBACK_IMAGE = `data:image/svg+xml;base64,${Buffer.from(SVG_PLACEHOLDER).toString('base64')}`;

// Helper to safely get Image URL
import { urlFor } from '@/sanity/lib/image';

export function getSafeImage(source) {
  if (source && source.asset) {
    return urlFor(source).url();
  }
  return FALLBACK_IMAGE;
}

export const FALLBACK_ABOUT_DATA = {
  role: "Product Design Engineer & UX/UI Designer",
  role_en: "Product Design Engineer & UX/UI Designer",
  location: "القاهرة، مصر",
  location_en: "Cairo, Egypt",
  bio: "أمتلك خبرة تزيد عن 3 سنوات في تصميم تجربة المستخدم وتطوير Webflow. متخصص في تصميم تجارب رقمية باستخدام Figma و Framer و React.",
  bio_en: "Over 3 years of experience in UX/UI design and Webflow development. Specializing in creating digital experiences using Figma, Framer, Webflow, and React.",
  stats: [
    { label: "حركة المرور", label_en: "TRAFFIC", value: "+25%", unit: "زيادة", unit_en: "INCREASE" },
    { label: "معدل الارتداد", label_en: "BOUNCE RATE", value: "-15%", unit: "تحسن", unit_en: "REDUCED" },
    { label: "سهولة الوصول", label_en: "ACCESSIBILITY", value: "+30%", unit: "نتيجة", unit_en: "SCORE" },
  ],
  tools: ['Adobe Creative Suite', 'Figma', 'Adobe XD', 'Webflow', 'Framer', 'React', 'Next.js'],
  education: [
    { degree: "Bachelor of Arts", institution: "Al-Azhar University", year: "2020" },
    { degree: "Nanodegree (UX Design)", institution: "Udacity", year: "2021" }
  ],
  experience: [
    {
      role: "Senior Product Designer",
      company: "TechCompany Inc.",
      year: "2023 - Present",
      desc: "Leading design ops and core system architecture.",
      desc_en: "Leading design ops and core system architecture."
    }
  ]
};
