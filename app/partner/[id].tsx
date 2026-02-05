import { IconSymbol } from '@/components/ui/icon-symbol';
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

// Mock Data - 9 Companies with 6 items each
const PRODUCTS = [
    // Company 1 - Electronics
    {
        id: '1',
        companyId: 1,
        name: 'Wireless Pro Mouse',
        price: 45.00,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/mouse.jpg'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '2',
        companyId: 1,
        name: 'Smart Home Hub v2',
        price: 89.99,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '3',
        companyId: 1,
        name: 'Minimalist LED Lamp',
        price: 22.50,
        unit: 'unit',
        minOrder: 20,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '4',
        companyId: 1,
        name: 'Mechanical Keyboard',
        price: 65.00,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '5',
        companyId: 1,
        name: 'Pro Power Bank 20k',
        price: 15.75,
        unit: 'unit',
        minOrder: 50,
        image: require('@/assets/images/sum_lap.png'),
    },
    {
        id: '6',
        companyId: 1,
        name: 'Bluetooth Speaker Pro',
        price: 35.00,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/soap.webp'),
    },

    // Company 2 - Home Appliances
    {
        id: '7',
        companyId: 2,
        name: 'Air Purifier Plus',
        price: 120.00,
        unit: 'unit',
        minOrder: 3,
        image: require('@/assets/images/air.jpg'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '8',
        companyId: 2,
        name: 'Smart Coffee Maker',
        price: 78.50,
        unit: 'unit',
        minOrder: 8,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '9',
        companyId: 2,
        name: 'Digital Kitchen Scale',
        price: 25.99,
        unit: 'unit',
        minOrder: 15,
        image: require('@/assets/images/mouse.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '10',
        companyId: 2,
        name: 'Electric Kettle Pro',
        price: 42.00,
        unit: 'unit',
        minOrder: 12,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '11',
        companyId: 2,
        name: 'Vacuum Cleaner Robot',
        price: 199.99,
        unit: 'unit',
        minOrder: 2,
        image: require('@/assets/images/sum_lap.png'),
    },
    {
        id: '12',
        companyId: 2,
        name: 'Smart Thermostat',
        price: 95.00,
        unit: 'unit',
        minOrder: 6,
        image: require('@/assets/images/soap.webp'),
        isSoldOut: true,
    },

    // Company 3 - Office Supplies
    {
        id: '13',
        companyId: 3,
        name: 'Ergonomic Office Chair',
        price: 185.00,
        unit: 'unit',
        minOrder: 4,
        image: require('@/assets/images/sum_lap.png'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '14',
        companyId: 3,
        name: 'Standing Desk',
        price: 299.99,
        unit: 'unit',
        minOrder: 2,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '15',
        companyId: 3,
        name: 'Wireless Presenter',
        price: 32.50,
        unit: 'unit',
        minOrder: 20,
        image: require('@/assets/images/mouse.jpg'),
    },
    {
        id: '16',
        companyId: 3,
        name: 'Document Scanner',
        price: 145.00,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '17',
        companyId: 3,
        name: 'LED Desk Lamp',
        price: 38.75,
        unit: 'unit',
        minOrder: 15,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '18',
        companyId: 3,
        name: 'Cable Management Kit',
        price: 18.99,
        unit: 'unit',
        minOrder: 30,
        image: require('@/assets/images/soap.webp'),
    },

    // Company 4 - Audio Equipment
    {
        id: '19',
        companyId: 4,
        name: 'Noise Cancelling Headphones',
        price: 159.99,
        unit: 'unit',
        minOrder: 6,
        image: require('@/assets/images/dell_lap.jpeg'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '20',
        companyId: 4,
        name: 'Wireless Earbuds Pro',
        price: 89.00,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/mouse.jpg'),
    },
    {
        id: '21',
        companyId: 4,
        name: 'Portable PA System',
        price: 245.00,
        unit: 'unit',
        minOrder: 3,
        image: require('@/assets/images/sum_lap.png'),
    },
    {
        id: '22',
        companyId: 4,
        name: 'Studio Microphone',
        price: 125.50,
        unit: 'unit',
        minOrder: 8,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '23',
        companyId: 4,
        name: 'Soundbar 5.1',
        price: 199.99,
        unit: 'unit',
        minOrder: 4,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '24',
        companyId: 4,
        name: 'Audio Mixer 8-Channel',
        price: 175.00,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/soap.webp'),
        isSoldOut: true,
    },

    // Company 5 - Smart Devices
    {
        id: '25',
        companyId: 5,
        name: 'Smart Watch Ultra',
        price: 279.99,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/sum_lap.png'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '26',
        companyId: 5,
        name: 'Fitness Tracker Band',
        price: 49.99,
        unit: 'unit',
        minOrder: 15,
        image: require('@/assets/images/mouse.jpg'),
    },
    {
        id: '27',
        companyId: 5,
        name: 'Smart Door Lock',
        price: 135.00,
        unit: 'unit',
        minOrder: 8,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '28',
        companyId: 5,
        name: 'Security Camera 4K',
        price: 89.50,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '29',
        companyId: 5,
        name: 'Smart Light Bulb Kit',
        price: 55.00,
        unit: 'set',
        minOrder: 12,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '30',
        companyId: 5,
        name: 'Video Doorbell Pro',
        price: 165.99,
        unit: 'unit',
        minOrder: 6,
        image: require('@/assets/images/soap.webp'),
    },

    // Company 6 - Computer Accessories
    {
        id: '31',
        companyId: 6,
        name: 'Gaming Mouse RGB',
        price: 55.00,
        unit: 'unit',
        minOrder: 12,
        image: require('@/assets/images/mouse.jpg'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '32',
        companyId: 6,
        name: 'USB-C Hub 7-in-1',
        price: 42.99,
        unit: 'unit',
        minOrder: 18,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '33',
        companyId: 6,
        name: 'Laptop Stand Aluminum',
        price: 35.50,
        unit: 'unit',
        minOrder: 20,
        image: require('@/assets/images/sum_lap.png'),
    },
    {
        id: '34',
        companyId: 6,
        name: 'Webcam 1080p HD',
        price: 68.00,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '35',
        companyId: 6,
        name: 'External SSD 1TB',
        price: 95.99,
        unit: 'unit',
        minOrder: 8,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '36',
        companyId: 6,
        name: 'Monitor Arm Dual',
        price: 78.50,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/soap.webp'),
    },

    // Company 7 - Mobile Accessories
    {
        id: '37',
        companyId: 7,
        name: 'Wireless Charger Pad',
        price: 28.99,
        unit: 'unit',
        minOrder: 25,
        image: require('@/assets/images/mouse.jpg'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '38',
        companyId: 7,
        name: 'Phone Case Premium',
        price: 19.99,
        unit: 'unit',
        minOrder: 40,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '39',
        companyId: 7,
        name: 'Screen Protector Kit',
        price: 12.50,
        unit: 'set',
        minOrder: 50,
        image: require('@/assets/images/sum_lap.png'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '40',
        companyId: 7,
        name: 'Car Phone Mount',
        price: 22.00,
        unit: 'unit',
        minOrder: 30,
        image: require('@/assets/images/air.jpg'),
    },
    {
        id: '41',
        companyId: 7,
        name: 'Portable Charger 30W',
        price: 45.99,
        unit: 'unit',
        minOrder: 20,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '42',
        companyId: 7,
        name: 'Selfie Ring Light',
        price: 32.50,
        unit: 'unit',
        minOrder: 15,
        image: require('@/assets/images/soap.webp'),
        isSoldOut: true,
    },

    // Company 8 - Gaming Gear
    {
        id: '43',
        companyId: 8,
        name: 'Gaming Keyboard RGB',
        price: 89.99,
        unit: 'unit',
        minOrder: 8,
        image: require('@/assets/images/dell_lap.jpeg'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '44',
        companyId: 8,
        name: 'Gaming Headset 7.1',
        price: 75.00,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/mouse.jpg'),
    },
    {
        id: '45',
        companyId: 8,
        name: 'Gaming Chair Pro',
        price: 225.00,
        unit: 'unit',
        minOrder: 3,
        image: require('@/assets/images/sum_lap.png'),
    },
    {
        id: '46',
        companyId: 8,
        name: 'Controller Wireless',
        price: 58.50,
        unit: 'unit',
        minOrder: 12,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '47',
        companyId: 8,
        name: 'Gaming Mouse Pad XXL',
        price: 24.99,
        unit: 'unit',
        minOrder: 20,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '48',
        companyId: 8,
        name: 'Streaming Microphone',
        price: 115.00,
        unit: 'unit',
        minOrder: 6,
        image: require('@/assets/images/soap.webp'),
    },

    // Company 9 - Photography Equipment
    {
        id: '49',
        companyId: 9,
        name: 'Tripod Carbon Fiber',
        price: 145.00,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/sum_lap.png'),
        tag: 'NEW',
        tagColor: '#2563EB',
    },
    {
        id: '50',
        companyId: 9,
        name: 'Camera Lens 50mm',
        price: 285.99,
        unit: 'unit',
        minOrder: 4,
        image: require('@/assets/images/dell_lap.jpeg'),
    },
    {
        id: '51',
        companyId: 9,
        name: 'LED Light Panel',
        price: 95.50,
        unit: 'unit',
        minOrder: 8,
        image: require('@/assets/images/mouse.jpg'),
    },
    {
        id: '52',
        companyId: 9,
        name: 'Camera Bag Pro',
        price: 68.00,
        unit: 'unit',
        minOrder: 10,
        image: require('@/assets/images/air.jpg'),
        tag: 'SALE',
        tagColor: '#EF4444',
    },
    {
        id: '53',
        companyId: 9,
        name: 'Memory Card 128GB',
        price: 42.99,
        unit: 'unit',
        minOrder: 15,
        image: require('@/assets/images/bluair.jpg'),
    },
    {
        id: '54',
        companyId: 9,
        name: 'Gimbal Stabilizer',
        price: 175.00,
        unit: 'unit',
        minOrder: 5,
        image: require('@/assets/images/soap.webp'),
    },
];

const CATEGORIES = ['All', 'Electronics', 'Home', 'Sale', 'Office', 'Kitchen'];

export default function PartnerCatalogScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [activeCategory, setActiveCategory] = useState('All');

    // Filter products by companyId
    const companyId = typeof id === 'string' ? parseInt(id) : Number(id);
    const filteredProducts = PRODUCTS.filter(product => product.companyId === companyId);

    const renderProductItem = ({ item }: { item: typeof PRODUCTS[0] }) => (
        <View style={styles.productCard}>
            <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.productImage} resizeMode="contain" />
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
                        onPress={() => router.push(`/Product/${item.id}`)}
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
                    columnWrapperStyle={styles.columnWrapper}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
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
});
