import { useGetCompanyNameByIdQuery } from '@/services/features/company/companyApi';
import { showToast } from '@/utils/toast';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';
import { useAddproductMutation } from '../../../services/features/product/productApi';

export default function ProductAddform() {
    const router = useRouter();
    const navigation = useNavigation();

    // Form States
    const [productName, setProductName] = useState('');
    const [productTitle, setProductTitle] = useState('');
    const [wholesalePrice, setWholesalePrice] = useState('');
    const [mrp, setMrp] = useState('');
    const [stock, setStock] = useState('0');
    const [productDescription, setProductDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const [color, setColor] = useState('');
    const [gstPercent, setGstPercent] = useState('0');
    const [isActive, setIsActive] = useState(true);
    const [companyID, setCompanyID] = useState('');
    const [selectedCompany, setSelectedCompany] = useState<any>(null);


    // Image States
    const [productImages, setProductImages] = useState<string[]>([]);

    // Modal States
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPickerField, setCurrentPickerField] = useState<'unit' | 'company' | null>(null);

    const { data: Company_OPTIONS, isLoading } = useGetCompanyNameByIdQuery();

    const UNIT_OPTIONS = ['kg', 'pcs', 'liter'];

    // Fetch companies


    const pickImage = async () => {
        if (productImages.length >= 5) {
            alert('Maximum 5 photos allowed');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProductImages([...productImages, result.assets[0].uri]);
        }
    };

    const removeImage = (index: number) => {
        setProductImages(productImages.filter((_, i) => i !== index));
    };

    const openPicker = (field: 'unit' | 'company') => {
        setCurrentPickerField(field);
        setModalVisible(true);
    };

    const handleSelectOption = (option: string | any) => {
        if (currentPickerField === 'unit') {
            setUnit(option);
        } else if (currentPickerField === 'company') {
            setSelectedCompany(option.CompanyName);
            setCompanyID(option.CompanyID || '');
        }
        setModalVisible(false);
    };
    const [addproductMutation] = useAddproductMutation();
    const handleSave = async () => {
        try {
            // TODO: Implement save logic with FormData
            const formData = new FormData();

            formData.append('ProductName', productName);
            formData.append('ProductTitle', productTitle);
            formData.append('ProductDescription', productDescription);
            formData.append('GSTPercent', gstPercent);
            formData.append('IsActive', isActive ? '1' : '0');
            formData.append('CompanyID', companyID);
            const res = await addproductMutation(formData);

            showToast('Product created successfully!');
            router.push('/Product/Productlist');
        } catch (error) {

            showToast('Product created failed!');
        }
        // Call API here
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
                        <TouchableOpacity onPress={() => router.push(`/Product/Productlist`)}>
                            <Text style={styles.headerActionText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Add New Product</Text>
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={[styles.headerActionText, styles.saveText]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Image Section */}


                        <View style={styles.imageScrollIndicator} />

                        {/* Form Fields */}
                        <View style={styles.formContainer}>
                            <View style={styles.combinedInputGroup}>
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Product Name *</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Organic Whole Milk"
                                        placeholderTextColor="#94A3B8"
                                        value={productName}
                                        onChangeText={setProductName}
                                    />
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Product Title</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Premium Quality Milk"
                                        placeholderTextColor="#94A3B8"
                                        value={productTitle}
                                        onChangeText={setProductTitle}
                                    />
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Select Company *</Text>
                                    <TouchableOpacity
                                        style={styles.dropdownButton}
                                        onPress={() => openPicker('company')}
                                    >
                                        <Text style={selectedCompany ? styles.dropdownText : styles.dropdownPlaceholder}>
                                            {selectedCompany ? selectedCompany : 'Select Company'}
                                        </Text>
                                        <IconSymbol name="chevron.left" size={16} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
                                    </TouchableOpacity>
                                </View>
                            </View>



                            <View style={styles.row}>
                                <View style={[styles.inputField, styles.halfWidth]}>
                                    <Text style={styles.label}>GST %</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={gstPercent}
                                        onChangeText={setGstPercent}
                                        keyboardType="numeric"
                                        placeholder="0"
                                        placeholderTextColor="#94A3B8"
                                    />
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
                                    value={productDescription}
                                    onChangeText={setProductDescription}
                                />
                            </View>

                            <View style={styles.stockCard}>
                                <View style={styles.stockIconContainer}>
                                    <IconSymbol name="checkmark.circle.fill" size={24} color="#2563EB" />
                                </View>
                                <View style={styles.stockInfo}>
                                    <Text style={styles.stockTitle}>Active Product</Text>
                                    <Text style={styles.stockSubtitle}>Product is visible to customers</Text>
                                </View>
                                <Switch
                                    value={isActive}
                                    onValueChange={setIsActive}
                                    trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                                    thumbColor={isActive ? '#FFF' : '#F1F5F9'}
                                />
                            </View>
                        </View>
                    </ScrollView>

                    {/* Sticky Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.addCatalogButton} onPress={handleSave}>
                            <IconSymbol name="plus" size={20} color="#FFF" />
                            <Text style={styles.addCatalogButtonText}>Add Product to Catalog</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

                {/* Selection Modal */}
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
                                    <Text style={styles.modalTitle}>
                                        {currentPickerField === 'unit' ? 'Select Unit' : 'Select Company'}
                                    </Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <IconSymbol name="xmark" size={24} color="#0F172A" />
                                    </TouchableOpacity>
                                </View>
                                {currentPickerField === 'unit' ? (
                                    <FlatList
                                        data={UNIT_OPTIONS}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectOption(item)}>
                                                <Text style={styles.modalItemText}>{item}</Text>
                                                {unit === item && (
                                                    <IconSymbol name="checkmark" size={20} color="#2563EB" />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />
                                ) : (
                                    <FlatList
                                        data={Company_OPTIONS}
                                        keyExtractor={(item) => item.CompanyID}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectOption(item)}>
                                                <Text style={styles.modalItemText}>{item.CompanyName}</Text>
                                                {selectedCompany === item && (
                                                    <IconSymbol name="checkmark" size={20} color="#2563EB" />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
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
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        borderRadius: 10,
        width: 24,
        height: 24,
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
        maxHeight: '40%',
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
    modalItemSubtext: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#94A3B8',
    },
});
