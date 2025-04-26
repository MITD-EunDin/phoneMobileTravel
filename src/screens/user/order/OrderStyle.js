import { StyleSheet, Dimensions } from 'react-native';

const styles= StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#f0f4f8',
    width: 420,
    alignSelf: 'center',
  },
  navButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  filterContainer: {
    padding: 15,
    height: 100,
  },
  filterRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    width: FILTER_BUTTON_WIDTH,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Header Section Styles
  header: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  airplane: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
  },
  popularTripsContainer: {
    padding: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  flatList: {
    paddingBottom: 10,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    padding: 10,
  },
  cardDetail: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    padding: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    paddingHorizontal: 10,
    textDecorationLine: 'line-through',
  },
  currency: {
    fontSize: 12,
    color: '#666',
  },
  // Discounted Trips Section
  discountedTripsContainer: {
    padding: 10,
    marginTop: 10,
  },
});
export default styles;