import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../../stysles/theme';
import { bookTour } from '../../api/BookingApi';

const BookingScreen = ({ route }) => {
    const { tourId, tourName = 'Không có tên tour', price, duration, transportation, accommodation, firstImage, departureDate, tourScheduleId } = route.params || {};
    const navigation = useNavigation();

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [citizen, setCitizen] = useState('');
    const [address, setAddress] = useState('');
    const [adults, setAdults] = useState('1');
    const [children, setChildren] = useState('0');
    const [selectedDate, setSelectedDate] = useState(departureDate ? new Date(departureDate) : new Date()); // Khởi tạo từ departureDate hoặc hôm nay


    const adultPrice = price;
    const childPrice = price * 0.5;
    const totalAmount = (parseInt(adults || 0) * adultPrice) + (parseInt(children || 0) * childPrice);
    const totalPeople = (parseInt(adults || 0) + parseInt(children || 0)); // Tổng số người

    const handleBookTour = async () => {
        if (!fullName.trim() || !phone.trim() || !email.trim() || !citizen.trim() || !address.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin.');
            return;
        }
        if (!/^\d+$/.test(adults) || !/^\d+$/.test(children)) {
            Alert.alert('Lỗi', 'Số lượng người phải là số nguyên.');
            return;
        }
        if (!/^\d+$/.test(citizen)) {
            Alert.alert('Lỗi', 'Số CCCD phải là số.');
            return;
        }
        if (!/^\d+$/.test(phone)) {
            Alert.alert('Lỗi', 'Số điện thoại phải là số.');
            return;
        }

        const bookingData = {
            tourId,
            adults: parseInt(adults),
            children: parseInt(children),
            tourScheduleId,
        };

        try {
            // Gọi API bookTour
            const bookingResult = await bookTour(bookingData, navigation);

            // Hiển thị thông báo đặt tour thành công
            Alert.alert(
                'Thành công',
                'Đặt tour thành công! Vui lòng kiểm tra email để xem chi tiết.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Điều hướng về HomeScreen sau khi đặt tour thành công
                            navigation.navigate('CustomerTabs', { screen: 'Home' });
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Lỗi', 'Đặt tour thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Phần tiêu đề và ảnh */}
                <View style={styles.headerSection}>
                    <View style={styles.imageSection}>
                        <Image
                            source={{ uri: firstImage }}
                            style={styles.tourImage}
                            resizeMode="cover"
                            onError={(e) => {
                                if (__DEV__) {
                                    console.warn(`Lỗi tải ảnh tour ${tourName}: ${firstImage}`, e.nativeEvent.error);
                                }
                            }}
                        />
                    </View>
                    <Text style={styles.tourName}>{tourName}</Text>
                    <View style={styles.priceAndDurationRow}>
                        <Text style={styles.priceText}>{price.toLocaleString()} VNĐ/Người | </Text>
                        <Text style={styles.durationText}>Thời gian: {duration}</Text>
                    </View>
                </View>

                {/* Thông tin tour */}
                <View style={styles.tourInfo}>
                    <Text style={styles.sectionTitle}>Thông tin tour</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Số người lớn:</Text>
                        <TextInput
                            style={styles.input}
                            value={adults}
                            onChangeText={setAdults}
                            keyboardType="numeric"
                            placeholder="Nhập số người lớn"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Số trẻ em:</Text>
                        <TextInput
                            style={styles.input}
                            value={children}
                            onChangeText={setChildren}
                            keyboardType="numeric"
                            placeholder="Nhập số trẻ em"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Ngày khởi hành:</Text>
                        <TouchableOpacity
                            style={styles.dateInput}

                        >
                            <Text style={styles.dateText}>{selectedDate.toISOString().split('T')[0]}</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Form nhập thông tin khách hàng */}
                <View style={styles.form}>
                    <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Họ và tên:</Text>
                        <TextInput
                            style={styles.input}
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="Nhập họ và tên"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Số điện thoại:</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="numeric"
                            placeholder="Nhập số điện thoại"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            placeholder="Nhập email"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Căn cước công dân:</Text>
                        <TextInput
                            style={styles.input}
                            value={citizen}
                            onChangeText={setCitizen}
                            keyboardType="numeric"
                            placeholder="Nhập CCCD"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            value={address}
                            onChangeText={setAddress}
                            placeholder="Nhập địa chỉ"
                            placeholderTextColor={COLORS.gray}
                        />
                    </View>
                </View>

                {/* Tổng chi phí */}
                <View style={styles.total}>
                    <Text style={styles.totalTitle}>Tổng chi phí</Text>
                    <Text style={styles.totalPeople}>Số lượng người: {totalPeople} (Người lớn: {adults}, Trẻ em: {children})</Text>
                    <Text style={styles.totalAmount}>{totalAmount.toLocaleString()} VNĐ</Text>
                    <TouchableOpacity style={styles.bookButton} onPress={handleBookTour}>
                        <Text style={styles.bookButtonText}>Xác nhận đặt</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 16, // Không cần padding lớn vì nút không còn position: absolute
    },
    headerSection: {
        marginBottom: 16,
    },
    imageSection: {
        marginBottom: 16,
    },
    tourImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    tourName: {
        fontSize: 24,
        textAlign: "center",
        fontWeight: '600',
        color: COLORS.black,
        marginBottom: 8,
    },
    priceAndDurationRow: {
        flexDirection: 'row',
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
    },
    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.red,
    },
    durationText: {
        fontSize: 16,
        color: COLORS.gray,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.dark,
        marginBottom: 12,
    },
    tourInfo: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'column',
    },
    infoLabel: {
        fontSize: 16,
        color: COLORS.black,
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: COLORS.dark,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        marginVertical: 12,
    },
    dateInput: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 15,
        fontSize: 16,
        color: COLORS.dark,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        marginVertical: 12,
    },
    dateText: {
        fontSize: 16,
        color: COLORS.dark,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    total: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.dark,
        marginBottom: 8,
    },
    totalPeople: {
        fontSize: 16,
        color: COLORS.gray,
        marginBottom: 8,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.red,
        marginBottom: 16,
    },
    bookButton: {
        backgroundColor: COLORS.blue,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    bookButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BookingScreen;