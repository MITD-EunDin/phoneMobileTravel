import { StyleSheet } from 'react-native';
import { COLORS } from "../../stysles/theme"

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.blue,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  notification: {
    position: 'relative',
    padding: 5,
  },
  redDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 16,
    height: 16,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default styles;