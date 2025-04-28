import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/admin/dashbroad/DashBroad';
import Goods from '../screens/admin/goods/Goods';
import ManageTour from "../screens/admin/managetour/ManageTour";
import Menu from "../screens/admin/menu/MenuScreen";
import Notice from "../screens/admin/notice/NoticeScreen";
import CommonHeader from '../components/CommonHeader';
import AddTour from "../screens/admin/addtour/AddTour";
import DetailGoods from '../screens/admin/detailgoods/DetailGoods';
import MgEmployee from "../screens/admin/mgemployee/EmployeeScreen";
import { ChartPie, ShoppingBag, NotepadText,Hourglass ,ShieldUser   } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const MainAdminNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AdminTabs"
      component={AdminNavigator}
      options={{ headerShown: false }} // Ẩn header của stack để tab hiển thị
    />
    <Stack.Screen
      name="AddTour"
      component={AddTour}
      options={{
        header: (props) => <CommonHeader {...props} title="Thêm tour" />,
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="DetailGoods"
      component={DetailGoods}
      options={{
        header: (props) => <CommonHeader {...props} title="Chi tiết đơn" />,
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="MgEmployee"
      component={MgEmployee}
      options={{
        header: (props) => <CommonHeader {...props} title="Nhân viên" />,
        headerShown: true,
      }}
    />
  </Stack.Navigator>
);
export default MainAdminNavigator;