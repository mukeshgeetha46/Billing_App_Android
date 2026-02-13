import React, { useEffect } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
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

export default function ProductListSkeleton() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

            {/* Header Skeleton */}
            <View style={styles.header}>
                <SkeletonItem style={{ width: 40, height: 40, borderRadius: 20 }} />
                <SkeletonItem style={{ width: 160, height: 24 }} />
                <SkeletonItem style={{ width: 40, height: 40, borderRadius: 20 }} />
            </View>

            {/* Search Bar Skeleton */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <SkeletonItem style={{ width: 20, height: 20, borderRadius: 10, marginRight: 8 }} />
                    <SkeletonItem style={{ flex: 1, height: 16 }} />
                </View>
            </View>

            {/* Product List Skeleton */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <View key={item} style={styles.productCard}>
                        <SkeletonItem style={styles.moreButton} />
                        <View style={styles.cardMainContent}>
                            <SkeletonItem style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <SkeletonItem style={{ width: '70%', height: 18, marginBottom: 8 }} />
                                <SkeletonItem style={{ width: '40%', height: 14, marginBottom: 6 }} />
                                <SkeletonItem style={{ width: '50%', height: 12, marginBottom: 6 }} />
                                <SkeletonItem style={{ width: '30%', height: 12 }} />
                            </View>
                        </View>

                        <View style={styles.cardActions}>
                            <View style={styles.viewButton}>
                                <SkeletonItem style={{ width: 40, height: 14 }} />
                            </View>
                            <View style={styles.editButton}>
                                <SkeletonItem style={{ width: 40, height: 14 }} />
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Bottom FAB Section Skeleton */}
            <View style={styles.bottomSection}>
                <View style={styles.addNewContainer}>
                    <View style={styles.addNewLabelBox}>
                        <SkeletonItem style={{ width: 120, height: 16 }} />
                    </View>
                    <SkeletonItem style={styles.fab} />
                </View>
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
        paddingVertical: 12,
        backgroundColor: '#F8FAFC',
    },
    searchContainer: {
        paddingHorizontal: 20,
        paddingBottom: 16,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    listContent: {
        paddingHorizontal: 0,
        paddingBottom: 100,
    },
    productCard: {
        backgroundColor: '#FFF',
        marginBottom: 1,
        padding: 16,
        paddingTop: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        position: 'relative',
    },
    moreButton: {
        position: 'absolute',
        top: 8,
        right: 12,
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    cardMainContent: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'center',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    viewButton: {
        flex: 1,
        backgroundColor: '#EFF6FF',
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButton: {
        flex: 1,
        backgroundColor: '#E2E8F0', // Slightly darker for skeleton
        height: 44,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSection: {
        position: 'absolute',
        bottom: 24,
        right: 24,
        alignItems: 'flex-end',
    },
    addNewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    addNewLabelBox: {
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
});
