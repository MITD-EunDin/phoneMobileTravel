import React, { useRef, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, ImageBackground, Animated } from 'react-native'
import styles from './HomeStyle';
import tourData from '../../tourData';

const filters = [
  'Miền bắc',
  'Miền trung',
  'Miền nam',
  'Tour ưu đãi',
  'Ngoài nước',
  '5N4D',
  '4N3D',
  '3N2D',
];

const detailIcons = {
  duration: require('../../../img/duration.png'), 
  frequency: require('../../../img/frequency.png'), 
  transport: require('../../../img/transport.png'), 
  hotel:require('../../../img/hotel.png'), 
};

const HomeScreen = ({ navigation }) => {
  const airplaneAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(airplaneAnim, {
        toValue: 400,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  const renderFilters = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
      ]}
      onPress={() => handleFilterPress(item)}
    >
      <Text
        style={[
          styles.filterText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderPopularTrip = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TourDetails', { tour: item })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.duration && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.duration}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.duration}</Text>
        </View>
      )}
      {item.frequency && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.frequency}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.frequency}</Text>
        </View>
      )}
      {item.transport && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.transport}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.transport}</Text>
        </View>
      )}
      {item.hotel && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.hotel}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.hotel}</Text>
        </View>
      )}
      <Text style={styles.cardPrice}>
        {item.price} <Text style={styles.currency}>vnd</Text>
      </Text>
    </TouchableOpacity>
  );

  const renderDiscountedTrip = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('TourDetails', { tour: item })}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.duration && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.duration}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.duration}</Text>
        </View>
      )}
      {item.frequency && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.frequency}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.frequency}</Text>
        </View>
      )}
      {item.transport && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.transport}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.transport}</Text>
        </View>
      )}
      {item.hotel && (
        <View style={styles.detailContainer}>
          <Image
            source={detailIcons.hotel}
            size={16}
            style={styles.detailIcon}
          />
          <Text style={styles.cardDetail}>{item.hotel}</Text>
        </View>
      )}
      <Text style={styles.originalPrice}>
        {item.originalPrice} <Text style={styles.currency}>vnd</Text>
      </Text>
      <Text style={styles.cardPrice}>
        {item.price} <Text style={styles.currency}>vnd</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        style={styles.filterContainer}
        source={require('../../../img/BR-user.png')}
      >
        <View style={styles.filterContent}>
          <FlatList
            data={filters}
            renderItem={renderFilters}
            keyExtractor={(item) => item}
            numColumns={4}
            columnWrapperStyle={styles.filterRow}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>

      <ImageBackground
        style={styles.header}
        source={require('../../../img/BR-user-1.png')}
      >
        <Animated.Image
          source={require('../../../img/plane.png')}
          style={[styles.airplane, { transform: [{ translateX: airplaneAnim }] }]}
        />
      </ImageBackground>
      <ImageBackground
        style={styles.popularTripsContainer}
        source={require('../../../img/BR-user(1).png')}
      >
        <Text style={styles.sectionTitle}>Phổ biến</Text>
        <FlatList
          data={tourData.popularTrips}
          renderItem={renderPopularTrip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      </ImageBackground>
      <ImageBackground
        style={styles.discountedTripsContainer}
        source={require('../../../img/BR-user(2).png')}
      >
        <Text style={styles.sectionTitle}>Ưu đãi giảm giá</Text>
        <FlatList
          data={tourData.discountedTrips}
          renderItem={renderDiscountedTrip}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatList}
        />
      </ImageBackground>
    </ScrollView>
  );
};

export default HomeScreen;