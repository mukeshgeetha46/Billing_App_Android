import { DrawerActions, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
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
import { IconSymbol } from '../../../components/ui/icon-symbol';

const COMPANIES = [
    {
        id: '1',
        name: 'Global Electronics',
        category: 'ELECTRONICS & TECH',
        products: '1,240',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: '2',
        name: 'Fresh Farm Produce',
        category: 'FOOD & BEVERAGE',
        products: '450',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: '3',
        name: 'Urban Living Co.',
        category: 'HOME DECOR',
        products: '812',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=200&auto=format&fit=crop',
    },
    {
        id: '4',
        name: 'Elite Beauty Supplies',
        category: 'HEALTH & BEAUTY',
        products: '2,100',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=200&auto=format&fit=crop',
    },
];

const STATUSBAR_HEIGHT =
    Platform.OS === 'android'
        ? StatusBar.currentHeight ?? 0
        : Constants.statusBarHeight;

export default function ManageCompaniesScreen() {
    const router = useRouter();
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');

    const renderCompanyItem = ({ item }: { item: typeof COMPANIES[0] }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Image source={{ uri: item.image }} style={styles.companyImage} />
                <View style={styles.companyDetails}>
                    <Text style={styles.companyName}>{item.name}</Text>
                    <Text style={styles.companyCategory}>{item.category}</Text>
                    <View style={styles.productCountRow}>
                        <IconSymbol name="cube.box" size={16} color="#2563EB" />
                        <Text style={styles.productCountText}>{item.products} Products</Text>
                    </View>
                </View>
            </View>
            <View style={styles.cardActions}>
                <TouchableOpacity style={styles.actionButton}>
                    <IconSymbol name="pencil" size={18} color="#2563EB" />
                    <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <View style={styles.actionDivider} />
                <TouchableOpacity style={styles.actionButton} onPress={() => router.push(`/Company/Companyview`)}>
                    <IconSymbol name="eye" size={18} color="#2563EB" />
                    <Text style={styles.actionButtonText}>View Products</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Custom Header */}
            <View style={[styles.header]}>
                <TouchableOpacity
                    style={styles.headerIconButton}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}

                >
                    <IconSymbol name="line.3.horizontal" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Companies</Text>
                <TouchableOpacity style={styles.headerIconButton}>
                    <IconSymbol name="more.vertical" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchBarWrapper}>
                <View style={styles.searchBar}>
                    <IconSymbol name="magnifyingglass" size={20} color="#94A3B8" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search companies or categories..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Companies List */}
            <FlatList
                data={COMPANIES}
                renderItem={renderCompanyItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            {/* Bottom FAB Section */}
            <View style={styles.bottomSection}>
                <View style={styles.addNewContainer}>
                    <View style={styles.addNewLabelBox}>
                        <Text style={styles.addNewText}>Add New Company</Text>
                    </View>
                    <TouchableOpacity style={styles.fab} onPress={() => router.push('/Company/AddcompanyForm')}>
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
    searchBarWrapper: {
        padding: 16,
        backgroundColor: '#FFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 6,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: '#0F172A',
    },
    listContent: {
        padding: 16,
        paddingBottom: 100, // Extra space for FAB
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    cardInfo: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    companyImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
        backgroundColor: '#F1F5F9',
    },
    companyDetails: {
        flex: 1,
        marginLeft: 16,
    },
    companyName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    companyCategory: {
        fontSize: 12,
        fontWeight: '500',
        color: '#64748B',
        marginTop: 2,
        textTransform: 'uppercase',
    },
    productCountRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    productCountText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },
    cardActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 8,
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2563EB',
    },
    actionDivider: {
        width: 1,
        backgroundColor: '#F1F5F9',
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
