import { FALLBACK_ABOUT_DATA } from '@/lib/constants';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff'
    },
    headerParam: {
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    nameStr: {
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2
    },
    roleStr: {
        fontSize: 12,
        marginBottom: 5,
        color: '#444',
        textTransform: 'uppercase'
    },
    contactBlock: {
        alignItems: 'flex-end',
        gap: 2
    },
    contactRow: {
        fontSize: 8,
        color: '#666',
        textTransform: 'uppercase'
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: '1px solid #000',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    skillGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6
    },
    skillTag: {
        padding: '4 8',
        backgroundColor: '#f4f4f5',
        borderRadius: 2,
        fontSize: 8,
        fontFamily: 'Courier'
    },
    expBlock: {
        marginBottom: 12
    },
    expHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2
    },
    expRole: {
        fontWeight: 'bold',
        fontSize: 10
    },
    expCompany: {
        fontSize: 10,
        color: '#444'
    },
    expDate: {
        fontSize: 9,
        color: '#666',
        fontFamily: 'Courier',
        textAlign: 'right'
    },
    expDesc: {
        fontSize: 9,
        lineHeight: 1.5,
        color: '#333',
        marginTop: 2
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTop: '1px solid #eee',
        paddingTop: 10
    },
    footerText: {
        fontSize: 7,
        color: '#a1a1aa',
        textTransform: 'uppercase'
    }
});

const ResumeDocument = ({ data }) => {
    const { settings, about } = data;

    // Fallbacks
    const name = settings?.authorName || 'Hazem Gamal';
    const role = settings?.authorRole || FALLBACK_ABOUT_DATA.role_en;
    const email = settings?.contactEmail || 'contact@7azem.pro';
    const location = about?.location_en || about?.location || FALLBACK_ABOUT_DATA.location_en;
    const bio = about?.bio_en || about?.bio || settings?.seoDescription || FALLBACK_ABOUT_DATA.bio_en;

    const tools = (about?.tools && about.tools.length > 0) ? about.tools : FALLBACK_ABOUT_DATA.tools;
    const experience = (about?.experience && about.experience.length > 0) ? about.experience : FALLBACK_ABOUT_DATA.experience;
    const education = (about?.education && about.education.length > 0) ? about.education : FALLBACK_ABOUT_DATA.education;

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* HEAD */}
                <View style={styles.headerParam}>
                    <View style={{ width: '60%' }}>
                        <Text style={styles.nameStr}>{name}</Text>
                        <Text style={styles.roleStr}>{role}</Text>
                        <Text style={{ fontSize: 9, color: '#666', lineHeight: 1.4, marginTop: 5 }}>
                            {bio || ''}
                        </Text>
                    </View>
                    <View style={styles.contactBlock}>
                        <Text style={styles.contactRow}>{location || ''}</Text>
                        <Text style={styles.contactRow}>{email || ''}</Text>
                        <Link src="https://7azem.pro" style={{ textDecoration: 'none' }}>
                            <Text style={styles.contactRow}>7azem.pro</Text>
                        </Link>
                    </View>
                </View>

                {/* TECH STACK */}
                {tools && tools.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technical Skills</Text>
                        <View style={styles.skillGrid}>
                            {tools.map((tool, i) => (
                                <Text key={i} style={styles.skillTag}>{tool || ''}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* EXPERIENCE */}
                {experience && experience.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Experience</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={styles.expBlock}>
                                <View style={styles.expHeader}>
                                    <View>
                                        <Text style={styles.expRole}>{exp?.role || 'Role'}</Text>
                                        <Text style={styles.expCompany}>{exp?.company || 'Company'}</Text>
                                    </View>
                                    <Text style={styles.expDate}>{exp?.year || ''}</Text>
                                </View>
                                {(exp?.desc_en || exp?.desc) && (
                                    <Text style={styles.expDesc}>{exp.desc_en || exp.desc || ''}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {/* EDUCATION */}
                {education && education.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Education</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={styles.expBlock}>
                                <View style={styles.expHeader}>
                                    <View>
                                        <Text style={styles.expRole}>{edu?.degree || 'Degree'}</Text>
                                        <Text style={styles.expCompany}>{edu?.institution || 'Institution'}</Text>
                                    </View>
                                    <Text style={styles.expDate}>{edu?.year || ''}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}

                {/* FOOTER */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>SYSTEM_GENERATED // 7AZEM.PRO</Text>
                    <Text style={styles.footerText}>{new Date().toISOString().split('T')[0]}</Text>
                </View>

            </Page>
        </Document>
    );
};

export default ResumeDocument;
