import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from './GoodsStyle.js';
import { BadgePlus, ChevronRight } from 'lucide-react-native';

const Goods = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tours = [
    {
      id: '1',
      code: 'Tour-1',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      price: '5.000.000 đ',
    },
    {
      id: '2',
      code: 'Tour-1',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      price: '5.000.000 đ',
    },
    {
      id: '3',
      code: 'Tour-1',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      price: '5.000.000 đ',
    },
    {
      id: '4',
      code: 'Tour-1',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      price: '5.000.000 đ',
    },
    {
      id: '5',
      code: 'Tour-1',
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      price: '5.000.000 đ',
    },
  ];

  // Lọc tour dựa trên tìm kiếm
  const filteredTours = tours.filter(
    (tour) =>
      tour.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.tourName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTour = ({ item }) => (
    <TouchableOpacity
      style={styles.tourCard}
      onPress={() => navigation.navigate('TourDetail', { tourId: item.id })} // Điều hướng đến chi tiết tour
      activeOpacity={0.7}
    >
      <View style={styles.tourDetails}>
        <Text style={styles.tourCode}>{item.code}</Text>
        <Text style={styles.tourName}>{item.tourName}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <ChevronRight color="#333" size={20} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <TextInput
        style={styles.searchInput}
        placeholder="Mã đơn hàng/Tên tour"
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