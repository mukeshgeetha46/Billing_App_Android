import { IconSymbol } from '@/components/ui/icon-symbol';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddNewStoreScreen() {
    const router = useRouter();
    const [storeName, setStoreName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [isManualEntry, setIsManualEntry] = useState(true);

    const STATUSBAR_HEIGHT =
        Platform.OS === 'android'
            ? StatusBar.currentHeight ?? 0
            : Constants.statusBarHeight;

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
                        <Text style={styles.cardTitle}>Store Image</Text>
                        <TouchableOpacity style={styles.imageUploadContainer}>
                            <View style={styles.dashedBox}>
                                <IconSymbol name="camera.plus" size={48} color="#94A3B8" />
                                <Text style={styles.uploadTextPrimary}>Take or upload a photo</Text>
                                <Text style={styles.uploadTextSecondary}>Recommended for storefront recognition</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Store Information Section */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Store Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Store Name</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Downtown Grocers"
                                    placeholderTextColor="#94A3B8"
                                    value={storeName}
                                    onChangeText={setStoreName}
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
                    </View>

                    {/* Contact Details Section */}
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Contact Details</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Contact Number</Text>
                            <View style={styles.inputWrapper}>
                                <IconSymbol name="phone" size={20} color="#94A3B8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="+1 (555) 000-0000"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="phone-pad"
                                    value={contactNumber}
                                    onChangeText={setContactNumber}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <IconSymbol name="mail" size={20} color="#94A3B8" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="store@example.com"
                                    placeholderTextColor="#94A3B8"
                                    keyboardType="email-address"
                                    value={emailAddress}
                                    onChangeText={setEmailAddress}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Location Section */}
                    <View style={styles.card}>
                        <View style={styles.cardHeaderRow}>
                            <Text style={styles.cardTitle}>Location</Text>
                            <View style={styles.manualEntryRow}>
                                <Text style={styles.manualEntryLabel}>MANUAL ENTRY</Text>
                                <Switch
                                    value={isManualEntry}
                                    onValueChange={setIsManualEntry}
                                    trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                                    thumbColor="#fff"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Street Address</Text>
                            <View style={[styles.inputWrapper, styles.textAreaWrapper]}>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Enter street name and number..."
                                    placeholderTextColor="#94A3B8"
                                    multiline
                                    value={streetAddress}
                                    onChangeText={setStreetAddress}
                                />
                            </View>
                        </View>

                        <View style={styles.locationGrid}>
                            <View style={[styles.inputGroup, { flex: 2 }]}>
                                <Text style={styles.inputLabel}>City</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. New York"
                                        placeholderTextColor="#94A3B8"
                                        value={city}
                                        onChangeText={setCity}
                                    />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                                <Text style={styles.inputLabel}>State</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="NY"
                                        placeholderTextColor="#94A3B8"
                                        value={state}
                                        onChangeText={setState}
                                    />
                                </View>
                            </View>
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 12 }]}>
                                <Text style={styles.inputLabel}>Zip</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="10001"
                                        placeholderTextColor="#94A3B8"
                                        keyboardType="numeric"
                                        value={zip}
                                        onChangeText={setZip}
                                    />
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.pinMapRow}>
                            <IconSymbol name="location.pin" size={16} color="#64748B" />
                            <Text style={styles.pinMapText}>Pin location on map</Text>
                        </TouchableOpacity>

                        <View style={styles.mapPlaceholder}>
                            <View style={styles.mapPin}>
                                <IconSymbol name="location.pin" size={32} color="#2563EB" />
                            </View>
                            {/* In a real app, you'd use react-native-maps here */}
                            <View style={styles.placeholderMapBg} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton}>
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
    },
    dashedBox: {
        height: 160,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderStyle: 'dashed',
        borderRadius: 12,
        backgroundColor: '#F8FAFC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    uploadTextPrimary: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginTop: 12,
    },
    uploadTextSecondary: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 4,
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
    manualEntryRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    manualEntryLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        marginRight: 8,
    },
    locationGrid: {
        flexDirection: 'row',
    },
    pinMapRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    pinMapText: {
        fontSize: 13,
        color: '#64748B',
        marginLeft: 6,
    },
    mapPlaceholder: {
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#E2E8F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPin: {
        zIndex: 1,
    },
    placeholderMapBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#D1FAE5', // Light greenish for a map feel
        opacity: 0.5,
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
