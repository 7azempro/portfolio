'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { codeInput } from '@sanity/code-input'
import { seoPane } from 'sanity-plugin-seo-pane'
import { dashboardTool } from '@sanity/dashboard'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema'

import { structure } from './src/sanity/structure'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schema' folder
    schema,
    plugins: [
        structureTool({ structure }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        // Media Library Plugin (Disabled due to Next 16 conflict)
        // media(),
        // Code Input Plugin
        codeInput(),
        // SEO Pane Plugin (Experimental)
        // seoPane({ keywords: (doc) => doc.seoKeywords }),
        // Dashboard
        dashboardTool({
            widgets: [
                documentListWidget({
                    title: 'Recently Edited Projects',
                    order: '_updatedAt desc',
                    types: ['project'],
                    layout: { width: 'medium' }
                }),
                documentListWidget({
                    title: 'Last Articles',
                    order: '_updatedAt desc',
                    types: ['article'],
                    layout: { width: 'medium' }
                })
            ]
        })
    ],
    document: {
        // For singleton types, filter out from "create new" dialog
        newDocumentOptions: (prev, { creationContext }) => {
            if (creationContext.type === 'global') {
                return prev.filter((templateItem) => !['hero', 'settings'].includes(templateItem.templateId))
            }
            return prev
        },
        // Disable "duplicate" action for singletons
        actions: (prev, { schemaType }) => {
            if (['hero', 'settings'].includes(schemaType)) {
                return prev.filter(({ action }) => !['duplicate', 'delete'].includes(action))
            }
            return prev
        },
    },
})
