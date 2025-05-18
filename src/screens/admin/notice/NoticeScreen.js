import { useState, useEffect, useRef } from "react";
import { X, Mail, MailOpen, Plus } from "lucide-react";
import {
  getNotifications,
  getAllNotifications,
  markNotificationAsRead,
  connectWebSocket,
  createDiscountNotification,
} from "../../api/Notification";
import styles from "./NotificationManagement.module.css";

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
      return "Thanh toán"; // Hỗ trợ type cũ
    case "DEPOSIT_SUCCESS":
      return "Đặt cọc";
    default:
      return "Tất cả";
  }
};

const mapNotification = (notification) => {
  if (!notification.id || !notification.title || !notification.createdAt || !notification.message) {
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

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [error, setError] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    daysValid: 3,
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const wsRef = useRef(null);

  // Kiểm tra quyền admin khi component mount
  useEffect(() => {
    if (token) {
      setIsAdminUser(isAdmin(token));
    }
  }, [token]);

  // Lấy danh sách thông báo khi component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        if (!token) {
          throw new Error("No token found");
        }
        console.log("Fetching notifications, isAdminUser:", isAdminUser, "activeTab:", activeTab);
        const data = isAdminUser
          ? await getAllNotifications(token)
          : await getNotifications(token);
        console.log("API Notifications:", data);
        const mappedData = data.map(mapNotification);
        const sortedData = mappedData.sort((a, b) => {
          const idA = typeof a.id === "string" && !isNaN(a.id) ? parseInt(a.id) : a.id;
          const idB = typeof b.id === "string" && !isNaN(b.id) ? parseInt(b.id) : b.id;
          return idB - idA;
        });
        console.log("Sorted Notifications:", sortedData);
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

  // Tích hợp WebSocket
  useEffect(() => {
    if (!token) return;
    const userId = getUserIdFromToken(token);
    wsRef.current = connectWebSocket(userId, (notification) => {
      console.log("WebSocket Notification:", notification);
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

  // Đánh dấu thông báo đã đọc
  const handleMarkAsRead = async (notificationId) => {
    try {
      console.log("Marking as read, ID:", notificationId);
      await markNotificationAsRead(notificationId, token);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, status: "Đã đọc" } : n
        )
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

  // Xử lý click thông báo
  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (notification.status === "Chưa đọc") {
      handleMarkAsRead(notification.id);
    }
  };

  // Xử lý thay đổi form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "daysValid" ? parseInt(value) : value,
    }));
  };

  // Gửi thông báo mới
  const handleCreateNotification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createDiscountNotification(formData, token);
      setError(null);
      setFormData({ title: "", message: "", daysValid: 3 });
      setShowForm(false);
      alert("Thông báo đã được tạo thành công!");
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

  // Ẩn form
  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({ title: "", message: "", daysValid: 3 });
    setError(null);
  };

  // Lọc thông báo theo tab
  const filteredNotifications = activeTab === "Tất cả"
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  return (
    <div className={styles.container}>
      {/* Hiển thị lỗi nếu có */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Loading state */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingBox}>
            <p className={styles.loadingText}>Đang tải...</p>
          </div>
        </div>
      )}

      {/* Nút thêm thông báo cho admin */}
      {isAdminUser && (
        <div className="mb-4">
          <button onClick={() => setShowForm(true)} className={styles.addButton}>
            <Plus size={20} className={styles.addButtonIcon} />
            Thêm thông báo
          </button>
        </div>
      )}

      {/* Form tạo thông báo (modal) */}
      {showForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Tạo thông báo giảm giá</h3>
              <button onClick={handleCloseForm} className={styles.closeButton}>
                <X size={24} className={styles.closeIcon} />
              </button>
            </div>
            <form onSubmit={handleCreateNotification} className={styles.form}>
              <div>
                <label className={styles.formLabel}>Tiêu đề</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className={styles.formInput}
                  required
                />
              </div>
              <div>
                <label className={styles.formLabel}>Nội dung</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  className={styles.formTextarea}
                  required
                ></textarea>
              </div>
              <div>
                <label className={styles.formLabel}>Số ngày hiệu lực</label>
                <input
                  type="number"
                  name="daysValid"
                  value={formData.daysValid}
                  onChange={handleFormChange}
                  className={styles.formInput}
                  min="1"
                  required
                />
              </div>
              <div className={styles.formActions}>
                <button type="button" onClick={handleCloseForm} className={styles.cancelButton}>
                  Hủy
                </button>
                <button type="submit" className={styles.submitButton}>
                  Tạo thông báo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${activeTab === tab ? styles.tabButtonActive : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Danh sách thông báo */}
      <div className={styles.notificationList}>
        <h2 className={styles.listHeader}>
          Danh sách thông báo ({filteredNotifications.length})
        </h2>
        {filteredNotifications.length === 0 ? (
          <p className={styles.emptyMessage}>Không có thông báo nào trong tab này.</p>
        ) : (
          <div>
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={styles.notificationItem}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className={styles.statusIconWrapper}>
                  {notification.status === "Chưa đọc" ? (
                    <Mail size={20} className={styles.statusIconUnread} />
                  ) : (
                    <MailOpen size={20} className={styles.statusIconRead} />
                  )}
                </div>
                <div className={styles.notificationContent}>
                  <div className={styles.notificationTitle}>{notification.title}</div>
                  <div className={styles.notificationDate}>
                    {new Date(notification.date).toLocaleString()}
                  </div>
                </div>
                <div className={styles.notificationTime}>{timeAgo(notification.date)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hiển thị thông báo chi tiết */}
      {selectedNotification && (
        <div className={styles.detailPanel}>
          <button
            className={styles.closeDetailButton}
            onClick={() => setSelectedNotification(null)}
          >
            <X size={18} />
          </button>
          <h3 className={styles.detailTitle}>{selectedNotification.title}</h3>
          <p className={styles.detailDate}>
            {new Date(selectedNotification.date).toLocaleString()}
          </p>
          <p className={styles.detailContent}>{selectedNotification.content}</p>
          <p className={styles.detailSender}>Người gửi: {selectedNotification.sender}</p>
        </div>
      )}
    </div>
  );
}