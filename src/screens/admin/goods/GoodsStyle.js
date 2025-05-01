import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../stysles/theme';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Màu nền xám nhạt
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  contentCart: {
    flex: 1,
  },
  tourList: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  tourCard: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    shadowColor: COLORS.red,
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
    color: COLORS.black,
  },
  detailButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: "space-between"
  },
  infoContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingBottom: 5,
  },
  statusBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '500',
  },
  timeText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  customerName: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 5,
  },
  tourName: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  phone: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: COLORS.red, // Màu đỏ cho giá
    fontWeight: 'bold',
    marginBottom: 10,
  },
  printButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  printText: {
    fontSize: 14,
    color: COLORS.blue,
    fontWeight: '500',
    paddingLeft: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.blue,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default styles;