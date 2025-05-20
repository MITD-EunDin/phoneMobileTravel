import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './TopStyle';
import { BellRing } from 'lucide-react-native';
import { COLORS } from '../../stysles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications } from '../../api/Notification';
import { ToursContext } from '../../contexts/ToursContext';

const TopBar = ({ navigation }) => {
  const [hasNotifications, setHasNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  
  // Lấy thông báo để kiểm tra số thông báo chưa đọc
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const notifications = await getNotifications(token);
          const unreadCount = notifications.filter((n) => !n.isRead).length;
          setNotificationCount(unreadCount);
          setHasNotifications(unreadCount > 0);
        }
      } catch (error) {
        console.error('Error fetching notifications for TopBar:', error);
      }
    };
    fetchNotifications();
  }, []);

  // Xử lý tìm kiếm khi nhấn "done"
    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigation.navigate('PageTour', {
                filterType: 'searchkeyword',
                value: searchQuery.trim(),
            });
            setSearchQuery(''); // Xóa input sau khi tìm kiếm
        }
    };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        rvalue={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="done"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity
        style={styles.notification}
        onPress={() => navigation.navigate('Notice')}
      >
        <BellRing size={25} color={COLORS.white} />
        {hasNotifications && (
          <View style={styles.redDot}>
            <Text style={styles.notificationCount}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;