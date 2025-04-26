import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './OrderStyle';

// Sample data for booked tours (you can replace this with API data)
const bookedTours = [
  {
    id: '1',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    price: '4.390.000',
    status: 'Chờ xác nhận',
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
  const [selectedStatus, setSelectedStatus] = useState('Chờ xử lý');
  const statuses = ['Chờ xử lý', 'Chờ đi', 'Đang diễn ra', 'Hoàn thành','Đã hủy'];

  // Filter tours based on selected status
  const filteredTours = bookedTours.filter(
    (tour) => tour.status === selectedStatus
  );

  const handleStatusPress = (status) => {
    setSelectedStatus(status);
  };

  const renderStatusFilter = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.statusButton,
        selectedStatus === item && styles.statusButtonActive,
      ]}
      onPress={() => handleStatusPress(item)}
    >
      <Text
        style={[
          styles.statusText,
          selectedStatus === item && styles.statusTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderTour = ({ item }) => (
    <View style={styles.tourCard}>
      <Image source={item.image} style={styles.tourImage} />
      <View style={styles.tourInfo}>
        <Text style={styles.tourTitle}>{item.title}</Text>
        <Text style={styles.tourPrice}>
          Tổng tiền: <Text style={styles.priceText}>{item.price} vnd</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Status Filter Section */}
      <View style={styles.statusContainer}>
        <FlatList
          data={statuses}
          renderItem={renderStatusFilter}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.statusList}
        />
      </View>

      {/* Booked Tours List */}
      {filteredTours.length > 0 ? (
        <FlatList
          data={filteredTours}
          renderItem={renderTour}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.tourList}
        />
      ) : (
        <Text style={styles.noToursText}>
          Không có tour nào trong trạng thái này.
        </Text>
      )}
    </View>
  );
};

export default OrderScreen;