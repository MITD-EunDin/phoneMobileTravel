import { StyleSheet, Dimensions } from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5', 
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff', 
    borderBottomWidth: 2,
    borderBottomColor: '#ED504E',
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
  tourCard:{
    position:"relative",
    gap:10,
    backgroundColor:'#fff',
    borderWidth:1,
    borderColor:"#ED504E",
  },
  tourStatus:{
    flex:1,
    color:'#EA5652',
    borderBottomWidth: 1,
    padding:10,
    borderBottomColor: '#444444',
  },
  tourInfo:{
    flexDirection: 'row',
    gap:10,
    padding:10,
    
  },
  tourImage:{
    width:120,
    height:65,
  },
  tourPrice:{
    flex:1,
    position:'absolute',
    bottom:10,
    right:10,
  },
})

export default styles;