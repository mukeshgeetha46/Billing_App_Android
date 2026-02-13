import { IconSymbol } from '@/components/ui/icon-symbol';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = [
    { id: '1', name: 'Saddle Brown', color: '#4B3621' },
    { id: '2', name: 'Charcoal', color: '#262626' },
    { id: '3', name: 'Terracotta', color: '#A0522D' },
    { id: '4', name: 'Tan', color: '#D2B48C' },
    { id: '5', name: 'Cream', color: '#F5F5DC' },
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const PRODUCT_DATA = {
    id: '1',
    name: 'Artisan Leather Tote',
    brand: 'Heritage Goods Co.',
    price: 45.00,
    msrp: 60.00,
    minOrder: 12,
    unitsPerCase: 1,
    description: 'Hand-stitched from premium full-grain Italian leather. This durable tote features a spacious main compartment, internal pocket for organization, and reinforced handles designed for daily wholesale distribution.',
    specs: {
        Material: 'Full Grain Leather',
        SKU: 'HG-TOTE-SADL',
        Dimensions: '16" x 12" x 5"',
        Weight: '1.2 lbs / unit',
    },
    images: [
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=800&auto=format&fit=crop&q=80',
    ],
};

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState(COLORS[0]);
    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(12);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const totalPrice = (PRODUCT_DATA.price * quantity).toFixed(2);

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.headerIconButton}>
                <IconSymbol name="chevron.left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Product Details</Text>
            <TouchableOpacity style={styles.headerIconButton}>
                <IconSymbol name="cart.fill" size={24} color="#000" />
            </TouchableOpacity>
        </View>
    );

    const onScroll = (event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        setActiveImageIndex(Math.round(index));
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <Stack.Screen options={{ headerShown: false }} />

            {renderHeader()}

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Image Carousel */}
                <View style={styles.imageSection}>
                    <FlatList
                        data={PRODUCT_DATA.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={onScroll}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={styles.productImage} resizeMode="cover" />
                        )}
                    />
                    <View style={styles.paginationDots}>
                        {PRODUCT_DATA.images.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    activeImageIndex === index && styles.activeDot
                                ]}
                            />
                        ))}
                    </View>
                </View>

                {/* Product Info */}
                <View style={styles.infoSection}>
                    <View style={styles.titleRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.productTitle}>{PRODUCT_DATA.name}</Text>
                            <TouchableOpacity>
                                <Text style={styles.brandText}>{PRODUCT_DATA.brand}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.stockBadge}>
                            <Text style={styles.stockText}>IN STOCK</Text>
                        </View>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.priceText}>${PRODUCT_DATA.price.toFixed(2)}</Text>
                        <Text style={styles.unitText}> / unit</Text>
                        <Text style={styles.msrpText}>${PRODUCT_DATA.msrp.toFixed(2)} MSRP</Text>
                    </View>
                    <Text style={styles.minOrderSubtext}>Min. Order: {PRODUCT_DATA.minOrder} units (1 case)</Text>

                    <View style={styles.divider} />

                    {/* Color Selector */}
                    <Text style={styles.sectionTitle}>SELECT COLOR</Text>
                    <View style={styles.colorRow}>
                        {COLORS.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => setSelectedColor(item)}
                                style={[
                                    styles.colorCircleWrapper,
                                    selectedColor.id === item.id && styles.selectedColorWrapper
                                ]}
                            >
                                <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.selectedColorText}>
                        Selected: <Text style={{ color: '#111827' }}>{selectedColor.name}</Text>
                    </Text>

                    <View style={styles.divider} />

                    {/* Size Selector */}
                    <Text style={styles.sectionTitle}>SELECT SIZE</Text>
                    <View style={styles.sizeRow}>
                        {SIZES.map((size) => (
                            <TouchableOpacity
                                key={size}
                                onPress={() => setSelectedSize(size)}
                                style={[
                                    styles.sizeChip,
                                    selectedSize === size && styles.selectedSizeChip
                                ]}
                            >
                                <Text style={[
                                    styles.sizeText,
                                    selectedSize === size && styles.selectedSizeText
                                ]}>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.divider} />

                    {/* Quantity Selector */}
                    <View style={styles.quantityRow}>
                        <Text style={styles.sectionTitle}>QUANTITY</Text>
                        <TouchableOpacity>
                            <Text style={styles.bulkDiscountText}>Bulk discount at 50+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepperContainer}>
                        <TouchableOpacity
                            style={styles.stepperButton}
                            onPress={() => setQuantity(Math.max(PRODUCT_DATA.minOrder, quantity - 1))}
                        >
                            <IconSymbol name="minus" size={20} color="#2563EB" />
                        </TouchableOpacity>
                        <Text style={styles.quantityValue}>{quantity}</Text>
                        <TouchableOpacity
                            style={styles.stepperButton}
                            onPress={() => setQuantity(quantity + 1)}
                        >
                            <IconSymbol name="plus" size={20} color="#2563EB" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* Product Details */}
                    <Text style={styles.sectionTitle}>PRODUCT DETAILS</Text>
                    <Text style={styles.descriptionText}>{PRODUCT_DATA.description}</Text>

                    <View style={styles.specTable}>
                        <View style={styles.specRow}>
                            <View style={styles.specColumn}>
                                <Text style={styles.specLabel}>Material</Text>
                                <Text style={styles.specValue}>{PRODUCT_DATA.specs.Material}</Text>
                            </View>
                            <View style={styles.specColumn}>
                                <Text style={styles.specLabel}>SKU</Text>
                                <Text style={styles.specValue}>{PRODUCT_DATA.specs.SKU}</Text>
                            </View>
                        </View>
                        <View style={styles.specRow}>
                            <View style={styles.specColumn}>
                                <Text style={styles.specLabel}>Dimensions</Text>
                                <Text style={styles.specValue}>{PRODUCT_DATA.specs.Dimensions}</Text>
                            </View>
                            <View style={styles.specColumn}>
                                <Text style={styles.specLabel}>Weight</Text>
                                <Text style={styles.specValue}>{PRODUCT_DATA.specs.Weight}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View style={styles.bottomBar}>
                <View>
                    <Text style={styles.totalPriceLabel}>TOTAL PRICE</Text>
                    <Text style={styles.totalPriceValue}>${totalPrice}</Text>
                </View>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => router.push('/review-order')}
                >
                    <IconSymbol name="cart.fill" size={20} color="#FFF" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    headerIconButton: {
        padding: 4,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    imageSection: {
        width: width,
        height: width * 0.8,
        position: 'relative',
    },
    productImage: {
        width: width,
        height: width * 0.8,
    },
    paginationDots: {
        position: 'absolute',
        bottom: 16,
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 6,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    activeDot: {
        backgroundColor: '#FFF',
        width: 20,
    },
    infoSection: {
        padding: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    brandText: {
        fontSize: 16,
        color: '#2563EB',
        fontWeight: '500',
    },
    stockBadge: {
        backgroundColor: '#DCFCE7',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
    },
    stockText: {
        color: '#166534',
        fontSize: 12,
        fontWeight: '700',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 12,
    },
    priceText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
    },
    unitText: {
        fontSize: 14,
        color: '#6B7280',
    },
    msrpText: {
        fontSize: 12,
        color: '#9CA3AF',
        marginLeft: 8,
        textDecorationLine: 'line-through',
    },
    minOrderSubtext: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#6B7280',
        letterSpacing: 1,
        marginBottom: 16,
    },
    colorRow: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 12,
    },
    colorCircleWrapper: {
        padding: 2,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedColorWrapper: {
        borderColor: '#2563EB',
    },
    colorCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    selectedColorText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
    },
    sizeRow: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    sizeChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#FFF',
        minWidth: 50,
        alignItems: 'center',
    },
    selectedSizeChip: {
        borderColor: '#2563EB',
        backgroundColor: '#EFF6FF',
    },
    sizeText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
    },
    selectedSizeText: {
        color: '#2563EB',
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bulkDiscountText: {
        fontSize: 13,
        color: '#2563EB',
        fontWeight: '500',
    },
    stepperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 4,
        width: 150,
        justifyContent: 'space-between',
    },
    stepperButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        color: '#4B5563',
        marginBottom: 20,
    },
    specTable: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        padding: 16,
        gap: 16,
    },
    specRow: {
        flexDirection: 'row',
    },
    specColumn: {
        flex: 1,
    },
    specLabel: {
        fontSize: 12,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    specValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingBottom: 34, // Safe area padding
    },
    totalPriceLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9CA3AF',
    },
    totalPriceValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    addToCartButton: {
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
    },
    addToCartText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
