import {StyleSheet} from'react-native';
const styles=StyleSheet.create({
        container: {
          backgroundColor: '#f0f4f8',
        },
        tourImage: {
          width: '100%',
          height: 200,
          borderRadius: 10,
          marginBottom: 15,
        },
        imageTotal:{
          flexDirection:'row',
        },
        
        tourTitle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
          margin: 10,
        },
        detailContainer:{
          marginLeft:15,
          flexDirection:'row',
          padding:5,
        },
        priceContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
        },
        originalPrice: {
          fontSize: 16,
          color: '#999',
          textDecorationLine: 'line-through',
          marginRight: 10,
        },
        price: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#e74c3c',
        },
        currency: {
          fontSize: 14,
          color: '#e74c3c',
        },
        detailsContainer: {
          marginBottom: 20,
        },
        detailedInfoContainer: {
          marginBottom: 20,
          backgroundColor: '#fff',  
          padding:5,      
        },
        sectionTitleHeader:{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginBottom:20,
          padding:15,
          borderBottomWidth:1,
          borderColor:'#BDBCBC',
        },
        sectionHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        },
        
        sectionTitle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
          marginLeft:10,
        },
        description: {
          fontSize: 14,
          color: '#666',
          lineHeight: 20,
          marginBottom: 15,
        },
        detailItem: {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
        },
        detailIcon: {
          marginRight: 8,
        },
        detail: {
          fontSize: 14,
          color: '#666',
          flex: 1,
        },
        toggleContainer: {
          alignSelf: 'center', // Căn giữa nút
          marginBottom: 10,
        },
        toggleText: {
          fontSize: 14,
          color: '#3498db',
          fontWeight: 'bold',
        },
      });

export default styles;