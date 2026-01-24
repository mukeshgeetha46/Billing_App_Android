import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CustomDrawer() {
    const router = useRouter();
    const pathname = usePathname();

    const Item = ({ label, icon, route }: any) => {
        const active = pathname === route || pathname.startsWith(route);

        return (
            <TouchableOpacity
                style={[styles.item, active && styles.activeItem]}
                onPress={() => router.push(route)}
            >
                <Ionicons
                    name={icon}
                    size={22}
                    color={active ? '#2563eb' : '#6b7280'}
                />
                <Text style={[styles.label, active && styles.activeLabel]}>
                    {label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* PROFILE HEADER */}
            <View style={styles.header}>
                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={24} color="#f97316" />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>Alex Johnson</Text>
                        <Text style={styles.role}>Store Manager</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.archiveButton}>
                    <Ionicons name="archive-outline" size={20} color="#6b7280" />
                </TouchableOpacity>
            </View>

            {/* SCROLLABLE CONTENT */}
            <DrawerContentScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Item label="Home" icon="home-outline" route="/(drawer)/(tabs)" />


                <Text style={styles.section}>MANAGEMENT</Text>

                <Item label="Add Company" icon="business-outline" route="/Company/Addcompany" />
                <Item label="My Stores" icon="storefront-outline" route="/Storelist" />
                <Item label="Add Product" icon="add-circle-outline" route="/Product/Productlist" />

            </DrawerContentScrollView>

            {/* FOOTER */}
            <View style={styles.footer}>
                <Item label="Settings" icon="settings-outline" route="/settings" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingTop: 60, // Account for status bar
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fed7aa',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 2,
    },
    role: {
        fontSize: 13,
        color: '#6b7280',
    },
    archiveButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 8,
    },
    section: {
        marginTop: 24,
        marginBottom: 8,
        marginLeft: 12,
        fontSize: 11,
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: 0.5,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginVertical: 2,
    },
    activeItem: {
        backgroundColor: '#eff6ff',
    },
    label: {
        marginLeft: 12,
        fontSize: 15,
        color: '#374151',
        fontWeight: '500',
    },
    activeLabel: {
        color: '#2563eb',
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
        backgroundColor: '#ffffff',
    },
});