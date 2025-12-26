import {
    RiLayoutTopLine, RiUser3Line, RiBriefcaseLine, RiArticleLine,
    RiServerLine, RiShoppingCartLine, RiBookOpenLine,
    RiDatabase2Line, RiSettings3Line, RiShieldUserLine
} from "react-icons/ri";
// Helper: Define the "SEO View" for standard documents - REMOVED (Incompatible Plugin)


export const structure = (S) =>
    S.list()
        .title('Content Studio')
        .items([
            // --------------------------------------------------------
            // 1. WEBSITE CORE (Singletons & Main Pages)
            // --------------------------------------------------------
            S.listItem()
                .title('Website Core')
                .icon(RiLayoutTopLine)
                .child(
                    S.list()
                        .title('Website Pages')
                        .items([
                            S.listItem()
                                .title('Home Page (Hero)')
                                .icon(RiLayoutTopLine)
                                .child(S.document().schemaType('hero').documentId('hero').title('Home Hero')),
                            S.listItem()
                                .title('About Page')
                                .icon(RiUser3Line)
                                .child(S.document().schemaType('about').documentId('about').title('About Bio')),
                            S.divider(),
                            S.documentTypeListItem('project').title('Projects'),
                            S.documentTypeListItem('service').title('Services'),
                        ])
                ),

            // --------------------------------------------------------
            // 2. BLOG & CONTENT (Articles)
            // --------------------------------------------------------
            S.listItem()
                .title('Blog & Articles')
                .icon(RiArticleLine)
                .child(
                    S.documentTypeList('article')
                        .title('All Articles')
                        .child(documentId =>
                            S.document()
                                .documentId(documentId)
                                .schemaType('article')
                        )
                ),

            // --------------------------------------------------------
            // 3. BUSINESS ENGINE (Shop & LMS)
            // --------------------------------------------------------
            S.listItem()
                .title('Business Engine')
                .icon(RiShoppingCartLine)
                .child(
                    S.list()
                        .title('Commerce & Courses')
                        .items([
                            S.listItem().title('Shop').child(
                                S.list().title('Shop').items([
                                    S.documentTypeListItem('product').title('Products'),
                                    S.documentTypeListItem('order').title('Orders')
                                ])
                            ),
                            S.listItem().title('Academy').child(
                                S.list().title('Academy').items([
                                    S.documentTypeListItem('course').title('Courses'),
                                    S.documentTypeListItem('lesson').title('Lessons')
                                ])
                            )
                        ])
                ),

            S.divider(),

            // --------------------------------------------------------
            // 4. DATABASE (References & Metadata)
            // --------------------------------------------------------
            S.listItem()
                .title('Data & Assets')
                .icon(RiDatabase2Line)
                .child(
                    S.list()
                        .title('Database')
                        .items([
                            S.documentTypeListItem('tech').title('Tech Stack'),
                            S.documentTypeListItem('experience').title('Experience'),
                            S.documentTypeListItem('education').title('Education'),
                            S.documentTypeListItem('testimonial').title('Testimonials'),
                            S.documentTypeListItem('socialPost').title('Social Feed'),
                        ])
                ),

            // --------------------------------------------------------
            // 5. GLOBAL CONFIGURATION
            // --------------------------------------------------------
            S.divider(),
            S.listItem()
                .title('Global Settings')
                .icon(RiSettings3Line)
                .child(
                    S.document()
                        .schemaType('settings')
                        .documentId('settings')
                        .title('Site Settings')
                ),
        ]);
