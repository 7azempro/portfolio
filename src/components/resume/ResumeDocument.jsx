import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register Fonts (Using standard Helvetica for now to ensure compatibility, can add custom fonts later if needed)
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf' }, // Normal
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf', fontWeight: 700 }, // Bold (Simulated)
    ]
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#FFFFFF',
        color: '#111111',
        lineHeight: 1.5,
    },
    // Header
    headerParam: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: '#111111',
        paddingBottom: 20,
    },
    nameStr: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    roleStr: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#666',
        marginBottom: 10,
    },
    contactBlock: {
        alignItems: 'flex-end',
    },
    contactRow: {
        fontSize: 9,
        marginBottom: 2,
        color: '#444',
        textDecoration: 'none',
    },
    // Sections
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginBottom: 15,
        backgroundColor: '#F5F5F5',
        padding: 4,
    },
    // Content Blocks
    expBlock: {
        marginBottom: 15,
        paddingLeft: 10,
        borderLeftWidth: 1,
        borderLeftColor: '#E5E5E5',
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    expRole: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    expCompany: {
        fontSize: 10,
        color: '#666',
        textTransform: 'uppercase',
    },
    expDate: {
        fontSize: 9,
        color: '#888',
        fontFamily: 'Helvetica', // Fallback for mono
    },
    expDesc: {
        fontSize: 9,
        color: '#333',
        marginTop: 4,
        textAlign: 'justify',
    },
    // Skills
    skillGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTag: {
        fontSize: 8,
        backgroundColor: '#F3F4F6',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 2,
        color: '#333',
        textTransform: 'uppercase',
        marginRight: 6,
        marginBottom: 6,
    },
    // Footer
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 8,
        color: '#999',
    }
});

const ResumeDocument = ({ data }) => {
    const { settings, about } = data;

    // Fallbacks
    const name = settings?.authorName || 'Hazem Gamal';
    const role = settings?.authorRole || 'Product Designer';
    const email = settings?.contactEmail || 'contact@7azem.pro';
    const location = about?.location_en || about?.location || 'Cairo, Egypt';
    const bio = about?.bio_en || about?.bio || settings?.seoDescription || '';

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
                {about?.tools && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Arsenal</Text>
                        <View style={styles.skillGrid}>
                            {about.tools.map((tool, i) => (
                                <Text key={i} style={styles.skillTag}>{tool}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* EXPERIENCE */}
                {about?.experience && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Professional Logs</Text>
                        {about.experience.map((exp, i) => (
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
                {about?.education && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Academic Data</Text>
                        {about.education.map((edu, i) => (
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
