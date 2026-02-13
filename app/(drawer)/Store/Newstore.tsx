import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAddstoreMutation } from '@/services/features/stores/storeApi';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddNewStoreScreen() {
    const router = useRouter();
    // Shop Fields matching database schema
    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [newLogo, setNewLogo] = useState<string | null>(null);

    const [mobileNo, setMobileNo] = useState('');
    const [alternateMobileNo, setAlternateMobileNo] = useState('');
    const [email, setEmail] = useState('');

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [country, setCountry] = useState('');

    const [gstNo, setGstNo] = useState('');
    const [panNo, setPanNo] = useState('');
    const [shopType, setShopType] = useState('');

    const [shopLogo, setShopLogo] = useState<string | null>(null);
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const STATUSBAR_HEIGHT =
        Platform.OS === 'android'
            ? 10
            : Constants.statusBarHeight;

    const [addStore, { isLoading, error }] = useAddstoreMutation();
    const saveStore = async () => {
        try {
            const formData = new FormData();

            formData.append("shopName", shopName);
            formData.append("ownerName", ownerName);
            formData.append("mobileNo", mobileNo);
            formData.append("alternateMobileNo", alternateMobileNo);
            formData.append("email", email);
            formData.append("addressLine1", addressLine1);
            formData.append("addressLine2", addressLine2);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("pincode", pincode);
            formData.append("country", country);
            formData.append("gstNo", gstNo);
            formData.append("panNo", panNo);
            formData.append("shopType", shopType);

            if (shopLogo) {
                const ext = shopLogo.split(".").pop();

                formData.append("logo", {
                    uri: shopLogo,
                    name: `shop_logo.${ext}`,
                    type: `image/${ext}`,
                } as any);
            }

            const res = await addStore(formData);

            const data = await res.data;

            alert("Store saved successfully");
        } catch (err) {
            console.error("Save store error:", err);
            alert("Failed to save store");
        }
    };



    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.canceled) return;

            let uri = result.assets[0].uri;

            // ✅ REMOVE ALL SPACES FROM FILE URI
            uri = uri.replace(/\s+/g, '');


            setShopLogo(uri);

        } catch (error) {
            console.error('Error picking image:', error);
        }
    };



    const cleanUri = shopLogo;


    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={[styles.header, { paddingTop: STATUSBAR_HEIGHT }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <IconSymbol name="chevron.left" size={28} color="#2563EB" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add New Store</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Store Image Section */}
                    <View style={styles.card}>

                        <Text style={styles.cardTitle}>Store Logo</Text>
                        <TouchableOpacity onPress={pickImage} style={styles.imageUploadContainer}>

                            {shopLogo ? (
                                <View style={styles.logoPreviewContainer}>
                                    <Image
                                        source={{ uri: shopLogo }}
                                        style={styles.logoImage}
                                    />
                                    <View style={styles.editIconOverlay}>
                                        <IconSymbol name="pencil" size={16} color="#fff" />
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.dashedBox}>
                                    <IconSymbol name="camera.plus" size={48} color="#94A3B8" />
                                    <Text style={styles.uploadTextPrimary}>Tap to upload logo</Text>
                                </View>
                            )}
                        </TouchableOpacity>

                    </View>

                    {/* Store Information Section */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Store Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shop Name *</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. My Grocery Store"
                                    placeholderTextColor="#94A3B8"
                                    value={shopName}
                                    onChangeText={setShopName}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Owner Name</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter owner full name"
                                    placeholderTextColor="#94A3B8"
                                    value={ownerName}
                                    onChangeText={setOwnerName}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Shop Type</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Retail, Wholesale"
                                    placeholderTextColor="#94A3B8"
                                    value={shopType}
                                    onChangeText={setShopType}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Contact Details Section */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Contact Details</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Mobile No *</Text>
                            <View style={styles.inputWrapper}>
                                <IconSymbol name="phone" size={20} color="#94A3B8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Primary Mobile Number"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="phone-pad"
                                    value={mobileNo}
                                    onChangeText={setMobileNo}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Alternate Mobile No</Text>
                            <View style={styles.inputWrapper}>
                                <IconSymbol name="phone" size={20} color="#94A3B8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Secondary Mobile Number"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="phone-pad"
                                    value={alternateMobileNo}
                                    onChangeText={setAlternateMobileNo}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <View style={styles.inputWrapper}>
                                <IconSymbol name="mail" size={20} color="#94A3B8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="store@example.com"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Location Section */}
                    <View style={styles.card}>
                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.cardTitle}>Location</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Address Line 1</Text>
                            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Street address, P.O. box..."
                                    placeholderTextColor="#94A3B8"
                                    multiline
                                    value={addressLine1}
                                    onChangeText={setAddressLine1}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Address Line 2</Text>
                            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Apartment, suite, unit, etc."
                                    placeholderTextColor="#94A3B8"
                                    multiline
                                    value={addressLine2}
                                    onChangeText={setAddressLine2}
                                />
                            </View>
                        </View>

                        <View style={styles.locationGrid}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.inputLabel}>City</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="City"
                                        placeholderTextColor="#94A3B8"
                                        value={city}
                                        onChangeText={setCity}
                                    />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.inputLabel}>Pincode</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Pincode"
                                        placeholderTextColor="#94A3B8"
                                        keyboardType="numeric"
                                        value={pincode}
                                        onChangeText={setPincode}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.locationGrid}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.inputLabel}>State</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="State"
                                        placeholderTextColor="#94A3B8"
                                        value={state}
                                        onChangeText={setState}
                                    />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.inputLabel}>Country</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Country"
                                        placeholderTextColor="#94A3B8"
                                        value={country}
                                        onChangeText={setCountry}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Legal & Business Info */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Legal Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>GST No</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="GSTIN"
                                    placeholderTextColor="#94A3B8"
                                    autoCapitalize="characters"
                                    value={gstNo}
                                    onChangeText={setGstNo}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>PAN No</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="PAN Number"
                                    placeholderTextColor="#94A3B8"
                                    autoCapitalize="characters"
                                    value={panNo}
                                    onChangeText={setPanNo}
                                />
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={saveStore}>
                    <IconSymbol name="save" size={20} color="#fff" style={{ marginRight: 8 }} />
                    <Text style={styles.saveButtonText}>Save Store</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E293B',
        marginBottom: 16,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    imageUploadContainer: {
        width: '100%',
        alignItems: 'center',
    },
    dashedBox: {
        height: 160,
        width: '100%',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    logoPreviewContainer: {
        width: 160,
        height: 160,
        borderRadius: 12,

        position: 'relative',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    editIconOverlay: {
        position: 'absolute',
        bottom: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 6,
        borderRadius: 20,
    },
    uploadTextPrimary: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginTop: 12,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        paddingHorizontal: 12,
        height: 48,
    },
    inputIcon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#1E293B',
    },
    textAreaWrapper: {
        height: 80,
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    textArea: {
        height: '100%',
        textAlignVertical: 'top',
    },
    locationGrid: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
    saveButton: {
        backgroundColor: '#1D4ED8',
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#1D4ED8',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
});
