import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/homes/HomeScreen';
import TourScreen from '../screens/user/tour/TourScreen';
import AccountScreen from '../screens/user/account/AccountScreen';
import OrderScreen from '../screens/user/order/OrderScreen';
import TopBar from '../components/Top/TopBar';
import BottomNav from '../components/Bottom/BottomNavi';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    tabBar={(props) => <BottomNav {...props} />}
    screenOptions={{ headerShown: false }} // Tắt header cho tất cả các tab
  >
    <Tab.Screen name="homes" component={HomeScreen} />
    <Tab.Screen name="tour" component={TourScreen} />
    <Tab.Screen name="account" component={AccountScreen} />
    <Tab.Screen name="order" component={OrderScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Tắt header mặc định của Stack
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: true, header: () => <TopBar /> }} // Bật header và chỉ dùng TopBar
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;