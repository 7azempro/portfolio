import {
    RiLayoutTopLine, RiSettings4Line, RiUser3Line,
    RiFolder3Line, RiArticleLine, RiServiceLine, RiCodeBoxLine,
    RiBriefcase4Line, RiGraduationCapLine, RiDoubleQuotesR,
    RiBookOpenLine, RiShoppingBag3Line, RiTwitterXLine
} from "react-icons/ri";

export const structure = (S) =>
    S.list()
        .title('Control Center')
        .items([
            // 1. HOME & PORTFOLIO ENGINE
            S.listItem()
                .title('Portfolio Engine')
                .icon(RiLayoutTopLine)
                .child(
                    S.list()
                        .title('Portfolio Content')
                        .items([
                            S.documentTypeListItem('hero').title('Hero Section').icon(RiLayoutTopLine),
                            S.documentTypeListItem('about').title('About Bio').icon(RiUser3Line),
                            S.documentTypeListItem('project').title('Projects (Case Studies)').icon(RiFolder3Line),
                            S.documentTypeListItem('service').title('Services').icon(RiServiceLine),
                            S.documentTypeListItem('experience').title('Experience').icon(RiBriefcase4Line),
                            S.documentTypeListItem('education').title('Education').icon(RiGraduationCapLine),
                            S.documentTypeListItem('testimonial').title('Testimonials').icon(RiDoubleQuotesR),
                        ])
                ),

            S.divider(),

            // 2. KNOWLEDGE BASE (LMS)
            S.listItem()
                .title('Knowledge Base')
                .icon(RiBookOpenLine)
                .child(
                    S.list()
                        .title('LMS Management')
                        .items([
                            S.documentTypeListItem('course').title('Courses'),
                            S.documentTypeListItem('lesson').title('Lessons'),
                        ])
                ),

            // 3. COMMERCE
            S.listItem()
                .title('Commerce')
                .icon(RiShoppingBag3Line)
                .child(
                    S.list()
                        .title('Store Management')
                        .items([
                            S.documentTypeListItem('product').title('Products'),
                            S.documentTypeListItem('order').title('Orders'),
                        ])
                ),

            S.divider(),

            // 4. CONTENT HUB
            S.listItem()
                .title('Content Hub')
                .icon(RiArticleLine)
                .child(
                    S.list()
                        .title('Blog & Social')
                        .items([
                            S.documentTypeListItem('article').title('Articles'),
                            S.documentTypeListItem('socialPost').title('Social Feed'),
                        ])
                ),

            S.divider(),

            // 5. SYSTEM
            S.listItem()
                .title('System')
                .icon(RiSettings4Line)
                .child(
                    S.list()
                        .title('System Config')
                        .items([
                            S.documentTypeListItem('settings').title('Global Settings').icon(RiSettings4Line),
                            S.documentTypeListItem('tech').title('Tech Stack Assets').icon(RiCodeBoxLine),
                        ])
                ),
        ]);
