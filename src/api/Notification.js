import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Địa chỉ base URL của backend
const API_URL = 'http://192.168.1.9:8080'; // Đảm bảo IP đúng

// Tạo instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Hàm lấy danh sách thông báo đang hoạt động
export const getNotifications = async (token) => {
  try {
    if (!token) {
      throw new Error('Token is missing');
    }
    console.log('Fetching notifications with token:', token.substring(0, 20) + '...');
    const response = await api.get('/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Notifications response:', response.data);
    return response.data.result || response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Hàm lấy toàn bộ thông báo đang hoạt động (cho admin)
export const getAllNotifications = async (token) => {
  try {
    if (!token) {
      throw new Error('Token is missing');
    }
    console.log('Fetching all notifications with token:', token.substring(0, 20) + '...');
    const response = await api.get('/notifications/all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('All notifications response:', response.data);
    return response.data.result || response.data;
  } catch (error) {
    console.error('Error fetching all notifications:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Hàm lấy danh sách thông báo giảm giá (không cần token)
export const getDiscountNotifications = async () => {
  try {
    console.log('Fetching discount notifications');
    const response = await api.get('/notifications/discounts');
    console.log('Discount notifications response:', response.data);
    return response.data.result || response.data;
  } catch (error) {
    console.error('Error fetching discount notifications:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Hàm đánh dấu thông báo đã đọc
export const markNotificationAsRead = async (notificationId, token) => {
  try {
    if (!token) {
      throw new Error('Token is missing');
    }
    console.log('Marking notification as read, ID:', notificationId);
    const response = await api.post(
      `/notifications/${notificationId}/read`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log('Mark as read response:', response.data);
    return response.data.result || response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Hàm tạo thông báo giảm giá (dùng body JSON, chỉ dành cho ADMIN)
export const createDiscountNotification = async (notificationData, token) => {
  try {
    if (!token) {
      throw new Error('Token is missing');
    }
    console.log('Creating discount notification:', notificationData);
    const response = await api.post('/notifications/create-discount', notificationData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Create discount response:', response.data);
    return response.data.result || response.data;
  } catch (error) {
    console.error('Error creating discount notification:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Hàm kết nối WebSocket để nhận thông báo thời gian thực
export const connectWebSocket = (userId, onMessage) => {
  let retryCount = 0;
  const maxRetries = 3;

  const connect = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing for WebSocket');
      }
      const wsUrl = `${API_URL.replace('http', 'ws')}/ws/notification?userId=${userId}&token=${encodeURIComponent(token)}`;
      console.log('Connecting to WebSocket:', wsUrl);
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');
        retryCount = 0; // Reset retry count on successful connection
      };

      ws.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          console.log('Received WebSocket notification:', notification);
          onMessage(notification);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.reason);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Attempting to reconnect WebSocket (${retryCount}/${maxRetries})...`);
          setTimeout(connect, 5000);
        } else {
          console.error('Max WebSocket retry attempts reached');
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      return ws;
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Attempting to reconnect WebSocket (${retryCount}/${maxRetries})...`);
        setTimeout(connect, 5000);
      }
      return null; // Trả về null nếu không thể kết nối
    }
  };

  return connect();
};

export default api;