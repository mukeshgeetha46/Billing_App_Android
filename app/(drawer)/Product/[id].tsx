import { IconSymbol } from '@/components/ui/icon-symbol';
import { useGetProductByIdQuery } from '@/services/features/product/productApi';
import { AddToCart } from '@/store/slices/orderSlice';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
const { width } = Dimensions.get('window');

const COLORS = [
    { id: '1', name: 'Saddle Brown', color: '#4B3621' },
    { id: '2', name: 'Charcoal', color: '#262626' },
    { id: '3', name: 'Terracotta', color: '#A0522D' },
    { id: '4', name: 'Tan', color: '#D2B48C' },
    { id: '5', name: 'Cream', color: '#F5F5DC' },
];




export default function ProductViewScreen() {
    const { id, color, VariantID, companyId, companyName } = useLocalSearchParams();
    const routeColor = color;
    const dispatch = useDispatch();
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(12);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (routeColor) {
            setSelectedColor(routeColor);

        }
    }, [routeColor]);


    const { data: PRODUCT_DATA, isLoading, isError, error } =
        useGetProductByIdQuery(
            { id: id, color: selectedColor, VariantID: VariantID },
            { skip: !id }
        );

    console.log({ id: id, color: selectedColor ?? routeColor, VariantID: VariantID })
    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (isError && !PRODUCT_DATA) {
        return (
            <View style={styles.container}>
                <Text>Error...</Text>
            </View>
        );
    }

    const totalPrice = (PRODUCT_DATA.price * quantity).toFixed(2);

    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => {
                router.push('Product/Productlist');
                setSelectedColor(null);
            }} style={styles.headerIconButton}>
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


    const handleAddToCart = (item) => {

        dispatch(AddToCart({
            partnerId: companyId,
            partnerName: companyName,
            item: {
                id: item.id,
                name: item.name,
                variant: item.VariantID,
                sku: item.SKU,
                price: item.price,
                quantity: quantity, // Default quantity
                image: item.images[0]
            }
        }));
        console.log('add to cart 🧡💛💚', {
            partnerId: companyId,
            partnerName: companyName,
            item: {
                id: item.id,
                name: item.name,
                variant: item.VariantID,
                sku: item.SKU,
                price: item.price,
                quantity: quantity, // Default quantity
                image: item.images[0]
            }
        });
        router.push(`/partner/${companyId}`)
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


                    {/* Color Selector */}
                    {
                        PRODUCT_DATA.specs.Color && (
                            <>
                                <View style={styles.divider} />
                                <Text style={styles.sectionTitle}>SELECT COLOR</Text>
                                <View style={styles.colorRow}>
                                    {PRODUCT_DATA.colors.map((item) => (
                                        <TouchableOpacity
                                            key={item.id}
                                            onPress={() => setSelectedColor(item.name)}
                                            style={[
                                                styles.colorCircleWrapper,
                                                selectedColor && selectedColor.trim().toLowerCase() === item.name.toLowerCase() && styles.selectedColorWrapper
                                            ]}
                                        >
                                            <View style={[styles.colorCircle, { backgroundColor: item.color }]} />
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <Text style={styles.selectedColorText}>
                                    Selected: <Text style={{ color: '#111827' }}>{selectedColor}</Text>
                                </Text>
                                <View style={styles.divider} />
                            </>
                        )
                    }



                    {/* Size Selector */}
                    {
                        PRODUCT_DATA?.sizes?.length > 0 && (
                            <>
                                <Text style={styles.sectionTitle}>SELECT SIZE</Text>
                                <View style={styles.sizeRow}>
                                    {PRODUCT_DATA.sizes.map((size) => (
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
                            </>
                        )
                    }


                    <View style={styles.divider} />

                    {/* Quantity Selector */}
                    <View style={styles.quantityRow}>
                        <Text style={styles.sectionTitle}>QUANTITY</Text>
                        <TouchableOpacity>
                            <Text style={styles.bulkDiscountText}>Bulk discount at 50+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.quantityInputContainer}>
                        <TextInput
                            style={styles.quantityInput}
                            value={quantity.toString()}
                            keyboardType="numeric"
                            onChangeText={(text) => {
                                const newQuantity = parseInt(text) || 0;
                                const availableStock = PRODUCT_DATA.stock || 50; // Fallback to 50 if stock is missing
                                if (newQuantity > availableStock) {
                                    Alert.alert('Stock Limit', `Only ${availableStock} items available in stock`);
                                    setQuantity(availableStock);
                                } else {
                                    setQuantity(newQuantity);
                                }
                            }}
                        />
                        <Text style={styles.quantityLabel}>Available Stock: {PRODUCT_DATA.stock || 50}</Text>
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
                    onPress={() => handleAddToCart(PRODUCT_DATA)}
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
    quantityInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '40%',
        fontSize: 16,
        color: '#111827',
        textAlign: 'center',
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
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
