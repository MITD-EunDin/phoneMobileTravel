import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { addTour, updateTour } from '../../../api/TourApi';
import styles from './AddStyle';

const AddTour = ({ navigation, route }) => {
  const { tourToEdit } = route.params || {};
  const [newTour, setNewTour] = useState({
    tourName: '',
    price: '',
    discount: '',
    newPrice: '',
    duration: '',
    description: '',
    itinerary: '',
    transportation: '',
    accommodation: '',
    tourType: '',
    region: '',
    images: [],
    peopleLimit: '',
    currentPeople: '',
    departureDate: '',
  });
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tourToEdit) {
      const firstSchedule = tourToEdit.tourSchedules?.[0];
      const price = Number(tourToEdit.price) || 0;
      const discount = Number(tourToEdit.discount) || 0;
      const newPrice = price - (price * (discount / 100));
      setNewTour({
        tourName: tourToEdit.tourName || '',
        price: tourToEdit.price ? String(tourToEdit.price) : '',
        discount: tourToEdit.discount ? String(tourToEdit.discount) : '',
        newPrice: newPrice ? String(newPrice) : '',
        duration: tourToEdit.duration || '',
        description: tourToEdit.description || '',
        itinerary: tourToEdit.itinerary || '',
        transportation: tourToEdit.transportation || '',
        accommodation: tourToEdit.accommodation || '',
        tourType: tourToEdit.tourType || '',
        region: tourToEdit.region || '',
        images: tourToEdit.images || [tourToEdit.image].filter(Boolean),
        peopleLimit: firstSchedule ? String(firstSchedule.peopleLimit) : '',
        currentPeople: firstSchedule ? String(firstSchedule.currentPeople) : '',
        departureDate: firstSchedule ? firstSchedule.departureDate : '',
      });
      setImagePreviews(tourToEdit.images || [tourToEdit.image].filter(Boolean));
    }
  }, [tourToEdit]);

  useEffect(() => {
    const price = Number(newTour.price) || 0;
    const discount = Number(newTour.discount) || 0;
    const newPrice = price - (price * (discount / 100));
    setNewTour((prev) => ({ ...prev, newPrice: newPrice ? String(newPrice) : '' }));
  }, [newTour.price, newTour.discount]);

  const handleInputChange = (name, value) => {
    setNewTour((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (departureDate) => {
    setSelectedSchedule(departureDate);
    const schedule = tourToEdit?.tourSchedules?.find(
      (s) => s.departureDate === departureDate
    );
    setNewTour((prev) => ({
      ...prev,
      peopleLimit: schedule ? String(schedule.peopleLimit) : '',
      currentPeople: schedule ? String(schedule.currentPeople) : '',
      departureDate: departureDate,
    }));
  };

  const handleImageChange = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 3 - newTour.images.length,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (response.errorCode) {
        Alert.alert('Lỗi', 'Không thể chọn ảnh: ' + response.errorMessage);
        return;
      }

      const files = response.assets || [];
      if (files.length + newTour.images.length > 3) {
        Alert.alert('Lỗi', 'Chỉ được chọn tối đa 3 ảnh.');
        return;
      }

      const newImageUrls = [...newTour.images];
      const newPreviews = [...imagePreviews];
      setLoading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', {
          uri: file.uri,
          type: file.type || 'image/jpeg',
          name: file.fileName || 'image.jpg',
        });
        formData.append('upload_preset', 'image tour');

        try {
          const res = await fetch('https://api.cloudinary.com/v1_1/duydoyrpb/image/upload', {
            method: 'POST',
            body: formData,
          });

          const data = await res.json();
          if (data.secure_url) {
            newImageUrls.push(data.secure_url);
            newPreviews.push(data.secure_url);
          } else {
            throw new Error('Upload ảnh thất bại');
          }
        } catch (error) {
          console.error('Lỗi upload ảnh:', error);
          Alert.alert('Lỗi', 'Upload ảnh thất bại. Vui lòng thử lại.');
          setLoading(false);
          return;
        }
      }

      setNewTour((prev) => ({ ...prev, images: newImageUrls }));
      setImagePreviews(newPreviews);
      setLoading(false);
    });
  };

  const handleRemoveImage = (index) => {
    const newImageUrls = newTour.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setNewTour((prev) => ({ ...prev, images: newImageUrls }));
    setImagePreviews(newPreviews);
  };

  const handleSubmit = async () => {
    const price = Number(newTour.price);
    const discount = Number(newTour.discount);
    const peopleLimit = Number(newTour.peopleLimit);
    if (!newTour.tourName || !newTour.tourType || !newTour.region) {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin bắt buộc.');
      return;
    }
    if (price < 0 || discount < 0 || peopleLimit < 0) {
      Alert.alert('Lỗi', 'Giá, ưu đãi hoặc giới hạn người không được nhỏ hơn 0.');
      return;
    }
    if (newTour.images.length === 0) {
      Alert.alert('Lỗi', 'Vui lòng chọn ít nhất 1 ảnh.');
      return;
    }

    const tourPayload = {
      tourName: newTour.tourName,
      price: price,
      discount: discount,
      newPrice: Number(newTour.newPrice),
      duration: newTour.duration,
      description: newTour.description,
      itinerary: newTour.itinerary,
      transportation: newTour.transportation,
      accommodation: newTour.accommodation,
      tourType: newTour.tourType,
      region: newTour.region,
      images: newTour.images,
      peopleLimit: peopleLimit,
      currentPeople: Number(newTour.currentPeople) || 0,
      departureDate: newTour.departureDate || null,
    };

    try {
      let updatedTour;
      if (tourToEdit) {
        updatedTour = await updateTour(tourToEdit.tourId, tourPayload);
        onUpdateTour(updatedTour);
      } else {
        const addedTour = await addTour(tourPayload);
        onAddTour(addedTour);
      }
      Alert.alert('Thành công', tourToEdit ? 'Cập nhật tour thành công!' : 'Thêm tour thành công!');
      navigation.goBack(); // Quay lại màn hình trước
    } catch (error) {
      console.error('Lỗi khi thêm/sửa tour:', error);
      Alert.alert('Lỗi', error.response?.data?.message || 'Đã có lỗi khi thêm/sửa tour.');
    }
  };

  return (
    <ScrollView style={styles.form}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{tourToEdit ? 'Cập nhật Tour' : 'Thiết lập Tour'}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
        </TouchableOpacity>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tên Tour *</Text>
          <TextInput
            style={styles.input}
            value={newTour.tourName}
            onChangeText={(text) => handleInputChange('tourName', text)}
            placeholder="Nhập tên tour"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Loại Tour *</Text>
          <Picker
            selectedValue={newTour.tourType}
            style={styles.picker}
            onValueChange={(value) => handleInputChange('tourType', value)}
          >
            <Picker.Item label="Chọn loại tour" value="" />
            <Picker.Item label="Trong nước" value="DOMESTIC" />
            <Picker.Item label="Quốc tế" value="INTERNATIONAL" />
          </Picker>
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Khu vực *</Text>
          <Picker
            selectedValue={newTour.region}
            style={styles.picker}
            onValueChange={(value) => handleInputChange('region', value)}
          >
            <Picker.Item label="Chọn khu vực" value="" />
            <Picker.Item label="Miền Bắc" value="Miền Bắc" />
            <Picker.Item label="Miền Trung" value="Miền Trung" />
            <Picker.Item label="Miền Nam" value="Miền Nam" />
          </Picker>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Thời lượng</Text>
          <TextInput
            style={styles.input}
            value={newTour.duration}
            onChangeText={(text) => handleInputChange('duration', text)}
            placeholder="Nhập thời lượng (VD: 4 ngày 3 đêm)"
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phương tiện</Text>
          <TextInput
            style={styles.input}
            value={newTour.transportation}
            onChangeText={(text) => handleInputChange('transportation', text)}
            placeholder="Nhập phương tiện"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nơi ở</Text>
          <TextInput
            style={styles.input}
            value={newTour.accommodation}
            onChangeText={(text) => handleInputChange('accommodation', text)}
            placeholder="Nhập nơi ở"
          />
        </View>
      </View>

      {tourToEdit && tourToEdit.tourSchedules && tourToEdit.tourSchedules.length > 0 ? (
        <View style={styles.formRow}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày khởi hành</Text>
            <Picker
              selectedValue={selectedSchedule}
              style={styles.picker}
              onValueChange={handleScheduleChange}
            >
              <Picker.Item label="Chọn ngày khởi hành" value="" />
              {tourToEdit.tourSchedules.map((schedule) => (
                <Picker.Item
                  key={schedule.departureDate}
                  label={`${schedule.departureDate} (${schedule.currentPeople}/${schedule.peopleLimit})`}
                  value={schedule.departureDate}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Giới hạn người</Text>
            <TextInput
              style={styles.input}
              value={newTour.peopleLimit ? `${newTour.currentPeople}/${newTour.peopleLimit}` : ''}
              editable={false}
              placeholder="Giới hạn người"
            />
          </View>
        </View>
      ) : (
        <View style={styles.formRow}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Ngày khởi hành</Text>
            <TextInput
              style={styles.input}
              value={newTour.departureDate}
              onChangeText={(text) => handleInputChange('departureDate', text)}
              placeholder="Nhập ngày (VD: 2025-05-20)"
            />
          </View>

        </View>
      )}

      <View style={styles.formRow}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Giá</Text>
          <TextInput
            style={styles.input}
            value={newTour.price}
            onChangeText={(text) => handleInputChange('price', text)}
            placeholder="Nhập giá"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Ưu đãi (%)</Text>
          <TextInput
            style={styles.input}
            value={newTour.discount}
            onChangeText={(text) => handleInputChange('discount', text)}
            placeholder="Nhập ưu đãi"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Giá mới</Text>
          <TextInput
            style={styles.input}
            value={newTour.newPrice}
            editable={false}
            placeholder="Giá mới"
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Lịch trình</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={newTour.itinerary}
          onChangeText={(text) => handleInputChange('itinerary', text)}
          placeholder="Nhập lịch trình"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mô tả</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={newTour.description}
          onChangeText={(text) => handleInputChange('description', text)}
          placeholder="Nhập mô tả"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Ảnh (tối đa 3 ảnh)</Text>
        <View style={styles.imageUpload}>
          <View style={styles.imagePreviews}>
            {imagePreviews.map((preview, index) => (
              <View key={index} style={styles.imagePreviewContainer}>
                <Image source={{ uri: preview }} style={styles.previewImage} />
                <TouchableOpacity
                  style={styles.removeImageButton}
                  onPress={() => handleRemoveImage(index)}
                >
                  <Text style={styles.removeImageText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
            {imagePreviews.length < 3 && (
              <TouchableOpacity
                style={styles.imagePlaceholder}
                onPress={handleImageChange}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Text style={styles.placeholderText}>Chọn ảnh</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          {tourToEdit ? 'Cập nhật tour' : 'Thêm tour'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddTour;