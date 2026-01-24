import { useNavigation } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';

export default function ProductAddform() {
    const router = useRouter();
    const navigation = useNavigation();
    const [isInStock, setIsInStock] = useState(true);
    const [productName, setProductName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('0.00');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const productImages = [
        { id: '1', uri: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' },
        { id: '2', uri: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop' },
    ];

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.headerActionText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Add New Product</Text>
                        <TouchableOpacity onPress={() => { /* Save Logic */ }}>
                            <Text style={[styles.headerActionText, styles.saveText]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Image Section */}
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Product Images</Text>
                            <Text style={styles.sectionSubtitle}>UP TO 5 PHOTOS</Text>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                            <TouchableOpacity style={styles.addPhotoButton}>
                                <View style={styles.addPhotoIconContainer}>
                                    <IconSymbol name="camera" size={32} color="#2563EB" />
                                    <Text style={styles.addPhotoText}>ADD PHOTO</Text>
                                </View>
                            </TouchableOpacity>

                            {productImages.map((img) => (
                                <View key={img.id} style={styles.imageWrapper}>
                                    <Image source={{ uri: img.uri }} style={styles.productImage} />
                                    <TouchableOpacity style={styles.removeImageButton}>
                                        <IconSymbol name="minus" size={14} color="#FFF" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.imageScrollIndicator} />

                        {/* Form Fields */}
                        <View style={styles.formContainer}>
                            <View style={styles.combinedInputGroup}>
                                <View style={styles.inputField}>
                                    <Text style={styles.label}>Product Name</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Organic Whole Milk (1L)"
                                        placeholderTextColor="#94A3B8"
                                        value={productName}
                                        onChangeText={setProductName}
                                    />
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputField}>
                                    <Text style={styles.label}>SKU</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. DAIRY-MILK-001"
                                        placeholderTextColor="#94A3B8"
                                        value={sku}
                                        onChangeText={setSku}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputField, styles.halfWidth]}>
                                    <Text style={styles.label}>Price</Text>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.currencyPrefix}>$</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            value={price}
                                            onChangeText={setPrice}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>
                                <View style={[styles.inputField, styles.halfWidth]}>
                                    <Text style={styles.label}>Category</Text>
                                    <TouchableOpacity style={styles.dropdownButton}>
                                        <Text style={category ? styles.dropdownText : styles.dropdownPlaceholder}>
                                            {category || 'Select'}
                                        </Text>
                                        <IconSymbol name="chevron.left" size={16} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.inputField, styles.multilineField]}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={styles.multilineInput}
                                    placeholder="Describe the product features, ingredients, or storage instructions..."
                                    placeholderTextColor="#94A3B8"
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    value={description}
                                    onChangeText={setDescription}
                                />
                            </View>

                            <View style={styles.stockCard}>
                                <View style={styles.stockIconContainer}>
                                    <IconSymbol name="cube.box" size={24} color="#2563EB" />
                                </View>
                                <View style={styles.stockInfo}>
                                    <Text style={styles.stockTitle}>In Stock</Text>
                                    <Text style={styles.stockSubtitle}>Available for immediate purchase</Text>
                                </View>
                                <Switch
                                    value={isInStock}
                                    onValueChange={setIsInStock}
                                    trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                                    thumbColor={isInStock ? '#FFF' : '#F1F5F9'}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {/* Sticky Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addCatalogButton}>
                            <IconSymbol name="plus" size={20} color="#FFF" />
                            <Text style={styles.addCatalogButtonText}>Add Product to Catalog</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    headerActionText: {
        fontSize: 16,
        color: '#2563EB',
        fontWeight: '500',
    },
    saveText: {
        fontWeight: '700',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    sectionSubtitle: {
        fontSize: 11,
        fontWeight: '600',
        color: '#94A3B8',
        letterSpacing: 0.5,
    },
    imageScroll: {
        paddingLeft: 20,
    },
    addPhotoButton: {
        width: 120,
        height: 140,
        borderRadius: 12,
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    addPhotoIconContainer: {
        alignItems: 'center',
    },
    addPhotoText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#2563EB',
        marginTop: 8,
    },
    imageWrapper: {
        width: 120,
        height: 140,
        marginRight: 16,
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    removeImageButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageScrollIndicator: {
        height: 4,
        width: 300,
        backgroundColor: '#E2E8F0',
        borderRadius: 2,
        alignSelf: 'center',
        marginTop: 16,
    },
    formContainer: {
        padding: 20,
    },
    combinedInputGroup: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
        marginBottom: 16,
    },
    inputField: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
        marginBottom: 8,
    },
    input: {
        fontSize: 15,
        color: '#0F172A',
        padding: 0,
    },
    divider: {
        height: 1,
        backgroundColor: '#F1F5F9',
        marginHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 12,
    },
    halfWidth: {
        flex: 1,
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencyPrefix: {
        fontSize: 15,
        color: '#94A3B8',
        marginRight: 4,
    },
    priceInput: {
        fontSize: 15,
        color: '#0F172A',
        flex: 1,
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownPlaceholder: {
        fontSize: 15,
        color: '#94A3B8',
    },
    dropdownText: {
        fontSize: 15,
        color: '#0F172A',
    },
    multilineField: {
        marginBottom: 16,
    },
    multilineInput: {
        fontSize: 14,
        color: '#0F172A',
        height: 100,
        paddingTop: 0,
    },
    stockCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    stockIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stockInfo: {
        flex: 1,
        marginLeft: 16,
    },
    stockTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#0F172A',
    },
    stockSubtitle: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    addCatalogButton: {
        backgroundColor: '#2563EB',
        height: 56,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    addCatalogButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
