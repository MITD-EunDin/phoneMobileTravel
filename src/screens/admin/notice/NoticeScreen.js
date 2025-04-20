import React from 'react';
import { View, Text } from 'react-native';
import styles from './NoticeStyle';

const NoticeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Đây là thông báo</Text>
    </View>
  );
};

export default NoticeScreen;