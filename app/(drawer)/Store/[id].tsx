import { useGetStoreByIdQuery } from '@/services/features/stores/storeApi';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreView() {
    const router = useRouter();
    const { id } = useLocalSearchParams();


    const { data: storeData, isLoading, isError } = useGetStoreByIdQuery(id);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (isError || !storeData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>
                    Failed to load store details
                </Text>
            </SafeAreaView>
        );
    }


    const handleCall = () => {
        Linking.openURL(`tel:${storeData.owner.phone}`);
    };

    const handleEmail = () => {
        Linking.openURL('mailto:johndoe@example.com');
    };

    const handleOpenMap = () => {
        const address = `${storeData.address.street}, ${storeData.address.city}`;
        const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
        Linking.openURL(url);
    };

    const handleEditStore = () => {
        // Navigate to edit store screen
        console.log('Edit store details');
    };

    const handleViewHistory = () => {
        // Navigate to full history
        console.log('View full history');
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/Storelist')} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Store Profile</Text>
                    <TouchableOpacity style={styles.moreButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color="#007AFF" />
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {/* Store Image */}
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: storeData.image }} style={styles.storeImage} />
                    </View>

                    {/* Store Info Card */}
                    <View style={styles.card}>
                        {/* Store Name and Type */}
                        <View style={styles.storeNameSection}>
                            <Text style={styles.storeName}>{storeData.name}</Text>
                            <Text style={styles.storeType}>{storeData.type}</Text>
                        </View>

                        {/* Statistics */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>TOTAL PURCHASES</Text>
                                <Text style={styles.statValue}>{storeData.totalPurchases}</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statLabel}>ORDERS COUNT</Text>
                                <Text style={styles.statValue}>{storeData.ordersCount}</Text>
                            </View>
                        </View>

                        {/* Store Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>STORE INFORMATION</Text>
                            <View style={styles.infoGrid}>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>STORE ID</Text>
                                    <Text style={styles.infoValue}>{storeData.storeId}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>REG. DATE</Text>
                                    <Text style={styles.infoValue}>{storeData.regDate}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>GST NO</Text>
                                    <Text style={styles.infoValue}>{storeData.paymentTerms}</Text>
                                </View>
                                <View style={styles.infoItem}>
                                    <Text style={styles.infoLabel}>PAN NO</Text>
                                    <Text style={styles.infoValueHighlight}>{storeData.creditLimit}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Store Address */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>STORE ADDRESS</Text>
                            <View style={styles.addressContainer}>
                                <View style={styles.addressIconContainer}>
                                    <Ionicons name="location-outline" size={24} color="#9CA3AF" />
                                </View>
                                <View style={styles.addressTextContainer}>
                                    <Text style={styles.addressText}>{storeData.address.street}</Text>
                                    <Text style={styles.addressText}>{storeData.address.floor}</Text>
                                    <Text style={styles.addressText}>{storeData.address.city}</Text>
                                </View>
                                <TouchableOpacity onPress={handleOpenMap} style={styles.mapButton}>
                                    <MaterialIcons name="directions" size={24} color="#007AFF" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Owner Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>OWNER DETAILS</Text>
                            <View style={styles.ownerContainer}>
                                <View style={styles.ownerAvatar}>
                                    <Text style={styles.ownerInitials}>{storeData.owner.initials}</Text>
                                </View>
                                <View style={styles.ownerInfo}>
                                    <Text style={styles.ownerLabel}>PRIMARY CONTACT</Text>
                                    <Text style={styles.ownerName}>{storeData.owner.name}</Text>
                                </View>
                            </View>
                            <View style={styles.contactRow}>
                                <Text style={styles.contactLabel}>PHONE NUMBER</Text>
                                <View style={styles.contactActions}>
                                    <Text style={styles.phoneNumber}>{storeData.owner.phone}</Text>
                                    <TouchableOpacity onPress={handleCall} style={styles.contactButton}>
                                        <Ionicons name="call" size={20} color="#007AFF" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleEmail} style={styles.contactButton}>
                                        <Ionicons name="mail" size={20} color="#007AFF" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Recent Activity */}
                        <View style={styles.section}>
                            <View style={styles.activityHeader}>
                                <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
                                <TouchableOpacity onPress={handleViewHistory}>
                                    <Text style={styles.historyLink}>HISTORY</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.activityCard}>
                                <View style={styles.activityRow}>
                                    <View>
                                        <Text style={styles.orderNumber}>Order {storeData.recentActivity.orderNumber}</Text>
                                        <Text style={styles.orderDetails}>
                                            {storeData.recentActivity.date} • {storeData.recentActivity.items} Items
                                        </Text>
                                    </View>
                                    <View style={styles.activityRight}>
                                        <Text style={styles.orderAmount}>{storeData.recentActivity.amount}</Text>
                                        <View style={styles.statusBadge}>
                                            <Text style={styles.statusText}>{storeData.recentActivity.status}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Edit Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditStore}>
                            <MaterialIcons name="edit" size={20} color="#FFFFFF" />
                            <Text style={styles.editButtonText}>Edit Store Details</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
    },
    moreButton: {
        padding: 4,
    },
    scrollView: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: '#E5E7EB',
    },
    storeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    storeNameSection: {
        marginBottom: 24,
    },
    storeName: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    storeType: {
        fontSize: 13,
        fontWeight: '600',
        color: '#007AFF',
        letterSpacing: 0.5,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 20,
        marginBottom: 32,
    },
    statItem: {
        flex: 1,
    },
    statDivider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: 16,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.5,
        marginBottom: 16,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 20,
    },
    infoItem: {
        width: '47%',
    },
    infoLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    infoValueHighlight: {
        fontSize: 15,
        fontWeight: '600',
        color: '#007AFF',
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
    },
    addressIconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    addressTextContainer: {
        flex: 1,
    },
    addressText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#111827',
        lineHeight: 22,
    },
    mapButton: {
        padding: 4,
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    ownerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    ownerInitials: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
    },
    ownerInfo: {
        flex: 1,
    },
    ownerLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    ownerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    contactRow: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
    },
    contactLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#9CA3AF',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    contactActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    phoneNumber: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    contactButton: {
        padding: 8,
    },
    activityHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    historyLink: {
        fontSize: 13,
        fontWeight: '600',
        color: '#007AFF',
        letterSpacing: 0.5,
    },
    activityCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
    },
    activityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderNumber: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 6,
    },
    orderDetails: {
        fontSize: 13,
        color: '#6B7280',
    },
    activityRight: {
        alignItems: 'flex-end',
    },
    orderAmount: {
        fontSize: 17,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    statusBadge: {
        backgroundColor: '#D1FAE5',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#059669',
        letterSpacing: 0.5,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    editButton: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
