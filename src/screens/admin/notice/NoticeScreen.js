import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  FlatList,
  Alert,
} from "react-native";
import { X, Mail, MailOpen, Plus } from "lucide-react-native";
import {
  getNotifications,
  getAllNotifications,
  markNotificationAsRead,
  connectWebSocket,
  createDiscountNotification,
} from "../../../api/Notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal"; // Sử dụng react-native-modal
import styles from "./NoticeStyle";

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const getUserIdFromToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.user_id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return "123"; // Fallback
  }
};

const isAdmin = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.scope === "ADMIN" || payload.roles?.includes("ADMIN");
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

const tabs = [
  "Tất cả",
  "Khuyến mãi",
  "Nhắc nhở",
  "Sắp khởi hành",
  "Đặt tour",
  "Thanh toán",
  "Đặt cọc",
];

const mapTypeToTab = (type) => {
  switch (type) {
    case "PROMOTION":
      return "Khuyến mãi";
    case "REMINDER":
      return "Nhắc nhở";
    case "UPCOMING_TOUR":
      return "Sắp khởi hành";
    case "BOOKING_SUCCESS":
      return "Đặt tour";
    case "PAYMENT_SUCCESS":
      return "Thanh toán";
    case "SUCCESS":
      return "Thanh toán";
    case "DEPOSIT_SUCCESS":
      return "Đặt cọc";
    default:
      return "Tất cả";
  }
};

const mapNotification = (notification) => {
  if (
    !notification.id ||
    !notification.title ||
    !notification.createdAt ||
    !notification.message
  ) {
    console.warn("Invalid notification data:", notification);
  }
  return {
    id: notification.id || generateUniqueId(),
    title: notification.title || "No Title",
    date: notification.createdAt || new Date().toISOString(),
    content: notification.message || "No Content",
    sender: notification.sender || "Hệ thống",
    status: notification.isRead ? "Đã đọc" : "Chưa đọc",
    type: mapTypeToTab(notification.type),
  };
};

