import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Recomplete = () => {
  const showCancelConfirmation = () => {
    Alert.alert(
      '예약 취소',
      '정말 예약을 취소하시겠습니까? \n 결제 금액이 있다면 취소 시점에 따라 100% 환급이 안될 수 있습니다. \n매장의 환급정책을 확인 후 취소 해주세요\n\n참고) 예약 취소시 복귀 불가 ',

      [
        {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: '예', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerText}>예약 완료</Text>
      </View>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>매장명</Text>
          <Text style={styles.info}>비진도 해물뚝배기</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>인원</Text>
          <Text style={styles.info}>2명</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>예약일시</Text>
          <Text style={styles.info}>03월 21일 (목) 12:15</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>요청사항</Text>
        <Text style={styles.sectionContent}>좋은 자리로 부탁드립니다.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>안내사항</Text>
        <Text style={styles.sectionContent}>
            - 환급
          {'\n'}- 예약 보증금은 이용예정일 전 일까지 취소시 환급받을 수 있습니다.
          {'\n'}- 매장마다 메뉴 결제 금액 100% 환급 기준시간이 상이하므로 꼭 확인해주세요
          {'\n'}- 예약 정보 변경 및 당일 취소
          {'\n'}- 예약 정보 변경 또는 이용 예정일 당일에 취소를 원하는 경우 매장에 미리 알려주세요  
        </Text>
      
        <TouchableOpacity style={styles.cancelButton} onPress={showCancelConfirmation}>
        <Text style={styles.cancelButtonText}>예약 취소하기</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 20, // Add some bottom margin to space out the header
    paddingTop:60
  },



  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoBox: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
  },
  info: {
    color: '#333',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionContent: {
    color: '#666',
    lineHeight: 20,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Recomplete;