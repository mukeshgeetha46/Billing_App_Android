import { IconSymbol } from '@/components/ui/icon-symbol';
import { useGetHomedataQuery } from '@/services/features/home/homeApi';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// Type definitions
type Partner = {
  id: string;
  name: string;
  color: string;
  icon?: string;
  image?: ImageSourcePropType;
};


export default function HomeScreen() {
  const router = useRouter();
  const { data: featuredPartners, isLoading, error } = useGetHomedataQuery();


  if (isLoading) {
    return <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading...</Text>;
  }

  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 40 }}>Something went wrong</Text>;
  }


  const renderPartnerItem = ({ item }: { item: Partner }) => (
    <TouchableOpacity
      style={styles.partnerItem}
      onPress={() => router.push(`/partner/${item.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.partnerCard}>
        <View style={[styles.partnerLogo]}>
          {/* Placeholder for logo - using first letter or icon if we were more advanced */}
          <Image source={{ uri: item.image }} style={styles.partnerLogo} resizeMode="contain" />
        </View>
      </View>
      <Text style={styles.partnerName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>

      {/* Top Bar */}


      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search companies or categories"
            placeholderTextColor="#888"
          />
          <TouchableOpacity>
            <IconSymbol name="slider.horizontal.3" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Featured Partners Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FEATURED PARTNERS</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.gridContainer}>
          {featuredPartners.map((item) => (
            <View key={item.id} style={styles.gridItemWrapper}>
              {renderPartnerItem({ item })}
            </View>
          ))}
        </View>

        {/* Promotional Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>New Summer Catalog</Text>
            <Text style={styles.bannerSubtitle}>Get 10% off on all beverage orders</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>BROWSE NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bannerCircle} />
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
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '500',
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
  partnerItem: {
    alignItems: 'center',
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
  partnerLogo: {
    width: 76,
    height: 76,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partnerLogoText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  partnerName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  bannerContainer: {
    backgroundColor: '#1D4ED8',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    height: 160,
    justifyContent: 'center',
  },
  bannerContent: {
    zIndex: 2,
    width: '70%',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: '#DBEAFE',
    marginBottom: 16,
  },
  bannerButton: {
    backgroundColor: '#FFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
  },
  bannerCircle: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.1)',
  }
});
