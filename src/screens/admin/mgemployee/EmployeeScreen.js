import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal, ScrollView } from 'react-native';
import { CircleUser, BadgePlus, X } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../stysles/theme';
import { getUsersByRole, createEmployee, updateUser, deleteUser, } from "../../../api/Api";
import { getTokenFromStorage } from "../../../utils/auth";

const EmployeeScreen = ({ navigation }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [newEmployee, setNewEmployee] = useState({
    id: '',
    username: '',
    fullname: '',
    password: '12345678',
    dateOfBirth: '',
    phone: '',
    email: '',
    citizenId: '',
    address: '',
    role: 'STAFF',
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = await getTokenFromStorage();
      const data = await getUsersByRole('STAFF', token);
      console.log('Dữ liệu nhân viên:', data);
      setEmployees(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách nhân viên:', error);
      setError('Không thể tải danh sách nhân viên');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleInputChange = (field, value) => {
    setNewEmployee({ ...newEmployee, [field]: value ?? '' });
  };

  const addEmployee = async () => {
    try {
      const token = await getTokenFromStorage();
      await createEmployee(
        {
          ...newEmployee,
          role: [newEmployee.role],
          dateOfBirth: newEmployee.dateOfBirth ? new Date(newEmployee.dateOfBirth).toISOString().split('T')[0] : null,
          password: '12345678',
        },
        token
      );
      await fetchEmployees();
      setIsFormVisible(false);
      resetForm();
    } catch (err) {
      console.error('Lỗi khi thêm nhân viên:', err);
      setError('Không thể thêm nhân viên');
    }
  };

  const editEmployee = async () => {
    try {
      const token = await getTokenFromStorage();
      await updateUser(selectedEmployee.id, newEmployee, token);
      await fetchEmployees();
      setIsFormVisible(false);
      resetForm();
    } catch (err) {
      console.error('Lỗi khi cập nhật nhân viên:', err);
      setError('Không thể cập nhật nhân viên');
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const token = await getTokenFromStorage();
      await deleteUser(id, token);
      await fetchEmployees();
    } catch (err) {
      console.error('Lỗi khi xóa nhân viên:', err);
      setError('Không thể xóa nhân viên');
    }
  };

  const resetForm = () => {
    setNewEmployee({
      id: '',
      username: '',
      fullname: '',
      password: '12345678',
      dateOfBirth: '',
      phone: '',
      email: '',
      citizenId: '',
      address: '',
      role: 'STAFF',
    });
    setSelectedEmployee(null);
    setIsEditing(false);
  };

  const openFormForEdit = (emp) => {
    setSelectedEmployee(emp);
    setNewEmployee({
      username: emp.username || '',
      fullname: emp.fullname || '',
      email: emp.email || '',
      phone: emp.phone || '',
      dateOfBirth: emp.dateOfBirth ? emp.dateOfBirth.split('T')[0] : '',
      citizenId: emp.citizenId || '',
      address: emp.address || '',
      role: emp.roles?.[0] || 'STAFF',
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const openFormForAdd = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const handleFormSubmit = () => {
    if (isEditing) {
      editEmployee();
    } else {
      addEmployee();
    }
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.username?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderEmployee = ({ item }) => (
    <TouchableOpacity
      style={styles.employeeItem}
      onPress={() => openFormForEdit(item)}
      activeOpacity={0.7}
    >
      <CircleUser color="#666" size={40} />
      <View style={styles.employeeInfo}>
        <Text style={styles.employeeName}>{item.fullname || 'N/A'}</Text>
        <Text style={styles.employeeRole}>{item.roles?.[0] || 'STAFF'}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteEmployee(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm và nút thêm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm theo tên hoặc tài khoản"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={openFormForAdd}
        >
          <BadgePlus color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      {/* Hiển thị danh sách hoặc trạng thái */}
      {loading ? (
        <View style={styles.center}>
          <Text>Đang tải...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : filteredEmployees.length === 0 ? (
        <View style={styles.center}>
          <Text>Không tìm thấy nhân viên nào</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEmployees}
          renderItem={renderEmployee}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          contentContainerStyle={styles.employeeList}
        />
      )}

      {/* Modal cho form thêm/sửa nhân viên */}
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsFormVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsFormVisible(false)}
            >
              <X color="#333" size={24} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Sửa Nhân Viên' : 'Thêm Nhân Viên'}
            </Text>
            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Tên tài khoản"
                value={newEmployee.username}
                onChangeText={(text) => handleInputChange('username', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Họ và tên"
                value={newEmployee.fullname}
                onChangeText={(text) => handleInputChange('fullname', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={newEmployee.email}
                onChangeText={(text) => handleInputChange('email', text)}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Số điện thoại"
                value={newEmployee.phone}
                onChangeText={(text) => handleInputChange('phone', text)}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Ngày sinh (YYYY-MM-DD)"
                value={newEmployee.dateOfBirth}
                onChangeText={(text) => handleInputChange('dateOfBirth', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CMND/CCCD"
                value={newEmployee.citizenId}
                onChangeText={(text) => handleInputChange('citizenId', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Địa chỉ"
                value={newEmployee.address}
                onChangeText={(text) => handleInputChange('address', text)}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleFormSubmit}
              >
                <Text style={styles.submitButtonText}>
                  {isEditing ? 'Cập nhật' : 'Thêm'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    flex: 1,
    marginLeft: 10,
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
  deleteButton: {
    backgroundColor: COLORS.red,
    borderRadius: 5,
    padding: 5,
  },
  deleteButtonText: {
    color: COLORS.white,
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: COLORS.blue,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 16,
  },
});

export default EmployeeScreen;