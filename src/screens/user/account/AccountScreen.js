import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import styles from './AccountStyle';


const AccountScreen = ({ navigation }) => {
  const [email, setEmail] = useState('example@email.com');
  const [phone, setPhone] = useState('0123456789');
  const [cccd, setCccd] = useState('123456789012');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    // Logic to save the updated information
    Alert.alert('Thông báo', 'Thông tin đã được lưu.');
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
    // Logic to handle logout
    Alert.alert('Thông báo', 'Đã đăng xuất.');
  };

  return (
    <View style={styles.mainContainer}>
      {/* Top Bar Header
      <View style={styles.header}>
        <StatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
        <BackButton onPress={() => navigation.goBack()}/>
        <Text style={styles.headerTitle}>Thông tin tài khoản</Text>
        <View style={styles.headerRight} />
      </View> */}

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