import React, { useEffect } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SkeletonItemProps {
    style?: any;
}

const SkeletonItem: React.FC<SkeletonItemProps> = ({ style }) => {
    const opacity = useSharedValue(0.3);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.7, { duration: 800 }),
                withTiming(0.3, { duration: 800 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                { backgroundColor: '#E2E8F0', borderRadius: 4 },
                style,
                animatedStyle,
            ]}
        />
    );
};

export default function StoreListSkeleton() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" />

            {/* Header Skeleton */}
            <View style={styles.header}>
                <SkeletonItem style={{ width: 44, height: 44, borderRadius: 22 }} />
                <SkeletonItem style={{ width: 140, height: 24 }} />
                <SkeletonItem style={{ width: 44, height: 44, borderRadius: 22 }} />
            </View>

            {/* Search Bar Skeleton */}
            <View style={styles.searchSection}>
                <View style={styles.searchBar}>
                    <SkeletonItem style={{ width: 20, height: 20, borderRadius: 10 }} />
                    <SkeletonItem style={{ flex: 1, height: 16, marginLeft: 10 }} />
                </View>
            </View>

            {/* Stores List Skeleton */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <View key={item} style={styles.card}>
                        <View style={styles.cardInfo}>
                            <SkeletonItem style={styles.storeImage} />
                            <View style={styles.storeDetails}>
                                <SkeletonItem style={{ width: '60%', height: 20, marginBottom: 10 }} />
                                <SkeletonItem style={{ width: '80%', height: 14, marginBottom: 8 }} />
                                <SkeletonItem style={{ width: '70%', height: 14 }} />
                            </View>
                        </View>
                        <View style={styles.cardActions}>
                            <View style={styles.actionButton}>
                                <SkeletonItem style={{ width: 40, height: 16 }} />
                            </View>
                            <View style={[styles.actionButton, { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#F1F5F9' }]}>
                                <SkeletonItem style={{ width: 80, height: 16 }} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Floating Action Button Skeleton */}
            <SkeletonItem style={styles.fab} />

            {/* Footer Skeleton */}
            <View style={styles.footer}>
                <SkeletonItem style={{ width: 120, height: 12 }} />
            </View>

        </SafeAreaView>
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
        paddingHorizontal: 16,
        paddingBottom: 12,
        backgroundColor: '#FFF',
    },
    searchSection: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 12 : 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        height: 50,
    },
    listContent: {
        paddingTop: 8,
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    storeImage: {
        width: 68,
        height: 68,
        borderRadius: 12,
    },
    storeDetails: {
        flex: 1,
        marginLeft: 16,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF2FF',
        borderRadius: 10,
    },
    fab: {
        position: 'absolute',
        bottom: 80,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
    },
});
