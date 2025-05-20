import { StyleSheet, Dimensions } from 'react-native';

// Lấy kích thước màn hình để responsive
const { width, height } = Dimensions.get('window');

import COLORS from'../../../stysles/theme';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,

    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  formGroup: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#6885C1',
     backgroundColor: '#FBFBFB',
    padding: 10,
    fontSize: 16,
  },
  
  picker: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },

  imageUpload: {
    marginTop: 10,
  },
  imagePreviews: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
  },

  submitButton: {
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;