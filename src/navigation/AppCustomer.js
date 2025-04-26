import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/homes/HomeScreen';
import TourScreen from '../screens/user/tour/TourScreen';
import AccountScreen from '../screens/user/account/AccountScreen';
import OrderScreen from '../screens/user/order/OrderScreen';
import BottomNav from '../components/Bottom/BottomNavi';
import CommonHeader from '../components/CommonHeader'; // Import CommonHeader
import TopBar from "../components/Top/TopBar";

const Tab = createBottomTabNavigator();

const CustomerNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="homes"
        component={HomeScreen}
        options={{ 
          header: (props) => <TopBar/>, 
          headerShown: true 
        }}
      />
      <Tab.Screen
        name="tour"
        component={TourScreen}
        options={{ 
          header: (props) => <CommonHeader {...props} title="Tour" />, 
          headerShown: true 
        }}
      />
      
      <Tab.Screen
        name="order"
        component={OrderScreen}
        options={{ 
          header: (props) => <CommonHeader {...props} title="Đơn hàng" />, 
          headerShown: true 
        }}
      />
      <Tab.Screen
        name="account"
        component={AccountScreen}
        options={{ 
          header: (props) => <CommonHeader {...props} title="Tài khoản" />, 
          headerShown: true 
        }}
      />
    </Tab.Navigator>
  );
};

export default CustomerNavigator;