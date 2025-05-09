import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const TourList = ({ tours, isDiscount, placeholderImage }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.tourCard}>
            <Image
                source={{ uri: item.image || placeholderImage }}
                style={styles.tourImage}
                resizeMode="cover"
                onError={(e) => console.warn(`Lỗi tải ảnh tour ${item.tourName}:`, e.nativeEvent.error)}
            />
            <View style={styles.tourInfo}>
                <Text style={styles.tourName}>{item.tourName}</Text>
                <Text style={styles.tourType}>{item.tourType}</Text>
                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <FontAwesome5 name="clock" size={16} color="#3B82F6" />
                        <Text style={styles.detailText}>4 ngày 3 đêm</Text>
                    </View>
                    <View style={styles.detailItem}>
                        <FontAwesome5 name="map-marked-alt" size={16} color="#10B981" />
                        <Text style={styles.detailText}>
                            {item.tourSchedule?.departureDate || 'Chưa có lịch'}
                        </Text>
                    </View>
                </View>
                <View style={styles.priceContainer}>
                    {isDiscount && item.newPrice && (
                        <Text style={styles.oldPrice}>
                            {item.price.toLocaleString()} VNĐ
                        </Text>
                    )}
                    <Text style={styles.price}>
                        {(item.newPrice || item.price).toLocaleString()} VNĐ
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={tours}
            renderItem={renderItem}
            keyExtractor={(item) => item.tourId}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    tourCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tourImage: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    tourInfo: {
        flex: 1,
        padding: 12,
    },
    tourName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 4,
    },
    tourType: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 8,
    },
    detailsContainer: {
        marginBottom: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detailText: {
        fontSize: 12,
        color: '#4B5563',
        marginLeft: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    oldPrice: {
        fontSize: 12,
        color: '#6B7280',
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    price: {
        fontSize: 14,
        fontWeight: '700',
        color: '#EF4444',
    },
    listContainer: {
        paddingBottom: 16,
    },
});

export default TourList;