import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './AccountStyle';

const AccountScreen = ({ navigation, onLogout }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cccd, setCccd] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setEmail(parsedData.email || 'example@email.com');
          setPhone(parsedData.phone || '0123456789');
          setCccd(parsedData.cccd || '123456789012');
          setPassword(parsedData.password || 'password123');
        }
      } catch (error) {
        console.error('Lỗi khi lấy userData từ AsyncStorage:', error);
        Alert.alert('Lỗi', 'Không thể tải thông tin tài khoản.');
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const updatedUserData = { email, phone, cccd, password };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      Alert.alert('Thông báo', 'Thông tin đã được lưu.');
    } catch (error) {
      console.error('Lỗi khi lưu userData:', error);
      Alert.alert('Lỗi', 'Không thể lưu thông tin.');
    }
  };

  const handleChangePassword = () => {
    if (currentPassword === password && newPassword === confirmPassword) {
      setPassword(newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowChangePassword(false);
      Alert.alert('Thông báo', 'Mật khẩu đã được thay đổi thành công.');
    } else if (currentPassword !== password) {
      Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng.');
    } else {
      Alert.alert('Lỗi', 'Xác nhận mật khẩu mới không khớp.');
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // Trigger handleLogout from AppNavigator
    } else {
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <Image source={require('../../../img/account.png')} style={styles.profileImage} />

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
          <Text style={styles.label}>Mật khẩu:</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={24} color="#666" />
              ) : (
                <Eye size={24} color="#666" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => setShowChangePassword(!showChangePassword)}
          >
            <Text style={styles.changePasswordText}>
              {showChangePassword ? 'Hủy thay đổi mật khẩu' : 'Thay đổi mật khẩu'}
            </Text>
          </TouchableOpacity>
        </View>

        {showChangePassword && (
          <View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu hiện tại:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mật khẩu mới:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={24} color="#666" />
                  ) : (
                    <Eye size={24} color="#666" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.confirmPasswordButton}
              onPress={handleChangePassword}
            >
              <Text style={styles.confirmPasswordText}>Xác nhận thay đổi</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Lưu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;