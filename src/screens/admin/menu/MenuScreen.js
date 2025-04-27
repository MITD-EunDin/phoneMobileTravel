import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './menuStyle';
import {User,SquareUserRound ,UsersRound,IdCard ,CircleAlert  } from "lucide-react-native";

const MenuScreen = ( { navigation }) => {

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.menuButton, styles.leftButton]}>
          <SquareUserRound color="#666" size={24} />
          <Text style={styles.buttonText}>Khách hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuButton, styles.rightButton]}>
          <User color="#666" size={24} />
          <Text style={styles.buttonText}>Nhân viên</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuButton, styles.rightButton]}>
          <UsersRound color="#666" size={24} />
          <Text style={styles.buttonText}>Cấu hình nhân viên</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonGroup1}>
        <TouchableOpacity style={styles.menuButton1}>
          <IdCard color="#666" size={24} />
          <Text style={styles.buttonText}>Thông tin tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton1}>
          <CircleAlert color="#666" size={24} />
          <Text style={styles.buttonText}>Xóa tài khoản</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MenuScreen;