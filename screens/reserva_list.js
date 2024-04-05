import React, { useState, useEffect } from 'react';
import { View,Platform, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView,Alert,ActivityIndicator } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as Font from 'expo-font';


const HorizontalDivider = () => {
  return <View style={styles.horizontalDivider} />;
};

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};


// Header 컴포넌트
const Header = ({ totalCafes, onSortPress }) => {
  const navigation = useNavigation();
  // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
  return (
      <View style={styles.headerContainer} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backrow}>
        <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={[styles.headerText,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>나의 예약 내역 리스트</Text>
        <View style={{ width: 24 }}></View>
      </View>

  );
};
const now = new Date();

// 예약 일시 문자열을 Date 객체로 변환하는 함수
const parseDateTime = (dateString, timeString) => {
  const [year, month, day] = dateString.split('-').map(Number);
  const [hour, minute] = timeString.split(':').map(Number);
  return new Date(year, month - 1, day, hour, minute);
};


const ReservaList = ({route}) => {
  const navigation = useNavigation();
  const { ReservaList } = route.params;
  const [reservations, setReservations] = useState(ReservaList);
  const [fontsLoaded, setFontsLoaded] = useState(false);


  const formatTime = (timeString) => {
    const parts = timeString.split(':'); // "18:00:00"을 ":"로 분리하여 ["18", "00", "00"] 얻음
    return `${parts[0]}:${parts[1]}`; // 시와 분만 사용하여 "18:00" 반환
  };

  const cancelReservation = async (reservationId) => {
   
    try {
      const response = await axios.post('https://18.188.101.208:8090/botbuddies/reserveCancel', { id: reservationId });
      console.log(response.data);
      // StoreInfo 페이지로 이동하면서 서버로부터 받은 응답 데이터를 넘깁니다.
      const updatedReservations = reservations.filter(reservation => reservation.reserve_seq !== reservationId);
      setReservations(updatedReservations);

      // 예약 목록이 업데이트되면 화면이 자동으로 새로고침됨
      Alert.alert("예약 취소 완료", "선택하신 예약이 취소되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  // 예약 취소 확인 다이얼로그 표시
  const showCancelConfirmation = (reservationId) => {
    Alert.alert(
      '예약 취소', // Alert 제목
      '정말 예약을 취소하시겠습니까?', // 메시지
      [
        {
          text: '취소',
          onPress: () => console.log('취소 버튼 클릭'),
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => cancelReservation(reservationId), // 예약 취소 처리 함수 호출
        },
      ],
      { cancelable: false },
    );
  };
  const getButtonStyle = (statusText) => {
    switch (statusText) {
      case "예약완료":
        return styles.buttonGreen; // 예약완료일 때의 스타일
      case "이용완료":
        return styles.buttonGray; // 이용완료일 때의 스타일
      default:
        return styles.button; // 기본 스타일
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
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Header />
        <HorizontalDivider />
        {reservations.length > 0 ? (
        reservations.map((reservation, index) => {
           const reservationDateTime = parseDateTime(reservation.reserve_date, reservation.reserve_time);
           const isPast = reservationDateTime < now;
           const statusText = isPast ? "이용완료" : (reservation.state === "0" ? "예약대기" : "예약완료");
           const opacityStyle = isPast ? {opacity: 0.5} : {}; // 과거 예약일 경우 투명도 조절
           const storeinfo = async () => {
            try {
              const response = await axios.post('https://18.188.101.208:8090/botbuddies/storeinfo', { id: reservation.store_seq });
              console.log(response.data);
              // StoreInfo 페이지로 이동하면서 서버로부터 받은 응답 데이터를 넘깁니다.
              navigation.navigate('StoreInfo', response.data);
            } catch (error) {
              console.error(error);
            }
          };
           return (
          <Card key={index} style={{...styles.card, ...opacityStyle}}>
            <View style={styles.detailBox}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailTitle,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>{reservation.store_name}</Text>
                <View style={getButtonStyle(statusText)}>
                  <Text style={styles.buttonText}>{statusText}</Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>예약 일시</Text>
                <Text style={styles.detailValue}>{reservation.reserve_date} {formatTime(reservation.reserve_time)}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>인원</Text>
                <Text style={styles.detailValue}>{reservation.reserve_num}명</Text>
              </View>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.actionButton} onPress={storeinfo}>
                  <Text style={[styles.actionButtonText,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}>매장상세보기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}
              onPress={() => showCancelConfirmation(reservation.reserve_seq)}>
                  <Text style={[styles.actionButtonText,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}>예약취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        );
           })):(<View style={styles.noReservationsContainer}>
            <Text style={styles.noReservationsText}>예약 내역이 없습니다.</Text>
          </View>)}

      </ScrollView>
    </View>
  </SafeAreaView>
  
  );

  
};

const styles = StyleSheet.create({
  buttonGreen: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'green', // 예약완료일 때의 배경색
    // 나머지 버튼 스타일...
  },
  buttonGray: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'gray', // 이용완료일 때의 배경색
    // 나머지 버튼 스타일...
  },
  backrow:{
    zIndex:1,
  },
  noReservationsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // 메시지가 너무 화면 가장자리에 붙지 않도록 패딩 추가
    paddingTop:60
  },
  noReservationsText: {
    fontSize: 18,
    color: 'grey',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white' // 이 색상은 상태 표시줄 배경색과 일치해야 합니다.
  },
  card: {
    // React Native에서는 px 단위 대신 숫자를 사용합니다.
    marginTop: 20,
    marginHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'white', // 빨간색 테두리를 회색으로 변경합니다.
    backgroundColor: 'white', // 카드 배경색을 흰색으로 설정합니다.
    padding: 10, // 내부 패딩을 추가하여 내용과 테두리 사이에 공간을 만듭니다.
    marginBottom: 10, // 다음 카드와의 간격
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    // Android 그림자 스타일
    elevation: 4,
    
    // width, height는 대부분 상황에 따라 조정이 필요합니다.
    // 예를 들어, flex를 사용하거나 padding과 margin으로 크기를 조정할 수 있습니다.
     // 예시 padding 값, 필요에 따라 조절하세요.
     // 다음 카드와의 간격
  },
  // 나의 예약리스트 헤더 아래에 밑줄을 추가합니다.
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between', // 중앙에 정렬하기 위해 이 속성을 'center'로 설정합니다.
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1, // 밑줄 추가
    borderColor:'#ffff',
    paddingBottom:20,
    paddingTop:20,
    marginTop:Platform.OS === "android"? 40 :0
  },
  scrollView: {
    flex: 1,
  },

  detailBox: {
    padding: 16,
    borderRadius: 5, // 둥근 모서리 추가
    borderWidth: 1, // 테두리 추가
    borderColor: '#white', // 테두리 색상
    marginBottom: 10, // 박스 간 간격 추가
    backgroundColor: 'white', // 박스 배경색 설정
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
    paddingBottom: 10, // 추가적인 하단 여백을 제공합니다
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#white',
  },


   // 예약 상세 정보를 감싸는 박스에 검은색 테두리를 추가합니다.(2개감싸져잇어서 이걸 fff로 해두니사라짐 ㅠ)
   detailBox: {
    borderRadius: 5, // 둥근 모서리를 유지합니다.
    borderWidth: 1, // 테두리 추가
    borderColor: '#fff', // 테두리 색상을 검은색으로 설정합니다.
    padding: 4,
    marginBottom: 5, // 다음 상자와의 간격
    backgroundColor: '#fff', // 박스 배경색을 흰색으로 설정합니다.
  },
  wait: {
 
    flex: 1, // Add this to make sure the container takes full available space
    justifyContent: 'center', // This will vertically center the content
    alignItems: 'center', // This will horizontally center the content
    paddingVertical: 16, // Optional: Add some vertical padding
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
    justifyContent: 'center', // 중앙으로 정렬
  },
  actionButton: {
    marginLeft: 10, // '매장상세보기' 버튼과 왼쪽 끝 사이의 간격을 조절합니다.
    marginRight: 10, // '예약취소' 버튼과의 간격을 추가합니다.
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'red',
 
  
  },
  actionButtonText: {
    color: 'black',
  },


 // ...기존의 스타일들...


 headerText: {
  fontWeight: "bold",
  fontSize: 18,
  textAlign: 'center', // 텍스트를 중앙으로 정렬합니다.
  flex: 1, // 텍스트가 컨테이너에서 가능한 모든 공간을 차지하도록 합니다.
},
// ...기존의 스타일들...

horizontalDivider: {
  height: 1, // 구분선의 높이를 1로 설정하여 선처럼 보이게 합니다.
  backgroundColor: '#E9E9E9', // 구분선의 색상을 설정합니다.
  marginHorizontal: 12, // 좌우 마진을 12로 설정합니다.
  borderRadius: 2, // 구분선의 모서리를 약간 둥글게 합니다.
},
});




export default ReservaList;