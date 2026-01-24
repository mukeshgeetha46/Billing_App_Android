import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
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

const MOCK_PRODUCT = {
    id: '1',
    name: 'Organic Whole Bean Coffee - 5kg Bulk Bag',
    category: 'BEVERAGES • COFFEE',
    sku: 'WH-10293-CF',
    wholesalePrice: '$45.00',
    msrp: '$65.00',
    stock: '124 Units Available',
    status: 'In Stock',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
    description: 'Sourced directly from certified organic farms in Ethiopia, this premium whole bean coffee offers a complex flavor profile with notes of citrus, jasmine, and a smooth chocolate finish.\n\nPerfect for boutique coffee shops and retail specialty stores. Packaged in a high-grade 5kg bulk bag with a one-way degassing valve to ensure maximum freshness for up to 6 months.',
    features: [
        '100% Arabica Beans',
        'Fair Trade Certified',
        'Eco-friendly packaging'
    ]
};

export default function ProductViewScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Image Header Section */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: MOCK_PRODUCT.image }} style={styles.productImage} />
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={24} color="#FFF" />
                    </TouchableOpacity>
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
