import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../stysles/theme';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
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
    paddingBottom: 80,
},
tourCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
},
tourDetails: {
    flex: 1,
},
tourCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
},
tourName: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
},
price: {
    fontSize: 14,
    color: COLORS.red,
    fontWeight: 'bold',
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
    shadowColor: COLORS.gray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
},
tourImage: { 
    width: 70,  
    height: 70, 
    borderRadius: 8, 
    marginRight: 15, 
    resizeMode: 'cover', 
},
tourInfoContainer: { 
    flexDirection: 'row',
    flex: 1, 
},
});

export default styles;