import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../../../components/ui/icon-symbol';
import { useAddVariantImageMutation, useGetProductVariantsQuery, useGetProductVariantsSizeQuery } from '../../../services/features/product/productApi';

interface SelectedImage {
    uri: string;
    isPrimary: boolean;
}

export default function ProductAddVariantImages() {
    const { productId } = useLocalSearchParams();
    const router = useRouter();
    const [addVariantImage] = useAddVariantImageMutation();
    const { data: variants } = useGetProductVariantsQuery(productId);
    console.log(variants, 'variants');
    const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPickerField, setCurrentPickerField] = useState<'color' | 'size' | null>(null);
    const [selectVariantID, setVariantId] = useState('');

    const COLOR_OPTIONS = variants?.color;

    const pickImages = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'We need access to your gallery to pick images.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            const newImages: SelectedImage[] = result.assets.map((asset, index) => ({
                uri: asset.uri,
                isPrimary: selectedImages.length === 0 && index === 0,
            }));

            if (selectedImages.length + newImages.length > 10) {
                Alert.alert('Limit Exceeded', 'You can only upload up to 10 images.');
                setSelectedImages([...selectedImages, ...newImages.slice(0, 10 - selectedImages.length)]);
            } else {
                setSelectedImages([...selectedImages, ...newImages]);
            }
        }
    };

    const removeImage = (index: number) => {
        const wasPrimary = selectedImages[index].isPrimary;
        const updatedImages = selectedImages.filter((_, i) => i !== index);
        if (wasPrimary && updatedImages.length > 0) {
            updatedImages[0].isPrimary = true;
        }
        setSelectedImages(updatedImages);
    };

    const togglePrimary = (index: number) => {
        const updatedImages = selectedImages.map((img, i) => ({
            ...img,
            isPrimary: i === index,
        }));
        setSelectedImages(updatedImages);
    };

    const handleSave = async () => {
        if (selectedImages.length === 0) {
            Alert.alert('No Images', 'Please select at least one image.');
            return;
        }

        // if (!color) {
        //     Alert.alert('Required Fields', 'Please select both Color and Size.');
        //     return;
        // }

        try {
            const formData = new FormData();
            formData.append('ProductID', productId as string);
            formData.append('VariantID', variants.VariantID ? variants.VariantID : selectVariantID as string);


            selectedImages.forEach((img, index) => {
                const filename = img.uri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename || '');
                const type = match ? `image/${match[1]}` : `image`;

                formData.append('images', {
                    uri: img.uri,
                    name: filename,
                    type,
                } as any);
            });
            formData.append(`isPrimary`, JSON.stringify(selectedImages.map((s) => s.isPrimary)));
            const res = await addVariantImage(formData).unwrap();
            setSelectedImages([]);
            router.push(`Product/Productlist`);
        } catch (error) {
            console.error('Failed to add variant images:', error);
            Alert.alert('Error', 'Failed to upload images. Please try again.');
        }
    };

    const openPicker = (field: 'color' | 'size') => {
        setCurrentPickerField(field);
        setModalVisible(true);
    };
    const { data: sizes, isFetching, isError } =
        useGetProductVariantsSizeQuery(
            productId,
            { skip: !selectVariantID }
        );
    const SIZE_OPTIONS = sizes?.size;



    const handleSelectOption = (option: string) => {
        if (currentPickerField === 'color') {
            setColor(`${option.color} - ${option.size}`);
            setVariantId(option.id);

        } else if (currentPickerField === 'size') {
            setSize(option.size);
        }
        setModalVisible(false);
    };

    const renderImageItem = ({ item, index }: { item: SelectedImage; index: number }) => (
        <View style={styles.imageCard}>
            <Image source={{ uri: item.uri }} style={styles.previewImage} />
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(index)}
            >
                <IconSymbol name="xmark" size={14} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.primaryBadge, item.isPrimary && styles.primaryBadgeActive]}
                onPress={() => togglePrimary(index)}
            >
                <IconSymbol
                    name={item.isPrimary ? "star.fill" : "star"}
                    size={12}
                    color={item.isPrimary ? "#FFF" : "#64748B"}
                />
                <Text style={[styles.primaryBadgeText, item.isPrimary && styles.primaryBadgeTextActive]}>
                    {item.isPrimary ? 'Primary' : 'Set Primary'}
                </Text>
            </TouchableOpacity>
        </View>
    );

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
                        <Text style={styles.headerTitle}>Add Variant Images</Text>
                        <TouchableOpacity onPress={handleSave}>
                            <Text style={[styles.headerActionText, styles.saveText]}>Save</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.content}>
                            <View style={styles.infoSection}>
                                <Text style={styles.sectionTitle}>Variant Details</Text>
                                <Text style={styles.sectionSubtitle}>Select color and size for this variant.</Text>
                            </View>

                            <View style={styles.combinedInputGroup}>
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Select Color & Size *</Text>
                                    <TouchableOpacity
                                        style={styles.dropdownButton}
                                        onPress={() => openPicker('color')}
                                    >
                                        <Text style={color ? styles.dropdownText : styles.dropdownPlaceholder}>
                                            {color ? color : 'Select Color'}
                                        </Text>
                                        <IconSymbol name="chevron.left" size={16} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
                                    </TouchableOpacity>
                                </View>
                                {/* <View style={styles.divider} />
                                <View style={styles.inputFieldNoBorder}>
                                    <Text style={styles.label}>Select Size *</Text>
                                    <TouchableOpacity
                                        style={styles.dropdownButton}
                                        onPress={() => openPicker('size')}
                                    >
                                        <Text style={size ? styles.dropdownText : styles.dropdownPlaceholder}>
                                            {size ? size : 'Select Size'}
                                        </Text>
                                        <IconSymbol name="chevron.left" size={16} color="#94A3B8" style={{ transform: [{ rotate: '-90deg' }] }} />
                                    </TouchableOpacity>
                                </View> */}
                            </View>

                            <View style={styles.infoSection}>
                                <Text style={styles.sectionTitle}>Product Images</Text>
                                <Text style={styles.sectionSubtitle}>Select multiple images and choose one as primary.</Text>
                            </View>

                            <TouchableOpacity style={styles.uploadArea} onPress={pickImages}>
                                <View style={styles.uploadIconContainer}>
                                    <IconSymbol name="camera.fill" size={32} color="#2563EB" />
                                </View>
                                <Text style={styles.uploadTitle}>Tap to select images</Text>
                                <Text style={styles.uploadSubtitle}>Supports JPG, PNG (Max 10)</Text>
                            </TouchableOpacity>

                            {selectedImages.length > 0 && (
                                <FlatList
                                    scrollEnabled={false}
                                    data={selectedImages}
                                    renderItem={renderImageItem}
                                    keyExtractor={(_, index) => index.toString()}
                                    numColumns={2}
                                    contentContainerStyle={styles.imageList}
                                    columnWrapperStyle={styles.imageRow}
                                    showsVerticalScrollIndicator={false}
                                />
                            )}

                            {selectedImages.length === 0 && (
                                <View style={styles.emptyState}>
                                    <IconSymbol name="photo.on.rectangle" size={48} color="#E2E8F0" />
                                    <Text style={styles.emptyStateText}>No images selected yet</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                    {/* Sticky Footer */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[styles.saveButton]}
                            onPress={handleSave}
                        // disabled={selectedImages.length === 0 || !color}
                        >
                            <IconSymbol name="cloud.upload.fill" size={20} color="#FFF" />
                            <Text style={styles.saveButtonText}>Upload {selectedImages.length} Images</Text>
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
                                        {currentPickerField === 'color' ? 'Select Color' : 'Select Size'}
                                    </Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <IconSymbol name="xmark" size={24} color="#0F172A" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={COLOR_OPTIONS}
                                    keyExtractor={(item) =>
                                        item.id
                                    }
                                    renderItem={({ item }) => {
                                        const value = currentPickerField === 'color' ? item.color : item.size;
                                        const size = item.size;
                                        const color = item.color;
                                        return (
                                            <TouchableOpacity
                                                style={styles.modalItem}
                                                onPress={() => handleSelectOption(item)}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                                                    <Text style={styles.modalItemText}>{`${color} - ${size}`}</Text>
                                                </View>

                                                {(currentPickerField === 'color' ? color : size) === value && (
                                                    <IconSymbol name="checkmark" size={20} color="#2563EB" />
                                                )}
                                            </TouchableOpacity>
                                        );
                                    }}
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
        paddingBottom: 100,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    infoSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0F172A',
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 4,
    },
    combinedInputGroup: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        overflow: 'hidden',
        marginBottom: 20,
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
    uploadArea: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    uploadIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#EFF6FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0F172A',
    },
    uploadSubtitle: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 4,
    },
    imageList: {
        paddingBottom: 20,
    },
    imageRow: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    imageCard: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        position: 'relative',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    primaryBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    primaryBadgeActive: {
        backgroundColor: '#2563EB',
        borderColor: '#2563EB',
    },
    primaryBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#64748B',
    },
    primaryBadgeTextActive: {
        color: '#FFF',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        opacity: 0.5,
    },
    emptyStateText: {
        fontSize: 14,
        color: '#64748B',
        marginTop: 12,
        fontWeight: '500',
    },
    footer: {
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
    saveButtonDisabled: {
        backgroundColor: '#94A3B8',
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
