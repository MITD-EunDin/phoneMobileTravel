import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Màu nền xám nhạt
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff', // Nền trắng cho thanh tab
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabList: {
    paddingHorizontal: 5,
  },
  tabButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: '#007bff', // Màu xanh khi tab được chọn
    borderColor: '#007bff',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  noticeList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  noticeCard: {
    backgroundColor: '#e6f0ff', // Nền xanh nhạt giống hình ảnh
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  noticeCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default styles;