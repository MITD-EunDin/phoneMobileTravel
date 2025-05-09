import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokenToStorage = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error saving token:', error.message);
    throw error;
  }
};

export const getTokenFromStorage = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('Got token:', token);
    return token;
  } catch (error) {
    console.error('Error getting token:', error.message);
    return null;
  }
};

export const removeTokenFromStorage = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error.message);
    throw error;
  }
};