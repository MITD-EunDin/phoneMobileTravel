import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { SaveAll, ImageUp } from "lucide-react-native";
import styles from './AddStyle.js';
const AddTour = () => {
  const [tourCode, setTourCode] = useState('');
  const [tourType, setTourType] = useState('');
  const [tourName, setTourName] = useState('');
  const [region, setRegion] = useState('');
  const [transport, setTransport] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [adultCount, setAdultCount] = useState('');
  const [maxPeople, setMaxPeople] = useState('');
  const [showRegionDropdown, setShowRegionDropdown] = useState(false); // State to control dropdown visibility
  const regions = ['Bắc', 'Trung', 'Nam'];

  const handleSave = () => {
    console.log({
      tourCode,
      tourType,
      tourName,
      region,
      transport,
      price,
      discount,
      image,
      description,
      notes,
      adultCount,
      maxPeople,
    });
    alert('Tour information saved!');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mã tour</Text>
          <TextInput
            style={styles.input}
            placeholder="Mã tour..."
            value={tourCode}
            onChangeText={setTourCode}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Loại tour</Text>
          <TextInput
            style={styles.input}
            placeholder="Tìm kiếm..."
            value={tourType}
            onChangeText={setTourType}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên tour</Text>
          <TextInput
            style={styles.input}
            placeholder="Tên tour..."
            value={tourName}
            onChangeText={setTourName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Khu vực</Text>
          <TouchableOpacity
            style={styles.selectTrigger} // Custom dropdown trigger
            onPress={() => setShowRegionDropdown(!showRegionDropdown)}
          >
            <Text style={styles.selectValue}>
                {region ? region : "Chọn khu vực"}
            </Text>
          </TouchableOpacity>
          {showRegionDropdown && (
            <View style={styles.selectContent}>
              {regions.map((reg) => (
                <TouchableOpacity
                  key={reg}
                  style={styles.selectItem}
                  onPress={() => {
                    setRegion(reg);
                    setShowRegionDropdown(false); // Hide dropdown after selection
                  }}
                >
                  <Text>{reg}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phương tiện</Text>
          <TextInput
            style={styles.input}
            placeholder="Phương tiện..."
            value={transport}
            onChangeText={setTransport}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Giá tour</Text>
          <TextInput
            style={styles.input}
            placeholder="Giá..."
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ưu đãi</Text>
          <TextInput
            style={styles.input}
            placeholder="Ưu đãi..."
            value={discount}
            onChangeText={setDiscount}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ảnh</Text>
          <TouchableOpacity
            style={styles.imageUploadButton}
            onPress={() => {
              alert('Image upload functionality not implemented here. You would use a library like react-native-image-picker.');
            }}
          >
            <ImageUp stroke="gray" />
            <Text style={styles.imageUploadText}>Chọn ảnh</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mô Tả</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Nhập mô tả..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ghi chú</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Nhập ghi chú..."
            multiline
            numberOfLines={4}
            value={notes}
            onChangeText={setNotes}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Thành viên</Text>
          <TextInput
            style={styles.input}
            placeholder="Thành viên..."
            value={adultCount}
            onChangeText={setAdultCount}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Giới hạn người</Text>
          <TextInput
            style={styles.input}
            placeholder="Giới hạn người..."
            value={maxPeople}
            onChangeText={setMaxPeople}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <SaveAll stroke="white" />
          <Text style={styles.saveButtonText}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTour;
