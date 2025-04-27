import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './NoticeStyle';

const NoticeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Tất cả');

  // Dữ liệu tab lọc
  const tabs = ['Tất cả', 'Chuyến đi', 'Nhắc gọi', 'Đến hẹn'];

  // Dữ liệu thông báo (lấy từ hình ảnh)
  const notices = [
    {
      id: '1',
      code: '12345',
      description: 'có chuyến đi Hà Nội–Sapa 4 ngày 3 đêm từ Bực Tử Liêm, Hà Nội do Nguyễn Thị Trình phụ trách sắp khởi hành vào ngày 2/8/2025',
      type: 'Chuyến đi',
    },
    {
      id: '2',
      code: '12345',
      description: 'chuyến đi Hà Nội–Sapa 4 ngày 3 đêm sắp đến hạn xác thực từ khách hàng',
      type: 'Đến hẹn',
    },
    {
      id: '3',
      code: '12345',
      description: 'có chuyến đi Hà Nội–Sapa 4 ngày 3 đêm đã hoàn thành chuyến đi',
      type: 'Chuyến đi',
    },
    {
      id: '4',
      code: '12345',
      description: 'có chuyến đi Hà Nội–Sapa 4 ngày 3 đêm từ Bực Tử Liêm, Hà Nội do Nguyễn Thị Trình phụ trách sắp khởi hành vào ngày 2/8/2025',
      type: 'Chuyến đi',
    },
    {
      id: '5',
      code: '12345',
      description: 'chuyến đi Hà Nội–Sapa 4 ngày 3 đêm sắp đến hạn xác thực từ khách hàng',
      type: 'Đến hẹn',
    },
    {
      id: '6',
      code: '12345',
      description: 'chuyến đi Hà Nội–Sapa 4 ngày 3 đêm đã hoàn thành chuyến đi',
      type: 'Chuyến đi',
    },
    {
      id: '7',
      code: '12345',
      description: 'có chuyến đi Hà Nội–Sapa 4 ngày 3 đêm từ Bực Tử Liêm, Hà Nội do Nguyễn Thị Trình phụ trách sắp khởi hành vào ngày 2/8/2025',
      type: 'Chuyến đi',
    },
    {
      id: '8',
      code: '12345',
      description: 'chuyến đi Hà Nội–Sapa 4 ngày 3 đêm sắp đến hạn xác thực từ khách hàng',
      type: 'Đến hẹn',
    },
  ];

  // Lọc thông báo theo tab được chọn
  const filteredNotices = selectedTab === 'Tất cả'
    ? notices
    : notices.filter(notice => notice.type === selectedTab);

  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        selectedTab === item && styles.tabButtonActive,
      ]}
      onPress={() => setSelectedTab(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.tabText,
          selectedTab === item && styles.tabTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderNotice = ({ item }) => (
    <View style={styles.noticeCard}>
      <Text style={styles.noticeCode}>{item.code}</Text>
      <Text style={styles.noticeDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tab lọc */}
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

      {/* Danh sách thông báo */}
      <FlatList
        data={filteredNotices}
        renderItem={renderNotice}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.noticeList}
      />
    </View>
  );
};

export default NoticeScreen;