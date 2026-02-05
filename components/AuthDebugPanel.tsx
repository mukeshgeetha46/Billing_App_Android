import type { AppDispatch } from '@/store';
import { logout, selectAuth } from '@/store/slices/authSlice';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

/**
 * Debug component to display current Redux auth state
 * Use this to verify that Redux is working correctly
 */
export default function AuthDebugPanel() {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogout = () => {
        dispatch(logout());
        console.log('User logged out - Redux state cleared');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Redux Auth State (Debug)</Text>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Authenticated:</Text>
                <Text style={[styles.value, auth.isAuthenticated ? styles.success : styles.error]}>
                    {auth.isAuthenticated ? 'Yes' : 'No'}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Token:</Text>
                <Text style={styles.value} numberOfLines={1}>
                    {auth.token || 'None'}
                </Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>User ID:</Text>
                <Text style={styles.value}>{auth.userId || 'None'}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{auth.user?.name || 'None'}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{auth.user?.email || 'None'}</Text>
            </View>

            {auth.isAuthenticated && (
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout (Clear State)</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F4F6',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    title: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4B5563',
        width: 100,
    },
    value: {
        fontSize: 14,
        color: '#111827',
        flex: 1,
    },
    success: {
        color: '#10B981',
        fontWeight: '700',
    },
    error: {
        color: '#EF4444',
        fontWeight: '700',
    },
    logoutButton: {
        marginTop: 12,
        backgroundColor: '#EF4444',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 6,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
});
