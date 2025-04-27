import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from './GoodsStyle.js';
import { BadgePlus, ChevronRight } from 'lucide-react-native';

const Goods = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tours = [
    {
      id: '1',
      code: '12345',
      status: 'Chờ xử lý',
      statusColor: '#ff69b4', // Hồng
      customerName: 'NGUYỄN THỊ TRINH',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      phone: '012345678',
      price: '5.000.000 đ',
    },
    {
      id: '2',
      code: '12345',
      status: 'Chờ đi',
      statusColor: '#ff69b4', // Hồng
      customerName: 'NGUYỄN THỊ TRINH',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      phone: '012345678',
      price: '5.000.000 đ',
    },
    {
      id: '3',
      code: '12345',
      status: 'Đang hoạt động',
      statusColor: '#1e90ff', // Xanh dương
      customerName: 'NGUYỄN THỊ TRINH',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      phone: '012345678',
      price: '5.000.000 đ',
    },
    {
      id: '4',
      code: '12345',
      status: 'Đã hoàn thành',
      statusColor: '#ff69b4', // Hồng
      customerName: 'NGUYỄN THỊ TRINH',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      phone: '012345678',
      price: '5.000.000 đ',
    },
  ];

  // Lọc tour dựa trên tìm kiếm
  const filteredTours = tours.filter(
    (tour) =>
      tour.code.includes(searchQuery) ||
      tour.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTour = ({ item }) => (
    <View style={styles.tourCard}>
      <View style={styles.tourHeader}>
        <Text style={styles.tourCode}>{item.code}</Text>
        <TouchableOpacity style={styles.detailButton} activeOpacity={0.7}>
          <Text style={styles.detailText}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <Text style={styles.timeText}>9:12</Text>
      </View>
      <Text style={styles.customerName}>{item.customerName}</Text>
      <Text style={styles.tourName}>{item.tourName}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <TouchableOpacity style={styles.printButton} activeOpacity={0.7}>
        <Text style={styles.printText}>In đơn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Mã đơn hàng/Tên khách hàng"
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="done"
      />

      {/* Danh sách tour */}
      <View style={styles.contentCart}>
        <FlatList
          data={filteredTours}
          renderItem={renderTour}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.tourList}
        />
      </View>

      {/* Nút thêm tour */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddTour')} // Thay 'AddTour' bằng màn hình thêm tour
      >
        <BadgePlus color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Goods;