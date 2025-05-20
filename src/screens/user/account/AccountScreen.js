import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './AccountStyle';

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCccd] = useState('');
  const [birthday, setBirthday] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  // const [showNewPassword, setShowNewPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setPreviewUrl(parsedData.previewUrl || user?.avatar || '');
          setFullname(parsedData.fullname || user?.fullname || '');
          setEmail(parsedData.email || user?.email || '');
          setPhone(parsedData.phone || user?.phone || '');
          setCccd(parsedData.cccd || user?.citizenId || '');
          setBirthday(parsedData.birthday || user?.dateOfBirth || '');
          setAccommodation(parsedData.accommodation || user?.address || '');
          // setPassword(parsedData.password || '');
        } else if (user) {
          setPreviewUrl(user.avatar || '');
          setFullname(user.fullname || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          setCccd(user.citizenId || '');
          setBirthday(user.dateOfBirth || '');
          setAccommodation(user.address || '');
        }
      } catch (error) {
        console.error('Lỗi khi lấy userData từ AsyncStorage:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin tài khoản.');
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    try {
      const updatedUserData = { previewUrl, fullname, email, phone, cccd, birthday, accommodation };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      Alert.alert('Thông báo', 'Thông tin đã được lưu.');
    } catch (error) {
      console.error('Lỗi khi lưu userData:', error);
      Alert.alert('Lỗi', 'Không thể lưu thông tin.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await logout(); // Chỉ gọi logout, AppNavigator sẽ xử lý điều hướng
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
      <Image
        source={previewUrl ? { uri: previewUrl } : require('../../../img/account.png')}
        style={styles.profileImage}
      />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Họ và tên:</Text>
          <TextInput style={styles.input} value={fullname} onChangeText={setFullname} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Số điện thoại:</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>CCCD:</Text>
          <TextInput style={styles.input} value={cccd} onChangeText={setCccd} keyboardType="number-pad" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ngày sinh:</Text>
          <TextInput style={styles.input} value={birthday} onChangeText={setBirthday} keyboardType="number-pad" />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nơi thường trú:</Text>
          <TextInput style={styles.input} value={accommodation} onChangeText={setAccommodation}/>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;