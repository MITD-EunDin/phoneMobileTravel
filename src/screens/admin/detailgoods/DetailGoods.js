import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styles from './DeGoodsStysle.js';
import { CircleUser, Image as ImageIcon, ChevronDown,Copy  } from 'lucide-react-native';
const DetailGoods = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderId}>12345</Text>
          <TouchableOpacity>
            <Copy color="#6b7280" size={16} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Thông tin</Text>
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownText}>Tạo lịch</Text>
            <Text style={styles.time}>22:10</Text>
          </View>
          <TouchableOpacity style={styles.assignButton}>
            <Text style={styles.assignText}>Phân công cho</Text>
            <ChevronDown color="#6b7280" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Khách hàng</Text>
        <View style={styles.customerInfo}>
          <CircleUser color="#9ca3af" size={40} />
          <View style={styles.customerDetails}>
            <Text style={styles.customerName}>Nguyễn Thị Trinh</Text>
            <Text style={styles.customerCode}>0123456789</Text>
            <Text style={styles.customerEmail}>trinh321@gmail.com</Text>
          </View>
        </View>
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsText}>Điểm thưởng: 0</Text>
          <Text style={styles.statusText}>Thành công: 0/1 đơn</Text>
        </View>
        <View style={styles.noteContainer}>
          <Text style={styles.noteText}>Chuyến đi cũ / Chưa có lịch sử chuyến đi</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chuyến đi</Text>
        <Text style={styles.detailText}>Điểm đến</Text>
        <Text style={styles.detailValue}>Hoang Quốc Việt, Bắc Từ Liêm, Hà Nội</Text>
        <View style={styles.quantityRow}>
          <View style={styles.quantityInfo}>
            <Text style={styles.detailText}>Số lượng người:</Text>
            <Text style={styles.detailValue}>Người lớn: 0</Text>
            <Text style={styles.detailValue}>Trẻ nhỏ: 0</Text>
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.detailText}>Dự kiến:</Text>
            <Text style={styles.detailValue}>Ngày khởi hành: 11/2/2025</Text>
            <Text style={styles.detailValue}>Ngày kết thúc: 11/2/2025</Text>
          </View>
        </View>
      </View>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tour</Text>
        <View style={styles.tourInfo}>
          <ImageIcon color="#9ca3af" size={24} />
          <Text style={styles.tourName}>Hà Nội – Sapa 4 ngày 3 đêm</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Lưu đơn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailGoods;