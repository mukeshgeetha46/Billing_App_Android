import { IconSymbol } from '@/components/ui/icon-symbol';
import { useProfileQuery } from '@/services/features/auth/authApi';
import { selectAuth } from '@/store/slices/authSlice';
import { capitalizeFirstLetter } from '@/utils/string';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
    const router = useRouter();
    const isAuthenticateduser = useSelector(selectAuth);
    const user = isAuthenticateduser.user;
    const renderSettingItem = (icon: any, title: string, subtitle?: string, badge?: string, showChevron = true) => (
        <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIconContainer}>
                <IconSymbol name={icon} size={22} color="#2563EB" />
            </View>
            <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{title}</Text>
                {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
            {badge && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}
            {showChevron && <IconSymbol name="chevron.right" size={20} color="#9CA3AF" />}
        </TouchableOpacity>
    );


    const { data, isLoading, error } = useProfileQuery();

    console.log("data", data)

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editButton}>
                            <IconSymbol name="pencil" size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{capitalizeFirstLetter(data?.name) || "Unknown"}</Text>
                    <Text style={styles.userRole}>{data?.role || "Unknown"}</Text>
                    <View style={styles.locationContainer}>
                        <IconSymbol name="building.2" size={14} color="#6B7280" />
                        <Text style={styles.locationText}>Downtown Market Central</Text>
                    </View>
                </View>

                {/* Procurement Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>PROCUREMENT</Text>
                </View>
                <View style={styles.sectionContent}>
                    {renderSettingItem('doc.text.fill', 'Order History', undefined, '3 Active')}
                    <View style={styles.divider} />
                    {renderSettingItem('creditcard', 'Payment Methods')}
                </View>

                {/* Preferences Section */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>PREFERENCES</Text>
                </View>
                <View style={styles.sectionContent}>
                    {renderSettingItem('bell', 'Notification Settings')}
                    <View style={styles.divider} />
                    {renderSettingItem('globe', 'Language & Region')}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/Auth/Login')}>
                    <IconSymbol name="arrow.right.square" size={24} color="#EF4444" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.versionText}>Wholesale Pro v2.4.1</Text>
                    <Text style={styles.buildText}>ENTERPRISE BUILD 8829</Text>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        paddingTop: 15,
    },



    profileSection: {
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#2563EB',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    userRole: {
        fontSize: 16,
        color: '#4338CA',
        fontWeight: '500',
        marginBottom: 8,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationText: {
        fontSize: 14,
        color: '#6B7280',
    },
    sectionHeader: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 12,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#111827',
        letterSpacing: 1,
    },
    sectionContent: {
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    settingTextContainer: {
        flex: 1,
    },
    settingTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    settingSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6',
        marginLeft: 80,
    },
    badge: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#2563EB',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        marginTop: 32,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F3F4F6',
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#EF4444',
    },
    footer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    versionText: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    buildText: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '600',
    },
});
