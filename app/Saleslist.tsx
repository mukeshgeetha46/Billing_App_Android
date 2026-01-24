import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const SalesList = () => {
    const router = useRouter();

    const items = [
        {
            id: '1',
            name: 'Whole Grain Wheat Flour',
            qty: 10,
            price: 14.5,
            total: 145.0,
            sku: 'WGW-001',
            icon: 'package-variant-closed',
        },
        {
            id: '2',
            name: 'Organic Large Eggs (Dozen)',
            qty: 20,
            price: 3.75,
            total: 75.0,
            sku: 'OEG-122',
            icon: 'egg-outline',
        },
        {
            id: '3',
            name: 'Fresh Almond Milk (1L)',
            qty: 6,
            price: 5.0,
            total: 30.0,
            sku: 'ALM-342',
            icon: 'water-outline',
        },
        {
            id: '4',
            name: 'Assorted Raw Nuts Case',
            qty: 1,
            price: 25.0,
            total: 25.0,
            sku: 'NUT-CASE-9',
            icon: 'nut',
        },
        {
            id: '5',
            name: 'Sourdough Loaves',
            qty: 3,
            price: 3.5,
            total: 10.5,
            sku: 'BAK-SRD-2',
            icon: 'bread-slice-outline',
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={24} color="#2563EB" />
                    </TouchableOpacity>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.orderId}>Order #SO-92834</Text>
                        <Text style={styles.orderDate}>OCT 24, 2023 • 10:45 AM</Text>
                    </View>
                    <View style={styles.paidBadge}>
                        <Text style={styles.paidText}>PAID</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Store Info */}
                    <View style={styles.storeContainer}>
                        <View style={styles.storeTextContent}>
                            <Text style={styles.storeName}>Organic Foods Co.</Text>
                            <View style={styles.infoRow}>
                                <Ionicons name="location-outline" size={16} color="#6B7280" />
                                <Text style={styles.infoText}>882 Market St, San Francisco, CA</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Ionicons name="call-outline" size={16} color="#6B7280" />
                                <Text style={styles.infoText}>(555) 123-4567</Text>
                            </View>
                        </View>
                        <View style={styles.storeIconBox}>
                            <MaterialCommunityIcons name="storefront-outline" size={32} color="#2563EB" />
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="chatbubble-outline" size={18} color="#1F2937" />
                            <Text style={styles.actionButtonText}>Contact Store</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Ionicons name="print-outline" size={18} color="#1F2937" />
                            <Text style={styles.actionButtonText}>Print Invoice</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Order Summary Header */}
                    <View style={styles.summaryHeader}>
                        <Text style={styles.summaryHeaderText}>ORDER SUMMARY (5 ITEMS)</Text>
                    </View>

                    {/* Items List */}
                    {items.map((item) => (
                        <View key={item.id} style={styles.itemRow}>
                            <View style={styles.itemIconBox}>
                                <MaterialCommunityIcons name={item.icon as any} size={24} color="#9CA3AF" />
                            </View>
                            <View style={styles.itemDetails}>
                                <View style={styles.itemMainRow}>
                                    <Text style={styles.itemName}>{(item.name)}</Text>
                                    <Text style={styles.itemTotalPrice}>${item.total.toFixed(2)}</Text>
                                </View>
                                <View style={styles.itemSubRow}>
                                    <Text style={styles.itemQtyPrice}>
                                        Qty: {item.qty} × ${item.price.toFixed(2)}
                                    </Text>
                                    <Text style={styles.itemSku}>SKU: {item.sku}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Totals */}
                    <View style={styles.totalsContainer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Subtotal</Text>
                            <Text style={styles.totalValue}>$285.50</Text>
                        </View>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Tax (9.5%)</Text>
                            <Text style={styles.totalValue}>$24.27</Text>
                        </View>
                    </View>
                </ScrollView>

                {/* Footer Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.downloadButton}>
                        <Ionicons name="download-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.downloadButtonText}>Download Invoice (PDF)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backButton: {
        padding: 4,
        marginRight: 12,
    },
    headerTitleContainer: {
        flex: 1,
    },
    orderId: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    orderDate: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
    paidBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 16,
    },
    paidText: {
        color: '#166534',
        fontSize: 12,
        fontWeight: '600',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    storeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },
    storeTextContent: {
        flex: 1,
    },
    storeName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    infoText: {
        fontSize: 14,
        color: '#6B7280',
        marginLeft: 6,
    },
    storeIconBox: {
        width: 56,
        height: 56,
        backgroundColor: '#EFF6FF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 12,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1F2937',
    },
    summaryHeader: {
        backgroundColor: '#F9FAFB',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
    },
    summaryHeaderText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9CA3AF',
        letterSpacing: 0.5,
    },
    itemRow: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        alignItems: 'center',
    },
    itemIconBox: {
        width: 48,
        height: 48,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    itemMainRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    itemName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        flex: 1,
        marginRight: 8,
    },
    itemTotalPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#111827',
    },
    itemSubRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    itemQtyPrice: {
        fontSize: 13,
        color: '#6B7280',
    },
    itemSku: {
        fontSize: 11,
        color: '#9CA3AF',
    },
    totalsContainer: {
        padding: 16,
        gap: 8,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 15,
        color: '#6B7280',
    },
    totalValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    downloadButton: {
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    downloadButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default SalesList;
