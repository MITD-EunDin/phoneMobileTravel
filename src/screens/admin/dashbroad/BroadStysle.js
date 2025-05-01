import { StyleSheet } from 'react-native';
import {COLORS} from "../../../stysles/theme"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0', // Nền xám nhạt
    padding: 15,
  },
  section: {
    backgroundColor: COLORS.white, // Nền trắng cho section
    padding: 15,
    borderRadius: 8, // Bo góc nhẹ
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
  },


  tabContainer: {
    marginBottom: 10,
  },
  tabList: {
    paddingHorizontal: 5,
  },
  tabItem: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tabItemSelected: {
    backgroundColor: COLORS.blue, 
    borderColor: COLORS.lightGrey,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '500',
  },
  tabTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },

  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0', 
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5', 
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeaderCell: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
  },
  employeeName: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 10,
  },
});

export default styles;