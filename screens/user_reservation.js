import React, { useState, useRef, useEffect } from 'react';
import { View,KeyboardAvoidingView,Platform, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert, ActivityIndicator  } from 'react-native';
import { FontAwesome, AntDesign, Foundation, Entypo, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import moment from 'moment';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};


LocaleConfig.defaultLocale = 'ko';

const calendarTheme = {
  todayTextColor: 'black',
  textDayFontSize: 15,
  textMonthFontSize: 20,
  textMonthFontWeight: 'bold',
  textSectionTitleColor: 'rgba(138, 138, 138, 1)',
  arrowColor: '#ff3b30',
  selectedDayBackgroundColor: '#ff3b30',
  selectedDayTextColor: '#ffffff',
};

const Reservation = ({route}) => {
    const scrollViewRef = useRef(null);
    const [favorite, setFavorite] = useState(false);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [guestCount, setGuestCount] = useState("0");
    const [reserverName, setReserverName] = useState('');
    const data = {route}.route.params;
    const user = data.user;
    const store = data.store;
    const navigation = useNavigation();
    const reserveInfo = data.reserveInfo;

    const allTimeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
    

    const reserveDateTime = reserveInfo.map(info => ({
      reserve_date:info.reserve_date,
      reserve_time:moment(info.reserve_time, "HH:mm:ss").format("HH:mm")
    }));

    console.log(reserveDateTime)

    const toggleFavorite = () => {
        setFavorite(!favorite);
    };

  const handleReservation = () => {
    console.log(selectedDate)
    console.log(selectedTimeSlot)
    
    if(selectedTimeSlot == null){
      Alert.alert(
        "예약시간 확인", // 알림 제목
        "예약시간을 선택해주세요", // 알림 메시지
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
      if(guestCount == 0){
        Alert.alert(
          "인원수 확인", // 알림 제목
          "인원수를 입력해주세요", // 알림 메시지
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
        if(reserverName == ''){
          Alert.alert(
            "예약자명 확인", // 알림 제목
            "예약자명을 입력해주세요.", // 알림 메시지
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
          console.log(`날짜: ${selectedDate}, 시간: ${selectedTimeSlot}, 인원수: ${guestCount}, 예약자: ${reserverName}`);

          const reserva_info={
            user_id:user.user_id,
            store_seq:store.store_seq,
            reserve_name:reserverName,
            reserve_date:selectedDate,
            reserve_time:selectedTimeSlot,
            reserve_num:guestCount
          }

          Alert.alert(
            "예약 확인", // 알림 제목
            `날짜: ${selectedDate}, 시간: ${selectedTimeSlot}, 인원수: ${guestCount}, 예약자: ${reserverName}`, // 알림 메시지
            [
              {
                text: "취소", // 아니요 버튼
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              {text: "예약",
              onPress: () => reserva(reserva_info)
            }
            ],
            { cancelable: false }
          );
      
        }
      }
    }
    
   
  };


  const reserva = async(reserva_info) => {
    console.log(reserva_info)
    try{
      const response = await axios.post('http://211.227.224.159:8090/botbuddies/reservation', 
      {
        user_id:user.user_id,
        store_seq:store.store_seq,
        reserve_name:reserverName,
        reserve_date:selectedDate,
        reserve_time:selectedTimeSlot,
        reserve_num:guestCount
      });
      navigation.navigate("Recomplete", 
      { 
        user_id:user.user_id,
        store_seq:store.store_seq,
        store_name:store.store_name,
        reserve_name:reserverName,
        reserve_date:selectedDate,
        reserve_time:selectedTimeSlot,
        reserve_num:guestCount});
    }catch(error){
      console.error(error)
    }
  };



    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
          }
        }, []);

const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTimeSlot(null);
    // setTimeSlots(['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']);

    // 모든 가능한 시간 슬롯
    const allTimeSlots = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];

    const availableTimeSlots = allTimeSlots.filter(timeSlot => 
      !reserveDateTime.some(reserve => 
        reserve.reserve_date === day.dateString && reserve.reserve_time === timeSlot
      )
    );

    console.log(availableTimeSlots)

    setTimeSlots(availableTimeSlots);

    // 날짜 선택 후 스크롤 이동
    setTimeout(() => scrollToBottom(), 100);
  };
      

  const selectTimeSlot = (time) => {
    setSelectedTimeSlot(time);
    // 시간 선택 후 스크롤 이동
    setTimeout(() => scrollToBottom(), 100);
  };

    // selectedDate 상태를 기반으로 markedDates 객체 생성
    const markedDates = {
        [selectedDate]: {
        selected: true,
        selectedColor: '#ff3b30'
        }
    };
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      };

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
    <View style={styles.container}>
       <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS는 "padding", Android는 "height"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // iOS에서 키보드와 입력 필드 사이의 간격을 조정
    >
      <ScrollView ref={scrollViewRef}
      >
         <TouchableOpacity style={styles.backButton} 
          onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        <Image
          style={styles.image}
          source={{uri:store.imageFilename}} // Replace with your image path
        />
        <View style={styles.body}>
          <View style={styles.starContainer}>
            <Text style={[styles.title, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 32 }]}>{store.store_name}</Text>
          </View>
        </View>
        <Calendar
          style={styles.calendar}
          theme={calendarTheme}
          onDayPress={onDayPress}
          hideExtraDays={true}
          monthFormat={'M월'}
          onMonthChange={(month) => {console.log(month)}}
          markedDates={markedDates}
          minDate={moment().add(1, 'days').format('YYYY-MM-DD')}
        />
        
        
        <View style={styles.timeSlotContainer}>
  {timeSlots.map((time, index) => (
    <TouchableOpacity
      key={index}
      style={[
        styles.timeSlotButton,
        selectedTimeSlot === time && styles.selectedTimeSlotButton,
      ]}
      onPress={() => {selectTimeSlot(time)}}
    >
      <Text style={[
        styles.timeSlotText,
        selectedTimeSlot === time && styles.selectedTimeSlotText,
        { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }
      ]}>
        {time}
      </Text>
    </TouchableOpacity>
  ))}
