
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAddcompanyMutation } from '@/services/features/company/companyApi';
import { showToast } from '@/utils/toast';
import DateTimePicker from '@react-native-community/datetimepicker'; // Added DateTimePicker
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function AddCompanyScreen() {
    const router = useRouter();
    const [companyName, setCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [category, setCategory] = useState('');
    const [companyType, setCompanyType] = useState(''); // New: Company Type
    const [brandBio, setBrandBio] = useState('');

    // Contact Details
    const [contactEmail, setContactEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New: Phone Number
    // Address Breakdown
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');

    // Legal & Business Info
    const [gstNumber, setGstNumber] = useState('');
    const [panNumber, setPanNumber] = useState('');
    const [cinNumber, setCinNumber] = useState(''); // Company Registration Number
    const [incorporationDate, setIncorporationDate] = useState('');

    // Media & Branding
    const [logoImage, setLogoImage] = useState<string | null>(null);
    const [bannerImage, setBannerImage] = useState<string | null>(null);
    const [brandColor, setBrandColor] = useState('#1D61F2');
    const [socialFacebook, setSocialFacebook] = useState('');
    const [socialInstagram, setSocialInstagram] = useState('');
    const [socialLinkedin, setSocialLinkedin] = useState('');
    const [socialTwitter, setSocialTwitter] = useState('');

    // Pickers State
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPickerField, setCurrentPickerField] = useState<'category' | 'companyType' | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());

    const CATEGORY_OPTIONS = ['Technology', 'Retail', 'Healthcare', 'Consulting', 'Manufacturing', 'Other'];
    const COMPANY_TYPE_OPTIONS = ['Private Limited', 'Public Limited', 'LLP', 'Startup', 'Sole Proprietorship', 'Partnership'];

    const openPicker = (field: 'category' | 'companyType') => {
        setCurrentPickerField(field);
        setModalVisible(true);
    };

    const handleSelectOption = (option: string) => {
        if (currentPickerField === 'category') {
            setCategory(option);
        } else if (currentPickerField === 'companyType') {
            setCompanyType(option);
        }
        setModalVisible(false);
    };

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);

        // Format Date to DD/MM/YYYY
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear();
        setIncorporationDate(`${day}/${month}/${year}`);
    };

    const STATUSBAR_HEIGHT =
        Platform.OS === 'android'
            ? StatusBar.currentHeight ?? 0
            : Constants.statusBarHeight;

    const pickImage = async (type: 'logo' | 'banner') => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: type === 'logo' ? [1, 1] : [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            if (type === 'logo') {
                setLogoImage(result.assets[0].uri);
            } else {
                setBannerImage(result.assets[0].uri);
            }
        }
    };
    const [signin, { isLoading, error }] = useAddcompanyMutation();
    const handleRegister = async () => {
        const formData = new FormData();

        // Append Text Fields
        formData.append('companyName', companyName);
        formData.append('website', website);
        formData.append('category', category);
        formData.append('companyType', companyType);
        formData.append('brandBio', brandBio);
        formData.append('contactEmail', contactEmail);
        formData.append('phoneNumber', phoneNumber);
        formData.append('streetAddress', streetAddress);
        formData.append('city', city);
        formData.append('state', state);
        formData.append('country', country);
        formData.append('pincode', pincode);
        formData.append('gstNumber', gstNumber);
        formData.append('panNumber', panNumber);
        formData.append('cinNumber', cinNumber);
        formData.append('incorporationDate', incorporationDate);
        formData.append('brandColor', brandColor);
        formData.append('socialFacebook', socialFacebook);
        formData.append('socialInstagram', socialInstagram);
        formData.append('socialLinkedin', socialLinkedin);
        formData.append('socialTwitter', socialTwitter);

        // Append Images
        if (logoImage) {
            formData.append('logo', {
                uri: logoImage,
                name: 'company_logo.jpg',
                type: 'image/jpeg',
            } as any);
        }

        if (bannerImage) {
            formData.append('banner', {
                uri: bannerImage,
                name: 'company_banner.jpg',
                type: 'image/jpeg',
            } as any);
        }

        try {
            const response = await signin(formData).unwrap();



            showToast('Company added successfully!');
            router.back();
        } catch (error) {

            showToast('Failed to add company');
        }


        // Alert.alert('Success', 'Company data prepared (Check Console)');
        // TODO: Call API here
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.safeArea}>
                <View style={[styles.header, { paddingTop: STATUSBAR_HEIGHT }]}>
                    <TouchableOpacity onPress={() => {
                        if (router.canGoBack()) {
                            router.back();
                        } else {
                            router.replace('/(drawer)/(tabs)'); // or home screen
                        }
                    }} style={styles.backButton}>
                        <IconSymbol name="chevron.left" size={28} color="#111" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add New Company</Text>
                    <View style={{ width: 40 }} />
                </View>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        {/* Logo Section */}
                        <View style={styles.logoSection}>
                            <TouchableOpacity onPress={() => pickImage('logo')} style={styles.logoContainer}>
                                {logoImage ? (
                                    <Image source={{ uri: logoImage }} style={styles.logoImage} />
                                ) : (
                                    <IconSymbol name="cube.box" size={40} color="#fff" />
                                )}
                            </TouchableOpacity>
                            <Text style={styles.sectionTitle}>Company Logo</Text>
                            <Text style={styles.sectionSubTitle}>Upload your official brand identity</Text>
                            <TouchableOpacity onPress={() => pickImage('logo')} style={styles.uploadButton}>
                                <IconSymbol name="paperplane.fill" size={16} color="#2563EB" style={{ transform: [{ rotate: '-90deg' }] }} />
                                <Text style={styles.uploadButtonText}>{logoImage ? 'Change Photo' : 'Upload Photo'}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* General Information */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>GENERAL INFORMATION</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Company Name</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="unfold_more Brand Bio"
                                        value={companyName}
                                        onChangeText={setCompanyName}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Official Website</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="https://www.company.com"
                                        value={website}
                                        onChangeText={setWebsite}
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Primary Category</Text>
                                <TouchableOpacity style={styles.inputWrapper} onPress={() => openPicker('category')}>
                                    <Text style={[styles.input, { color: category ? '#111' : '#999', paddingVertical: 15 }]}>
                                        {category || 'Select category'}
                                    </Text>
                                    <IconSymbol name="unfold_more" size={20} color="#666" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Company Type</Text>
                                <TouchableOpacity style={styles.inputWrapper} onPress={() => openPicker('companyType')}>
                                    <Text style={[styles.input, { color: companyType ? '#111' : '#999', paddingVertical: 15 }]}>
                                        {companyType || 'Select Type (e.g. Private, Startup)'}
                                    </Text>
                                    <IconSymbol name="unfold_more" size={20} color="#666" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <View style={styles.rowLabel}>
                                    <Text style={styles.inputLabel}>Brand Bio</Text>
                                    <Text style={styles.charCount}>{brandBio.length}/200</Text>
                                </View>
                                <View style={[styles.inputWrapper, { height: 100, alignItems: 'flex-start' }]}>
                                    <TextInput
                                        style={[styles.input, { height: '100%', textAlignVertical: 'top' }]}
                                        placeholder="Briefly describe your company's mission and products..."
                                        value={brandBio}
                                        onChangeText={setBrandBio}
                                        multiline
                                        maxLength={200}
                                    />
                                </View>
                            </View>
                        </View>

                        {/* Contact Details */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>CONTACT DETAILS</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Email ID</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="email@example.com"
                                        value={contactEmail}
                                        onChangeText={setContactEmail}
                                        keyboardType="email-address"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Phone / Mobile Number</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="+91 9876543210"
                                        value={phoneNumber}
                                        onChangeText={setPhoneNumber}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </View>

                            <Text style={[styles.inputLabel, { marginTop: 16, marginBottom: 12 }]}>Address Details</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.subLabel}>Street Address</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="123 Main St, Tech Park"
                                        value={streetAddress}
                                        onChangeText={setStreetAddress}
                                    />
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                    <Text style={styles.subLabel}>City</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="City"
                                            value={city}
                                            onChangeText={setCity}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.subLabel}>State</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="State"
                                            value={state}
                                            onChangeText={setState}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
                                    <Text style={styles.subLabel}>Country</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Country"
                                            value={country}
                                            onChangeText={setCountry}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.subLabel}>Pincode</Text>
                                    <View style={styles.inputWrapper}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="123456"
                                            value={pincode}
                                            onChangeText={setPincode}
                                            keyboardType="number-pad"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Legal / Business Info */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>LEGAL / BUSINESS INFO (OPTIONAL)</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>GST Number</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="GSTIN"
                                        value={gstNumber}
                                        onChangeText={setGstNumber}
                                        autoCapitalize="characters"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>PAN Number</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="PAN"
                                        value={panNumber}
                                        onChangeText={setPanNumber}
                                        autoCapitalize="characters"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Company Registration Number (CIN)</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="CIN"
                                        value={cinNumber}
                                        onChangeText={setCinNumber}
                                        autoCapitalize="characters"
                                    />
                                </View>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Incorporation Date</Text>
                                <TouchableOpacity style={styles.inputWrapper} onPress={() => setShowDatePicker(true)}>
                                    <Text style={[styles.input, { color: incorporationDate ? '#111' : '#999', paddingVertical: 15 }]}>
                                        {incorporationDate || 'DD/MM/YYYY'}
                                    </Text>
                                    <IconSymbol name="calendar" size={20} color="#666" />
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode="date"
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                            </View>
                        </View>

                        {/* Media & Branding */}
                        <View style={styles.section}>
                            <Text style={styles.sectionLabel}>MEDIA & BRANDING (OPTIONAL)</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Banner Image</Text>
                                <TouchableOpacity
                                    onPress={() => pickImage('banner')}
                                    style={[styles.uploadButton, { justifyContent: 'center', backgroundColor: '#F0F4F8', height: 120, overflow: 'hidden', paddingHorizontal: 0, paddingVertical: 0 }]}
                                >
                                    {bannerImage ? (
                                        <Image source={{ uri: bannerImage }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                                    ) : (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <IconSymbol name="photo" size={20} color="#64748B" />
                                            <Text style={[styles.uploadButtonText, { color: '#64748B' }]}>Upload Banner</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Brand Color</Text>
                                <View style={[styles.inputWrapper, { paddingLeft: 8 }]}>
                                    <View style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: brandColor, marginRight: 10 }} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="#000000"
                                        value={brandColor}
                                        onChangeText={setBrandColor}
                                    />
                                </View>
                            </View>

                            <Text style={[styles.inputLabel, { marginTop: 16, marginBottom: 12 }]}>Social Media Links</Text>

                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <IconSymbol name="link" size={18} color="#666" style={{ marginRight: 8 }} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Facebook URL"
                                        value={socialFacebook}
                                        onChangeText={setSocialFacebook}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <IconSymbol name="link" size={18} color="#666" style={{ marginRight: 8 }} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Instagram URL"
                                        value={socialInstagram}
                                        onChangeText={setSocialInstagram}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <IconSymbol name="link" size={18} color="#666" style={{ marginRight: 8 }} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="LinkedIn URL"
                                        value={socialLinkedin}
                                        onChangeText={setSocialLinkedin}
                                    />
                                </View>
                            </View>
                            <View style={styles.inputGroup}>
                                <View style={styles.inputWrapper}>
                                    <IconSymbol name="link" size={18} color="#666" style={{ marginRight: 8 }} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Twitter URL"
                                        value={socialTwitter}
                                        onChangeText={setSocialTwitter}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Register Company</Text>
                    </TouchableOpacity>
                </View>

                {/* Custom Modal for Selection */}
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
                                    <Text style={styles.modalTitle}>Select {currentPickerField === 'category' ? 'Category' : 'Company Type'}</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <IconSymbol name="xmark" size={24} color="#111" />
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={currentPickerField === 'category' ? CATEGORY_OPTIONS : COMPANY_TYPE_OPTIONS}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectOption(item)}>
                                            <Text style={styles.modalItemText}>{item}</Text>
                                            {(currentPickerField === 'category' ? category : companyType) === item && (
                                                <IconSymbol name="checkmark" size={20} color="#1D61F2" />
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
        fontWeight: 'bold',
        color: '#111',
    },
    modalItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalItemText: {
        fontSize: 16,
        color: '#333',
    },
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FB',
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
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    scrollContent: {
        padding: 20,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 120,
        height: 120,
        backgroundColor: '#1E3A3A',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#999',
        overflow: 'hidden', // Add overflow hidden for image
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    sectionSubTitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EBF2FF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    uploadButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2563EB',
        marginLeft: 8,
    },
    section: {
        marginBottom: 32,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#5C6B89',
        letterSpacing: 1,
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    rowLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111',
        marginBottom: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    subLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: '#555',
        marginBottom: 6,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: '#111',
    },
    charCount: {
        fontSize: 12,
        color: '#999',
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    registerButton: {
        backgroundColor: '#1D61F2',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});
