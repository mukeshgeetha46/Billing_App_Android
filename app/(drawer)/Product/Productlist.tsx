import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';

import {
    Dimensions,
    FlatList,
    Image,

    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';

const { width } = Dimensions.get('window');

const MOCK_PRODUCTS = [
    {
        id: '1',
        name: 'Organic Whole Bean Coffee - 5kg',
        price: '$45.00',
        sku: 'WH-10293',
        stock: '124 units',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=200&auto=format&fit=crop',
        inStock: true,
    },
    {
        id: '2',
        name: 'Premium Green Tea - 1kg',
        price: '$22.50',
        sku: 'GT-55210',
        stock: '45 units',
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=200&auto=format&fit=crop',
        inStock: true,
    },
    {
        id: '3',
        name: 'Wildflower Honey - Bulk Case',
        price: '$185.00',
        sku: 'HN-90023',
        stock: '12 units',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=200&auto=format&fit=crop',
        inStock: true,
    },
    {
        id: '4',
        name: 'Gourmet Chocolate Assortment',
        price: '$12.75',
        sku: 'CH-33412',
        stock: 'Out of stock',
        image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=200&auto=format&fit=crop',
        inStock: false,
    },
];

export default function ProductListScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const navigation = useNavigation();

    const renderProductItem = ({ item }: { item: typeof MOCK_PRODUCTS[0] }) => (
        <View style={styles.productCard}>
            <View style={styles.cardMainContent}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <Text style={styles.productSku}>SKU: {item.sku}</Text>
                    <Text style={[styles.productStock, !item.inStock && styles.outOfStock]}>
                        Stock: {item.stock}
                    </Text>
                </View>
            </View>

            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.viewButton} onPress={() => router.push(`/Product/Productview`)}>
                    <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={styles.headerButton}>
                    <IconSymbol name="line.3.horizontal" size={28} color="#2563EB" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Products</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <IconSymbol name="slider.horizontal.3" size={24} color="#2563EB" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#64748B" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search products by name or SKU..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Product List */}
            <FlatList
                data={MOCK_PRODUCTS}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Bottom FAB Section */}
            <View style={styles.bottomSection}>
                <View style={styles.addNewContainer}>
                    <View style={styles.addNewLabelBox}>
                        <Text style={styles.addNewText}>Add New Product</Text>
                    </View>
                    <TouchableOpacity style={styles.fab} onPress={() => router.push('/Product/ProductAddform')}>
                        <IconSymbol name="plus" size={28} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
        paddingVertical: 12,
        backgroundColor: '#F8FAFC',
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#0F172A',
    },
    listContent: {
        paddingHorizontal: 0,
        paddingBottom: 100, // Extra space for FAB
    },
    productCard: {
        backgroundColor: '#FFF',
        marginBottom: 1,
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    cardMainContent: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#F1F5F9',
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2563EB',
        marginBottom: 4,
    },
    productSku: {
        fontSize: 13,
        color: '#64748B',
        marginBottom: 2,
    },
    productStock: {
        fontSize: 13,
        color: '#64748B',
    },
    outOfStock: {
        color: '#EF4444',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    viewButton: {
        flex: 1,
        backgroundColor: '#EFF6FF',
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2563EB',
    },
    editButton: {
        flex: 1,
        backgroundColor: '#2563EB',
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#FFF',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        alignItems: 'flex-end',
    },
    addNewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    addNewLabelBox: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    addNewText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
});
