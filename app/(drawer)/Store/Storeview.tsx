import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    Platform,

    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';

const { width } = Dimensions.get('window');
const STATUSBAR_HEIGHT =
    Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : Constants.statusBarHeight;

export default function StoreViewScreen() {
    const router = useRouter();

    const storeData = {
        name: 'Downtown Groceries',
        type: 'PREMIUM RETAILER',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop',
        stats: {
            totalPurchases: '$24,580.00',
            ordersCount: '142',
        },
        owner: {
            name: 'John Doe',
            phone: '(555) 012-3456',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
        },
        location: {
            address: '123 Main St, New York, NY 10001',
            details: 'Floor 1, Suite 200',
            mapImage: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=400&auto=format&fit=crop',
        },
        recentOrders: [
            {
                id: 'WH-9821',
                date: 'Oct 24, 2023',
                items: 12,
                amount: '$1,240.00',
                status: 'DELIVERED',
                statusColor: '#16A34A',
                statusBg: '#F0FDF4',
            },
            {
                id: 'WH-9788',
                date: 'Oct 18, 2023',
                items: 5,
                amount: '$450.00',
                status: 'PENDING',
                statusColor: '#D97706',
                statusBg: '#FFFBEB',
            }
        ]
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

                {/* New White Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                        <IconSymbol name="chevron.left" size={28} color="#2563EB" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Store Profile</Text>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <IconSymbol name="more.horizontal" size={28} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Banner Image Section */}
                    <View style={styles.bannerContainer}>
                        <Image source={{ uri: storeData.image }} style={styles.bannerImage} />
                    </View>

                    {/* Content Container */}
                    <View style={styles.contentContainer}>
                        {/* Store Title Section */}
                        <View style={styles.titleSection}>
                            <Text style={styles.storeName}>{storeData.name}</Text>
                            <View style={styles.retailerTypeContainer}>
                                <IconSymbol name="grid.view" size={14} color="#64748B" />
                                <Text style={styles.retailerTypeText}>{storeData.type}</Text>
                            </View>
                        </View>

                        {/* Stats Cards */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>Total Purchases</Text>
                                <Text style={styles.statValue}>{storeData.stats.totalPurchases}</Text>
                            </View>
                            <View style={styles.statCard}>
                                <Text style={styles.statLabel}>Orders Count</Text>
                                <Text style={styles.statValue}>{storeData.stats.ordersCount}</Text>
                            </View>
                        </View>

                        {/* Owner Details Section */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>OWNER DETAILS</Text>
                        </View>
                        <View style={styles.ownerCard}>
                            <View style={styles.ownerAvatarContainer}>
                                <IconSymbol name="person.fill" size={24} color="#2563EB" />
                            </View>
                            <View style={styles.ownerInfo}>
                                <Text style={styles.ownerName}>{storeData.owner.name}</Text>
                                <Text style={styles.ownerPhone}>{storeData.owner.phone}</Text>
                            </View>
                            <TouchableOpacity style={styles.callButton}>
                                <IconSymbol name="phone.fill" size={20} color="#2563EB" />
                            </TouchableOpacity>
                        </View>

                        {/* Location Section */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>LOCATION</Text>
                        </View>
                        <View style={styles.locationCard}>
                            <View style={styles.locationIconContainer}>
                                <IconSymbol name="mappin.and.ellipse" size={24} color="#64748B" />
                            </View>
                            <View style={styles.locationInfo}>
                                <Text style={styles.addressText}>{storeData.location.address}</Text>
                                <Text style={styles.addressSubtext}>{storeData.location.details}</Text>
                            </View>
                        </View>
                        <View style={styles.mapContainer}>
                            <Image source={{ uri: storeData.location.mapImage }} style={styles.mapImage} />
                            <View style={styles.mapCenterPin}>
                                <View style={styles.pinCircle}>
                                    <View style={styles.pinInner} />
                                </View>
                            </View>
                        </View>

                        {/* Recent Orders Section */}
                        <View style={[styles.sectionHeader, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.sectionTitle}>RECENT ORDERS</Text>
                            <TouchableOpacity>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>
                        {storeData.recentOrders.map((order, index) => (
                            <View key={index} style={styles.orderCard}>
                                <View style={styles.orderMainInfo}>
                                    <View>
                                        <Text style={styles.orderId}>Order #{order.id}</Text>
                                        <Text style={styles.orderDate}>{order.date} • {order.items} Items</Text>
                                    </View>
                                    <View style={styles.orderAmountContainer}>
                                        <Text style={styles.orderAmount}>{order.amount}</Text>
                                        <View style={[styles.statusTag, { backgroundColor: order.statusBg }]}>
                                            <Text style={[styles.statusTagText, { color: order.statusColor }]}>{order.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                {/* Fixed Footer */}
                <View style={[styles.footer, { paddingBottom: Platform.OS === 'ios' ? 20 : 25 }]}>
                    <TouchableOpacity style={styles.editButton}>
                        <IconSymbol name="pencil" size={20} color="#FFF" />
                        <Text style={styles.editButtonText}>Edit Store</Text>
                    </TouchableOpacity>
                    <View style={styles.updatedAtContainer}>
                        <IconSymbol name="arrow.triangle.2.circlepath" size={12} color="#94A3B8" />
                        <Text style={styles.updatedAtText}> LAST UPDATED 10M AGO</Text>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingBottom: 150,
    },
    bannerContainer: {
        height: 280,
        width: width,
    },
    bannerImage: {
        width: '100%',
        height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerIconButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    titleSection: {
        marginBottom: 24,
    },
    storeName: {
        fontSize: 28,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 8,
    },
    retailerTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    retailerTypeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748B',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 8,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2563EB',
    },
    sectionHeader: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 1,
    },
    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        paddingVertical: 12,
        marginBottom: 24,
    },
    ownerAvatarContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    ownerInfo: {
        flex: 1,
    },
    ownerName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    ownerPhone: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748B',
    },
    callButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    locationIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    locationInfo: {
        flex: 1,
    },
    addressText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0F172A',
        marginBottom: 2,
    },
    addressSubtext: {
        fontSize: 13,
        fontWeight: '500',
        color: '#94A3B8',
    },
    mapContainer: {
        height: 160,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 32,
        backgroundColor: '#F1F5F9',
    },
    mapImage: {
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    mapCenterPin: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#2563EB',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    orderCard: {
        backgroundColor: '#F8FAFC',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    orderMainInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderId: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    orderDate: {
        fontSize: 13,
        fontWeight: '500',
        color: '#64748B',
    },
    orderAmountContainer: {
        alignItems: 'flex-end',
    },
    orderAmount: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6,
    },
    statusTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusTagText: {
        fontSize: 10,
        fontWeight: '800',
    },
    viewAllText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563EB',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        width: '100%',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
    },
    updatedAtContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    updatedAtText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
});
