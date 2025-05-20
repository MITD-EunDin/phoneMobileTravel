import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { ToursContext } from '../../../contexts/ToursContext';
import { COLORS } from '../../../stysles/theme';
import { filterPopular, filterDiscountTours, filterRegion, filterDuration, filterDomesticTours, filterInternationalTours } from '../../../contexts/ToursContext';
const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/png?text=Image+Not+Found';

const PageTour = ({ route, navigation }) => {
  const { type } = route.params; // 'popular' hoặc 'discounted'
  const { filterType, value } = route.params || {};
  const { tours = [] } = useContext(ToursContext);

  let filteredTours = tours;
  switch (filterType) {
    case 'popular':
      filteredTours = filterPopular(tours);
      break;
    case 'discounted':
      filteredTours = filterDiscountTours(tours);
      break;
    case 'region':
      filteredTours = filterRegion(tours, value);
      break;
    case 'tourType':
      filteredTours = value === 'domestic' ? filterDomesticTours(tours) : filterInternationalTours(tours);
      break;
    case 'duration':
      filteredTours = filterDuration(tours, value);
      break;
    default:
      filteredTours = tours;
  }

  const renderTourItem = ({ item }) => (
    <TouchableOpacity
      style={styles.tourCard}
      onPress={() => navigation.navigate('TourDetails', { tour: item })}
    >
      <Image
        source={{ uri: item.image || PLACEHOLDER_IMAGE }}
        style={styles.tourImage}
        resizeMode="cover"
        onError={(e) => console.warn(`Lỗi tải ảnh tour ${item.tourName}:`, e.nativeEvent.error)}
      />
      <Text style={styles.tourName} numberOfLines={2} ellipsizeMode="tail">
        {item.tourName}
      </Text>
      <Text style={styles.tourType}>{item.tourType}</Text>
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.cardDetail}>{item.duration || ''}</Text>
        </View>
        <Text style={styles.infoText}>
          {item.tourSchedule?.departureDate || 'Chưa có lịch'}
        </Text>
        <View>
          {item.newPrice && item.discount > 0 && (
            <Text style={styles.oldPrice}>
              {item.price.toLocaleString()} VNĐ
            </Text>
          )}
          <Text style={styles.price}>
            {(item.newPrice && item.discount > 0 ? item.newPrice : item.price).toLocaleString()} VNĐ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTours}
        renderItem={renderTourItem}
        keyExtractor={(item) => item.tourId}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.flatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flatList: {
    paddingBottom: 16,
  },
  tourCard: {
    width: '48%', // 2 cột, trừ khoảng cách
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tourImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  tourName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    color: COLORS.black,
    flexShrink: 1,
  },
  tourType: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: 'columns',
  },
  infoText: {
    fontSize: 12,
    color: COLORS.gray,
  },
  cardDetail: {
    fontSize: 12,
    color: COLORS.gray,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.red,
  },
  oldPrice: {
    fontSize: 12,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
  },
});

export default PageTour;