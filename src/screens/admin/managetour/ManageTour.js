import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import styles from './ManageTourStysle';
import { BadgePlus, ChevronRight } from 'lucide-react-native';
import { ToursContext } from '../../../contexts/ToursContext';
import { COLORS } from '../../../stysles/theme';

const ManageTour = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { tours } = useContext(ToursContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dừng loading sau khi tours được cập nhật
  React.useEffect(() => {
    if (tours.length > 0 || tours.length === 0) {
      setLoading(false);
    }
  }, [tours]);

  // Lọc tour dựa trên tìm kiếm
  const filteredTours = tours.filter(
    (tour) =>
      tour.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.tourName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Định dạng giá tiền
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(price);
    }
    return price || 'N/A';
  };

  const renderTour = ({ item }) => (
    <TouchableOpacity
      style={styles.tourCard}
      onPress={() => navigation.navigate('TourDetail', { tourId: item.id })}
      activeOpacity={0.7}
    >
      <View style={styles.tourDetails}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.tourCode}>{item.code}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: COLORS.blue }}>Chi tiết</Text>
            <ChevronRight color={COLORS.blue} size={20} />
          </View>
        </View>
        <View style={styles.tourInfoContainer}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.tourImage} />
          ) : (
            <View style={[styles.tourImage, { backgroundColor: '#ccc' }]} />
          )}
          <View>
            <Text style={styles.tourName}>{item.tourName || 'Không có tên'}</Text>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
          </View>
        </View>
      </View>
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

      {/* Hiển thị trạng thái */}
      <View style={styles.contentCart}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.blue} />
            <Text>Đang tải danh sách tour...</Text>
          </View>
        ) : error ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'red' }}>Lỗi: {error}</Text>
          </View>
        ) : filteredTours.length === 0 ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Không tìm thấy tour nào</Text>
          </View>
        ) : (
          <FlatList
            data={filteredTours}
            renderItem={renderTour}
            keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.tourList}
          />
        )}
      </View>

      {/* Nút thêm tour */}
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddTour')}
      >
        <BadgePlus color={COLORS.white} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ManageTour;