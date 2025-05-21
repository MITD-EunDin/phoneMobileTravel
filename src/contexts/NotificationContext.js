import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications, markNotificationAsRead, connectWebSocket } from '../api/Notification';

export const NotificationContext = createContext();

const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

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

export const NotificationProvider = ({ children, navigation }) => {
    const [token, setToken] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Lấy token
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
                const data = await getNotifications(token);
                const mappedData = Array.isArray(data) ? data.map(mapNotification) : [];
                setNotifications(mappedData);
                setNotificationCount(mappedData.filter((n) => n.status === 'Chưa đọc').length);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setError('Không thể lấy thông báo. Vui lòng đăng nhập lại.');
                setLoading(false);
                navigation.navigate('Login');
            }
        };
        if (token) {
            fetchNotifications();
        }
    }, [token, navigation]);

    // Kết nối WebSocket
    useEffect(() => {
        if (!token) return;
        const userId = getUserIdFromToken(token);
        if (!userId) {
            setError('Token không hợp lệ. Vui lòng đăng nhập lại.');
            navigation.navigate('Login');
            return;
        }
        const ws = connectWebSocket(userId, (notification) => {
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
            setNotificationCount((prev) => prev + 1);
        });
        return () => {
            if (ws && typeof ws.close === 'function') {
                ws.close();
            }
        };
    }, [token, navigation]);

    // Hàm đánh dấu thông báo đã đọc
    const markAsRead = useCallback(
        async (notificationId) => {
            try {
                await markNotificationAsRead(notificationId, token);
                setNotifications((prev) =>
                    prev.map((n) =>
                        n.backendId === notificationId ? { ...n, status: 'Đã đọc' } : n
                    )
                );
                setNotificationCount((prev) => prev - 1);
            } catch (error) {
                console.error('Error marking notification as read:', error);
                if (error.response?.status === 401) {
                    setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
                    navigation.navigate('Login');
                } else {
                    setError(error.response?.data?.message || 'Không thể đánh dấu thông báo đã đọc.');
                }
            }
        },
        [token, navigation]
    );

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                notificationCount,
                loading,
                error,
                markAsRead,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};