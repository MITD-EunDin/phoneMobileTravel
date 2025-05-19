import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Mail, MailOpen } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications, markNotificationAsRead, connectWebSocket } from '../../../api/Notification';
import { getMyBookings } from '../../../api/BookingApi';

// Hàm tạo ID duy nhất
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Hàm lấy userId từ token
const getUserIdFromToken = (token) => {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    console.error('Invalid token format');
    return null;
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user_id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Hàm chuyển đổi dữ liệu từ backend
const mapNotification = (notification) => {

  return {
    id: notification.id || generateUniqueId(),
    backendId: notification.id,
    title: notification.title || 'No Title',
    date: notification.createdAt || new Date().toISOString(),
    content: notification.message || 'No Content',
    sender: 'Hệ thống',
    status: notification.isRead ? 'Đã đọc' : 'Chưa đọc',
    bookingId: notification.bookingId,
  };
};

// Hàm tính thời gian trước
const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  return `${Math.floor(diffInHours / 24)} ngày trước`;
};

const Notice = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy token từ AsyncStorage
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
        } else {
          setError('Không tìm thấy token. Vui lòng đăng nhập lại.');
          setLoading(false);
          navigation.navigate('Login');
        }
      } catch (err) {
        console.error('Error loading token:', err);
        setError('Lỗi khi tải token. Vui lòng thử lại.');
        setLoading(false);
      }
    };
    loadToken();
  }, [navigation]);

  // Lấy danh sách thông báo
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        setLoading(true);
        console.log('Fetching notifications with token:', token?.substring(0, 20) + '...');
        const data = await getNotifications(token);
        console.log('API Notifications:', data);
        const mappedData = Array.isArray(data) ? data.map(mapNotification) : [];
        setNotifications(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching notifications:', error.response?.data || error.message);
        setError('Không thể lấy thông báo. Vui lòng đăng nhập lại.');
        setLoading(false);
        navigation.navigate('Login');
      }
    };
    if (token) {
      fetchNotifications();
    }
  }, [token, navigation]);

  // Tích hợp WebSocket
  useEffect(() => {
    if (!token) return;
    const userId = getUserIdFromToken(token);
    if (!userId) {
      setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
      navigation.navigate('Login');
      return;
    }
    console.log('Connecting WebSocket for userId:', userId);
    const ws = connectWebSocket(userId, (notification) => {
      console.log('WebSocket Notification:', notification);
      const newNotification = mapNotification({
        id: notification.id || generateUniqueId(),
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isActive: true,
        isRead: false,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        bookingId: notification.bookingId,
      });
      setNotifications((prev) => [newNotification, ...prev]);
    });
    return () => {
      console.log('Closing WebSocket');
      if (ws && typeof ws.close === 'function') {
        ws.close();
      }
    };
  }, [token, navigation]);

  // Hàm đánh dấu thông báo đã đọc
  const handleMarkAsRead = async (notificationId) => {
    try {
      console.log('Attempting to mark notification as read, ID:', notificationId);
      await markNotificationAsRead(notificationId, token);
      setNotifications((prev) => {
        const updatedNotifications = prev.map((n) =>
          n.backendId === notificationId ? { ...n, status: 'Đã đọc' } : n
        );
        console.log('Updated Notifications:', updatedNotifications);
        return updatedNotifications;
      });
    } catch (error) {
      console.error('Error marking notification as read:', error.response?.data || error.message);
      if (error.response?.status === 401) {
        setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        navigation.navigate('Login');
      } else {
        setError(error.response?.data?.message || 'Không thể đánh dấu thông báo đã đọc.');
      }
    }
  };

  // Hàm xử lý khi nhấn vào thông báo
  const handleNotificationClick = async (notification) => {
    console.log('Notification clicked:', notification);
    if (notification.status === 'Chưa đọc' && notification.backendId) {
      await handleMarkAsRead(notification.backendId);
    }
    if (notification.bookingId) {
      try {
        const bookings = await getMyBookings();
        const booking = bookings.find((b) => b.id === notification.bookingId);
        if (booking) {
          navigation.navigate('BookingDetails', { booking });
        } else {
          console.log('Booking not found for ID:', notification.bookingId);
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('Không thể tải chi tiết booking.');
      }
    }
  };

  // Render item thông báo
  const renderNotification = ({ item }) => (
    <TouchableOpacity
      style={styles.notificationItem}
      onPress={() => handleNotificationClick(item)}
    >
      <View style={styles.iconContainer}>
        {item.status === 'Chưa đọc' ? (
          <>
            <Mail size={20} color="#3b82f6" />
            <View style={styles.unreadDot} />
          </>
        ) : (
          <MailOpen size={20} color="#6b7280" />
        )}
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.content}</Text>
        <Text style={styles.notificationTime}>{timeAgo(item.date)}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Mail size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Thông báo</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Mail size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.retryButtonText}>Đăng nhập lại</Text>
          </TouchableOpacity>
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Không có thông báo nào.</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#071635',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    position: 'relative',
    marginRight: 15,
    justifyContent: 'center',
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginVertical: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});