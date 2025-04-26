import React, { useRef,useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, ImageBackground, Animated } from 'react-native';
import styles from './HomeStyle';

const popularTrips = [
  {
    id: '1',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    details: ['4 ngày 3 đêm', 'Hàng Tuần', 'Khởi hành 2-3 sao'],
    price: '4.390.000',
  },
  {
    id: '2',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    details: ['4 ngày 3 đêm', 'Hàng Tuần', 'Khởi hành 2-3 sao'],
    price: '4.390.000',
  },
  {
    id: '3',
    title: 'Hà Nội - Sapa 4 Ngày 3 Đêm',
    image: require('../../../img/image 2.png'),
    details: ['4 ngày 3 đêm', 'Hàng Tuần', 'Khởi hành 2-3 sao'],
    price: '4.390.000',
  },
];

const discountedTrips = [
  {
    id: '3',
    title: 'Khám Phá Xứ Sở Kim Chi - Seoul, Đảo Nami - Everland',
    image: require('../../../img/image 3.png'),
    originalPrice: '14.900.000',
    price: '13.900.000',
  },
  {
    id: '4',
    title: 'Khám Phá Xứ Sở Kim Chi - Seoul, Đảo Nami - Everland',
    image: require('../../../img/image 3.png'),
    originalPrice: '14.900.000',
    price: '13.900.000',
  },
];

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

const HomeScreen = () => {

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

  const renderPopularTrip = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      {item.details.map((detail, index) => (
        <Text key={index} style={styles.cardDetail}>• {detail}</Text>
      ))}
      <Text style={styles.cardPrice}>
        {item.price} <Text style={styles.currency}>vnd</Text>
      </Text>
    </View>
  );

  const renderDiscountedTrip = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.originalPrice}>
        {item.originalPrice} <Text style={styles.currency}>vnd</Text>
      </Text>
      <Text style={styles.cardPrice}>
        {item.price} <Text style={styles.currency}>vnd</Text>
      </Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        style={styles.filterContainer}
        source={require('../../../img/BR-user.png')}
      >
        <FlatList
          data={filters}
          renderItem={renderFilters}
          keyExtractor={(item) => item}
          numColumns={4}
          columnWrapperStyle={styles.filterRow}
          showsVerticalScrollIndicator={false}
        />
      </ImageBackground>

      <ImageBackground
        style={styles.header}
        source={require('../../../img/BR-user-1.png')}
      >
        <Animated.Image
          source={require('../../../img/plane.png')}
          style={[styles.airplane,{ transform: [{ translateX:airplaneAnim  }]},]}
        />
      </ImageBackground>
      <ImageBackground
        style={styles.popularTripsContainer}
        source={require('../../../img/BR-user(1).png')}
      >
        <Text style={styles.sectionTitle}>Phổ biến</Text>
        <FlatList
          data={popularTrips}
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
          data={discountedTrips}
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
