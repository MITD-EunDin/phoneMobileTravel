import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/user/homes/HomeScreen';
import TourScreen from '../screens/user/tour/TourScreen';
import AccountScreen from '../screens/user/account/AccountScreen';
import OrderScreen from '../screens/user/order/OrderScreen';
import BottomNav from '../components/Bottom/BottomNavi';
import CommonHeader from '../components/CommonHeader'; // Import CommonHeader
import TopBar from "../components/Top/TopBar";
import { createStackNavigator } from '@react-navigation/stack';
import TourDetails from '../screens/user/toudetail/TourDetail';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ header: (props) => <TopBar />, headerShown: true }}
    />
    <Stack.Screen
      name="TourDetails"
      component={TourDetails}
      options={{ header: (props) => <CommonHeader {...props} title="Chi Tiết Tour" />, headerShown: true }}
    />
    
  </Stack.Navigator>
);

const TourStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tour"
      component={TourScreen}
      options={{ header: (props) => <CommonHeader {...props} title="Tour" />, headerShown: true }}
    />
    <Stack.Screen
      name="TourDetails"
      component={TourDetails}
      options={{ header: (props) => <CommonHeader {...props} title="Chi Tiết Tour" />, headerShown: true }}
    />
   
  </Stack.Navigator>
);

const OrderStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Order"
      component={OrderScreen}
      options={{ header: (props) => <CommonHeader {...props} title="Đơn hàng" />, headerShown: true }}
    />
    <Stack.Screen
      name="TourDetails"
      component={TourDetails}
      options={{ header: (props) => <CommonHeader {...props} title="Chi Tiết Tour" />, headerShown: true }}
    />
    
  </Stack.Navigator>
);

// Stack Navigator cho tab Tài khoản
const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ header: (props) => <CommonHeader {...props} title="Tài khoản" />, headerShown: true }}
    />
    <Stack.Screen
      name="TourDetails"
      component={TourDetails}
      options={{ header: (props) => <CommonHeader {...props} title="Chi Tiết Tour" />, headerShown: true }}
    />
   
  </Stack.Navigator>
);

const CustomerNavigator = ({ navigation, route }) => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="homes" component={HomeStack} />
      <Tab.Screen name="tour" component={TourStack} />
      <Tab.Screen name="order" component={OrderStack} />
      <Tab.Screen name="account" component={AccountStack} />
    </Tab.Navigator>
  );
};
export default CustomerNavigator;
