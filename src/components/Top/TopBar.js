import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './TopStyle';

const TopBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
      />
      <TouchableOpacity style={styles.notification}>
        <Text>🔔</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;