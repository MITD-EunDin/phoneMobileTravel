import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/user/homes/HomeScreen';
import TourScreen from '../screens/user/tour/TourScreen';
import AccountScreen from '../screens/user/account/AccountScreen';
import OrderScreen from '../screens/user/order/OrderScreen';
import TourDetails from '../screens/user/toudetail/TourDetail';
import TourListScreen from '../screens/user/pagetour/PageTour';
import CommonHeader from '../components/CommonHeader';
import TopBar from '../components/Top/TopBar';
import Notice from '../screens/user/notice/Notice';
import { Home, Map, ShoppingBag, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomerTabNavigator = ({ onLogout, navigation }) => (
    <Tab.Navigator
        screenOptions={{
            headerShown: true,
        }}
    >
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                header: (props) => <TopBar {...props} title="Trang chủ" />,
                tabBarIcon: ({ color, size, focused }) => (
                    <Home color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
                ),
            }}
        />
        <Tab.Screen
            name="Tour"
            component={TourScreen}
            options={{
                header: (props) => <CommonHeader {...props} title="Tour" />,
                tabBarIcon: ({ color, size, focused }) => (
                    <Map color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
                ),
            }}
        />
        <Tab.Screen
            name="Order"
            component={OrderScreen}
            options={{
                header: (props) => <CommonHeader {...props} title="Đơn hàng" />,
                tabBarIcon: ({ color, size, focused }) => (
                    <ShoppingBag color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
                ),
            }}
        />
        <Tab.Screen
            name="Account"
            options={{
                header: (props) => <CommonHeader {...props} title="Tài khoản" />,
                tabBarIcon: ({ color, size, focused }) => (
                    <User color={color} size={size} strokeWidth={focused ? 2.5 : 2} />
                ),
            }}
        >
            {(props) => <AccountScreen {...props} onLogout={onLogout} />}
        </Tab.Screen>
    </Tab.Navigator>
);

const CustomerNavigator = ({ onLogout }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CustomerTabs"
                options={{ headerShown: false }}
            >
                {(props) => <CustomerTabNavigator {...props} onLogout={onLogout} />}
            </Stack.Screen>
            <Stack.Screen
                name="TourDetails"
                component={TourDetails}
                options={{
                    header: (props) => <CommonHeader {...props} title="Chi Tiết Tour" />,
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="TourListScreen"
                component={TourListScreen}
                options={{
                    header: (props) => <CommonHeader {...props} title="Danh Sách Tour" />,
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="Notice"
                component={Notice}
                options={{
                    header: (props) => <CommonHeader {...props} title="Thông báo" />,
                    headerShown: true,
                }}
            />
        </Stack.Navigator>
    );
};

export default CustomerNavigator;