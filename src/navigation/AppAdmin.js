import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/admin/thongke/DashBroad';
import Goods from '../screens/admin/goods/Goods';
import Menu from "../screens/admin/menu/MenuScreen";
import Notice from "../screens/admin/notice/NoticeScreen";
import ManageTour from "../screens/admin/managetour/ManageTour";
import CommonHeader from '../components/CommonHeader';
import DashBroad from '../screens/admin/thongke/DashBroad';
const Tab = createBottomTabNavigator();

const AdminNavigator = ({ navigation, route }) => (
  <Tab.Navigator
    // tabBar={(props) => <BottomNav {...props} />}
    // screenOptions={{
    //   header: () => <TopBar />,
    // }}
  >
    <Tab.Screen name="Thống kê" 
                component={DashBroad}
                options={{ 
                  header: (props) => <CommonHeader {...props} title="Thống kê" />, 
                  headerShown: true 
                }} />
    <Tab.Screen name="Đơn hàng" 
                component={Goods}
                options={{ 
                  header: (props) => <CommonHeader {...props} title="Đơn hàng" />, 
                  headerShown: true 
                }} />
    <Tab.Screen name="Tour" 
                component={ManageTour}
                options={{ 
                  header: (props) => <CommonHeader {...props} title="Tour" />, 
                  headerShown: true 
                }} />
    <Tab.Screen name="Thông báo" 
                component={Notice}
                options={{ 
                  header: (props) => <CommonHeader {...props} title="Thông báo" />, 
                  headerShown: true 
                }} />
    <Tab.Screen name="Tài khoản" 
                component={Menu}
                options={{ 
                  header: (props) => <CommonHeader {...props} title="Tài khoản" />, 
                  headerShown: true 
                }} />
  </Tab.Navigator>
);

export default AdminNavigator;