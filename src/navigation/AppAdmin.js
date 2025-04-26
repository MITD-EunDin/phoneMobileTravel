import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/admin/dashbroad/DashBroad';
import BottomNav from '../components/Bottom/BottomNavi';
import TopBar from '../components/Top/TopBar';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
  <Tab.Navigator
    // tabBar={(props) => <BottomNav {...props} />}
    // screenOptions={{
    //   header: () => <TopBar />,
    // }}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
  </Tab.Navigator>
);

export default AdminNavigator;