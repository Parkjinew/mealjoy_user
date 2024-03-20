import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddressChange = ({ navigation }) => {
  const getAddressData = async (data) => { 
    await AsyncStorage.setItem('selectedAddress', data.address);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Postcode style={{ flex: 1, width: '100%' }} jsOptions={{ animated: true }} onSelected={getAddressData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  safeArea: {
    flex: 1,
  },
});

export default AddressChange;
