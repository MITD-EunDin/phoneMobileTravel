import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { House, CircleUser, ShoppingCart, NotebookText } from 'lucide-react-native';
import { COLORS } from '../../stysles/theme';
import styles from './BottomStyle';

const BottomNav = ({ state, descriptors, navigation }) => {
  const routes = [
    { name: 'homes', icon: House, label: 'Trang chủ' },
    { name: 'tour', icon: NotebookText, label: 'Tour' },
    { name: 'order', icon: ShoppingCart, label: 'Đơn hàng' },
    { name: 'account', icon: CircleUser, label: 'Tài khoản' },
  ];

  return (
    <View style={styles.container}>
      {routes.map(({ name, icon: Icon, label }, index) => {
        const isActive = state.index === index;
        const color = isActive ? '#7AB2F7' : COLORS.gray;

        return (
          <TouchableOpacity
            key={name}
            style={styles.navItem}
            onPress={() => navigation.navigate(name)}
          >
            <Icon size={30} color={color} style={styles.icon} />
            <Text style={[styles.navText, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;
