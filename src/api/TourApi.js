import api from './Api'; // Import instance từ Api.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = '/tours'; // Dùng relative path, vì baseURL đã cấu hình trong Api.js

const getAuthHeaders = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Token:', token);
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch (error) {
    console.error('Error getting token from AsyncStorage:', error);
    return {};
  }
};

export const getAllTours = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data.result;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tour:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const addTour = async (tourData) => {
  try {
    const response = await api.post(BASE_URL, tourData, { headers: await getAuthHeaders() });
    return response.data.result;
  } catch (error) {
    console.error('Lỗi khi thêm tour:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateTour = async (id, tourData) => {
  try {
    const response = await api.put(`${BASE_URL}/${id}`, tourData, { headers: await getAuthHeaders() });
    return response.data.result;
  } catch (error) {
    console.error('Lỗi khi cập nhật tour:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const deleteTour = async (id) => {
  try {
    const response = await api.delete(`${BASE_URL}/${id}`, { headers: await getAuthHeaders() });
    return response.data.message;
  } catch (error) {
    console.error('Lỗi khi xóa tour:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const addSchedule = async (tourId, scheduleData) => {
  try {
    const response = await api.post(`${BASE_URL}/${tourId}/schedule`, scheduleData, {
      headers: await getAuthHeaders(),
    });
    return response.data.result;
  } catch (error) {
    console.error('Lỗi khi thêm lịch khởi hành:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const filterTours = async (filterParams) => {
  try {
    const response = await api.get(`${BASE_URL}/filter`, {
      params: filterParams,
    });
    return response.data.result;
  } catch (error) {
    console.error('Lỗi khi lọc tour:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};