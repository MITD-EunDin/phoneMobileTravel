import React from 'react';
import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import styles from './AddStyle.js';
import {SaveAll,ImageUp  } from "lucide-react-native"

const AddTour = () => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Mã tour</Text>
          <TextInput placeholder="Mã tour..."/>
        </View>
        <View>
          <Text>Tên tour</Text>
          <TextInput placeholder="Tên tour..."/>
        </View>
        <View>
          <Text>Loại tour</Text>
          <TextInput placeholder="Tìm kiếm..."/>
        </View>
        <View>
          <Text>Khu vực</Text>
          <TextInput placeholder="Khu vực..."/>
        </View>
        <View>
          <Text>Phương tiện</Text>
          <TextInput placeholder="Phương tiện..."/>
        </View>
        <View></View>
        <View>
          <Text>Ảnh</Text>
          <ImageUp />
        </View>
      </View>
      <View>
        <TouchableOpacity>
            <SaveAll />
            <Text>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddTour;