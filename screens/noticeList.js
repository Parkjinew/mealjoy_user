import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Button,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';





const NoticeList = ({route}) => {
    const navigation = useNavigation();
    const NotiList = {route}.route.params.notice
    console.log(NotiList)

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

    // Header 컴포넌트
const Header = ({ totalCafes, onSortPress }) => {
    // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
    return (
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() =>navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity> 
          <Text style={[styles.headerText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>나의 알림</Text>
          <Ionicons name="arrow-back" size={24} color="white" />
        </View>
      </View>
    );
  };


    return (
        <SafeAreaView style={styles.safeArea}>
          <Header />
    
          {/* 알림 목록 출력 */}
          {NotiList.length > 0 ?
          (
          <ScrollView>
            {NotiList.map((noti) => (
              <TouchableOpacity key={noti.noti_seq} style={styles.notiItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require("../assets/mealicon.png")}
                  style={styles.Image}
                />
                <Text style={[noti.type === '4' ?styles.warning:  styles.type, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 15 }]}>{noti.type === '0' ? "원격 줄서기" : (noti.type === '1' ? "예약" : "경고")}</Text>
                </View>
                <Text style={[styles.notiAt, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 10 }]}>{noti.notice_at}</Text>
                </View>
                
                <Text style={[styles.notiTest, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 15 }]} >{noti.message}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          ): (
            <View style={styles.noNoti}>
            <Text style={[styles.noNotiText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>알림이 없습니다.</Text>
            </View>
          )}
        </SafeAreaView>
      );
    
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FCFCFC", // SafeAreaView 색상을 배경색과 일치시키기
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },
 
  icon: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  notiItem: {
    padding: 20,
    borderWidth:2,
    borderColor: "white",
    borderRadius: 6,
    margin: 10,
     // iOS용 그림자 스타일
     shadowColor: "#eeeeee", // 그림자 색상
     backgroundColor: 'white', // 그림자가 보이려면 배경색이 있어야 합니다.
   
     // iOS용 그림자 스타일
     shadowColor: '#000', // 그림자 색
     shadowOffset: { width: 0, height: 2 }, // 그림자 방향 (이 경우 아래로)
     shadowOpacity: 0.25, // 그림자 투명도
     shadowRadius: 3.84, // 그림자 블러 반경
     
     // Android용 그림자 스타일
     elevation: 5, // Android에서는 elevation으로 그림자를 조절
  },
  notiTest:{
    fontSize:15,
    marginTop:10

  },
  notiAt:{
    fontSize:10,
    textAlign:"right",
    paddingBottom:10,
    

  },
  Image: {
    width: 40, // 사진의 너비
    height: 40, // 사진의 높이
    borderRadius: 20, // 원형 사진을 만들기 위해 너비와 높이의 반으로 설정

  },
  type: {
    paddingLeft:5

  },
  warning: {
    paddingLeft:5,
    color:"red"

  },
  noNoti: {
    alignItems: 'center',
  },
  noNotiText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
export default NoticeList;