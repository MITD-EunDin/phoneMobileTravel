import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground, Animated, StyleSheet } from 'react-native';
import { ToursContext } from '../../../contexts/ToursContext';
import styles from './HomeStyle';

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

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/png?text=Image+Not+Found';

const HomeScreen = ({ navigation }) => {
    const context = useContext(ToursContext);
    const tours = context?.tours || [];
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

    // Lọc tour phổ biến (không giảm giá) và tour ưu đãi (có giảm giá)
    const popularTrips = tours.filter(tour => !tour.newPrice || tour.discount <= 0).slice(0, 4);
    const discountedTrips = tours.filter(tour => tour.newPrice && tour.discount > 0).slice(0, 4);

    const renderFilters = ({ item }) => (
        <TouchableOpacity
            style={[styles.filterButton]}
            onPress={() => handleFilterPress(item)}
        >
            <Text style={[styles.filterText]}>{item}</Text>
        </TouchableOpacity>
    );

    const handleFilterPress = (filter) => {
        console.log(`Lọc theo: ${filter}`);
        // Có thể tích hợp với filterTours API nếu cần
    };

    const renderSection = ({ item }) => {
        switch (item.type) {
            case 'header':
                return (
                    <ImageBackground style={styles.header} source={require('../../../img/BR-user-1.png')}>
                        <Animated.Image
                            source={require('../../../img/plane.png')}
                            style={[styles.airplane, { transform: [{ translateX: airplaneAnim }] }]}
                        />
                    </ImageBackground>
                );
            case 'filters':
                return (
                    <ImageBackground style={styles.filterContainer} source={require('../../../img/BR-user.png')}>
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
                );
            case 'popularTrips':
                return (
                    <ImageBackground
                        style={styles.popularTripsContainer}
                        source={require('../../../img/BR-user(1).png')}
                    >
                        <View style={stylesLocal.sectionHeader}>
                            <Text style={styles.sectionTitle}>Phổ biến</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TourListScreen', { type: 'popular' })}
                            >
                                <Text style={stylesLocal.viewMore}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={popularTrips}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={stylesLocal.tourCard}
                                    onPress={() => navigation.navigate('TourDetails', { tour: item })}
                                >
                                    <Image
                                        source={{ uri: item.image || PLACEHOLDER_IMAGE }}
                                        style={stylesLocal.tourImage}
                                        resizeMode="cover"
                                        onError={(e) => console.warn(`Lỗi tải ảnh tour ${item.tourName}:`, e.nativeEvent.error)}
                                    />
                                    <Text style={stylesLocal.tourName}>{item.tourName}</Text>
                                    <Text style={stylesLocal.tourType}>{item.tourType}</Text>
                                    <View style={stylesLocal.detailsContainer}>
                                        <Text style={stylesLocal.infoText}>
                                            {item.tourSchedule?.departureDate || 'Chưa có lịch'}
                                        </Text>
                                        <Text style={stylesLocal.price}>
                                            {item.newPrice ? item.newPrice.toLocaleString() : item.price.toLocaleString()} VNĐ
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.tourId}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatList}
                        />
                    </ImageBackground>
                );
            case 'discountedTrips':
                return (
                    <ImageBackground
                        style={styles.discountedTripsContainer}
                        source={require('../../../img/BR-user(2).png')}
                    >
                        <View style={stylesLocal.sectionHeader}>
                            <Text style={styles.sectionTitle}>Ưu đãi giảm giá</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('TourListScreen', { type: 'discounted' })}
                            >
                                <Text style={stylesLocal.viewMore}>Xem Thêm</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={discountedTrips}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={stylesLocal.tourCard}
                                    onPress={() => navigation.navigate('TourDetails', { tour: item })}
                                >
                                    <Image
                                        source={{ uri: item.image || PLACEHOLDER_IMAGE }}
                                        style={stylesLocal.tourImage}
                                        resizeMode="cover"
                                        onError={(e) => console.warn(`Lỗi tải ảnh tour ${item.tourName}:`, e.nativeEvent.error)}
                                    />
                                    <Text style={stylesLocal.tourName}>{item.tourName}</Text>
                                    <Text style={stylesLocal.tourType}>{item.tourType}</Text>
                                    <View style={stylesLocal.detailsContainer}>
                                        <Text style={stylesLocal.infoText}>
                                            {item.tourSchedule?.departureDate || 'Chưa có lịch'}
                                        </Text>
                                        <View>
                                            {item.newPrice && (
                                                <Text style={stylesLocal.oldPrice}>
                                                    {item.price.toLocaleString()} VNĐ
                                                </Text>
                                            )}
                                            <Text style={stylesLocal.price}>
                                                {item.newPrice ? item.newPrice.toLocaleString() : item.price.toLocaleString()} VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.tourId}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatList}
                        />
                    </ImageBackground>
                );
            default:
                return null;
        }
    };

    const sections = [
        { id: 'header', type: 'header' },
        { id: 'filters', type: 'filters' },
        { id: 'popularTrips', type: 'popularTrips' },
        { id: 'discountedTrips', type: 'discountedTrips' },
    ];

    return (
        <FlatList
            data={sections}
            renderItem={renderSection}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

const stylesLocal = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    viewMore: {
        fontSize: 16,
        color: '#3B82F6',
        fontWeight: '600',
    },
    tourCard: {
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginRight: 16,
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
        color: '#1F2937',
    },
    tourType: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 8,
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        color: '#4B5563',
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#EF4444',
    },
    oldPrice: {
        fontSize: 12,
        color: '#6B7280',
        textDecorationLine: 'line-through',
    },
});

export default HomeScreen;