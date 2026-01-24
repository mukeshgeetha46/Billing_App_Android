import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { IconSymbol } from '../../../components/ui/icon-symbol';

const STATUSBAR_HEIGHT =
    Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : Constants.statusBarHeight;

export default function CompanyViewScreen() {
    const router = useRouter();

    const companyData = {
        name: 'Global Electronics',
        category: 'ELECTRONICS & TECH',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=400&auto=format&fit=crop',
        stats: {
            products: '1,240',
            orders: '4,892',
        },
        businessInfo: [
            {
                label: 'BUSINESS REGISTRATION',
                value: 'BRN-2024-987654321',
                icon: 'grid.view',
                iconBg: '#EBF2FF',
                iconColor: '#2563EB',
            },
            {
                label: 'OFFICE ADDRESS',
                value: '128 Tech Plaza, Innovation District, CA 94103, USA',
                icon: 'mappin.and.ellipse',
                iconBg: '#FFF7ED',
                iconColor: '#EA580C',
            },
            {
                label: 'CONTACT EMAIL',
                value: 'sales@globalelectronics.com',
                icon: 'mail',
                iconBg: '#F0FDF4',
                iconColor: '#16A34A',
            },
            {
                label: 'PRIMARY CONTACT',
                value: 'Sarah J. Henderson',
                icon: 'person.fill',
                iconBg: '#FAF5FF',
                iconColor: '#9333EA',
            },
        ],
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                <View style={[styles.header, { paddingTop: STATUSBAR_HEIGHT }]}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                        <IconSymbol name="chevron.left" size={28} color="#2563EB" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Company Details</Text>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <IconSymbol name="pencil" size={24} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Profile Section */}
                    <View style={styles.profileSection}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: companyData.image }} style={styles.companyImage} />
                        </View>
                        <Text style={styles.companyName}>{companyData.name}</Text>
                        <Text style={styles.companyCategory}>{companyData.category}</Text>
                    </View>

                    {/* Stats Section */}
                    <View style={styles.statsContainer}>
                        <View style={styles.statsCard}>
                            <Text style={styles.statsValue}>{companyData.stats.products}</Text>
                            <Text style={styles.statsLabel}>TOTAL PRODUCTS</Text>
                        </View>
                        <View style={styles.statsCard}>
                            <Text style={styles.statsValue}>{companyData.stats.orders}</Text>
                            <Text style={styles.statsLabel}>TOTAL ORDERS</Text>
                        </View>
                    </View>

                    {/* Business Information */}
                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>BUSINESS INFORMATION</Text>
                        <View style={styles.infoList}>
                            {companyData.businessInfo.map((info, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.infoItem,
                                        index !== companyData.businessInfo.length - 1 && styles.infoItemBorder
                                    ]}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: info.iconBg }]}>
                                        <IconSymbol name={info.icon as any} size={20} color={info.iconColor} />
                                    </View>
                                    <View style={styles.infoContent}>
                                        <Text style={styles.infoLabel}>{info.label}</Text>
                                        <Text style={styles.infoValue}>{info.value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.catalogButton}>
                        <Text style={styles.catalogButtonText}>View Catalog</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#FFF',
    },
    headerIconButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    profileSection: {
        alignItems: 'center',
        paddingVertical: 24,
        backgroundColor: '#FFF',
    },
    imageContainer: {
        width: 120,
        height: 120,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
        overflow: 'hidden',
    },
    companyImage: {
        width: '100%',
        height: '100%',
    },
    companyName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 4,
    },
    companyCategory: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
        letterSpacing: 0.5,
    },
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginTop: 24,
        gap: 16,
    },
    statsCard: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignItems: 'center',
    },
    statsValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2563EB',
        marginBottom: 4,
    },
    statsLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        letterSpacing: 0.5,
    },
    infoSection: {
        marginTop: 32,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#475569',
        letterSpacing: 1,
        marginBottom: 16,
    },
    infoList: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoItem: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    infoItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
        lineHeight: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: 'rgba(248, 249, 250, 0.9)',
    },
    catalogButton: {
        backgroundColor: '#1D4ED8',
        height: 58,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1D4ED8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    catalogButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
    },
});
