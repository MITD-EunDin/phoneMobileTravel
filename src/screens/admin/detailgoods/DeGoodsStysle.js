import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f4f6', 
      padding: 16,
    },
    header: {
      flexDirection: 'columns',
      // justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 20,

      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    orderIdContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    orderId: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1f2937', 
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 4,
    },
    dropdownContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      width: 320,
    },
    dropdownText: {
      fontSize: 14,
      color: '#6b7280',
    },
    time: {
      fontSize: 14,
      fontWeight: 'medium',
      color: '#374151',
    },
    assignButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      gap: 8,
      marginTop: 8,
    },
    assignText: {
      fontSize: 14,
      color: '#333',
    },
    section: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1f2937',
      marginBottom: 16,
    },
    customerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      marginBottom: 16,
    },
    customerDetails: {
      flex: 1,
    },
    customerName: {
      fontSize: 16,
      fontWeight: 'semibold',
      color: '#1f2937',
      marginBottom: 4,
    },
    customerCode: {
      fontSize: 14,
      color: '#4b5563',
      marginBottom: 4,
    },
    customerEmail: {
      fontSize: 14,
      color: '#4b5563',
    },
    pointsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    pointsText: {
      fontSize: 14,
      color: '#6b7280',
    },
    statusText: {
      fontSize: 14,
      color: '#6b7280',
    },
    noteContainer: {
      padding: 12,
      backgroundColor: '#f9fafb',
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    noteText: {
      fontSize: 14,
      color: '#6b7280',
      fontStyle: 'italic',
    },
    detailText: {
      fontSize: 14,
      color: '#333',
      marginBottom: 5,
    },
    detailValue: {
      fontSize: 14,
      color: '#666',
      marginBottom: 5,
    },
    quantityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tourInfo: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    tourName: {
      fontSize: 14,
      color: '#333',
      marginLeft: 10,
    },
    saveButton: {
      backgroundColor: '#3498db',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;