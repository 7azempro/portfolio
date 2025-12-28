import {
    RiLayoutTopLine, RiUser3Line, RiBriefcaseLine, RiArticleLine,
    RiServerLine, RiShoppingCartLine, RiBookOpenLine,
    RiDatabase2Line, RiSettings3Line, RiShieldUserLine, RiToggleLine
} from "react-icons/ri";
// Helper for Web Previews
// import { Iframe } from 'sanity-plugin-iframe-pane'

// SEO Pane
// // import { SEOPane } from 'sanity-plugin-seo-pane'

// Define the "Web Preview" view
export const defaultDocumentNode = (S, { schemaType }) => {
    // Only enable for specific types
    if (['article', 'project', 'hero'].includes(schemaType)) {
        return S.document().views([
            S.view.form(), // Default Form
            /*
            // Disable SEO Pane for CLI Deploy (Dependency Error)
            S.view
                .component(SEOPane)
                .options({
                    keywords: `seo.keywords`,
                    synonyms: `seo.synonyms`,
                    url: (doc) => {
                        const baseUrl = 'http://localhost:3000';
                        if (schemaType === 'article') return `${baseUrl}/articles/${doc?.slug?.current}`;
                        if (schemaType === 'project') return `${baseUrl}/works/${doc?.slug?.current}`;
                        return baseUrl;
                    },
                    yoast: {
                        title: (doc) => doc.title_en || doc.title,
                        description: (doc) => doc.excerpt_en || doc.excerpt || doc.desc_en,
                    }
                })
                .title('SEO Audit'),
            */

            /*
            S.view
                .component(Iframe)
                .options({
                    url: (doc) => {
                        // Dynamic URL logic
                        if (schemaType === 'hero') return 'http://localhost:3000/?preview=true';
                        if (schemaType === 'article') return `http://localhost:3000/articles/${doc?.slug?.current}?preview=true`;
                        if (schemaType === 'project') return `http://localhost:3000/works/${doc?.slug?.current}?preview=true`;
                        return 'http://localhost:3000';
                    },
                    defaultSize: 'desktop',
                    reload: { button: true }, 
                })
                .title('Live Preview'),
            */
        ])
    }
    return S.document().views([S.view.form()])
}

export const structure = (S) =>
    S.list()
        .title('CMS Dashboard')
        .items([
            // 1. CONTENT ENGINE (Daily Drivers)
            S.listItem()
                .title('Content Engine')
                .icon(RiArticleLine)
                .child(
                    S.list()
                        .title('Content')
                        .items([
                            S.documentTypeListItem('article').title('Articles'),
                            S.documentTypeListItem('project').title('Projects'),
                            S.documentTypeListItem('service').title('Services'),
                            S.documentTypeListItem('socialPost').title('Social Feed'),
                        ])
                ),

            S.divider(),

            // 2. KNOWLEDGE BASE (CV & Data)
            S.listItem()
                .title('Knowledge Base')
                .icon(RiDatabase2Line)
                .child(
                    S.list()
                        .title('Knowledge')
                        .items([
                            S.documentTypeListItem('tech').title('Tech Stack'),
                            S.documentTypeListItem('experience').title('Experience'),
                            S.documentTypeListItem('education').title('Education'),
                            S.documentTypeListItem('testimonial').title('Testimonials'),
                        ])
                ),

            // 3. COMMERCE & LMS (Business Logic)
            S.listItem()
                .title('Commerce & LMS')
                .icon(RiShoppingCartLine)
                .child(
                    S.list()
                        .title('Business')
                        .items([
                            S.documentTypeListItem('product').title('Products'),
                            S.documentTypeListItem('order').title('Orders'),
                            S.divider(),
                            S.documentTypeListItem('course').title('Courses'),
                            S.documentTypeListItem('lesson').title('Lessons')
                        ])
                ),

            S.divider(),

            // 4. SITE ARCHITECTURE (Page Builders)
            S.listItem()
                .title('Site Architecture')
                .icon(RiLayoutTopLine)
                .child(
                    S.list()
                        .title('Pages')
                        .items([
                            S.listItem()
                                .title('Home Page')
                                .icon(RiLayoutTopLine)
                                .child(
                                    S.document()
                                        .schemaType('hero')
                                        .documentId('hero')
                                        .title('Home Page')
                                ),
                            S.listItem()
                                .title('About Bio')
                                .icon(RiUser3Line)
                                .child(
                                    S.document()
                                        .schemaType('about')
                                        .documentId('about')
                                        .title('About Bio')
                                ),
                        ])
                ),

            S.divider(),

            // 5. SYSTEM (Global Config)
            S.listItem()
                .title('System')
                .icon(RiSettings3Line)
                .child(
                    S.list()
                        .title('System')
                        .items([
                            S.listItem()
                                .title('Global Settings')
                                .icon(RiSettings3Line)
                                .child(
                                    S.document()
                                        .schemaType('settings')
                                        .documentId('settings')
                                        .title('Global Settings')
                                ),
                            S.listItem()
                                .title('Widgets Config')
                                .icon(RiToggleLine)
                                .child(
                                    S.document()
                                        .schemaType('widget')
                                        .documentId('widget')
                                        .title('Widgets Config')
                                ),
                            // Add future system docs here (e.g., Redirects, Menus)
                        ])
                ),
        ]);
