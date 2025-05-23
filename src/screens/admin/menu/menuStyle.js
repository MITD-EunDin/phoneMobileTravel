import { StyleSheet,Dimensions } from 'react-native';
import { COLORS } from '../../../stysles/theme';
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5', 
    padding: 20,
  },

  buttonGroup: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    width: '100%',
    marginBottom: 20,
  },
  menuButton: {
    flexDirection: 'columns', 
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: (width - 60) / 2, // Chiều rộng mỗi nút: 50% màn hình trừ padding
  },
  leftButton: {
    marginRight: 10, 
  },
  // rightButton: {
  //   marginLeft: 10, 
  // },

  buttonGroup1: {
    width: '100%',
    marginBottom: 20, 
  },
  menuButton1: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: COLORS.white, 
    borderWidth: 1, 
    borderColor: COLORS.lightGrey, 
    borderRadius: 10, 
    padding: 15,
    marginBottom: 10, 
  },
  buttonText: {
    fontSize: 16,
    color: '#333', 
    marginLeft: 10, 
  },
  logoutContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20, 
  },
  logoutButton: {
    backgroundColor: COLORS.red, 
    borderRadius: 20, 
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: COLORS.white, 
    fontWeight: 'bold',
  },
});

export default styles;