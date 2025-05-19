import React, { useState, useRef } from 'react';
import { View, Text, Image, FlatList, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './DetailStyle';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/600x400.png?text=Image+Not+Available';

const TourDetails = ({ route }) => {
  const navigation = useNavigation();

  const { tour } = route.params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const flatListRef = useRef(null);

  console.log("tour :", tour);

  // Lấy danh sách ảnh từ tour.images hoặc dùng image làm fallback
  const images = tour.images && tour.images.length > 0 ? tour.images : [tour.image || PLACEHOLDER_IMAGE];

  // Xử lý khi vuốt đến ảnh mới
  const onScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setCurrentImageIndex(index);
  };

  // Render từng ảnh trong carousel
  const renderImage = ({ item }) => (
    <Image
      source={{ uri: item || PLACEHOLDER_IMAGE }}
      style={stylesLocal.carouselImage}
      resizeMode="cover"
      onError={(e) => console.warn(`Lỗi tải ảnh tour ${tour.tourName}: ${item || 'No image URL'}`, e.nativeEvent.error)}
    />
  );

  // Render dots chỉ báo
  const renderDots = () => (
    <View style={stylesLocal.dotsContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[
            stylesLocal.dot,
            currentImageIndex === index ? stylesLocal.activeDot : stylesLocal.inactiveDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Carousel ảnh */}
        <View style={stylesLocal.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={images}
            renderItem={renderImage}
            keyExtractor={(item, index) => `image-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            contentContainerStyle={stylesLocal.carouselList}
          />
          {images.length > 1 && renderDots()}
        </View>

        {/* Tiêu đề tour */}
        <Text style={styles.tourTitle}>{tour.tourName}</Text>

        {/* Thông tin chi tiết */}
        <View style={styles.detailsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin chuyến đi</Text>
          </View>
          <View style={styles.detailContainer}>
            <FontAwesome5 name="clock" size={16} color="#3B82F6" />
            <Text style={styles.cardDetail}>{tour.duration || '4 ngày 3 đêm'}</Text>
          </View>
          <View style={styles.detailContainer}>
            <FontAwesome5 name="map-marked-alt" size={16} color="#10B981" />
            <Text style={styles.cardDetail}>
              Lịch trình: {tour.tourSchedule?.departureDate || 'Chưa có lịch'}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <FontAwesome5 name="bus" size={16} color="#EF4444" />
            <Text style={styles.cardDetail}>Phương tiện: {tour.transportation || 'Máy bay'}</Text>
          </View>
          <View style={styles.detailContainer}>
            <FontAwesome5 name="hotel" size={16} color="#F59E0B" />
            <Text style={styles.cardDetail}>Chỗ ở: {tour.accommodation || 'Khách sạn'}</Text>
          </View>
        </View>

        {/* Thông tin mô tả */}
        <View style={styles.descriptionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Thông tin mô tả</Text>
          </View>
          <Text style={styles.descriptionText}>
            {tour.description || 'Chưa có mô tả'}
          </Text>
        </View>

        {/* Lịch trình */}
        <View style={styles.itineraryContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Lịch trình</Text>
          </View>
          {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 ? (
            tour.itinerary.map((item, index) => (
              <Text key={index} style={styles.itineraryItem}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.descriptionText}>Chưa có lịch trình</Text>
          )}
        </View>
      </ScrollView>

      {/* Booking Container cố định ở đáy */}
      <View style={styles.bookingContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.describeText}>Chỉ từ:</Text>
          <Text style={styles.price}>
            {tour.newPrice && tour.discount > 0
              ? `${tour.newPrice.toLocaleString()} VNĐ`
              : `${tour.price.toLocaleString()} VNĐ`}
          </Text>
          {tour.newPrice && tour.discount > 0 && (
            <Text style={styles.originalPrice}>
              {tour.price.toLocaleString()} VNĐ
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.bookingButton}
          onPress={() => {
            Alert.alert(
              'Xác nhận đặt tour',
              `Bạn có muốn đặt tour ${tour.tourName} với giá ${tour.newPrice.toLocaleString()} VNĐ?`,
              [
                { text: 'Hủy', style: 'cancel' },
                {
                  text: 'Đặt',
                  onPress: () => navigation.navigate('Booking', {
                    tourId: tour.tourId,
                    tourName: tour.tourName,
                    price: tour.newPrice,
                    duration: tour.duration,
                    transportation: tour.transportation,
                    accommodation: tour.accommodation,
                    firstImage: tour.images[0],
                    departureDate: tour.tourSchedules?.[0]?.departureDate || 'Chưa có lịch'
                  }),
                },
              ]
            );
          }}
        >
          <Text style={styles.bookingButtonText}>Đặt tour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  carouselContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  carouselImage: {
    width: width,
    height: 250,
    borderRadius: 8,
  },
  carouselList: {
    paddingHorizontal: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3B82F6',
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
});

export default TourDetails;