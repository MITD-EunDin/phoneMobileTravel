import { StyleSheet } from 'react-native';
import {COLORS} from '../../../stysles/theme'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 10,
    alignSelf: 'center',
  },
  
  filterContainer: {
    padding: 20,
    
  },
  filterContent:{
    backgroundColor:'#fff',
    borderRadius:10,
    padding:10,
  },
  filterRow: {
    justifyContent: 'space-between', 
    margin:10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5, 
    alignItems: 'center',
   
  },
  
  filterText: {
    fontSize: 14,
    color: '#386AFF',
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
    color: COLORS.lightRed,
    marginBottom: 10,
  },
  detailContainer:{
    paddingLeft:5,
    flexDirection:'row',
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
    width:190,
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
    // paddingHorizontal: 10,
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