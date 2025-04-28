import { StyleSheet } from 'react-native';
import { COLORS } from '../../../stysles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  formContainer: {
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.black,
    backgroundColor: COLORS.white,
  },
  textArea: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ivory,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  imageUploadText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blue,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  saveButtonText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
  },
  selectTrigger: { 
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',  
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectValue: {  
    fontSize: 16,
    color: COLORS.black,
  },
  selectContent: {  
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 8,
    marginTop: 5,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 10,
    width: '100%', 
  },
  selectItem: {  
    padding: 12,
    fontSize: 16,
    color: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});


export default styles;