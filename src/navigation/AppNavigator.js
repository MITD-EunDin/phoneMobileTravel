import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Alert, ActivityIndicator, View } from 'react-native';
import LoginScreen from '../screens/loginout/LogIn';
import CustomerNavigator from './AppCustomer';
import AdminNavigator from './AppAdmin';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi ứng dụng khởi động
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

  // Xử lý khi ứng dụng chuyển sang trạng thái background/inactive
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
              Alert.alert('Thông báo', 'Bạn đã bị đăng xuất do không chọn "Nhớ tôi".');
            }
          }
        } catch (error) {
          console.error('Lỗi khi xóa userData từ AsyncStorage:', error);
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  const handleLogin = async ({ username, role, rememberMe }) => {
    try {
      const userData = { username, role, rememberMe };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setUserData(userData);
    } catch (error) {
      console.error('Lỗi khi lưu userData vào AsyncStorage:', error);
      Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUserData(null);
      Alert.alert('Thông báo', 'Đăng xuất thành công!');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Lỗi', 'Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={userData ? (userData.role === 'admin' ? 'Admin' : 'Customer') : 'Login'}
        >
          {!userData ? (
            <Stack.Screen
              name="Login"
              component={(props) => <LoginScreen {...props} onLogin={handleLogin} />}
              options={{ gestureEnabled: true }} // Không cho phép quay lại
            />
          ) : userData.role === 'admin' ? (
            <Stack.Screen
              name="Admin"
              component={(props) => <AdminNavigator {...props} onLogout={handleLogout} setUserData={setUserData} userData={userData}/>}
              options={{ gestureEnabled: false }}
            />
          ) : (
            <Stack.Screen
              name="Customer"
              component={(props) => <CustomerNavigator {...props} onLogout={handleLogout} setUserData={setUserData} userData={userData} />}
              options={{ gestureEnabled: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;