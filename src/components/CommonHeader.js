import React from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { COLORS } from '../stysles/theme';
import BackButton from '../components/Buttons/BackButton';
import { useNavigation } from '@react-navigation/native';

const CommonHeader = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
      <View style={styles.header}>
        {showBackButton ? (
          <BackButton onPress={() => navigation.goBack()} />
        ) : (
          <View style={{ width: 40 }} /> // giữ layout cân đối
        )}
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.headerRight} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40, // đảm bảo icon không đè status bar
    height: Platform.OS === 'android' ? 50 + (StatusBar.currentHeight || 0) : 110,
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 10,
  },
  headerRight: {
    width: 40,
  },
});

export default CommonHeader;
