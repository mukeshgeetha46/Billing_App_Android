import { useGetProductByIdQuery } from '@/services/features/product/productApi';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';

const { width } = Dimensions.get('window');



export default function ProductViewScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setActiveImageIndex(viewableItems[0].index || 0);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    const { data: MOCK_PRODUCT, isLoading, isError } = useGetProductByIdQuery(id);
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (isError || !MOCK_PRODUCT) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>
                    Failed to load store details
                </Text>
            </SafeAreaView>
        );
    }
    const renderImageItem = ({ item }: { item: string }) => (
        <View style={styles.imageSlide}>
            <Image source={{ uri: item }} style={styles.productImage} />
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Image Gallery Section */}
                <View style={styles.imageContainer}>
                    <FlatList
                        ref={flatListRef}
                        data={MOCK_PRODUCT.images}
                        renderItem={renderImageItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onViewableItemsChanged={onViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                    />

                    {/* Back Button */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={24} color="#FFF" />
                    </TouchableOpacity>

                    {/* Pagination Dots */}
                    <View style={styles.paginationContainer}>
                        {MOCK_PRODUCT.images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.paginationDot,
                                    index === activeImageIndex && styles.paginationDotActive
                                ]}
                            />
                        ))}
                    </View>

                    {/* Image Counter */}
                    <View style={styles.imageCounter}>
                        <Text style={styles.imageCounterText}>
                            {activeImageIndex + 1} / {MOCK_PRODUCT.images.length}
                        </Text>
                    </View>
                </View>

                {/* Info Section */}
                <View style={styles.infoContainer}>
                    <Text style={styles.categoryText}>{MOCK_PRODUCT.category}</Text>
                    <Text style={styles.productName}>{MOCK_PRODUCT.name}</Text>
                    <Text style={styles.skuText}>SKU: {MOCK_PRODUCT.sku}</Text>

                    {/* Inventory & Pricing Card */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>INVENTORY & PRICING</Text>
                    </View>

                    <View style={styles.card}>
                        {/* Price Row */}
                        <View style={styles.cardRow}>
                            <View style={styles.iconContainer}>
                                <IconSymbol name="banknote" size={20} color="#2563EB" />
                            </View>
                            <View style={styles.priceInfo}>
                                <Text style={styles.label}>Wholesale Price</Text>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.mainPrice}>{MOCK_PRODUCT.wholesalePrice}</Text>
                                    <Text style={styles.unitText}> / unit</Text>
                                </View>
                            </View>
                            <View style={styles.msrpInfo}>
                                <Text style={styles.msrpLabel}>MSRP</Text>
                                <Text style={styles.msrpValue}>{MOCK_PRODUCT.msrp}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Stock Row */}
                        <View style={styles.cardRow}>
                            <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
                                <IconSymbol name="cube.box" size={20} color="#16A34A" />
                            </View>
                            <View style={styles.stockInfo}>
                                <Text style={styles.label}>Current Stock</Text>
                                <Text style={styles.stockValue}>{MOCK_PRODUCT.stock}</Text>
                            </View>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>{MOCK_PRODUCT.status}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Description Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>PRODUCT DESCRIPTION</Text>
                    </View>
                    <Text style={styles.descriptionText}>{MOCK_PRODUCT.description}</Text>

                    {/* Features List */}
                    <View style={styles.featuresList}>
                        {MOCK_PRODUCT.features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <IconSymbol name="checkmark" size={16} color="#2563EB" />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Sticky Footer */}
            <SafeAreaView edges={['bottom']} style={styles.footer}>
                <TouchableOpacity style={styles.editButton}>
                    <IconSymbol name="pencil" size={20} color="#FFF" style={styles.editIcon} />
                    <Text style={styles.editButtonText}>Edit Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.moreButton}>
                    <IconSymbol name="more.horizontal" size={24} color="#64748B" />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 100, // Space for the footer
    },
    imageContainer: {
        width: width,
        height: width * 0.8,
        position: 'relative',
    },
    imageSlide: {
        width: width,
        height: width * 0.8,
    },
    productImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    paginationDotActive: {
        width: 24,
        backgroundColor: '#FFFFFF',
    },
    imageCounter: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    imageCounterText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    infoContainer: {
        padding: 24,
    },
    categoryText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563EB',
        letterSpacing: 1,
        marginBottom: 8,
    },
    productName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#0F172A',
        lineHeight: 32,
        marginBottom: 8,
    },
    skuText: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 24,
    },
    sectionHeader: {
        marginTop: 8,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#94A3B8',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    card: {
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#F1F5F9',
        marginBottom: 24,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    priceInfo: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 2,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    mainPrice: {
        fontSize: 20,
        fontWeight: '800',
        color: '#2563EB',
    },
    unitText: {
        fontSize: 12,
        color: '#94A3B8',
    },
    msrpInfo: {
        alignItems: 'flex-end',
    },
    msrpLabel: {
        fontSize: 11,
        color: '#94A3B8',
        fontWeight: '600',
    },
    msrpValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E2E8F0',
        marginVertical: 16,
    },
    stockInfo: {
        flex: 1,
    },
    stockValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    statusBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#16A34A',
    },
    descriptionText: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 20,
    },
    featuresList: {
        gap: 12,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    featureText: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '500',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#1D4ED8',
        height: 56,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    editIcon: {
        marginRight: 4,
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFF',
    },
    moreButton: {
        width: 56,
        height: 56,
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
