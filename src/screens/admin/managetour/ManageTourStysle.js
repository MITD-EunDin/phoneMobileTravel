import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Màu nền xám nhạt
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  contentCart: {
    flex: 1,
  },
  tourList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  tourCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tourHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  tourCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  detailButton: {
    backgroundColor: '#007bff',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: '#777',
  },
  customerName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 5,
  },
  tourName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#e74c3c', // Màu đỏ cho giá
    fontWeight: 'bold',
    marginBottom: 10,
  },
  printButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  printText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default styles;