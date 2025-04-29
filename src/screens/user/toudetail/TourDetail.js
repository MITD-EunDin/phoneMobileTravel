import React, {useState}from 'react';
import { View, Text, Image, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './DetailStyle';
const detailIcons = {
  duration: require('../../../img/duration.png'), 
  frequency: require('../../../img/frequency.png'), 
  transport: require('../../../img/transport.png'), 
  hotel:require('../../../img/hotel.png'), 
};

const TourDetails = ({ route }) => {
  const { tour } = route.params;
  const [isExpanded, setIsExpanded] = useState(false); 

  const getShortDescription = (description) => {
    const lines = description.split('\n');
    return lines.slice(0, 12).join('\n')
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={tour.image} style={styles.tourImage} />
      <View style={styles.imageTotal}>
      <Image source={tour.imageTotal.image1} style={styles.tourImageTotal} />
      <Image source={tour.imageTotal.image2} style={styles.tourImageTotal} />
      <Image source={tour.imageTotal.image3} style={styles.tourImageTotal} />
      <Image source={tour.imageTotal.image4} style={styles.tourImageTotal} />

      </View>
      <Text style={styles.tourTitle}>{tour.title}</Text>


      {/* <View style={styles.priceContainer}>
        {tour.originalPrice && (
        //  <Text style={styles.originalPrice}>
            {tour.originalPrice} <Text style={styles.currency}>vnd</Text>
          </Text>
        )}
        <Text style={styles.price}>
          {tour.price} <Text style={styles.currency}>vnd</Text>
        </Text>
      </View>*/ }


      {(tour.duration || tour.frequency || tour.transport || tour.hotel) && (
        <View style={styles.detailsContainer}>
          <View style={styles.sectionHeader}>

            
          </View>
          {tour.duration && (
            <View style={styles.detailContainer}>
              <Image
                source={detailIcons.duration}
           
                style={styles.detailIcon}
              />
              <Text style={styles.cardDetail}>{tour.duration}</Text>
            </View>
          )}
          {tour.frequency && (
            <View style={styles.detailContainer}>
              <Image
                source={detailIcons.frequency}
             
                style={styles.detailIcon}
              />
              <Text style={styles.cardDetail}>{tour.frequency}</Text>
            </View>
          )}
          {tour.transport && (
            <View style={styles.detailContainer}>
              <Image
                source={detailIcons.transport}
            
                style={styles.detailIcon}
              />
              <Text style={styles.cardDetail}>{tour.transport}</Text>
            </View>
          )}
          {tour.hotel && (
            <View style={styles.detailContainer}>
              <Image
                source={detailIcons.hotel}
              
                style={styles.detailIcon}
              />
              <Text style={styles.cardDetail}>{tour.hotel}</Text>
            </View>
          )}
        </View>)}
        {tour.detailedInfo && tour.detailedInfo.descriptionPart1 && (
        <View style={styles.detailedInfoContainer}>
          <Text style={styles.sectionTitleHeader}>Chi tiết chuyến đi</Text>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mô tả chuyến đi</Text>
          </View>
          <Text style={styles.description}>
            {isExpanded
              ? tour.detailedInfo.descriptionPart1
              : getShortDescription(tour.detailedInfo.descriptionPart1)}
          </Text>
          {isExpanded && tour.detailedInfo.descriptionPart2 && (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Lịch trình chuyến đi</Text>
              </View>
              <Text style={styles.description}>{tour.detailedInfo.descriptionPart2}</Text>
            </>
          )}
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text style={styles.toggleText}>
              {isExpanded ? 'Thu gọn' : 'Xem thêm'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};



export default TourDetails;