function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} giây trước`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  return `${Math.floor(diffInHours / 24)} ngày trước`;
}

export default function Notice() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [error, setError] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    daysValid: "",
  }); // Khởi tạo daysValid là chuỗi rỗng để người dùng nhập
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const wsRef = useRef(null);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem("token");
    } catch (error) {
      console.error("Error retrieving token:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchTokenAndInitialize = async () => {
      const fetchedToken = await getToken();
      if (fetchedToken) {
        setToken(fetchedToken);
        setIsAdminUser(isAdmin(fetchedToken));
      } else {
        setError("Không tìm thấy token. Vui lòng đăng nhập lại.");
      }
    };
    fetchTokenAndInitialize();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        setLoading(true);
        const data = isAdminUser
          ? await getAllNotifications(token)
          : await getNotifications(token);
        const mappedData = data.map(mapNotification);
        const sortedData = mappedData.sort((a, b) => {
          const idA = typeof a.id === "string" && !isNaN(a.id) ? parseInt(a.id) : a.id;
          const idB = typeof b.id === "string" && !isNaN(b.id) ? parseInt(b.id) : b.id;
          return idB - idA;
        });
        setNotifications(sortedData);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Không thể lấy thông báo. Vui lòng đăng nhập lại.");
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchNotifications();
    }
  }, [token, isAdminUser]);

  useEffect(() => {
    if (!token) return;
    const userId = getUserIdFromToken(token);
    wsRef.current = connectWebSocket(userId, (notification) => {
      const newNotification = mapNotification({
        id: notification.id || generateUniqueId(),
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isActive: true,
        isRead: false,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      });
      setNotifications((prev) => [newNotification, ...prev]);
    });
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
  }, [token]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId, token);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, status: "Đã đọc" } : n))
      );
      if (selectedNotification?.id === notificationId) {
        setSelectedNotification({ ...selectedNotification, status: "Đã đọc" });
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setError(
        error.response?.status === 401
          ? "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."
          : "Không thể đánh dấu thông báo đã đọc."
      );
    }
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (notification.status === "Chưa đọc") {
      handleMarkAsRead(notification.id);
    }
  };

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Lưu giá trị thô mà không parse ngay
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Lỗi", "Tiêu đề không được để trống!");
      return false;
    }
    if (!formData.message.trim()) {
      Alert.alert("Lỗi", "Nội dung không được để trống!");
      return false;
    }
    const daysValid = parseInt(formData.daysValid);
    if (isNaN(daysValid) || daysValid <= 0) {
      Alert.alert("Lỗi", "Số ngày hiệu lực phải là số nguyên dương!");
      return false;
    }
    return true;
  };

  const handleCreateNotification = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      await createDiscountNotification(
        {
          ...formData,
          daysValid: parseInt(formData.daysValid), // Chuyển đổi sang số trước khi gửi
        },
        token
      );
      setError(null);
      setFormData({ title: "", message: "", daysValid: "" });
      setShowForm(false);
      setShowInlineForm(false);
      Alert.alert("Thành công", "Thông báo đã được tạo thành công!");
      const data = isAdminUser
        ? await getAllNotifications(token)
        : await getNotifications(token);
      const mappedData = data.map(mapNotification);
      const sortedData = mappedData.sort((a, b) => {
        const idA = typeof a.id === "string" && !isNaN(a.id) ? parseInt(a.id) : a.id;
        const idB = typeof b.id === "string" && !isNaN(b.id) ? parseInt(b.id) : b.id;
        return idB - idA;
      });
      setNotifications(sortedData);
    } catch (error) {
      console.error("Error creating notification:", error);
      setError(
        error.response?.status === 401
          ? "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."
          : "Không thể tạo thông báo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ title: "", message: "", daysValid: "" });
    setError(null);
  };

  const handleModalHeaderClick = () => {
    setShowInlineForm(true);
    setShowForm(false);
  };

  const filteredNotifications =
    activeTab === "Tất cả"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const renderTabItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tabButton, activeTab === item ? styles.tabButtonActive : null]}
      onPress={() => setActiveTab(item)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === item ? styles.tabButtonTextActive : null,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        </View>
      )}
      <View style={styles.List}>
      <FlatList
        horizontal
        data={tabs}
        renderItem={renderTabItem}
        keyExtractor={(item) => item}
        style={[styles.tabs, { height: 50 }]}
        contentContainerStyle={{ height: 50 }}
        showsHorizontalScrollIndicator={false}
      />
      </View>
      <ScrollView style={styles.notificationList}>
        <Text style={styles.listHeader}>
          Danh sách thông báo ({filteredNotifications.length})
        </Text>
        {filteredNotifications.length === 0 ? (
          <Text style={styles.emptyMessage}>
            Không có thông báo nào trong tab này.
          </Text>
        ) : (
          filteredNotifications.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={styles.notificationItem}
              onPress={() => handleNotificationClick(notification)}
            >
              <View style={styles.statusIconWrapper}>
                {notification.status === "Chưa đọc" ? (
                  <Mail size={20} color="#ff0000" />
                ) : (
                  <MailOpen size={20} color="#000" />
                )}
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDate}>
                  {new Date(notification.date).toLocaleString()}
                </Text>
              </View>
              <Text style={styles.notificationTime}>
                {timeAgo(notification.date)}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      {selectedNotification && (
        <View style={styles.detailPanel}>
          <TouchableOpacity
            style={styles.closeDetailButton}
            onPress={() => setSelectedNotification(null)}
          >
            <X size={18} color="#000" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>{selectedNotification.title}</Text>
          <Text style={styles.detailDate}>
            {new Date(selectedNotification.date).toLocaleString()}
          </Text>
          <Text style={styles.detailContent}>{selectedNotification.content}</Text>
          <Text style={styles.detailSender}>
            Người gửi: {selectedNotification.sender}
          </Text>
        </View>
      )}
      {showForm && (
        <Modal isVisible={showForm} onBackdropPress={handleCloseForm}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalHeader}
              onPress={handleModalHeaderClick}
            >
              <Text style={styles.modalTitle}>Tạo thông báo giảm giá</Text>
              <TouchableOpacity
                onPress={handleCloseForm}
                style={styles.closeButton}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </TouchableOpacity>
            <ScrollView style={styles.form}>
              <Text style={styles.formLabel}>Tiêu đề</Text>
              <TextInput
                style={styles.formInput}
                value={formData.title}
                onChangeText={(text) => handleFormChange("title", text)}
                placeholder="Nhập tiêu đề"
                autoCapitalize="none"
              />
              <Text style={styles.formLabel}>Nội dung</Text>
              <TextInput
                style={[styles.formInput, styles.formTextarea]}
                value={formData.message}
                onChangeText={(text) => handleFormChange("message", text)}
                placeholder="Nhập nội dung"
                multiline
                numberOfLines={4}
              />
              <Text style={styles.formLabel}>Số ngày hiệu lực</Text>
              <TextInput
                style={styles.formInput}
                value={formData.daysValid}
                onChangeText={(text) => handleFormChange("daysValid", text)}
                placeholder="Nhập số ngày"
                keyboardType="numeric"
              />
              <View style={styles.formActions}>
                <TouchableOpacity
                  onPress={handleCloseForm}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCreateNotification}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Tạo thông báo</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </Modal>
      )}
      {showInlineForm && (
        <View style={styles.inlineFormContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Form trên màn hình</Text>
              <TouchableOpacity
                onPress={() => setShowInlineForm(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.form}>
              <Text style={styles.formLabel}>Tiêu đề</Text>
              <TextInput
                style={styles.formInput}
                value={formData.title}
                onChangeText={(text) => handleFormChange("title", text)}
                placeholder="Nhập tiêu đề"
                autoCapitalize="none"
              />
              <Text style={styles.formLabel}>Nội dung</Text>
              <TextInput
                style={[styles.formInput, styles.formTextarea]}
                value={formData.message}
                onChangeText={(text) => handleFormChange("message", text)}
                placeholder="Nhập nội dung"
                multiline
                numberOfLines={4}
              />
              <Text style={styles.formLabel}>Số ngày hiệu lực</Text>
              <TextInput
                style={styles.formInput}
                value={formData.daysValid}
                onChangeText={(text) => handleFormChange("daysValid", text)}
                placeholder="Nhập số ngày"
                keyboardType="numeric"
              />
              <View style={styles.formActions}>
                <TouchableOpacity
                  onPress={() => setShowInlineForm(false)}
                  style={styles.cancelButton}
                >
                  <Text style={styles.cancelButtonText}>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCreateNotification}
                  style={styles.submitButton}
                >
                  <Text style={styles.submitButtonText}>Tạo thông báo</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
      {isAdminUser && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Plus size={20} color="#fff" />
          <Text style={styles.addButtonText}>Thêm thông báo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}