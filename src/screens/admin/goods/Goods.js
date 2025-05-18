import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './GoodsStyle.js';
import { BadgePlus, User, ShoppingBag, FolderDown } from 'lucide-react-native';
import { COLORS } from '../../../stysles/theme.js';
import { getAllBookings } from '../../../api/BookingApi.js'; // Import API

const Goods = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tours, setTours] = useState([]); // State để lưu danh sách tour từ API
  const [loading, setLoading] = useState(true); // State cho trạng thái loading
  const [error, setError] = useState(null); // State cho lỗi

  // Hàm lấy dữ liệu từ API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const bookings = await getAllBookings();
        // Ánh xạ dữ liệu từ API để khớp với giao diện
        const mappedTours = bookings.map((booking) => ({
          id: booking.id.toString(), // Đảm bảo id là chuỗi
          code: booking.code || 'N/A',
          status: booking.status || 'Chưa xác định',
          statusColor: booking.statusColor || getStatusColor(booking.status), // Gán màu dựa trên status nếu API không trả về
          customerName: booking.customerName || 'Khách hàng không xác định',
          tourName: booking.tourName || 'Tour không xác định',
          phone: booking.phone || 'N/A',
          price: booking.price ? `${booking.price.toLocaleString()} đ` : 'N/A',
        }));
        setTours(mappedTours);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách tour:', err);
        setError('Không thể tải danh sách tour. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Hàm gán màu cho status nếu API không trả về statusColor
  const getStatusColor = (status) => {
    switch (status) {
      case 'Chờ xử lý':
        return '#58B539';
      case 'Chờ đi':
        return '#ff69b4';
      case 'Đang hoạt động':
        return COLORS.blue;
      case 'Đã hoàn thành':
        return '#8F43F1';
      default:
        return COLORS.gray;
    }
  };

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
          <Text
            style={styles.detailText}
            onPress={() => navigation.navigate('DetailGoods')}
          >
            Chi tiết
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.statusContainer}>
        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        <Text style={styles.timeText}>9:12</Text>
      </View>
      <View style={styles.infoContanier}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
          <User color={COLORS.gray} size={20} />
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
      <View style={styles.infoContanier}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ShoppingBag color={COLORS.gray} size={20} />
          <Text style={styles.tourName}>{item.tourName}</Text>
        </View>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity style={styles.printButton} activeOpacity={0.7}>
        <FolderDown color={COLORS.blue} size={22} />
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

      {/* Hiển thị trạng thái loading hoặc lỗi */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.red, fontSize: 16 }}>{error}</Text>
        </View>
      ) : (
        <View style={styles.contentCart}>
          <FlatList
            data={filteredTours}
            renderItem={renderTour}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tourList}
          />
        </View>
      )}

      {/* Nút thêm tour */}
      <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
        <BadgePlus color={COLORS.white} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Goods;