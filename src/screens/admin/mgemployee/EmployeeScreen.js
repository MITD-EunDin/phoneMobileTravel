import React from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { CircleUser, BadgePlus } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../stysles/theme';

const EmployeeScreen = ({ navigation }) => {
  const dataEmploy = [
    { name: 'Nguyễn Thị Trinh', role: 'Admin' },
    { name: 'Tôn Văn Diện', role: 'Nhân viên' },
    { name: 'Đỗ Mạnh Cường', role: 'Admin' },
  ];

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeItem}>
      <CircleUser color="#666" size={40} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{item.name}</Text>
        <Text style={styles.employeeRole}>{item.role}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm"
          placeholderTextColor="white"
        />
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7}>
          <BadgePlus color="#fff" size={24} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataEmploy}
        renderItem={renderEmployee}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.employeeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5', 
    padding: 15, 
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15, 
  },
  searchInput: {
    flex: 1, 
    backgroundColor: COLORS.lightGrey, 
    borderRadius: 20, 
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: COLORS.blue, 
    borderRadius: 20, 
    padding: 10,
    marginLeft: 10, 
  },
  employeeList: {
    paddingBottom: 20, 
  },
  employeeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white, 
    borderRadius: 10, 
    padding: 10,
    marginBottom: 10, 
    elevation: 2, 
    shadowColor: COLORS.shadow, 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  employeeInfo: {
    marginLeft: 10, // Khoảng cách giữa icon và thông tin
  },
  employeeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  employeeRole: {
    fontSize: 14,
    color: COLORS.red,
  },
});

export default EmployeeScreen;