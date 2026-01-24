import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function OrdersScreen() {
  const [timeRange, setTimeRange] = useState('7D');

  const StatCard = ({ title, value, trend, icon, color, trendColor }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <Text style={styles.cardValue}>{value}</Text>
      <View style={styles.trendContainer}>
        {trend && (
          <View style={styles.trendRow}>
            <Ionicons
              name={trend.startsWith('+') ? 'trending-up' : 'trending-down'}
              size={14}
              color={trendColor || (trend.startsWith('+') ? '#10b981' : '#ef4444')}
            />
            <Text style={[styles.trendText, { color: trendColor || (trend.startsWith('+') ? '#10b981' : '#ef4444') }]}>
              {trend}
            </Text>
          </View>
        )}
        {title === 'TOTAL ORDERS' && <Text style={styles.trendSubtext}>Last 30 days</Text>}
      </View>
    </View>
  );

  const CompanyItem = ({ name, value, progress }: any) => (
    <View style={styles.companyItem}>
      <View style={styles.companyHeader}>
        <Text style={styles.companyName}>{name}</Text>
        <Text style={styles.companyValue}>{value}</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );

  const ActivityItem = ({ icon, color, title, subtitle, time, isLast }: any) => (
    <View style={[styles.activityItem, isLast && { borderBottomWidth: 0 }]}>
      <View style={[styles.activityIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{title}</Text>
        <Text style={styles.activitySubtitle}>{subtitle}</Text>
      </View>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.row}>
          <StatCard
            title="TOTAL SALES"
            value="$124,500"
            trend="+12.5%"
            icon="cash-outline"
            color="#3b82f6"
          />
          <StatCard
            title="ACTIVE STORES"
            value="1,240"
            trend="+3.2%"
            icon="storefront-outline"
            color="#3b82f6"
          />
        </View>
        <View style={styles.row}>
          <StatCard
            title="TOTAL ORDERS"
            value="856"
            icon="cart-outline"
            color="#3b82f6"
          />
          <StatCard
            title="PENDING"
            value="$12,300"
            trend="-2.4%"
            icon="time-outline"
            color="#f97316"
            trendColor="#ef4444"
          />
        </View>
      </View>

      {/* Time Range Selector */}
      <View style={styles.selectorContainer}>
        {['7D', '1M', '1Y'].map((range) => (
          <TouchableOpacity
            key={range}
            onPress={() => setTimeRange(range)}
            style={[
              styles.selectorItem,
              timeRange === range && styles.selectorItemSelected
            ]}
          >
            <Text style={[
              styles.selectorText,
              timeRange === range && styles.selectorTextSelected
            ]}>
              {range}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sales Revenue Chart Area */}
      <View style={styles.mainCard}>
        <Text style={styles.sectionTitleSmall}>Sales Revenue</Text>
        <View style={styles.revenueHeader}>
          <Text style={styles.revenueValue}>$42,850</Text>
          <Text style={styles.revenueTrend}>+15.2%</Text>
        </View>
        <Text style={styles.revenueSubtext}>Total revenue accumulated this week</Text>

        {/* Simplified Chart Placeholder */}
        <View style={styles.chartPlaceholder}>
          <View style={styles.chartLineContainer}>
            {/* We'll use a sequence of heights to simulate a wave */}
            {[30, 60, 45, 75, 50, 80, 40, 65, 55, 70, 35, 90, 60, 40, 75].map((h, i) => (
              <View key={i} style={[styles.chartBar, { height: h }]} />
            ))}
          </View>
          <View style={styles.chartLabels}>
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => (
              <Text key={d} style={styles.chartLabelText}>{d}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Top Performing Companies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Performing Companies</Text>
        <View style={styles.mainCard}>
          <CompanyItem name="Global Foods Inc." value="$45.2k" progress={80} />
          <CompanyItem name="Fresh Produce Co." value="$38.9k" progress={70} />
          <CompanyItem name="Elite Beverages" value="$32.1k" progress={60} />
          <CompanyItem name="Organic Valley" value="$24.5k" progress={45} />
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainCard}>
          <ActivityItem
            icon="bag-add-outline"
            color="#10b981"
            title="New Order #8542"
            subtitle="Store Alpha · $1,240.00"
            time="2m ago"
          />
          <ActivityItem
            icon="person-add-outline"
            color="#3b82f6"
            title="New Store Verified"
            subtitle="Metro Mart Downtown"
            time="1h ago"
          />
          <ActivityItem
            icon="wallet-outline"
            color="#f59e0b"
            title="Payment Received"
            subtitle="Bulk Corp · Invoice #IV-882"
            time="3h ago"
            isLast
          />
        </View>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  statsGrid: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    width: '48.5%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'column',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  trendSubtext: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  selectorContainer: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  selectorItem: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  selectorItemSelected: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  selectorTextSelected: {
    color: '#3b82f6',
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  sectionTitleSmall: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  revenueValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e293b',
    marginRight: 10,
  },
  revenueTrend: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  revenueSubtext: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 180,
    justifyContent: 'flex-end',
  },
  chartLineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
    paddingHorizontal: 10,
  },
  chartBar: {
    width: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    opacity: 0.8,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 5,
  },
  chartLabelText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  viewAll: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  companyItem: {
    marginBottom: 20,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1e293b',
  },
  companyValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },
  activitySubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
});
