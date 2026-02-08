import { useGetstoreQuery } from '@/services/features/stores/storeApi';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../components/ui/icon-symbol';


const STATUSBAR_HEIGHT =
    Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : Constants.statusBarHeight;

export default function StoreListScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const { data: STORES, isLoading, error } = useGetstoreQuery();
    const renderStoreItem = ({ item }: { item: typeof STORES[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Image source={{ uri: item.image }} style={styles.storeImage} />
                <View style={styles.storeDetails}>
                    <Text style={styles.storeName}>{item.name}</Text>
                    <View style={styles.detailRow}>
                        <IconSymbol name="person.fill" size={14} color="#64748B" />
                        <Text style={styles.detailText}>{item.owner} • {item.phone}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <IconSymbol name="mappin.and.ellipse" size={14} color="#64748B" />
                        <Text style={styles.detailText}>{item.address}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <IconSymbol name="pencil" size={18} color="#2563EB" />
                    <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.detailsButton]} onPress={() => router.push(`/Store/${item.id}`)}>
                    <IconSymbol name="eye" size={18} color="#64748B" />
                    <Text style={[styles.actionButtonText, styles.detailsButtonText]}>View Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar barStyle="dark-content" />

                {/* Header */}
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerIconButton}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <IconSymbol name="line.3.horizontal" size={28} color="#1E293B" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Manage Stores</Text>

                    <TouchableOpacity style={styles.headerIconButton}>
                        <IconSymbol name="slider.horizontal.3" size={24} color="#1E293B" />
                    </TouchableOpacity>
                </View>


                {/* Search Bar */}
                <View style={styles.searchSection}>
                    <View style={styles.searchBar}>
                        <IconSymbol name="magnifyingglass" size={20} color="#94A3B8" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search by store name or location"
                            placeholderTextColor="#94A3B8"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                </View>

                {/* Stores List */}
                <FlatList
                    data={STORES}
                    renderItem={renderStoreItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />

                {/* Floating Action Button */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => router.push('/Store/Newstore')}
                >
                    <IconSymbol name="plus" size={32} color="#FFF" />
                </TouchableOpacity>

                {/* Sync Footer */}
                <View style={styles.footer}>
                    <IconSymbol name="arrow.triangle.2.circlepath" size={16} color="#94A3B8" />
                    <Text style={styles.footerText}>LAST SYNCED 2M AGO</Text>
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    searchSection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1E293B',
    },
    listContent: {
        paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 100, // Space for FAB and footer
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    storeImage: {
        width: 68,
        height: 68,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    storeDetails: {
        flex: 1,
        marginLeft: 16,
    },
    storeName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        gap: 6,
    },
    detailText: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF2FF',
        paddingVertical: 12,
        borderRadius: 10,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2563EB',
    },
    detailsButton: {
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    detailsButtonText: {
        color: '#64748B',
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#FFF',
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    footerText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
});
