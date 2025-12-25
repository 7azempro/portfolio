import {
    RiLayoutTopLine, RiSettings4Line, RiUser3Line,
    RiFolder3Line, RiArticleLine, RiServiceLine, RiCodeBoxLine,
    RiBriefcase4Line, RiGraduationCapLine, RiDoubleQuotesR
} from "react-icons/ri";

export const structure = (S) =>
    S.list()
        .title('Content')
        .items([
            // Singleton: Home / Hero
            S.listItem()
                .title('Hero Section')
                .icon(RiLayoutTopLine)
                .child(
                    S.document()
                        .schemaType('hero')
                        .documentId('hero')
                        .title('Hero Section')
                ),

            // Singleton: About / Profile
            S.listItem()
                .title('About / Profile')
                .icon(RiUser3Line)
                .child(
                    S.document()
                        .schemaType('about')
                        .documentId('about')
                        .title('About / Profile')
                ),

            S.divider(),

            // Collections
            S.documentTypeListItem('project').title('Projects').icon(RiFolder3Line),
            S.documentTypeListItem('service').title('Services').icon(RiServiceLine),
            S.documentTypeListItem('tech').title('Tech Stack').icon(RiCodeBoxLine),
            S.documentTypeListItem('article').title('Articles').icon(RiArticleLine),
            S.documentTypeListItem('experience').title('Experience').icon(RiBriefcase4Line),
            S.documentTypeListItem('education').title('Education').icon(RiGraduationCapLine),
            S.documentTypeListItem('testimonial').title('Testimonials').icon(RiDoubleQuotesR),

            S.divider(),

            // Singleton: Global Settings
            S.listItem()
                .title('Global Settings')
                .icon(RiSettings4Line)
                .child(
                    S.document()
                        .schemaType('settings')
                        .documentId('settings')
                        .title('Global Settings')
                ),
        ])
