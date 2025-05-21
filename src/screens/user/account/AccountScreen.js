import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';
import styles from './AccountStyle';
import { updateUser, getMyInfo } from '../../../api/Api';
import Toast from 'react-native-toast-message';

const AccountScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCccd] = useState('');
  const [birthday, setBirthday] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [initialData, setInitialData] = useState({});
  const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = await getMyInfo();
        const storedUserData = await AsyncStorage.getItem('userData');
        let parsedData = {};

        // const storedUserData = await AsyncStorage.getItem('userData');1

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

        // Cập nhật state
        setPreviewUrl(parsedData.previewUrl || userInfo?.avatar || user?.avatar || '');
        setFullname(parsedData.fullname || userInfo?.fullname || user?.fullname || '');
        setEmail(parsedData.email || userInfo?.email || user?.email || '');
        setPhone(parsedData.phone || userInfo?.phone || user?.phone || '');
        setCccd(parsedData.cccd || userInfo?.citizenId || user?.citizenId || '');
        setBirthday(parsedData.birthday || userInfo?.dateOfBirth || user?.dateOfBirth || '');
        setAccommodation(parsedData.accommodation || userInfo?.address || user?.address || '');

        // Lưu dữ liệu ban đầu để so sánh
        setInitialData({
          previewUrl: parsedData.previewUrl || userInfo?.avatar || user?.avatar || '',
          fullname: parsedData.fullname || userInfo?.fullname || user?.fullname || '',
          email: parsedData.email || userInfo?.email || user?.email || '',
          phone: parsedData.phone || userInfo?.phone || user?.phone || '',
          cccd: parsedData.cccd || userInfo?.citizenId || user?.citizenId || '',
          birthday: parsedData.birthday || userInfo?.dateOfBirth || user?.dateOfBirth || '',
          accommodation: parsedData.accommodation || userInfo?.address || user?.address || '',
        });

      } catch (error) {
        // console.error('Lỗi khi lấy userData từ AsyncStorage:', error);
        // Alert.alert('Lỗi', 'Không thể tải thông tin tài khoản.');
      }
    };

    fetchUserData();
  }, [user]);

  // Kiểm tra thay đổi để enable/disable nút cập nhật
  useEffect(() => {
    const hasChanges =
      fullname !== initialData.fullname ||
      email !== initialData.email ||
      phone !== initialData.phone ||
      cccd !== initialData.cccd ||
      birthday !== initialData.birthday ||
      accommodation !== initialData.accommodation ||
      previewUrl !== initialData.previewUrl;

    setIsUpdateEnabled(hasChanges);
  }, [fullname, email, phone, cccd, birthday, accommodation, previewUrl, initialData]);

  const handleUpdate = async () => {
    try {
      const userData = {
        email,
        fullname,
        address: accommodation,
        role: user?.role || ['CUSTOMER'], // Giả sử role từ user context
        phone,
        dateOfBirth: birthday,
        citizenId: cccd,
        avatar: previewUrl,
      };

      // Gọi API cập nhật
      const userId = user?.id; // Giả sử user context có id
      if (!userId) {
        throw new Error('Không tìm thấy ID người dùng.');
      }
      await updateUser(userId, userData);

      // Cập nhật AsyncStorage
      const updatedUserData = { previewUrl, fullname, email, phone, cccd, birthday, accommodation };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

      // Cập nhật initialData để reset trạng thái nút
      setInitialData(updatedUserData);

      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Thông tin đã được cập nhật.',
      });
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: error.message || 'Không thể cập nhật thông tin.',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await logout(); // Chỉ gọi logout, AppNavigator sẽ xử lý điều hướng
    } catch (error) {
      // console.error('Logout error:', error);
      // Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
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
          <TextInput style={styles.input} value={accommodation} onChangeText={setAccommodation} />
        </View>

        <TouchableOpacity
          style={[styles.updateButton, !isUpdateEnabled && styles.disabledButton]}
          onPress={handleUpdate}
          disabled={!isUpdateEnabled}
        >
          <Text style={styles.updateButtonText}>Cập nhật</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;