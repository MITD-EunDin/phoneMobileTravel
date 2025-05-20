import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import LoginScreen from "../screens/loginout/LogIn";
import SignUpScreen from "../screens/loginout/SignUp";
import CustomerNavigator from "./AppCustomer";
import AdminNavigator from "./AppAdmin";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user, token } = useAuth();

  console.log("AppNavigator - user:", user); // Debug user
  console.log("AppNavigator - roles:", user?.roles); // Debug roles

  const initialRouteName = user
    ? user.roles?.includes('ADMIN') || user.roles?.includes('ROLE_ADMIN')
      ? 'ADMIN'
      : 'USER'
    : 'Login';

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRouteName}
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
          ) : user.roles?.includes("ADMIN") || user.roles?.includes("ROLE_ADMIN") ? (
            <Stack.Screen
              name="ADMIN"
              component={AdminNavigator}
              options={{ gestureEnabled: false }}
            />
          ) : (
            <Stack.Screen
              name="USER"
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