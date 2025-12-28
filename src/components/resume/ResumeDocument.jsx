import { FALLBACK_ABOUT_DATA } from '@/lib/constants';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// ... (keep Font and Styles unchanged) ...

const ResumeDocument = ({ data }) => {
    const { settings, about } = data;

    // Fallbacks & Data Preparation
    const name = settings?.authorName || 'Hazem Gamal';
    const role = settings?.authorRole || FALLBACK_ABOUT_DATA.role_en;
    const email = settings?.contactEmail || 'contact@7azem.pro';
    const location = about?.location_en || about?.location || FALLBACK_ABOUT_DATA.location_en;
    const bio = about?.bio_en || about?.bio || settings?.seoDescription || FALLBACK_ABOUT_DATA.bio_en;

    // Arrays fallbacks
    const tools = (about?.tools && about.tools.length > 0) ? about.tools : FALLBACK_ABOUT_DATA.tools;
    const experience = (about?.experience && about.experience.length > 0) ? about.experience : FALLBACK_ABOUT_DATA.experience;
    const education = (about?.education && about.education.length > 0) ? about.education : FALLBACK_ABOUT_DATA.education;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEAD */}
                <View style={styles.headerParam}>
                    <View>
                        <Text style={styles.nameStr}>{name}</Text>
                        <Text style={styles.roleStr}>{role}</Text>
                        <Text style={{ fontSize: 9, color: '#666', width: 300 }}>
                            {bio}
                        </Text>
                    </View>
                    <View style={styles.contactBlock}>
                        <Text style={styles.contactRow}>{location}</Text>
                        <Text style={styles.contactRow}>{email}</Text>
                        <Link src="https://7azem.pro" style={styles.contactRow}>7azem.pro</Link>
                        {settings?.socialLinks && settings.socialLinks.map((link, i) => (
                            <Link key={i} src={link.url} style={styles.contactRow}>
                                {link.platform}
                            </Link>
                        ))}
                    </View>
                </View>

                {/* TECH STACK */}
                {tools && tools.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Arsenal</Text>
                        <View style={styles.skillGrid}>
                            {tools.map((tool, i) => (
                                <Text key={i} style={styles.skillTag}>{tool}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* EXPERIENCE */}
                {experience && experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Logs</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.expBlock}>
                                <View style={styles.expHeader}>
                                    <View>
                                        <Text style={styles.expRole}>{exp.role}</Text>
                                        <Text style={styles.expCompany}>{exp.company}</Text>
                                    </View>
                                    <Text style={styles.expDate}>{exp.year}</Text>
                                </View>
                                {(exp.desc_en || exp.desc) && <Text style={styles.expDesc}>{exp.desc_en || exp.desc}</Text>}
                            </View>
                        ))}
                    </View>
                )}

                {/* EDUCATION */}
                {education && education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Academic Data</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.expBlock}>
                                <View style={styles.expHeader}>
                                    <View>
                                        <Text style={styles.expRole}>{edu.degree}</Text>
                                        <Text style={styles.expCompany}>{edu.institution}</Text>
                                    </View>
                                    <Text style={styles.expDate}>{edu.year}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Generated Dynamically by 7azem.pro System</Text>
                    <Text style={styles.footerText}>{new Date().toLocaleDateString()}</Text>
                </View>

            </Page>
        </Document>
    );
};

export default ResumeDocument;
