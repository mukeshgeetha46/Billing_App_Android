import { IconSymbol } from '@/components/ui/icon-symbol';
import { useGetcompanybyidQuery } from '@/services/features/company/companyApi';
import Constants from 'expo-constants';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Linking,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const STATUSBAR_HEIGHT =
    Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : Constants.statusBarHeight;

export default function CompanyViewScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { data: companyData, isLoading, error } = useGetcompanybyidQuery(id);
    // Expanded Mock Data mirroring AddCompanyScreen fields
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error || !companyData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>
                    Failed to load store details
                </Text>
            </SafeAreaView>
        );
    }

    const handleOpenLink = (url: string) => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={companyData.banner ? "light-content" : "dark-content"} />

                {/* Header Section with Banner */}
                <View style={[styles.headerContainer, { height: companyData.banner ? 200 : 100 }]}>
                    {companyData.banner && (
                        <Image source={{ uri: companyData.banner }} style={styles.bannerImage} resizeMode="cover" />
                    )}
                    <View style={[styles.headerOverlay, { paddingTop: STATUSBAR_HEIGHT }]}>
                        <View style={styles.headerToolbar}>
                            <TouchableOpacity onPress={() => router.push(`/Company/Addcompany`)} style={styles.headerIconButton}>
                                <IconSymbol name="chevron.left" size={28} color={companyData.banner ? "#FFF" : "#111"} />
                            </TouchableOpacity>
                            <Text style={[styles.headerTitle, { color: companyData.banner ? "#FFF" : "#111" }]}>Company Details</Text>
                            <TouchableOpacity style={styles.headerIconButton}>
                                <IconSymbol name="pencil" size={24} color={companyData.banner ? "#FFF" : "#111"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Profile & General Info */}
                    <View style={styles.profileSection}>
                        <View style={styles.logoAndTagsRow}>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: companyData.logo }} style={styles.companyImage} />
                            </View>
                            <View style={styles.mainInfoRight}>
                                <Text style={styles.companyName}>{companyData.name}</Text>
                                <View style={styles.badgesRow}>
                                    <View style={[styles.badge, { backgroundColor: '#E0F2FE' }]}>
                                        <Text style={[styles.badgeText, { color: '#0284C7' }]}>{companyData.category}</Text>
                                    </View>
                                    <View style={[styles.badge, { backgroundColor: '#F3E8FF', marginLeft: 8 }]}>
                                        <Text style={[styles.badgeText, { color: '#9333EA' }]}>{companyData.companyType}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {companyData.brandBio ? (
                            <Text style={styles.brandBio}>{companyData.brandBio}</Text>
                        ) : null}

                        {companyData.website ? (
                            <TouchableOpacity onPress={() => handleOpenLink(companyData.website)} style={styles.websiteRow}>
                                <IconSymbol name="link" size={16} color="#2563EB" />
                                <Text style={styles.websiteText}>{companyData.website}</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>

                    {/* Stats Section */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statsCard}>
                            <Text style={styles.statsValue}>{companyData.stats.products}</Text>
                            <Text style={styles.statsLabel}>PRODUCTS</Text>
                        </View>
                        <View style={styles.statsCard}>
                            <Text style={styles.statsValue}>{companyData.stats.orders}</Text>
                            <Text style={styles.statsLabel}>ORDERS</Text>
                        </View>
                    </View>

                    {/* Contact Information */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>CONTACT DETAILS</Text>
                        <View style={styles.card}>
                            <View style={styles.infoRow}>
                                <View style={[styles.iconBox, { backgroundColor: '#EEF2FF' }]}>
                                    <IconSymbol name="envelope.fill" size={20} color="#4F46E5" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>Email</Text>
                                    <Text style={styles.infoValue}>{companyData.email}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <View style={[styles.iconBox, { backgroundColor: '#ECFDF5' }]}>
                                    <IconSymbol name="phone.fill" size={20} color="#059669" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>Phone</Text>
                                    <Text style={styles.infoValue}>{companyData.phone}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.infoRow}>
                                <View style={[styles.iconBox, { backgroundColor: '#FFF7ED' }]}>
                                    <IconSymbol name="mappin.and.ellipse" size={20} color="#EA580C" />
                                </View>
                                <View style={styles.infoContent}>
                                    <Text style={styles.infoLabel}>Address</Text>
                                    <Text style={styles.infoValue}>
                                        {companyData.address.street}, {companyData.address.city}, {companyData.address.state} - {companyData.address.pincode}, {companyData.address.country}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Legal & Business Info */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>LEGAL INFORMATION</Text>
                        <View style={styles.card}>
                            <View style={styles.gridRow}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>GSTIN</Text>
                                    <Text style={styles.gridValue}>{companyData.gstNumber || 'N/A'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>PAN</Text>
                                    <Text style={styles.gridValue}>{companyData.panNumber || 'N/A'}</Text>
                                </View>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.gridRow}>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>CIN</Text>
                                    <Text style={styles.gridValue}>{companyData.cinNumber || 'N/A'}</Text>
                                </View>
                                <View style={styles.gridItem}>
                                    <Text style={styles.gridLabel}>Incorp. Date</Text>
                                    <Text style={styles.gridValue}>{companyData.incorporationDate || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Social Media */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>SOCIAL MEDIA</Text>
                        <View style={styles.socialRow}>
                            {companyData.socials.facebook ? (
                                <TouchableOpacity onPress={() => handleOpenLink(companyData.socials.facebook)} style={styles.socialIcon}>
                                    <IconSymbol name="facebook" size={24} color="#1877F2" />
                                </TouchableOpacity>
                            ) : null}
                            {companyData.socials.instagram ? (
                                <TouchableOpacity onPress={() => handleOpenLink(companyData.socials.instagram)} style={styles.socialIcon}>
                                    <IconSymbol name="camera.fill" size={24} color="#E4405F" />
                                </TouchableOpacity>
                            ) : null}
                            {companyData.socials.linkedin ? (
                                <TouchableOpacity onPress={() => handleOpenLink(companyData.socials.linkedin)} style={styles.socialIcon}>
                                    <IconSymbol name="linkedin" size={24} color="#0A66C2" />
                                </TouchableOpacity>
                            ) : null}
                            {companyData.socials.twitter ? (
                                <TouchableOpacity onPress={() => handleOpenLink(companyData.socials.twitter)} style={styles.socialIcon}>
                                    <IconSymbol name="tornado" size={24} color="#1DA1F2" />
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>

                </ScrollView>

                {/* Footer Button (Optional) */}
                <View style={styles.footer}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: companyData.brandColor }]}>
                        <Text style={styles.actionButtonText}>View Product Catalog</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        marginBottom: -30, // Negative margin to overlap profile section
        zIndex: 1,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    headerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)', // Slight overlay for text readability
        justifyContent: 'flex-start',
    },
    headerToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    headerIconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    scrollContent: {
        paddingTop: 40, // Space for the overlap
        paddingBottom: 100,
    },
    profileSection: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    logoAndTagsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 16,
        backgroundColor: '#F1F5F9',
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        overflow: 'hidden',
    },
    companyImage: {
        width: '100%',
        height: '100%',
    },
    mainInfoRight: {
        flex: 1,
    },
    companyName: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
    },
    badgesRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    brandBio: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 22,
        marginBottom: 16,
    },
    websiteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    websiteText: {
        marginLeft: 8,
        color: '#2563EB',
        fontSize: 14,
        fontWeight: '600',
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24,
        gap: 12,
    },
    statsCard: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    statsValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    statsLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 0.5,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
        marginBottom: 12,
        marginLeft: 4,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center', // Align items to top to handle multi-line address
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginHorizontal: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '500',
        color: '#0F172A',
        lineHeight: 22,
    },
    gridRow: {
        flexDirection: 'row',
        padding: 16,
    },
    gridItem: {
        flex: 1,
    },
    gridLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 4,
    },
    gridValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    socialRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16,
    },
    socialIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(248, 249, 250, 0.95)',
        borderTopWidth: 1,
        borderTopColor: '#E2E8F0',
    },
    actionButton: {
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
    },
});
