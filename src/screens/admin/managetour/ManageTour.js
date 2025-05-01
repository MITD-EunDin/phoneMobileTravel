import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './ManageTourStysle';
import { BadgePlus, ChevronRight } from 'lucide-react-native';
import AddTour from "../addtour/AddTour";
import { COLORS } from '../../../stysles/theme';
const ManageTour = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tours = [
    {
      id: '1',
      code: 'Tour-1',
      image: require("../../../img/tour.png"),
      tourName: 'Sapa–Lào Cai 4 ngày 3 đêm',
      price: '5.000.000 đ',
  },
  {
      id: '2',
      code: 'Tour-2',
      image: require("../../../img/halong.png"),
      tourName: 'Hà Nội - Hạ Long 3 ngày 2 đêm',
      price: '4.500.000 đ',
  },
  {
      id: '3',
      code: 'Tour-3',
      image: require("../../../img/hoian.png"),
      tourName: 'Đà Nẵng - Hội An 4 ngày 3 đêm',
      price: '6.000.000 đ',
  },
  {
      id: '4',
      code: 'Tour-4',
      image: require("../../../img/phuquoc.png"),
      tourName: 'Phú Quốc - Thiên đường biển',
      price: '7.000.000 đ',
  },
  {
      id: '5',
      code: 'Tour-5',
      image: require("../../../img/mientay.png"),
      tourName: 'Sài Gòn - Miền Tây sông nước',
      price: '5.500.000 đ',
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
                <Image source={item.image} style={styles.tourImage} />
                <View>
                  <Text style={styles.tourName}>{item.tourName}</Text>
                  <Text style={styles.price}>{item.price}</Text>
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
        onPress={() => navigation.navigate('AddTour')}
      >
        <BadgePlus color={COLORS.white} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default ManageTour;