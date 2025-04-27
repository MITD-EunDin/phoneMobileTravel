import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Alert } from 'react-native'; // Thêm Alert để thông báo
import LoginScreen from '../screens/loginout/LogIn';
import CustomerNavigator from './AppCustomer';
import AdminNavigator from './AppAdmin';
import { View } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
        }
      } catch (error) {
        console.error('Lỗi khi lấy userData từ AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserData();
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        try {
          const storedUserData = await AsyncStorage.getItem('userData');
          if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            if (!parsedData.rememberMe) {
              await AsyncStorage.removeItem('userData');
              setUserData(null);
            }
          }
        } catch (error) {
          console.error('Lỗi khi xóa userData từ AsyncStorage:', error);
        }
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleLogin = async ({ username, role, rememberMe }) => {
    try {
      const userData = { username, role, rememberMe };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserData(userData);
    } catch (error) {
      console.error('Lỗi khi lưu userData vào AsyncStorage:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      Alert.alert('Thông báo', 'Đăng xuất thành công!'); // Thêm thông báo
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Lỗi', 'Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userData ? (
            <Stack.Screen
              name="Login"
              component={(props) => <LoginScreen {...props} onLogin={handleLogin} />}
            />
          ) : userData.role === 'admin' ? (
            <Stack.Screen
              name="Admin"
              component={(props) => <AdminNavigator {...props} onLogout={handleLogout} />}
            />
          ) : (
            <Stack.Screen
              name="Customer"
              component={(props) => <CustomerNavigator {...props} onLogout={handleLogout} userData={userData} />}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;