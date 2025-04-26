import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 10,
    alignSelf: 'center',
  },
  
  filterContainer: {
    height:150,
    padding:10,
  },
  firstflatList: {
    backgroundColor: '#FBFBFB',
    padding:10,
    
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  header: {
    alignItems: 'center',
    width:'100%',
  
  },
  airplane: {
    width: 350,
    height: 250,
  },
  popularTripsContainer:{
    paddingTop:40,
    padding:10,
    paddingBottom:30,
  },
  discountedTripsContainer:{
    paddingTop:40,
    padding:10,
    paddingBottom:30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#EB6A58',
    marginBottom: 10,
  },
  flatList: {
    paddingBottom: 20,
   paddingTop:30,

  },
  
  card: {
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
});
export default styles;