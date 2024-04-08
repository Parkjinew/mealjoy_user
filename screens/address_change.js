import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Platform } from 'react-native';
import Postcode from '@actbase/react-daum-postcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const AddressChange = () => {
  const navigation = useNavigation();
  const handleSelectAddress = async (data) => {
    await AsyncStorage.setItem('selectedAddress', data.address);
    // 다른 화면으로 이동 또는 상태 업데이트하기 전에 필요한 작업 수행
    navigation.goBack(); 
  };

  useEffect(() => {
    // Postcode 컴포넌트의 onSelected prop으로 전달되는 함수는 여기에서 설정하지 않고,
    // Postcode 컴포넌트 내부에서 직접 handleSelectAddress 함수를 호출합니다.
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Postcode 
          style={{ flex: 1, width: '100%' }} 
          jsOptions={{ animated: true }} 
          onSelected={handleSelectAddress} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 10,
  },
  safeArea: {
    flex: 1,
  },
});

export default AddressChange;
