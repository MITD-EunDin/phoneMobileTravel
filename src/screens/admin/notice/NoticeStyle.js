import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../stysles/theme";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  // Container for the entire component
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 12, // 1.5rem = 24dp
    backgroundColor: "#f3f4f6", // bg-gray-100
  },

  // Error message
  error: {
    marginBottom: 16, // 1rem
    padding: 16, // 1rem
    backgroundColor: "#fee2e2", // bg-red-100
    color: "#b91c1c", // text-red-700
    borderRadius: 8, // 0.5rem
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Android shadow
  },

  // Loading overlay
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(107, 114, 128, 0.5)", // bg-gray-500 bg-opacity-50
    zIndex: 50,
  },

  loadingBox: {
    backgroundColor: "#ffffff", // bg-white
    padding: 16, // 1rem
    borderRadius: 8, // 0.5rem
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  loadingText: {
    color: "#4b5563", // text-gray-700
  },

  // Button for adding notification
  addButton: {
    zIndex: 999,
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    bottom: 20,
    right: 20,
    paddingVertical: 8, // 0.5rem
    paddingHorizontal: 16, // 1rem
    backgroundColor: "#B3D1F6", // bg-blue-500
    color: "#386AFF", // text-white (for Text inside)
    borderRadius: 6, // 0.375rem
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },

  addButtonText: {
    color: "#ffffff", // text-white
    fontSize: 16,
  },

  addButtonIcon: {
    marginRight: 8, // 0.5rem
  },

  // Modal for creating notification
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  List: {
    height: 'fit-content',
  },

  modalContent: {
    backgroundColor: "#ffffff",
    padding: 24, // 1.5rem
    borderRadius: 8, // 0.5rem
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    width: "100%",
    maxWidth: width * 0.9, // max-w-md (28rem ≈ 90% of screen width)
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16, // 1rem
    paddingBottom: 8, // 0.5rem
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb", // border-gray-200
  },

  modalTitle: {
    fontSize: 18, // 1.125rem
    fontWeight: "600",
    color: "#111827", // text-gray-900
  },

  closeButton: {
    padding: 4, // 0.25rem
    borderRadius: 9999,
  },

  closeIcon: {
    color: "#4b5563", // text-gray-600
  },

  form: {
    flexDirection: "column",
    gap: 16, // React Native doesn't support gap; handled via margin in children
  },

  formLabel: {
    fontSize: 14, // 0.875rem
    fontWeight: "500",
    color: "#374151", // text-gray-700
  },

  formInput: {
    marginTop: 4, // 0.25rem
    width: "100%",
    padding: 8, // 0.5rem
    borderWidth: 1,
    borderColor: "#d1d5db", // border-gray-300
    borderRadius: 6, // 0.375rem
    fontSize: 16,
  },

  formInputFocus: {
    borderColor: "#3b82f6", // focus:border-blue-500
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  formTextarea: {
    marginTop: 4, // 0.25rem
    width: "100%",
    padding: 8, // 0.5rem
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 6, // 0.375rem
    height: 96, // 6rem
    fontSize: 16,
  },

  formTextareaFocus: {
    borderColor: "#3b82f6",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },

  formActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8, // Handled via margin in children
  },

  cancelButton: {
    paddingVertical: 8, // 0.5rem
    paddingHorizontal: 16, // 1rem
    backgroundColor: "#d1d5db", // bg-gray-300
    borderRadius: 6, // 0.375rem
  },

  cancelButtonText: {
    color: "#374151", // text-gray-700
    fontSize: 16,
  },

  submitButton: {
    paddingVertical: 8, // 0.5rem
    paddingHorizontal: 16, // 1rem
    backgroundColor: "#3b82f6",
    borderRadius: 6, // 0.375rem
  },

  submitButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },

  // Tabs
  tabs: {
    marginBottom: 16,
    height: 50,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
    marginRight: 8,
    height: 'fit-content',
  },
  tabButtonText: {
    color: "#374151",
    fontSize: 16,
  },
  tabButtonActive: {
    backgroundColor: "#3b82f6",
  },
  tabButtonTextActive: {
    color: "#ffffff",
    fontSize: 16,
  },

  // Notification list
  notificationList: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8, // 0.5rem
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    maxHeight: 600,
    backgroundColor: "#ffffff",
  },

  listHeader: {
    fontSize: 20, // 1.25rem
    fontWeight: "600",
    padding: 16, // 1rem
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  emptyMessage: {
    color: "#6b7280", // text-gray-500
    padding: 16, // 1rem
    textAlign: "center",
  },

  notificationItem: {
    padding: 16, // 1rem
    flexDirection: "row",
    alignItems: "center",
  },

  statusIconWrapper: {
    width: width * 0.08333333, // 8.333333%
    flexDirection: "row",
    justifyContent: "center",
  },

  statusIconUnread: {
    color: "#ef4444", // text-red-500
  },

  statusIconRead: {
    color: "#10b981", // text-green-500
  },

  notificationContent: {
    width: width * 0.58333333, // 58.333333%
    paddingLeft: 16, // 1rem
  },

  notificationTitle: {
    fontWeight: "500",
    fontSize: 16,
  },

  notificationDate: {
    fontSize: 14, // 0.875rem
    color: "#6b7280",
  },

  notificationTime: {
    width: width * 0.33333333, // 33.333333%
    textAlign: "center",
    fontSize: 12,
    paddingRight: 40,
  },

  // Notification detail panel
  detailPanel: {
    marginTop: 16, // 1rem
    padding: 16, // 1rem
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8, // 0.5rem
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#ffffff",
  },

  closeDetailButton: {
    position: "absolute",
    top: 8, // 0.5rem
    right: 8, // 0.5rem
    padding: 4, // 0.25rem
    borderRadius: 9999,
    backgroundColor: "#e5e7eb",
  },

  detailTitle: {
    fontSize: 18, // 1.125rem
    fontWeight: "600",
  },

  detailDate: {
    fontSize: 14, // 0.875rem
    color: "#6b7280",
  },

  detailContent: {
    marginTop: 8, // 0.5rem
    fontSize: 16,
  },

  detailSender: {
    marginTop: 8, // 0.5rem
    fontSize: 14, // 0.875rem
    color: "#4b5563", // text-gray-600
  },
});

export default styles;