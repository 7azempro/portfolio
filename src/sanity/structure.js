import {
    RiLayoutTopLine, RiUser3Line, RiBriefcaseLine, RiArticleLine,
    RiServerLine, RiShoppingCartLine, RiBookOpenLine,
    RiDatabase2Line, RiSettings3Line, RiShieldUserLine
} from "react-icons/ri";
// Helper for Web Previews
// import { Iframe } from 'sanity-plugin-iframe-pane'

// Define the "Web Preview" view
export const defaultDocumentNode = (S, { schemaType }) => {
    // Only enable for specific types
    /*
    if (['article', 'project', 'hero'].includes(schemaType)) {
        return S.document().views([
            S.view.form(), // Default Form
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
        ])
    }
    */
    return S.document().views([S.view.form()])
}

export const structure = (S) =>
    S.list()
        .title('CMS Dashboard')
        .items([
            // 1. CORE PAGES (Top Level)
            S.listItem()
                .title('Home Page')
                .icon(RiLayoutTopLine)
                .child(S.document().schemaType('hero').documentId('hero').title('Home Content')),

            S.listItem()
                .title('About Bio')
                .icon(RiUser3Line)
                .child(S.document().schemaType('about').documentId('about').title('About Me')),

            S.divider(),

            // 2. MAIN CONTENT
            S.documentTypeListItem('article').title('Articles').icon(RiArticleLine),
            S.documentTypeListItem('project').title('Projects').icon(RiBriefcaseLine),
            S.documentTypeListItem('service').title('Services').icon(RiServerLine),

            S.divider(),

            // 3. COMMERCE & LMS (Grouped)
            S.listItem()
                .title('Business Engine')
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

            // 4. DATABASE / ASSETS (Grouped)
            S.listItem()
                .title('Asset Library')
                .icon(RiDatabase2Line)
                .child(
                    S.list()
                        .title('Assets')
                        .items([
                            S.documentTypeListItem('tech').title('Tech Stack'),
                            S.documentTypeListItem('experience').title('Experience'),
                            S.documentTypeListItem('education').title('Education'),
                            S.documentTypeListItem('testimonial').title('Testimonials'),
                            S.documentTypeListItem('socialPost').title('Social Feed'),
                        ])
                ),

            S.divider(),

            // 5. GLOBAL CONFIG
            S.listItem()
                .title('Site Settings')
                .icon(RiSettings3Line)
                .child(
                    S.document()
                        .schemaType('settings')
                        .documentId('settings')
                        .title('Global Settings')
                ),
        ]);
