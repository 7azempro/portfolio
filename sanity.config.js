'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'
import { codeInput } from '@sanity/code-input'
import { dashboardTool, projectUsersWidget, projectInfoWidget } from '@sanity/dashboard'
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
    title: '7AZEMPRO // CMS',
    icon: () => <img src="/icon.svg" style={{ width: 24, height: 24 }} alt="7" />,
    plugins: [
        structureTool({ structure }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        // Media Library Plugin
        media(),
        // Code Input Plugin
        codeInput(),
        // SEO Pane Plugin (Moved to Structure)
        // Dashboard
        dashboardTool({
            widgets: [
                projectInfoWidget({ layout: { width: 'medium' } }),
                projectUsersWidget({ layout: { width: 'medium' } }),
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
