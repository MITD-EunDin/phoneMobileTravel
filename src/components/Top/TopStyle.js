import { StyleSheet } from 'react-native';
import { COLORS } from "../../stysles/theme"

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 30,
    backgroundColor: COLORS.blue,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 5,
    paddingLeft:10,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  notification: {
    padding: 10,
    position: 'relative', // Needed for positioning the red dot
  },
  redDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    backgroundColor: COLORS.red,  
    borderRadius: 4,
  },
});

export default styles;