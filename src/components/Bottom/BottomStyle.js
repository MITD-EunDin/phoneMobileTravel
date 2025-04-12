import { StyleSheet } from 'react-native';
import { COLORS } from '../../stysles/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  navItem: {
    alignItems: 'center',
  },
  icon: {
    color: COLORS.text,
  },
  navText: {
    fontSize: 12,
    color: COLORS.text,
  },
  activeText: {
    color: COLORS.blue,
    fontWeight: 'bold',
  },
});

export default styles;