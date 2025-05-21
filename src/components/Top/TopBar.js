import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import styles from './TopStyle';
import { BellRing } from 'lucide-react-native';
import { COLORS } from '../../stysles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications } from '../../api/Notification';
import { ToursContext } from '../../contexts/ToursContext';
import { NotificationContext } from '../../contexts/NotificationContext';

// const TopBar = ({ navigation }) => {
//   const [hasNotifications, setHasNotifications] = useState(false);
//   const [notificationCount, setNotificationCount] = useState(0);
//   const [searchQuery, setSearchQuery] = useState('');


//   // Lấy thông báo để kiểm tra số thông báo chưa đọc
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         if (token) {
//           const notifications = await getNotifications(token);
//           const unreadCount = notifications.filter((n) => !n.isRead).length;
//           setNotificationCount(unreadCount);
//           setHasNotifications(unreadCount > 0);
//         }
//       } catch (error) {
//         console.error('Error fetching notifications for TopBar:', error);
//       }
//     };
//     fetchNotifications();
//   }, []);

//   // Xử lý tìm kiếm khi nhấn "done"
//     const handleSearch = () => {
//         if (searchQuery.trim()) {
//             navigation.navigate('PageTour', {
//                 filterType: 'searchkeyword',
//                 value: searchQuery.trim(),
//             });
//             setSearchQuery(''); // Xóa input sau khi tìm kiếm
//         }
//     };
//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Tìm kiếm..."
//         rvalue={searchQuery}
//         onChangeText={setSearchQuery}
//         returnKeyType="done"
//         onSubmitEditing={handleSearch}
//       />
//       <TouchableOpacity
//         style={styles.notification}
//         onPress={() => navigation.navigate('Notice')}
//       >
//         <BellRing size={25} color={COLORS.white} />
//         {hasNotifications && (
//           <View style={styles.redDot}>
//             <Text style={styles.notificationCount}>{notificationCount}</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TopBar;

const TopBar = ({ navigation }) => {
  const { notificationCount } = useContext(NotificationContext);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('PageTour', {
        filterType: 'searchkeyword',
        value: searchQuery.trim(),
      });
      setSearchQuery('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        returnKeyType="done"
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity
        style={styles.notification}
        onPress={() => navigation.navigate('Notice')}
      >
        <BellRing size={25} color={COLORS.white} />
        {notificationCount > 0 && (
          <View style={styles.redDot}>
            <Text style={styles.notificationCount}>{notificationCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;