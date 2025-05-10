import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
import { COLORS } from '../../../stysles/theme';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f4f8',
    padding: 16,
    paddingBottom: 80,
  },
  tourImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  tourTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  describeText: {
    color: COLORS.black,
  },
  originalPrice: {
    fontSize: 10,
    color: COLORS.gray,
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.red,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  descriptionContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  itineraryContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBCBC',
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDetail: {
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 10,
  },
  descriptionText: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 22,
  },
  itineraryItem: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 8,
    paddingLeft: 10,
  },
  bookingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  bookingButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;