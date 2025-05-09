import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TourList from './TourList';

const TourSection = ({ title, tours, isDiscount = false }) => {
    const [visibleTours, setVisibleTours] = useState(4);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TourList tours={tours.slice(0, visibleTours)} isDiscount={isDiscount} />
            {visibleTours < tours.length && (
                <View style={styles.loadMoreContainer}>
                    <TouchableOpacity
                        style={styles.loadMoreButton}
                        onPress={() => setVisibleTours(visibleTours + 4)}
                    >
                        <Text style={styles.loadMoreText}>Xem Thêm Tour</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        paddingHorizontal: 16,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 80,
        borderLeftWidth: 4,
        borderLeftColor: '#EF4444',
        paddingLeft: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#EF4444',
    },
    loadMoreContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    loadMoreButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    loadMoreText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default TourSection;