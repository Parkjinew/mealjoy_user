import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';


const Recomplete = ({route}) => {
  const data = {route}.route.params;
  const user_id = data.user_id;
  const store_seq = data.store_seq;
  const store_name = data.store_name;
  const reserve_name = data.reserve_name;
  const reserve_date = data.reserve_date;
  const reserve_time = data.reserve_time;
  const reserve_num = data.reserve_num;
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const showCancelConfirmation = () => {
    Alert.alert(
      '예약 취소',
      '정말 예약을 취소하시겠습니까? \n\n참고) 예약 취소시 복귀 불가 ',

      [
        {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: '예', onPress: () => cancelReserve() },
      ],
      { cancelable: false },
    );
  };

  

  const cancelReserve = async() => {
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(-2)}`;
    if(formattedToday == reserve_date){
      Alert.alert(
        '예약 취소 불가',
        '당일 예약 취소가 불가합니다.',
  
        [
          {
            text: '확인',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
        ],
        { cancelable: false },
      );
    } else{
      try{
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/cancelReserve', 
        { 
          user_id:user_id,
          store_seq:store_seq,
          reserve_name:reserve_name,
          reserve_date:reserve_date,
          reserve_time:reserve_time,
          reserve_num:reserve_num});

        navigation.navigate('Main');

      } catch(error){
        console.error(error)
      }
    }
    };
  

    useEffect(() => {
      async function loadFonts() {
        await Font.loadAsync({
          'KBO-Dia-Gothic_bold': require('../assets/fonts/KBO Dia Gothic_bold.ttf'),
          'KBO-Dia-Gothic_medium': require('../assets/fonts/KBO Dia Gothic_medium.ttf'),
          'KBO-Dia-Gothic_light': require('../assets/fonts/KBO Dia Gothic_light.ttf')
        });
  
        setFontsLoaded(true);
      
      }
  
      loadFonts();
    }, []);
  
    if (!fontsLoaded) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      
      <View style={styles.header}>
      <TouchableOpacity  onPress={()=>navigation.navigate("Main")}>
      <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
        <Text style={[styles.headerText,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>예약 완료</Text>
        <AntDesign name="arrowleft" size={24} color="white" />
        </View>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>매장명</Text>
          <Text style={styles.info}>{store_name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>예약자명</Text>
          <Text style={styles.info}>{reserve_name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>인원</Text>
          <Text style={styles.info}>{reserve_num}명</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>예약일시</Text>
          <Text style={styles.info}>{reserve_date} {reserve_time}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>안내사항</Text>
        <Text style={styles.sectionContent}>
          - 예약 정보 변경 및 예약 취소
          {'\n'}- 예약 정보 변경 또는 예약 취소를 원하는 경우 매장에 미리 알려주세요  
          {'\n'}- 당일 취소는 불가합니다
          {'\n'}- 매장 상황에 따라 예약이 거절될 수 있습니다
        </Text>
      
        <TouchableOpacity style={styles.cancelButton} onPress={showCancelConfirmation}>
        <Text style={[styles.cancelButtonText,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>예약 취소하기</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
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
    justifyContent:"space-between",
    padding: 20,
    backgroundColor: '#ffff',
    marginBottom: 20, // Add some bottom margin to space out the header
    paddingTop:10,
    borderBottomWidth:1,
    borderColor:"#eeeeee"
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
    fontSize:17
  },
});

export default Recomplete;