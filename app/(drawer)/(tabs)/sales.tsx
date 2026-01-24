import { useNavigation } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { IconSymbol } from '../../../components/ui/icon-symbol';

const MOCK_SALES = [
    {
        id: '1',
        date: 'Oct 24, 2023',
        time: '10:45 AM',
        customer: 'Organic Foods Co.',
        item: 'Whole Grain Wheat',
        additionalItems: 4,
        totalItems: 5,
        total: 285.50,
        status: 'PAID',
        icon: 'cart' as const,
    },
    {
        id: '2',
        date: 'Oct 24, 2023',
        time: '09:12 AM',
        customer: 'Main St. Grocery',
        item: 'Dairy Fresh Milk 2%',
        additionalItems: 12,
        totalItems: 13,
        total: 1240.00,
        status: 'PENDING',
        icon: 'truck' as const,
    },
    {
        id: '3',
        date: 'Oct 23, 2023',
        time: '04:30 PM',
        customer: 'QuickMart',
        item: 'Organic Large Eggs (Dozen)',
        qty: 40,
        unitPrice: 3.75,
        totalItems: 1,
        total: 150.00,
        status: 'PAID',
        icon: 'drop' as const,
    },
    {
        id: '4',
        date: 'Oct 23, 2023',
        time: '11:20 AM',
        customer: 'City Market',
        item: 'Assorted Snacks Case',
        additionalItems: 2,
        totalItems: 3,
        total: 620.00,
        status: 'CANCELLED',
        icon: 'square.grid.2x2' as const,
    },
];

type SalesStatus = 'PAID' | 'PENDING' | 'CANCELLED';

export default function SalesScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const renderTransactionItem = ({ item }: { item: typeof MOCK_SALES[0] }) => {
        const statusColors: Record<SalesStatus, { bg: string; text: string }> = {
            PAID: { bg: '#E6FAF1', text: '#10B981' },
            PENDING: { bg: '#FFF7ED', text: '#F59E0B' },
            CANCELLED: { bg: '#FEF2F2', text: '#EF4444' },
        };
        const currentStatus = statusColors[item.status as SalesStatus] || statusColors.PAID;

        const displayName = item.additionalItems
            ? `${item.item} and ${item.additionalItems} ...`
            : item.item;

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.dateTime}>{item.date} • {item.time}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: currentStatus.bg }]}>
                        <Text style={[styles.statusText, { color: currentStatus.text }]}>{item.status}</Text>
                    </View>
                </View>

                <Text style={styles.customerName}>{item.customer}</Text>

                <TouchableOpacity style={styles.itemRow} activeOpacity={0.7}>
                    <View style={styles.itemIconContainer}>
                        <IconSymbol name={item.icon} size={22} color="#64748B" />
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName} numberOfLines={1}>{displayName}</Text>
                        <Text style={styles.itemDetails}>
                            {item.additionalItems
                                ? `Total Items: ${item.totalItems}`
                                : `Qty: ${item.qty} | Unit: $${(item.unitPrice || 0).toFixed(2)}`}
                        </Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Text style={styles.itemTotal}>${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                        <IconSymbol name="chevron.right" size={18} color="#94A3B8" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.viewDetailsButton} onPress={() => router.push('/Saleslist')}>
                    <Text style={styles.viewDetailsText}>VIEW DETAILS</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />
            <Stack.Screen options={{ headerShown: false }} />



            {/* Search */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#94A3B8" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search items or transactions"
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Date Filters */}
            <View style={styles.dateFilterContainer}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>FROM</Text>
                    <Text style={styles.dateValue}>Oct 01, 2023</Text>
                </View>
                <View style={styles.dateBox}>
                    <Text style={styles.dateLabel}>TO</Text>
                    <Text style={styles.dateValue}>Oct 31, 2023</Text>
                </View>
            </View>

            <FlatList
                data={MOCK_SALES}
                renderItem={renderTransactionItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {/* Footer */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.totalSalesLabel}>TOTAL SALES (FILTERED)</Text>
                    <Text style={styles.totalSalesValue}>$1,100.00</Text>
                </View>
                <TouchableOpacity style={styles.exportButton}>
                    <Text style={styles.exportButtonText}>Export Report</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
        flex: 1,
        marginLeft: 8,
    },
    headerRight: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 16,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#0F172A',
    },
    dateFilterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    dateBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    dateLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
    },
    dateValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#0F172A',
    },
    listContainer: {
        padding: 16,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateTime: {
        fontSize: 13,
        color: '#94A3B8',
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '800',
    },
    customerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2563EB',
        marginBottom: 16,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        padding: 12,
        borderRadius: 14,
        marginBottom: 12,
    },
    itemIconContainer: {
        width: 44,
        height: 44,
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 2,
    },
    itemDetails: {
        fontSize: 13,
        color: '#64748B',
    },
    itemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    itemTotal: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
    },
    viewDetailsButton: {
        marginTop: 4,
    },
    viewDetailsText: {
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 10,
    },
    totalSalesLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        marginBottom: 4,
    },
    totalSalesValue: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2563EB',
    },
    exportButton: {
        backgroundColor: '#1E6BF2',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        shadowColor: '#1E6BF2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    exportButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
