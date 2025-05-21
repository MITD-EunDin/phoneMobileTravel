import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Hàm để điều hướng về màn hình đăng nhập (sẽ được gọi từ AuthProvider)
// const handleUnauthorized = async (navigation) => {
//     console.error('Unauthorized, redirecting to login...');
//     await AsyncStorage.removeItem('token');
//     navigation.navigate('Login'); // Điều hướng về màn hình đăng nhập
// };

const handleUnauthorized = async (navigation) => {
    console.error('Unauthorized, redirecting to login...');
    await AsyncStorage.removeItem('token');
    if (navigation && typeof navigation.navigate === 'function') {
        navigation.navigate('Login'); // Điều hướng về màn hình đăng nhập
    } else {
        console.warn('Navigation object is undefined or invalid. Cannot redirect to login.');
    }
};

const API_URL = 'http://192.168.222.229:8080';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm tạo API với navigation để xử lý điều hướng khi cần
const createAPI = (navigation) => {
    API.interceptors.request.use(
        async (config) => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    API.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response?.status === 401) {
                await handleUnauthorized(navigation);
            }
            return Promise.reject(error);
        }
    );

    return API;
};

export const bookTour = async (bookingData, navigation) => {
    try {
        console.log('Booking tour:', bookingData);
        const response = await createAPI(navigation).post('/tour_booking', bookingData);
        console.log('Book tour response:', response.data);
        return response.data.result;
    } catch (error) {
        // console.error('Error booking tour:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

// Các hàm API khác cũng cần truyền navigation
export const getMyBookings = async (navigation) => {
    try {
        console.log('Fetching my bookings');
        const response = await createAPI(navigation).get('/tour_booking/my');
        console.log('My bookings response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching my bookings:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const makePayment = async (paymentData, navigation) => {
    try {
        console.log('Making payment:', paymentData);
        const response = await createAPI(navigation).post('/payment', paymentData);
        console.log('Payment response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error making payment:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getVnpayUrl = async (bookingId, amount, navigation) => {
    try {
        console.log('Fetching VNPAY URL for bookingId:', bookingId, 'amount:', amount);
        const response = await createAPI(navigation).get(`/payment/vnpay-url?bookingId=${bookingId}&amount=${amount}`);
        console.log('VNPAY URL response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching VNPAY URL:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getUserPayments = async (navigation) => {
    try {
        console.log('Fetching user payments');
        const response = await createAPI(navigation).get('/payment/user');
        console.log('User payments response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching user payments:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getAllBookings = async (navigation) => {
    try {
        console.log('Fetching all bookings');
        const response = await createAPI(navigation).get('/tour_booking/all');
        console.log('All bookings response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching all bookings:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const assignEmployee = async (bookingId, data, navigation) => {
    try {
        console.log('Assigning employee to booking:', bookingId, data);
        const response = await createAPI(navigation).patch(`/tour_booking/${bookingId}/assign`, data);
        console.log('Assign employee response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error assigning employee:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const assignEmployeeToTour = async (tourId, data, navigation) => {
    try {
        console.log('Assigning employee to tour:', tourId, data);
        const response = await createAPI(navigation).patch(`/tour_booking/tour/${tourId}/assign`, data);
        console.log('Assign employee to tour response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error assigning employee to tour:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getEmployees = async (navigation) => {
    try {
        console.log('Fetching employees');
        const response = await createAPI(navigation).get('/tour_booking/employees');
        console.log('Employees response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching employees:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export const getEmployeeStats = async (navigation) => {
    try {
        console.log('Fetching employee stats');
        const response = await createAPI(navigation).get('/tour_booking/employee-stats');
        console.log('Employee stats response:', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching employee stats:', error.response?.data || error.message);
        throw error.response?.data || error;
    }
};

export default createAPI;