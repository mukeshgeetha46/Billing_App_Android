import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAddorderMutation } from '@/services/features/order/orderApi';
import { useGetstoreQuery } from '@/services/features/stores/storeApi';
import { selectCart } from '@/store/slices/orderSlice';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
const { width } = Dimensions.get('window');
// Mock cart data grouped by partner


export default function ReviewOrderScreen() {
    const router = useRouter();
    const CART_ITEMS = useSelector(selectCart);

    const [cartData, setCartData] = useState(CART_ITEMS);
    const cartdata = useSelector((state) => state.order.cart);
    const [addOrder] = useAddorderMutation();

    // Store Selection State
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStore, setSelectedStore] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const { data: storesData } = useGetstoreQuery(undefined);

    const filteredStores = storesData?.filter((store: any) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];
    const Handleorder = async () => {
        if (!selectedStore) {
            alert('Please select a store first');
            return;
        }
        try {
            const convertedCart = {
                shopId: selectedStore.id, // You'll need to specify which shop this is for
                items: CART_ITEMS.flatMap(partner =>
                    partner.items.map(item => ({
                        variantId: parseInt(item.variant), // Using item.id as variantId (you may need to map this differently)
                        quantity: item.quantity
                    }))
                )
            };
            console.log('🎁🎀🎗', convertedCart)
            const response = await addOrder(convertedCart).unwrap();
        } catch (error) {
            console.log('error', error)
        }
    }
    // Calculate totals
    const subtotal = cartData.reduce((sum, partner) => {
        return sum + partner.items.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
    }, 0);

    const totalUnits = cartData.reduce((sum, partner) => {
        return sum + partner.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);

    const shipping = 0; // Free shipping
    const estimatedTaxes = subtotal * 0.08; // 8% tax
    const grandTotal = subtotal + shipping + estimatedTaxes;
    const savings = 45.00; // Wholesale promo savings

    const updateQuantity = (partnerId: string, itemId: string, delta: number) => {
        setCartData(prev => prev.map(partner => {
            if (partner.partnerId === partnerId) {
                return {
                    ...partner,
                    items: partner.items.map(item => {
                        if (item.id === itemId) {
                            return { ...item, quantity: Math.max(1, item.quantity + delta) };
                        }
                        return item;
                    }),
                };
            }
            return partner;
        }));
    };

    const renderCartItem = (item: typeof CART_ITEMS[0]['items'][0], partnerId: string) => (
        <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemVariant}>Variant: {item.variant} | SKU: {item.SKU}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityControls}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(partnerId, item.id, -1)}
                >
                    <IconSymbol name="minus" size={16} color="#2563EB" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(partnerId, item.id, 1)}
                >
                    <IconSymbol name="plus" size={16} color="#2563EB" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={24} color="#2563EB" />
                    <Text style={styles.backText}>Cart</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Review Order</Text>
                <View style={{ width: 60 }} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Partner Groups */}
                {cartData.map((partner) => (
                    <View key={partner.partnerId} style={styles.partnerSection}>
                        <View style={styles.partnerHeader}>
                            <View style={styles.partnerInfo}>
                                <Text style={styles.partnerName}>
                                    {partner.partnerName} ({partner.itemCount} ITEM{partner.itemCount > 1 ? 'S' : ''})
                                </Text>
                                <View style={[styles.moqBadge, { backgroundColor: partner.moqColor + '20' }]}>
                                    <Text style={[styles.moqText, { color: partner.moqColor }]}>
                                        {partner.moqStatus}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Items */}
                        {partner.items.map(item => renderCartItem(item, partner.partnerId))}
                    </View>
                ))}

                {/* Order Summary */}
                <View style={styles.summarySection}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal ({totalUnits} units)</Text>
                        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Shipping (Est.)</Text>
                        <Text style={[styles.summaryValue, { color: '#10B981' }]}>Free</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Estimated Taxes</Text>
                        <Text style={styles.summaryValue}>${estimatedTaxes.toFixed(2)}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total</Text>
                        <Text style={styles.grandTotalValue}>${grandTotal.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Promo Banner */}
                <View style={styles.promoBanner}>
                    <IconSymbol name="tag" size={20} color="#3B82F6" />
                    <View style={styles.promoText}>
                        <Text style={styles.promoTitle}>Wholesale Promo Applied</Text>
                        <Text style={styles.promoSubtitle}>You saved ${savings.toFixed(2)} on this order</Text>
                    </View>
                </View>

                <View style={{ height: 120 }} />
            </ScrollView>

            {/* Bottom Action Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.totalSection}>
                    <Text style={styles.totalLabel}>TOTAL TO PAY</Text>
                    <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                    style={styles.deliverySection}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.deliveryLabel}>DELIVER TO</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <Text style={styles.deliveryValue}>
                            {selectedStore ? selectedStore.name : 'Select Store'}
                        </Text>
                        <IconSymbol name="chevron.down" size={14} color="#111827" />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Store Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Store</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <IconSymbol name="xmark" size={24} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.searchContainer}>
                            <IconSymbol name="magnifyingglass" size={20} color="#9CA3AF" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search stores..."
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        <FlatList
                            data={filteredStores}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.storeOption}
                                    onPress={() => {
                                        setSelectedStore(item);
                                        setModalVisible(false);
                                    }}
                                >
                                    <View>
                                        <Text style={styles.storeName}>{item.name}</Text>
                                        {item.address && (
                                            <Text style={styles.storeAddress}>{item.address}</Text>
                                        )}
                                    </View>
                                    {selectedStore?.id === item.id && (
                                        <IconSymbol name="checkmark" size={20} color="#2563EB" />
                                    )}
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text style={styles.emptyText}>No stores found</Text>
                            }
                        />
                    </View>
                </View>
            </Modal>

            <View style={styles.placeOrderContainer}>
                <TouchableOpacity style={styles.placeOrderButton} onPress={Handleorder}>
                    <Text style={styles.placeOrderText}>Place Order</Text>
                    <IconSymbol name="chevron.right" size={20} color="#FFF" />
                </TouchableOpacity>
                <Text style={styles.termsText}>
                    By placing this order you agree to the Terms of Service.
                </Text>
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
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    backText: {
        fontSize: 16,
        color: '#2563EB',
        fontWeight: '500',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    scrollView: {
        flex: 1,
    },
    partnerSection: {
        backgroundColor: '#FFF',
        marginTop: 12,
        paddingVertical: 16,
    },
    partnerHeader: {
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    partnerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    partnerName: {
        fontSize: 12,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: 0.5,
        flex: 1,
    },
    moqBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    moqText: {
        fontSize: 11,
        fontWeight: '600',
    },
    cartItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    itemVariant: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2563EB',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        minWidth: 24,
        textAlign: 'center',
    },
    summarySection: {
        backgroundColor: '#FFF',
        marginTop: 12,
        padding: 16,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 12,
    },
    grandTotalLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    grandTotalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2563EB',
    },
    promoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EFF6FF',
        marginHorizontal: 16,
        marginTop: 12,
        padding: 16,
        borderRadius: 12,
        gap: 12,
    },
    promoText: {
        flex: 1,
    },
    promoTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1E40AF',
        marginBottom: 2,
    },
    promoSubtitle: {
        fontSize: 12,
        color: '#3B82F6',
    },
    bottomBar: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalSection: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9CA3AF',
        marginBottom: 4,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    deliverySection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    deliveryLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9CA3AF',
        marginBottom: 4,
    },
    deliveryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    placeOrderContainer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    placeOrderButton: {
        backgroundColor: '#2563EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        marginTop: 12,
    },
    placeOrderText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    termsText: {
        fontSize: 11,
        color: '#9CA3AF',
        textAlign: 'center',
        marginTop: 8,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '70%',
        padding: 16,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        marginBottom: 16,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    storeOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    storeName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    storeAddress: {
        fontSize: 12,
        color: '#6B7280',
    },
    emptyText: {
        textAlign: 'center',
        color: '#6B7280',
        marginTop: 20,
    },
});
