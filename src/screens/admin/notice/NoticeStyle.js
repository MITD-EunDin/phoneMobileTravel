import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../stysles/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', // Màu nền xám nhạt
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.white, 
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  tabList: {
    paddingHorizontal: 5,
  },
  tabButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tabButtonActive: {
    backgroundColor: COLORS.blue, 
    borderColor: COLORS.blue,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  noticeList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  noticeCard: {
    backgroundColor: '#e6f0ff', 
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
    color: COLORS.black,
    marginBottom: 5,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default styles;