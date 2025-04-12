import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import styles from './TopStyle';
import { BellRing } from 'lucide-react-native';
import { COLORS } from "../../stysles/theme"
const TopBar = () => {
  const [hasNotifications, setHasNotifications] = useState(true); // Simulate notification state (true = new notifications)

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        returnKeyType="done"
        onSubmitEditing={() => {}}
      />
      <TouchableOpacity style={styles.notification}>
        <BellRing size={25} color={COLORS.white} />
        {hasNotifications && <View style={styles.redDot} />}
      </TouchableOpacity>
    </View> 
  );
};

export default TopBar;