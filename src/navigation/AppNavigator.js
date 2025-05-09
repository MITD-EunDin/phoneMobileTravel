import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/loginout/LogIn';
import SignUpScreen from '../screens/loginout/SignUp';
import CustomerNavigator from './AppCustomer';
import AdminNavigator from './AppAdmin';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, token } = useAuth();

  // Nếu user chưa được tải (null và token null), hiển thị loading
  // if (token === null && user === null) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }}>
  //       <ActivityIndicator size="large" color="#e74c3c" />
  //     </View>
  //   );
  // }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={user ? (user.roles?.includes('ADMIN') || user.roles?.includes('ROLE_ADMIN') ? 'Admin' : 'Customer') : 'Login'}
        >
          {!user ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ gestureEnabled: true }}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ gestureEnabled: true }}
              />
            </>
          ) : user.roles?.includes('ADMIN') || user.roles?.includes('ROLE_ADMIN') ? (
            <Stack.Screen
              name="Admin"
              component={AdminNavigator}
              options={{ gestureEnabled: false }}
            />
          ) : (
            <Stack.Screen
              name="Customer"
              component={CustomerNavigator}
              options={{ gestureEnabled: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;