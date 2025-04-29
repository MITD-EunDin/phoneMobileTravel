import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './OrderStyle';

const bookedTours = [
  {
    id: '1',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    price: '4.390.000',
    status: 'Chờ xử lý',
  },
  {
    id: '2',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    price: '4.390.000',
    status: 'Chờ đi',
  },
  {
    id: '3',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    price: '4.390.000',
    status: 'Đang đi',
  },
  {
    id: '4',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    price: '4.390.000',
    status: 'Đã đi',
  },
];

const OrderScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Chờ xử lý');
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['Chờ xử lý', 'Chờ đi', 'Đang đi', 'Đã đi', 'Đã hủy'];

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setTours(bookedTours);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tour:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = tours.filter((tour) => tour.status === selectedTab);

  const renderTab = ({ item }) => (
    <TouchableOpacity
      style={[styles.tabButton, selectedTab === item && styles.tabButtonActive]}
      onPress={() => setSelectedTab(item)}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.tabText, selectedTab === item && styles.tabTextActive]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderBookedTour = ({ item }) => (
    <View style={styles.tourCard}>
      <Text style={styles.tourStatus}>{item.status}</Text>
      <View style={styles.tourInfo}>
        <Image source={item.image} style={styles.tourImage} />
        <Text style={styles.tourTitle}>{item.title}</Text>
      </View>
      <Text style={styles.tourPrice}>Tổng tiền:{item.price} VND</Text>

    </View>
  );



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

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

      {/* Danh sách tour */}
      <FlatList
        data={filteredTours}
        renderItem={renderBookedTour}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tourList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>Danh sách trống</Text>
          </View>
        }
      />


    </View>
  );
};

export default OrderScreen;