import React, { useRef, useEffect, useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ImageBackground, Animated, StyleSheet } from 'react-native';
import { ToursContext } from '../../../contexts/ToursContext';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../../../stysles/theme'
import styles from './HomeStyle';
import { filterDiscountTours, filterPopular } from '../../../contexts/ToursContext';

const filters = [
    'Miền bắc',
    'Miền trung',
    'Miền nam',
    'Trong nước',
    'Ngoài nước',
    '5 Ngày 4 Đêm',
    '4 Ngày 3 Đêm',
    '3 Ngày 2 Đêm',
];

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/png?text=Image+Not+Found';

const HomeScreen = ({ navigation }) => {
    const { tours = [] } = useContext(ToursContext);
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
    const popularTrips = filterPopular(tours).slice(0, 6);
    const discountedTrips = filterDiscountTours(tours).slice(0, 6);

    const renderFilters = ({ item }) => (
        <TouchableOpacity
            style={[styles.filterButton]}
            onPress={() => handleFilterPress(item)}
        >
            <Text style={[styles.filterText]}>{item}</Text>
        </TouchableOpacity>
    );

    const handleFilterPress = (filter) => {
        let filterParams = {};
        switch (filter.toLowerCase()) {
            case 'miền bắc':
                filterParams = { filterType: 'region', value: 'Miền Bắc' };
                break;
            case 'miền trung':
                filterParams = { filterType: 'region', value: 'Miền Trung' };
                break;
            case 'miền nam':
                filterParams = { filterType: 'region', value: 'Miền Nam' };
                break;
            case 'trong nước':
                filterParams = { filterType: 'tourType', value: 'domestic' };
                break;
            case 'ngoài nước':
                filterParams = { filterType: 'tourType', value: 'international' };
                break;
            case '5 ngày 4 đêm':
                filterParams = { filterType: 'duration', value: '5 ngày 4 đêm' };
                break;
            case '4 ngày 3 đêm':
                filterParams = { filterType: 'duration', value: '4 ngày 3 đêm' };
                break;
            case '3 ngày 2 đêm':
                filterParams = { filterType: 'duration', value: '3 ngày 2 đêm' };
                break;
            default:
                filterParams = { filterType: 'all' };
        }
        navigation.navigate('PageTour', filterParams);
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
                                onPress={() => navigation.navigate('PageTour', { type: 'popular' })}
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
                                        onError={(e) => {
                                            if (__DEV__) {
                                                console.warn(`Lỗi tải ảnh tour ${item.tourName || 'Không tên'}:`, e.nativeEvent.error);
                                            }
                                        }}
                                    />
                                    <Text style={stylesLocal.tourName}>{item.tourName || 'Không tên'}</Text>
                                    <Text style={stylesLocal.tourType}>{item.tourType || 'Không xác định'}</Text>
                                    <View style={stylesLocal.detailsContainer}>
                                        <Text style={styles.cardDetail}>{item.duration || 'Chưa có'}</Text>
                                        <Text style={stylesLocal.infoText}>
                                            {item.tourSchedule?.departureDate || 'Chưa có lịch'}
                                        </Text>
                                        <View>
                                            {item.newPrice && item.discount > 0 && (
                                                <Text style={stylesLocal.oldPrice}>
                                                    {(item.price || 0).toLocaleString()} VNĐ
                                                </Text>
                                            )}
                                            <Text style={stylesLocal.price}>
                                                {(item.newPrice && item.discount > 0 ? item.newPrice : item.price || 0).toLocaleString()} VNĐ
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.tourId?.toString() || `tour-${Math.random()}`}
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
                                onPress={() => navigation.navigate('PageTour', { type: 'discounted' })}
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
                                        <View style={styles.detailContainer}>
                                            <Text style={styles.cardDetail}>{item.duration || ''}</Text>
                                        </View>
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
        color: COLORS.primary,
        fontWeight: '600',
    },
    tourCard: {
        width: 200,
        backgroundColor: COLORS.white,
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
        color: COLORS.black,
    },
    tourType: {
        fontSize: 12,
        color: COLORS.gray,
        marginBottom: 8,
    },
    detailsContainer: {
        flexDirection: 'column',
    },
    infoText: {
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

export default HomeScreen;