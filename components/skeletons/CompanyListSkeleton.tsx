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

export default function CompanyListSkeleton() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header Skeleton */}
            <View style={styles.header}>
                <SkeletonItem style={{ width: 44, height: 44, borderRadius: 22 }} />
                <SkeletonItem style={{ width: 180, height: 24 }} />
                <SkeletonItem style={{ width: 44, height: 44, borderRadius: 22 }} />
            </View>

            {/* Search Bar Skeleton */}
            <View style={styles.searchBarWrapper}>
                <View style={styles.searchBar}>
                    <SkeletonItem style={{ width: 20, height: 20, borderRadius: 10 }} />
                    <SkeletonItem style={{ flex: 1, height: 16, marginLeft: 8 }} />
                </View>
            </View>

            {/* Companies List Skeleton */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <View key={item} style={styles.card}>
                        <View style={styles.cardInfo}>
                            <SkeletonItem style={styles.companyImage} />
                            <View style={styles.companyDetails}>
                                <SkeletonItem style={{ width: '60%', height: 20, marginBottom: 8 }} />
                                <SkeletonItem style={{ width: '40%', height: 14, marginBottom: 8 }} />
                                <SkeletonItem style={{ width: '30%', height: 14 }} />
                            </View>
                        </View>
                        <View style={styles.cardActions}>
                            <View style={styles.actionButton}>
                                <SkeletonItem style={{ width: 60, height: 16 }} />
                            </View>
                            <View style={styles.actionDivider} />
                            <View style={styles.actionButton}>
                                <SkeletonItem style={{ width: 100, height: 16 }} />
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
        paddingBottom: 12,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'android' ? 12 : 0,
    },
    searchBarWrapper: {
        padding: 16,
        backgroundColor: '#FFF',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        height: 50,
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    cardInfo: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
    },
    companyImage: {
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    companyDetails: {
        flex: 1,
        marginLeft: 16,
    },
    cardActions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#F1F5F9',
        paddingVertical: 12,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionDivider: {
        width: 1,
        backgroundColor: '#F1F5F9',
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
        paddingVertical: 12, // slightly larger to match skeleton padding
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
