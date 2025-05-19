import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Địa chỉ base URL của backend
// const API_URL = Platform.OS === 'android' ? 'http://192.168.53.232:8080' : 'http://localhost:8080';
const API_URL = 'http://192.168.53.232:8080';

// Tạo instance của axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token tự động từ AsyncStorage
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config.method.toUpperCase(), config.url, config.data);
    }
    return config;
  },
  (error) => {
    console.error('Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response.status, response.data);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');
        const response = await api.post('/auth/refresh', { refreshToken });
        const newToken = response.data.result.token;
        await AsyncStorage.setItem('token', newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.multiRemove(['token', 'refreshToken']);
        console.error('Refresh Token Error:', refreshError);
        return Promise.reject(new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.'));
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.status, error.message);
    }
    const message = error.response?.data?.message || 
                    (error.message.includes('ECONNREFUSED') 
                      ? 'Không thể kết nối đến server. Kiểm tra xem backend có chạy trên cổng 8080 không.' 
                      : 'Lỗi không xác định. Vui lòng kiểm tra mạng hoặc thử lại.');
    return Promise.reject(new Error(message));
  }
);

// Hàm đăng nhập
export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/token', { username, password });
    return response.data.result; // Trả về token và authenticated
  } catch (error) {
    throw new Error(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra tên đăng nhập và mật khẩu.');
  }
};

// Hàm kiểm tra token (introspect)
export const introspectToken = async (token) => {
  try {
    const response = await api.post('/auth/introspect', { token });
    return response.data.result; // Trả về thông tin token hợp lệ hay không
  } catch (error) {
    throw new Error(error.message || 'Lỗi kiểm tra token.');
  }
};

// Hàm đăng ký khách hàng
export const registerCustomer = async (userData) => {
  try {
    const response = await api.post('/users/customers', userData);
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
  }
};

// Hàm kiểm tra username trùng lặp
export const checkUsername = async (username) => {
  try {
    const response = await api.get('/users/check-username', { params: { username } });
    return response.data.result.exists;
  } catch (error) {
    throw new Error(error.message || 'Lỗi kiểm tra tên tài khoản.');
  }
};

// Hàm kiểm tra email trùng lặp
export const checkEmail = async (email) => {
  try {
    const response = await api.get('/users/check-email', { params: { email } });
    return response.data.result.exists;
  } catch (error) {
    throw new Error(error.message || 'Lỗi kiểm tra email.');
  }
};

// Tạo nhân viên (chỉ dành cho ADMIN)
export const createEmployee = async (userData) => {
  try {
    const response = await api.post('/users/employees', userData);
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi tạo nhân viên.');
  }
};

// Hàm lấy danh sách người dùng (yêu cầu quyền ADMIN)
export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi lấy danh sách người dùng.');
  }
};

// Hàm lấy danh sách theo Role
export const getUsersByRole = async (role) => {
  try {
    const response = await api.get('/users', { params: { role } });
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi lấy danh sách theo vai trò.');
  }
};

// Hàm lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi lấy thông tin người dùng.');
  }
};

// Hàm cập nhật người dùng
export const updateUser = async (id, userData) => {
  try {
    const mappedData = {
      email: userData.email,
      fullname: userData.fullname,
      address: userData.address || '',
      role: Array.isArray(userData.role) ? userData.role : [userData.role],
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      citizenId: userData.citizenId,
      avatar: userData.avatar,
    };
    const response = await api.put(`/users/${id}`, mappedData);
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi cập nhật người dùng.');
  }
};

// Hàm xóa người dùng
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi xóa người dùng.');
  }
};

// Hàm lấy thông tin cá nhân
export const getMyInfo = async () => {
  try {
    const response = await api.get('/users/myInfo');
    return response.data.result;
  } catch (error) {
    throw new Error(error.message || 'Lỗi lấy thông tin cá nhân.');
  }
};

export default api;