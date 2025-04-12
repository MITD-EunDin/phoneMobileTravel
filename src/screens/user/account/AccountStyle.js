import { StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../../stysles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
 
  // Content styles
  container: {
    flex: 1,
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'white',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  changePasswordButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  changePasswordText: {
    color: COLORS.blue,
    fontSize: 16,
  },
  confirmPasswordButton: {
    backgroundColor: COLORS.blue,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  confirmPasswordText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;