</View>
{/* 시간 슬롯이 선택된 경우에만 인원수와 예약자명 입력 칸 표시 */}
{selectedTimeSlot && (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
  <Text style={[styles.label, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>인원수</Text>
  <View style={styles.stepperContainer}>
  <TouchableOpacity
  onPress={() => setGuestCount(prevCount => Math.max(0, (parseInt(prevCount) || 0) - 1).toString())}
  style={styles.stepperButton}>
  <Text style={styles.stepperButtonText}>-</Text>
</TouchableOpacity>
<Text style={styles.stepperValue}>{guestCount}</Text>
<TouchableOpacity
  onPress={() => setGuestCount(prevCount => ((parseInt(prevCount) || 0) + 1).toString())}
  style={styles.stepperButton}>
  <Text style={styles.stepperButtonText}>+</Text>
</TouchableOpacity>
  </View>
</View>


<View style={styles.inputContainer}>
  <Text style={[styles.label, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>예약자 명</Text>
  <TextInput
    style={[styles.input, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}
    value={reserverName}
    onChangeText={setReserverName}
    placeholder="예약자명 입력하세요"
  />
</View>

  </View>
)}
      </ScrollView>
      </KeyboardAvoidingView>
      <SafeAreaView style={styles.safe}>
      <TouchableOpacity style={styles.orderButton} onPress={handleReservation}>
        <Text style={[styles.orderButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>예약하기</Text>
      </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute', // This positions the button absolutely within imageContainer
    top: 55, // Distance from the top of the imageContainer
    left: 20, // Distance from the left of the imageContainer
    backgroundColor: 'white', // White circular background
    borderRadius: 20, // Makes it round
    padding: 6, // Padding inside the circle to make it larger or smaller
    elevation: 3, // Adds a slight shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 1 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 1, // Shadow blur radius for iOS
    zIndex: 10,
  },
  safe:{
    paddingTop: -65
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  telContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20, // 각 아이콘과 텍스트 쌍 사이에 간격
  },
  iconText: {
    marginLeft: 8, // 아이콘과 텍스트 사이의 간격
    // 텍스트 스타일을 추가할 수 있습니다.
  },
  starRating: {
    marginLeft: 10,
    fontSize: 24,
    color: 'black',
  },
  reviewCount: {
    marginLeft: 10,
    fontSize: 16,
    color: 'grey',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  calendar: {
    paddingBottom: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: -20,
    
  },
  timeSlotButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#ff3b30',
    borderRadius: 20,
  },
  selectedTimeSlotButton: {
    backgroundColor: '#ff3b30',
  },
  timeSlotText: {
    textAlign: 'center',
    color: '#ff3b30',
  },
  selectedTimeSlotText:{
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row', // 가로 방향으로 요소를 배열
  justifyContent: 'center', // 요소 사이에 공간을 균등하게 분배
  alignItems: 'center', // 세로 축에서 요소들을 가운데 정렬
  width: '100%', // 컨테이너 너비를 전체로 설정
  marginBottom: 15, // 아래 마진 추가
  paddingHorizontal: 10, // 좌우 패딩 추가
  
  },
  label: {
    marginTop: 20,
    marginBottom: 5,
    width: '20%',
    
    
  },
  input: {
    width: '52%', // 입력 칸 너비 조정
  borderWidth: 1,
  borderColor: '#ff3b30',
  borderRadius: 5,
  padding: 10,
  marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#ff3b30', // 버튼 배경색
    borderRadius: 20, // 버튼 모서리 둥글기
    paddingVertical: 10, // 상하 패딩
    paddingHorizontal: 20, // 좌우 패딩
    justifyContent: 'center', // 내부 텍스트 센터 정렬
    alignItems: 'center', // 내부 텍스트 센터 정렬
    marginHorizontal: 20, // 좌우 마진
    marginVertical: 10, // 상하 마진
    marginTop:-5
  },
  orderButtonText: {
    color: 'white', // 텍스트 색상
    fontSize: 18, // 텍스트 크기
    fontWeight: 'bold', // 텍스트 굵기
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#dcdcdc',
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: 'center',
  },
  stepperContainer: {
    flexDirection: 'row', // 가로 방향 배열
    alignItems: 'center', // 요소들을 세로축에서 가운데 정렬
    borderWidth: 1, // 테두리
    borderColor: '#ff3b30', // 테두리 색
    borderRadius: 5, // 모서리 둥글게
    marginTop: 20,
    marginLeft: 80,
  },
  stepperButton: {
    padding: 10, // 패딩
    backgroundColor: '#ff3b30', // 배경색
    paddingVertical: 8, // 상하 패딩
    borderRadius: 2,
  },
  stepperButtonText: {
    color: 'white', // 텍스트 색상
    fontSize: 20, // 텍스트 크기
  },
  stepperValue: {
    paddingHorizontal: 20, // 좌우 패딩
    fontSize: 16, // 숫자 크기
  },
});

export default Reservation;