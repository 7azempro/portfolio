'use client';
import { getLocalData } from '@/lib/data.server';
import Link from 'next/link';
import Image from 'next/image';
import { RiTimeLine, RiArrowRightUpLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Swiss Grid Background Component (Reusable)
const SwissBackground = () => (
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none -z-10" />
);

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data specifically client-side for animation sync (or hydration)
    // Actually, we can use server data passed via initial props if this was a server component.
    // But since we want Framer Motion, let's keep it clean.
    // Oh wait, the previous file was async Server Component.
    // I should probably keep it Server Component and use a Client Wrapper for the list if I want complex motion.
    // BUT for simplicity and speed, let's make the whole page Client for now or just fetch in useEffect?
    // The previous implementation was `export default async function`.
    // I will revert to Server Component structure but import a client component for the list.
    // OR just use simple CSS animation/Tailwind for the server component to avoid "use client" complexity if not needed.
    // Actually, `Hero.jsx` is "use client". Let's make this page "use client" for the nice parallax/motion effect user likes.
    // But `getLocalData` is server-side.
    // Solution: The Page remains Server Component, passes data to `ArticlesLayout` (Client Component).
    // FOR NOW: I will fetch data inside `useEffect` to use `getLocalData` via an API route? No, `getLocalData` is fs based.
    // I cannot use `getLocalData` in a client component.
    // So: `page.jsx` (Server) -> `ArticlesView.jsx` (Client).
    // Let's create `ArticlesView.jsx` first? No, verify standard Next.js pattern.
    // Let's stick to the Server Component and just use simple tailwind classes for animation, or wrap the grid in a generic `MotionDiv`.
    // Actually, I'll allow `use client` in this file and fetch via API if I have one?
    // No, I don't have a public Articles API.
    // BEST PATTERN: `page.jsx` is async server. It passes `articles` prop to `<ArticlesGrid articles={articles} />`.
    // I will write the `ArticlesGrid` logic inline here if I can? No, has to be separate file if `page` is server.
    // Alternative: Make `page.jsx` a Server Component, and use a `<ClientAnimationWrapper>` slot.
    // Let's trying keeping it simple: Server Component. No complex `framer-motion` scroll-linked stuff unless I make a client component.
    // I will use `ArticlesClientPage` pattern.
}

// Re-thinking: User wants "Swiss" theme. `Hero.jsx` is "use client".
// I will create `src/components/articles/ArticlesClient.jsx`?
// Too many files.
// I will just make `page.jsx` a Server Component that imports a `ClientList` component.
// WAIT. I can just make `page.jsx` "use client" if I fetch data differently? No.
// I'll stick to Server Component for SEO (it's articles!).
// So I will write `ArticlesView.jsx` in `src/app/(site)/articles/ArticlesView.jsx` and import it.
