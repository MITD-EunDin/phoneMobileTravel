import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './menuStyle';

const MenuScreen = ( navigation) => {
  return (
    <View style={styles.container}>
      <Text>Đây là menu tài khoản</Text>
    </View>
  );
};

export default MenuScreen;