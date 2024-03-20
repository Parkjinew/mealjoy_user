import React, { useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { FontAwesome, AntDesign, Foundation, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

LocaleConfig.locales['ko'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'ko';

const calendarTheme = {
  todayTextColor: '#ff3b30',
  textDayFontSize: 15,
  textMonthFontSize: 20,
  textMonthFontWeight: 'bold',
  textSectionTitleColor: 'rgba(138, 138, 138, 1)',
  arrowColor: '#ff3b30',
  selectedDayBackgroundColor: '#ff3b30',
  selectedDayTextColor: '#ffffff',
};

const Stepper = ({ value, onIncrement, onDecrement }) => {
    return (
      <View style={styles.stepperContainer}>
        <TouchableOpacity onPress={onDecrement} style={styles.stepperButton}>
          <AntDesign name="minus" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{value}</Text>
        <TouchableOpacity onPress={onIncrement} style={styles.stepperButton}>
          <AntDesign name="plus" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
    );
  };

const Reservation = () => {
  const [favorite, setFavorite] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [guestCount, setGuestCount] = useState('1');
  const [reserverName, setReserverName] = useState('');

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleIncrement = () => {
    setGuestCount(prevCount => Number(prevCount) + 1);
  };
  
  const handleDecrement = () => {
    setGuestCount(prevCount => {
      const newValue = Number(prevCount) - 1;
      return newValue < 1 ? 1 : newValue;
    });
  };
  
  const handleReservation = () => {
    alert(`예약자: ${reserverName}, 인원수: ${guestCount}, 날짜: ${selectedDate}, 시간: ${selectedTimeSlot}`);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTimeSlot(null); // 선택된 시간 슬롯 초기화
    // 가정: 시간 슬롯을 생성하는 로직이 여기에 포함됨
    setTimeSlots(['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30']);
    setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100); // FlatList 대신 ScrollView의 ref를 사용할 것
};

  const selectTimeSlot = (time) => {
    setSelectedTimeSlot(time); // 선택된 시간 슬롯을 상태에 설정
  };

  // selectedDate 상태를 기반으로 markedDates 객체 생성
  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#ff3b30'
    }
  };
  const scrollViewRef = useRef();
  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef}>
        {/* 이미지, 제목, 별점 등 상단 섹션은 여기에 포함됩니다. */}
        <Image
          style={styles.image}
          source={require('../assets/cake.png')} // Replace with your image path
        />
        <View style={styles.body}>
          <View style={styles.starContainer}>
            <Text style={styles.title}>타코</Text>
            <TouchableOpacity onPress={toggleFavorite}>
              <FontAwesome 
                name={favorite ? "heart" : "heart-o"}
                size={30}
                color={favorite ? "#ff3b30" : "#ff3b30"}
                style={{ marginTop: 5, marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View> 
      </ScrollView>
      
    <SafeAreaView>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="search" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="robot" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome6 name="user" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 5,
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
  flexDirection: 'row', // 수평으로 정렬
  alignItems: 'center', // 수직 가운데 정렬
  marginBottom: 15,
  marginLeft: 70,
},
label1: {
  marginRight: 20, // 라벨과 입력 필드 사이의 간격
},
label2: {
    marginRight: 10,
},
input: {
  width: '50%',
  borderWidth: 1,
  borderColor: '#ff3b30',
  borderRadius: 5,
  padding: 10,

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
    // marginBottom: 20,
  },
  menuItem: {
    alignItems: 'center',
    // marginTop: 10,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperButton: {
    borderWidth: 1,
    borderColor: '#ff3b30',
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 6
  },
  stepperValue: {
    marginHorizontal: 20, 
    fontSize: 18, 
  },
});
export default Reservation;