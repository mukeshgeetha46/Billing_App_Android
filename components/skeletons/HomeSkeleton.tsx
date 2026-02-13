import React, { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
                { backgroundColor: '#E5E7EB', borderRadius: 4 },
                style,
                animatedStyle,
            ]}
        />
    );
};

export default function HomeSkeleton() {
    return (
        <SafeAreaView style={styles.container} edges={['left', 'right']}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
            >
                {/* Search Bar Skeleton */}
                <View style={styles.searchContainer}>
                    <SkeletonItem style={{ width: 20, height: 20, borderRadius: 10, marginRight: 8 }} />
                    <SkeletonItem style={{ flex: 1, height: 20, borderRadius: 4 }} />
                    <SkeletonItem style={{ width: 20, height: 20, borderRadius: 4, marginLeft: 8 }} />
                </View>

                {/* Featured Partners Header Skeleton */}
                <View style={styles.sectionHeader}>
                    <SkeletonItem style={{ width: 140, height: 20 }} />
                    <SkeletonItem style={{ width: 60, height: 20 }} />
                </View>

                {/* Featured Partners Grid Skeleton */}
                <View style={styles.gridContainer}>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <View key={item} style={styles.gridItemWrapper}>
                            <View style={styles.partnerCard}>
                                <SkeletonItem style={{ width: 60, height: 60, borderRadius: 30 }} />
                            </View>
                            <SkeletonItem style={{ width: '80%', height: 14, marginTop: 8, alignSelf: 'center' }} />
                        </View>
                    ))}
                </View>

                {/* Promotional Banner Skeleton */}
                <View style={styles.bannerContainer}>
                    <View style={styles.bannerContent}>
                        <SkeletonItem style={{ width: '60%', height: 24, marginBottom: 8 }} />
                        <SkeletonItem style={{ width: '80%', height: 16, marginBottom: 4 }} />
                        <SkeletonItem style={{ width: '50%', height: 16, marginBottom: 16 }} />
                        <SkeletonItem style={{ width: 100, height: 32, borderRadius: 6 }} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        height: 48,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 24,
        marginBottom: 12,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
    },
    gridItemWrapper: {
        width: '33.33%',
        padding: 7,
    },
    partnerCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        aspectRatio: 1,
    },
    bannerContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 24,
        borderRadius: 16,
        padding: 20,
        height: 160,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    bannerContent: {
        width: '100%',
    },
});
