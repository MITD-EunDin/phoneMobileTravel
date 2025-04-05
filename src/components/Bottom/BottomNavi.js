import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './BottomStyle';

const BottomNav = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('homes')}>
        <Text>Trang chủ</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('tour')}>
        <Text>Tour</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('account')}>
        <Text>Tài khoản</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('order')}>
        <Text>Đơn hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNav;