import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/admin/dashbroad/DashBroad';
import Goods from '../screens/admin/goods/Goods';
import ManageTour from "../screens/admin/managetour/ManageTour";
import Menu from "../screens/admin/menu/MenuScreen";
import Notice from "../screens/admin/notice/NoticeScreen";
import CommonHeader from '../components/CommonHeader';
import { ChartPie, ShoppingBag, NotepadText,Hourglass ,ShieldUser   } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => (
  <Tab.Navigator
    // tabBar={(props) => <BottomNav {...props} />}
    // screenOptions={{
    //   header: () => <TopBar />,
    // }}
  >
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        header: (props) => <CommonHeader {...props} title="Thống kê" />,
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => (
          <ChartPie color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
        ),
      }}
    />
    <Tab.Screen
      name="Đơn hàng"
      component={Goods}
      options={{
        header: (props) => <CommonHeader {...props} title="Đơn hàng" />,
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => (
          <ShoppingBag color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
        ),
      }}
    />
    <Tab.Screen
      name="Quản lý tour"
      component={ManageTour}
      options={{
        header: (props) => <CommonHeader {...props} title="Quản lý tour" />,
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => (
          <NotepadText color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
        ),
      }}
    />
    <Tab.Screen
      name="Thông báo"
      component={Notice}
      options={{
        header: (props) => <CommonHeader {...props} title="Thông báo" />,
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => (
          <Hourglass color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
        ),
      }}
    />
    <Tab.Screen
      name="Tài khoản"
      component={Menu}
      options={{
        header: (props) => <CommonHeader {...props} title="Tài khoản" />,
        headerShown: true,
        tabBarIcon: ({ color, size, focused }) => (
          <ShieldUser color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AdminNavigator;