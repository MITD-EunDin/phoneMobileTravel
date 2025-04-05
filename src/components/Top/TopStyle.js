import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingTop: 50, // Đẩy xuống để tránh notch/Dynamic Island
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 5,
    marginRight: 10,
  },
  notification: {
    padding: 10,
  },
});

export default styles;