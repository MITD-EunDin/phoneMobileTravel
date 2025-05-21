import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { getMyBookings } from '../../../api/BookingApi'; // Đường dẫn tới file API
import styles from './OrderStyle';

// Hàm ánh xạ trạng thái từ API sang giao diện
const mapStatusToTab = (apiStatus) => {
  const status = apiStatus?.replace(/"/g, ''); // Loại bỏ dấu ngoặc kép (nếu có)
  switch (status?.toUpperCase()) {
    case 'PENDING':
      return 'Chờ xử lý';
    case 'DEPOSITED':
      return 'Chờ đi';
    case 'PAID':
      return 'Đang đi';
    case 'COMPLETED': // Giả sử có trạng thái hoàn thành
      return 'Đã đi';
    case 'CANCELLED': // Giả sử có trạng thái hủy
      return 'Đã hủy';
    default:
      return 'Chờ xử lý'; // Mặc định
  }
};

const OrderScreen = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('Chờ xử lý');
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabs = ['Chờ xử lý', 'Chờ đi', 'Đang đi', 'Đã đi', 'Đã hủy'];

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const bookings = await getMyBookings(navigation);
        console.log('Dữ liệu từ API:', bookings);

        const formattedTours = bookings.map((booking, index) => {
          try {
            return {
              id: booking.id ? booking.id.toString() : `unknown-${index}`,
              title: booking.tourName || 'Tour không có tiêu đề',
              image: booking.imageUrl
                ? { uri: booking.imageUrl }
                : require('../../../img/image 2.png'),
              price: booking.total
                ? Number(booking.total).toLocaleString('vi-VN')
                : 'Liên hệ',
              status: mapStatusToTab(booking.status),
            };
          } catch (error) {
            console.error(`Lỗi khi xử lý booking ${index}:`, error);
            return null; // Bỏ qua bản ghi lỗi
          }
        }).filter((tour) => tour !== null); // Loại bỏ các bản ghi lỗi

        setTours(formattedTours);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách tour:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Không thể tải danh sách tour. Vui lòng thử lại sau.',
        });
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
      <Text style={[styles.tabText, selectedTab === item && styles.tabTextActive]}>
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
      <Text style={styles.tourPrice}>
        Tổng tiền: {item.price === 'Liên hệ' ? item.price : `${item.price} VND`}
      </Text>
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

      <FlatList
        data={filteredTours}
        renderItem={renderBookedTour}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.tourList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text>Danh sách trống</Text>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => navigation.navigate('BookTour')}
            >
              <Text style={styles.bookNowText}>Đặt tour ngay</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default OrderScreen;