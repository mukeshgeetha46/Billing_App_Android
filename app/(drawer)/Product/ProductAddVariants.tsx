import { showToast } from '@/utils/toast';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';
import { useAddVariantMutation } from '../../../services/features/product/productApi';

export default function ProductAddVariants() {
    const { productId } = useLocalSearchParams();

    const router = useRouter();
    const [addVariant] = useAddVariantMutation();

    // Form States
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [wholesalePrice, setWholesalePrice] = useState('');
    const [mrp, setMrp] = useState('');
    const [stock, setStock] = useState('');

    // Modal States
    const [modalVisible, setModalVisible] = useState(false);
    const UNIT_OPTIONS = ['kg', 'pcs', 'liter', 'ml', 'g', 'meter', 'box', 'packet'];

    const handleSave = async () => {
        try {
            const variantData = {
                ProductID: productId,
                Color: color,
                Size: size,
                Unit: unit,
                Quantity: quantity,
                WholesalePrice: parseFloat(wholesalePrice) || 0,
                MRP: parseFloat(mrp) || 0,
                Stock: parseInt(stock) || 0,
            };

            const res = await addVariant(variantData).unwrap();

            showToast('Variant added successfully!');
            router.push('Product/Productlist');

        } catch (error) {
            console.error('Failed to add variant:', error);
            // Handle error (e.g., show a toast/alert)
        }
    };

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
                        <Text style={styles.headerTitle}>Add Product Variant</Text>
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={[styles.headerActionText, styles.saveText]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.formContainer}>
                            {/* Color and Size Section */}
                            <View style={styles.combinedInputGroup}>
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Color</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Red, Blue, N/A"
                                        placeholderTextColor="#94A3B8"
                                        value={color}
                                        onChangeText={setColor}
                                    />
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Size</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. XL, 42, 10-inch"
                                        placeholderTextColor="#94A3B8"
                                        value={size}
                                        onChangeText={setSize}
                                    />
                                </View>
                            </View>

                            {/* Unit and Quantity Section */}
                            <View style={styles.combinedInputGroup}>
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Select Unit *</Text>
                                    <TouchableOpacity
                                        style={styles.dropdownButton}
                                        onPress={() => setModalVisible(true)}
                                    >
                                        <Text style={unit ? styles.dropdownText : styles.dropdownPlaceholder}>
                                            {unit ? unit : 'Select Unit'}
                                        </Text>
                                        <IconSymbol name="chevron.left" size={16} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Quantity/Value</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. 500 (if unit is ml)"
                                        placeholderTextColor="#94A3B8"
                                        value={quantity}
                                        onChangeText={setQuantity}
                                    />
                                </View>
                            </View>

                            {/* Pricing Section */}
                            <Text style={styles.sectionHeading}>Pricing & Stock</Text>
                            <View style={styles.combinedInputGroup}>
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Wholesale Price</Text>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.currencyPrefix}>₹</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            placeholder="0.00"
                                            placeholderTextColor="#94A3B8"
                                            keyboardType="numeric"
                                            value={wholesalePrice}
                                            onChangeText={setWholesalePrice}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>MRP</Text>
                                    <View style={styles.priceInputContainer}>
                                        <Text style={styles.currencyPrefix}>₹</Text>
                                        <TextInput
                                            style={styles.priceInput}
                                            placeholder="0.00"
                                            placeholderTextColor="#94A3B8"
                                            keyboardType="numeric"
                                            value={mrp}
                                            onChangeText={setMrp}
                                        />
                                    </View>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Current Stock *</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="0"
                                        placeholderTextColor="#94A3B8"
                                        keyboardType="numeric"
                                        value={stock}
                                        onChangeText={setStock}
                                    />
                                </View>
                            </View>

                            <View style={styles.infoCard}>
                                <IconSymbol name="info.circle.fill" size={20} color="#64748B" />
                                <Text style={styles.infoText}>
                                    This variant will be linked to Product ID: {productId}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Sticky Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <IconSymbol name="checkmark.circle.fill" size={20} color="#FFF" />
                            <Text style={styles.saveButtonText}>Save Variant</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {/* Unit Selector Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Select Unit</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <IconSymbol name="xmark" size={24} color="#0F172A" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={UNIT_OPTIONS}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.modalItem}
                                            onPress={() => {
                                                setUnit(item);
                                                setModalVisible(false);
                                            }}
                                        >
                                            <Text style={styles.modalItemText}>{item}</Text>
                                            {unit === item && (
                                                <IconSymbol name="checkmark" size={20} color="#2563EB" />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
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
        paddingBottom: 120,
    },
    formContainer: {
        padding: 20,
    },
    sectionHeading: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748B',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 24,
        marginBottom: 12,
        marginLeft: 4,
    },
    combinedInputGroup: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
        marginBottom: 16,
    },
    inputFieldNoBorder: {
        padding: 16,
        backgroundColor: 'transparent',
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
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        padding: 16,
        borderRadius: 12,
        marginTop: 8,
        gap: 12,
    },
    infoText: {
        fontSize: 13,
        color: '#64748B',
        flex: 1,
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
    saveButton: {
        backgroundColor: '#2563EB',
        height: 56,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '50%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
    },
    modalItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 16,
        color: '#0F172A',
    },
});
