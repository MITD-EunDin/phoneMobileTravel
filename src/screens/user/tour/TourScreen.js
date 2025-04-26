import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from './TourStyle';

const TourScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    idNumber: '',
    address: '',
    requestedTour: '',
    departureDate: '',
    endDate: '',
    numberOfPeople: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., send data to API)
    console.log('Form submitted:', formData);
    // Optionally navigate back or show a success message
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Vui Lòng Hoàn Thành Mẫu</Text>

      {/* Form Fields */}
      <View style={styles.form}>
        <Text style={styles.label}>Họ và tên *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên"
          value={formData.fullName}
          onChangeText={(text) => handleInputChange('fullName', text)}
        />

        <Text style={styles.label}>Số điện thoại *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          value={formData.phoneNumber}
          onChangeText={(text) => handleInputChange('phoneNumber', text)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={formData.email}
          onChangeText={(text) => handleInputChange('email', text)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Căn cước công dân *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số CCCD"
          value={formData.idNumber}
          onChangeText={(text) => handleInputChange('idNumber', text)}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Địa chỉ *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ"
          value={formData.address}
          onChangeText={(text) => handleInputChange('address', text)}
        />

        <Text style={styles.label}>Tour yêu cầu *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tour yêu cầu"
          value={formData.requestedTour}
          onChangeText={(text) => handleInputChange('requestedTour', text)}
        />

        <Text style={styles.label}>Ngày khởi hành *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ngày khởi hành (VD: 01/01/2025)"
          value={formData.departureDate}
          onChangeText={(text) => handleInputChange('departureDate', text)}
        />

        <Text style={styles.label}>Ngày kết thúc *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập ngày kết thúc (VD: 05/01/2025)"
          value={formData.endDate}
          onChangeText={(text) => handleInputChange('endDate', text)}
        />

        <Text style={styles.label}>Số lượng người đi *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số lượng người"
          value={formData.numberOfPeople}
          onChangeText={(text) => handleInputChange('numberOfPeople', text)}
          keyboardType="numeric"
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gửi đi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TourScreen;