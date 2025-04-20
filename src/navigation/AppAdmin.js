import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/admin/thongke/DashBroad';
import Goods from '../screens/admin/goods/Goods';
import Menu from "../screens/admin/menu/MenuScreen";
import Notice from "../screens/admin/notice/NoticeScreen";
import ManageTour from "../screens/admin/managetour/ManageTour";

const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
  <Tab.Navigator
    // tabBar={(props) => <BottomNav {...props} />}
    // screenOptions={{
    //   header: () => <TopBar />,
    // }}
  >
    <Tab.Screen name="Thống kê" component={DashboardScreen} />
    <Tab.Screen name="Đơn hàng" component={Goods} />
    <Tab.Screen name="Tour" component={ManageTour} />
    <Tab.Screen name="Thông báo" component={Notice} />
    <Tab.Screen name="Tài khoản" component={Menu} />
  </Tab.Navigator>
);

export default AdminNavigator;