import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { House, CircleUser, ShoppingCart, NotebookText } from 'lucide-react-native';
import { COLORS } from '../../stysles/theme';
import styles from './BottomStyle';

const BottomNav = ({ state, descriptors, navigation }) => {
  const routes = [
    { name: 'homes', icon: House, label: 'Trang chủ' },
    { name: 'tour', icon: NotebookText, label: 'Tour' },
    { name: 'order', icon: ShoppingCart, label: 'Đơn hàng' },
    { name: 'account', icon: CircleUser, label: 'Tài khoản' },
  ];

  return (
    <View style={styles.container}>
      {routes.map(({ name, icon: Icon, label }, index) => {
        const isActive = state.index === index;
        const color = isActive ? '#7AB2F7' : COLORS.gray;

        return (
          <TouchableOpacity
            key={name}
            style={styles.navItem}
            onPress={() => navigation.navigate(name)}
          >
            <Icon size={30} color={color} style={styles.icon} />
            <Text style={[styles.navText, { color }]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomNav;



// import React from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import styles from './BottomStyle';
// import { House, CircleUser, ShoppingCart, NotebookText } from 'lucide-react-native';
// import { COLORS } from '../../stysles/theme';

// const BottomNav = ({ navigation, currentScreen }) => {
//   const getColor = (screen) => currentScreen === screen ? '#7AB2F7' : COLORS.gray;

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('homes')}>
//         <House size={30} color={getColor('homes')} style={styles.icon} />
//         <Text style={[styles.navText, { color: getColor('homes') }]}>Trang chủ</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('tour')}>
//         <NotebookText size={30} color={getColor('tour')} style={styles.icon} />
//         <Text style={[styles.navText, { color: getColor('tour') }]}>Tour</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('order')}>
//         <ShoppingCart size={30} color={getColor('order')} style={styles.icon} />
//         <Text style={[styles.navText, { color: getColor('order') }]}>Đơn hàng</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('account')}>
//         <CircleUser size={30} color={getColor('account')} style={styles.icon} />
//         <Text style={[styles.navText, { color: getColor('account') }]}>Tài khoản</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BottomNav;