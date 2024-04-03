import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';

const HorizontalDivider = () => {
  return <View style={styles.horizontalDivider} />;
};

// Header 컴포넌트
const Header = ({ navigation }) => {
  // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
  return (

      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>나의 원격 줄서기 내역 </Text>

          <View style={{width:24}}/>
      </View>

  );
};



const TableingResult = ({route}) => {
  console.log({route}.route.params);
  const store = {route}.route.params.store;
  const wait = {route}.route.params.waitInfo;
  const navigation = useNavigation();

  const storeinfo = async(id) => {
    try{
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/storeinfo', {id : id})
      console.log(response.data);
      navigation.navigate('StoreInfo', response.data);
    } catch(error){
      console.error(error);
    }
    
  }

  const waitDel = async() => {
    if(wait.count < 5){
      Alert.alert(
        "대기 취소 불가", // 알림 제목
        "남은 대기팀이 3팀 이하이기 때문에 취소가 불가합니다.", // 알림 메시지
        [
          {
            text: "확인", // 아니요 버튼
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    } else{

      Alert.alert(
        "대기 취소", // 알림 제목
        "정말 취소하시겠습니까?", // 알림 메시지
        [
          {
            text: "아니요", // 아니요 버튼
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "확인", onPress: () => waitDelet() } // 확인 버튼을 누르면 테이블링 페이지로 이동
        ],
        { cancelable: false }
      );


    }

  }

  const waitDelet  = async() => {
    try{
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/waitDelet', {tabling_seq : wait.tabling_seq})
      
      const waitPage = await axios.post('http://18.188.101.208:8090/botbuddies/waitInfo', {user_id : wait.user_id})
      const storeData = await axios.post('http://18.188.101.208:8090/botbuddies/getStoreName', {store_seq : waitPage.data.store_seq})
      navigation.push('TableingResult', {waitInfo : waitPage.data, store : storeData.data.store_name})
    
    } catch(error){
      console.error(error);
    }
  }

  const [fontsLoaded, setFontsLoaded] = useState(false);

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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
        {/* Your scrollable content */}
      <Header
        navigation={navigation}
      />
      <HorizontalDivider />

      {store ? ( 
        <View style={styles.detailBox}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>{store}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={[styles.buttonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>이용예정</Text>
          </TouchableOpacity>  
        </View> 
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>예약 일시</Text>
          <Text style={[styles.detailValue, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>{wait.create_at}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>대기번호</Text>
          <Text style={[styles.detailValue, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>{wait.wait_num}번</Text>
        </View>
         <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>인원</Text>
          <Text style={[styles.detailValue, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>{wait.people_num}명</Text>
        </View> 
        <View style={styles.wait}>
          <Text style={[styles.detailwait, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 30 }]}>남은 대기팀 : {wait.count-1}팀</Text>                                                                                                                                                      
        </View> 
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => storeinfo(wait.store_seq)}>
            <Text style={[styles.actionButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>매장상세보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => waitDel()}>
            <Text style={[styles.actionButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>대기등록취소</Text>
          </TouchableOpacity>
        </View>
      </View>

      ) : (
        
        <View style={styles.noWaitContainer}>
            <Text style={[styles.noWaitText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>등록 중인 대기가 없습니다.</Text>
        </View>

      )}
       
      
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noWaitContainer: {
    alignItems: 'center',
  },
  noWaitText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white' // 이 색상은 상태 표시줄 배경색과 일치해야 합니다.
  },
  
  scrollView: {
    flex: 1,
  },
  // ... other styles you already have
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 40, // 추가적인 하단 여백을 제공합니다
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerText2: {
    marginLeft:-20
  },
  detailBox: {
    alignSelf: 'center',
    width: '90%',
    borderRadius: 20,
    padding: 30,
    marginTop: 70,
    marginBottom: 60,
    backgroundColor: 'white', // 그림자가 보이려면 배경색이 있어야 합니다.
    
    // iOS용 그림자 스타일
    shadowColor: '#000', // 그림자 색
    shadowOffset: { width: 0, height: 2 }, // 그림자 방향 (이 경우 아래로)
    shadowOpacity: 0.25, // 그림자 투명도
    shadowRadius: 3.84, // 그림자 블러 반경
    
    // Android용 그림자 스타일
    elevation: 5, // Android에서는 elevation으로 그림자를 조절
  },

  wait: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailLabel: {
    
    color: 'grey',
  },
  detailwait:{
    fontSize:30,
    fontWeight:'bold',
  },
  detailValue: {
    color: 'black',
  },
  actionRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,  // This sets the width of the border
    borderColor: '#ff3b30',  // This sets the color of the border
  },
  actionButtonText: {
    color: 'black',
  },
  headerContainer: { //여기조절(원격줄서기 내역)
    flexDirection: "row",
    justifyContent:'space-between',
    padding: 10,
    marginBottom: 5,
    marginTop: Platform?.OS === 'android'? 40 : 0,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'left', // 텍스트 왼쪽 정렬
  },

  horizontalDivider: {
    height: 1,
    backgroundColor: '#E9E9E9',
    marginTop: 0,
    marginBottom: 100,
  },
  
});

export default TableingResult;
