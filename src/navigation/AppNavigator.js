import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/loginout/LogIn';
import CustomerNavigator from './AppCustomer';
import AdminNavigator from './AppAdmin';
import { View } from 'react-native';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [userRole, setUserRole] = useState(null);

  const handleLogin = ({ role }) => {
    setUserRole(role);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!userRole ? (
            <Stack.Screen
              name="Login"
              component={LoginScreen} // Truyền trực tiếp LoginScreen
              initialParams={{ onLogin: handleLogin }} // Truyền onLogin qua initialParams
            />
          ) : userRole === 'admin' ? (
            <Stack.Screen name="Admin" component={AdminNavigator} />
          ) : (
            <Stack.Screen name="Customer" component={CustomerNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default AppNavigator;