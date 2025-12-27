'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'
import { Suspense } from 'react'

export default function StudioPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white font-mono">Loading Studio...</div>}>
            <NextStudio config={config} />
        </Suspense>
    )
}
