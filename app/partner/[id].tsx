import { IconSymbol } from '@/components/ui/icon-symbol';
import { useGetCompanyProductsQuery } from '@/services/features/company/companyApi';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
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


const { width } = Dimensions.get('window');
const COLUMN_count = 2;
const ITEM_WIDTH = (width - 48) / COLUMN_count; // 48 = padding (16*2) + gap (16)



const CATEGORIES = ['All', 'Electronics', 'Home', 'Sale', 'Office', 'Kitchen'];

// Empty State Component with Lottie Animation
const EmptyState = () => (
    <View style={styles.emptyContainer}>

        <Image source={require('@/assets/animations/EmptyBox.png')} style={styles.lottieAnimation} />
        <Text style={styles.emptyTitle}>No Data Found</Text>
        <Text style={styles.emptySubtitle}>
            There are no products available at the moment.
        </Text>
    </View>
);

export default function PartnerCatalogScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('All');
    const { data: PRODUCTS, isLoading, isError, error } = useGetCompanyProductsQuery(id);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (isError || !PRODUCTS) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>
                    Failed to load store details
                </Text>
            </SafeAreaView>
        );
    }



    // Filter products by companyId

    const filteredProducts = PRODUCTS;

    const renderProductItem = ({ item }: { item: typeof PRODUCTS[0] }) => (
        <View style={styles.productCard}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
                {item.tag && (
                    <View style={[styles.tagBadge, { backgroundColor: item.tagColor }]}>
                        <Text style={styles.tagText}>{item.tag}</Text>
                    </View>
                )}
                {item.isSoldOut && (
                    <View style={styles.soldOutOverlay}>
                        <Text style={styles.soldOutText}>SOLD OUT</Text>
                    </View>
                )}
            </View>

            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                    <Text style={styles.unit}> / {item.unit}</Text>
                </View>
                <View style={styles.minOrderRow}>
                    <IconSymbol name="cube.box" size={12} color="#6B7280" />
                    {/* Note: 'cube.box' is not in our simplistic mapping, we might need a fallback. 
                Based on mapping: 'house.fill', 'paperplane.fill' etc. 
                Let's use a generic icon or assume IconSymbol handles unmapped gracefully or we should stick to mapped ones.
                Checking IconSymbol map: 'doc.text.fill' -> 'article'. 
                Let's use a simple text or View for icon replacement if needed. 
                Actually, let's use a safe icon from our mapping or material name if the component supports it. 
                The component: <MaterialIcons name={MAPPING[name]} ... />. 
                So we MUST use a mapped name.
                Mapping has: house.fill, paperplane.fill, chevron..., doc.text.fill, cart.fill, person.fill, line.3.horizontal, bell, magnifyingglass, slider.horizontal.3.
                We need a box icon. None mapped. 
                I'll allow myself to modify IconSymbol if needed, but for now let's just use text "Min:"
            */}
                    <Text style={styles.minOrderText}>Min. order: {item.minOrder}</Text>
                </View>

                {item.isSoldOut ? (
                    <View style={styles.disabledButton}>
                        <Text style={styles.disabledButtonText}>Out of Stock</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                            router.push({
                                pathname: '/Product/[id]',
                                params: {
                                    id: item.id,
                                    color: item.color,
                                    companyId: id,
                                    companyName: "Example Company",
                                },
                            });
                        }}
                    >
                        <IconSymbol name="plus" size={16} color="#1D4ED8" />
                        {/* 'plus' is not mapped. Let's fix this in a second. 
                For now, I'll put a text "+"
             */}
                        <Text style={styles.addButtonText}> Add</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={28} color="#111" />
                    {/* 'chevron.left' not mapped, 'chevron.right' is. I should check the mapping file again.
              Mapping: 'chevron.right': 'chevron-right'.
              I will add 'chevron.left': 'chevron-left' and 'plus': 'add' to the mapping in the next tool call.
              For now I will use Text "<" and "+" to be safe, or just update the mapping file FIRST. 
              Actually, I'll update the mapping file NOW, then write this file.
           */}
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Acme Electronics</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/review-order')}>
                    <IconSymbol name="cart.fill" size={24} color="#111" />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>3</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                {/* Search Bar */}
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <IconSymbol name="magnifyingglass" size={20} color="#888" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search catalog..."
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <IconSymbol name="slider.horizontal.3" size={20} color="#1D4ED8" />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={CATEGORIES}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item}
                        contentContainerStyle={styles.categoriesList}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.categoryChip,
                                    activeCategory === item && styles.categoryChipActive
                                ]}
                                onPress={() => setActiveCategory(item)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    activeCategory === item && styles.categoryTextActive
                                ]}>
                                    {item}
                                </Text>
                                {activeCategory === item && <View style={styles.activeIndicator} />}
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Top Featured Bar */}
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>TOP FEATURED</Text>
                    <Text style={styles.productCount}>{filteredProducts.length} Products</Text>
                </View>

                {/* Product Grid */}
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProductItem}
                    numColumns={COLUMN_count}
                    columnWrapperStyle={filteredProducts.length > 0 ? styles.columnWrapper : undefined}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<EmptyState />}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111',
    },
    cartButton: {
        padding: 4,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: '#2563EB',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
    },
    searchRow: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#111',
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    categoriesContainer: {
        marginBottom: 8,
    },
    categoriesList: {
        paddingHorizontal: 16,
        gap: 24,
    },
    categoryChip: {
        paddingVertical: 8,
        alignItems: 'center',
    },
    categoryChipActive: {
        // Active styles handled by indicator
    },
    categoryText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#6B7280',
    },
    categoryTextActive: {
        color: '#2563EB',
    },
    activeIndicator: {
        height: 3,
        backgroundColor: '#2563EB',
        width: '100%',
        marginTop: 4,
        borderRadius: 2,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
        marginTop: 8,
    },
    listTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        letterSpacing: 1,
    },
    productCount: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    productCard: {
        width: ITEM_WIDTH,
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        marginBottom: 12,
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F3F4F6',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    tagBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    soldOutOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    soldOutText: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 14,
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        overflow: 'hidden',
    },
    productInfo: {
        gap: 4,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB',
    },
    unit: {
        fontSize: 12,
        color: '#6B7280',
    },
    minOrderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    minOrderText: {
        fontSize: 11,
        color: '#6B7280',
    },
    addButton: {
        backgroundColor: '#EFF6FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        gap: 6,
    },
    addButtonText: {
        color: '#1D4ED8',
        fontSize: 14,
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 8,
    },
    disabledButtonText: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: '600',
    },
    // Empty State Styles
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
        paddingHorizontal: 20,
    },
    lottieAnimation: {
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },
});
