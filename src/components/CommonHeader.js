import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../stysles/theme';
import BackButton from '../components/Buttons/BackButton';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const CommonHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
      <BackButton onPress={() => navigation.goBack()} />
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.headerRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerRight: {
    width: 40,
  },
});

export default CommonHeader;