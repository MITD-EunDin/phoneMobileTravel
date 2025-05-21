import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { CircleUser } from 'lucide-react-native';
import styles from './BroadStysle.js';
import { COLORS } from '../../../stysles/theme.js';
const DashBroad = () => {
  const [selectedTab, setSelectedTab] = useState('Hôm nay');

  // Dữ liệu tab lọc
  const tabs = ['Hôm nay', 'Hôm qua', '7 ngày qua', '30 ngày qua', '90 ngày qua'];

  // Dữ liệu top tour
  const topTours = [
    { name: 'Sapa–Lao Cai 4 ngày 3 đêm', revenue: '', quantity: '' },
  ];

  // Dữ liệu top nhân viên
  const topEmployees = [
    { name: 'Nguyễn Thị Trinh', revenue: '', quantity: '' },
  ];

  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tabItem,
        selectedTab === item && styles.tabItemSelected,
      ]}
      onPress={() => setSelectedTab(item)}
    >
      <Text
        style={[
          styles.tabText,
          selectedTab === item && styles.tabTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTour = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 2 }]}>{item.name}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{item.revenue}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
    </View>
  );

  const renderEmployee = ({ item }) => (
    <View style={styles.tableRow}>
      <View style={[styles.tableCell, { flex: 2, flexDirection: 'row', alignItems: 'center' }]}>
        <CircleUser color={COLORS.gray} size={24} />
        <Text style={styles.employeeName}>{item.name}</Text>
      </View>
      <Text style={[styles.tableCell, { flex: 1 }]}>{item.revenue}</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>{item.quantity}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Tab lọc */}
      <View style={styles.tabContainer}>
        <FlatList
          data={tabs}
          renderItem={renderTab}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabList}
        />
      </View>

      {/* Thống kê chung */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>THỐNG KẾ CHUNG</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Doanh số</Text>
            <Text style={styles.statValue}>20,000,000 đ</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Doanh thu</Text>
            <Text style={styles.statValue}>20,000,000 đ</Text>
          </View>
        </View>
      </View>


      {/* Top tour được đặt nhiều nhất */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TOP TOUR ĐƯỢC ĐẶT NHIỀU NHẤT</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Tên tour</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Doanh thu</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Số lượng</Text>
          </View>
          <FlatList
            data={topTours}
            renderItem={renderTour}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

      {/* Top nhân viên bán hàng tốt nhất */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TOP NHÂN VIÊN BÁN HÀNG TỐT NHẤT</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Nhân viên</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Doanh thu</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Số lượng</Text>
          </View>
          <FlatList
            data={topEmployees}
            renderItem={renderEmployee}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default DashBroad;