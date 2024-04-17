import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, LogBox, Alert, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "./screens/Main";
import SearchResult from "./screens/search_result";
import AddressChange from './screens/address_change';
import Chatbot from './screens/chatbot';
import OrderList from './screens/user_orderlist';
import ReviewWrite from './screens/review_write';
import FavoriteStore from './screens/favorite_store';
import Setting from './screens/setting';
import Nick from './screens/nick_setting';
import Number from './screens/number_setting';
import Password from './screens/pw_setting';
import ChangePassword from './screens/change_pw';
import Store from './screens/store';
import HomeLogin from './screens/homelogin';
import KakaoLogin from './screens/kakaoLogin';
import Recomplete from './screens/recomplete';
import ReservaList from './screens/reserva_list';
import SignUp from './screens/SignUp';
import TableingResult from './screens/tableing_result';
import UserOrder  from './screens/user_order';
import Reservation from './screens/user_reservation';
import StoreInfo from './screens/user_storeinfo';
import WatingSetup from './screens/wating_setup';
import ReviewList from './screens/user_review';
import SettingsScreen from './screens/user_mypage';
import Payment from './screens/payment';
import ReviewModify from './screens/review_modify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserInquiry from './screens/user_inquiry';
import InquiryCheck from './screens/inquiry_check';
import NoticeList from './screens/noticeList';
import * as Notifications from 'expo-notifications';


// import { NotificationProvider, useNotification } from './screens/NotificationContext';
import axios from 'axios';
const Stack = createStackNavigator();



LogBox.ignoreAllLogs(true);
export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null); // 초기값을 null로 설정
  const [prevData, setPrevData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // AsyncStorage에서 불러온 userInfo 설정
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();

    
  }, []);


  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('알림 권한이 거부되었습니다!');
      }
    })();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('userInfo'); // AsyncStorage에서 사용자 정보 제거
    AsyncStorage.clear();
    setUserInfo(null); // userInfo 상태를 null로 업데이트
  };

  

  const sendNotification = async () => {
    console.log("noti호출")
    const response = await axios.post('http://18.188.101.208:8090/botbuddies/getnotification', { id: userInfo[0].user_id });

    const data = response.data;


    let bodyMessage = ''; // 알림 본문을 저장할 변수 초기화
    if (data.type === '0') {
      bodyMessage = '원격 줄서기';
    } else if (data.type === '1') {
      bodyMessage = '예약';
    } else if (data.type === '4') {
      bodyMessage = '경고';
    } else {
      // 'data.type'이 0 또는 1이 아닌 경우, 기본 메시지 설정
      // 필요한 경우 이 부분을 수정하거나 삭제하세요.
      bodyMessage = '기타 알림';
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: bodyMessage,
        body: data.message,
      },
      trigger: null, // 즉시 보내려면 'trigger'에 'null'을 설정
    });
  };




  
  
  let notilen = 0;
  useEffect(() => {
    const fetchData = async () => {
      console.log(userInfo[0].user_id, "호출")
      

      try {
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/notification', { id: userInfo[0].user_id });
        const newData = response.data;

        if (notilen !== 0 && notilen !== newData.length) {
          sendNotification();
          
        }

        notilen = newData.length;
        setPrevData(newData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    if(userInfo){
      fetchData();
    }
    
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [userInfo]);



  useEffect(() => {
    async function getInitialRouteName() {
      try {
        const chatbotEnabled = await AsyncStorage.getItem('chatbotEnabled');
        if (chatbotEnabled !== null && JSON.parse(chatbotEnabled)) {
          setInitialRouteName('ChatBot'); // 챗봇이 활성화되어 있으면 'ChatBot'으로 설정
        } else {
          setInitialRouteName('Test'); // 그렇지 않으면 'Main'으로 설정
        }
      } catch (error) {
        console.error("Error fetching initial route name:", error);
        setInitialRouteName('Main'); // 에러 발생 시 'Main'으로 설정
      }
    }

    getInitialRouteName();
  }, []);

  if (initialRouteName === null) {
    // 초기 라우트 이름이 설정되기 전에 로딩 인디케이터를 보여줍니다.
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;
  }






  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchResult" component={SearchResult} options={{ headerShown: false }}/>
        <Stack.Screen name="AddressChange" component={AddressChange} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBot" component={Chatbot} options={{headerShown: false}}/>
        <Stack.Screen name="OrderList" component={OrderList} options={{ headerShown: false }}/>
        <Stack.Screen name="ReviewWrite" component={ReviewWrite} options={{ headerShown: false }}/>
        <Stack.Screen name="FavoriteStore" component={FavoriteStore} options={{ headerShown: false }}/>
        <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false }}/>
        <Stack.Screen name="Nick" component={Nick} options={{ headerShown: false }}/>
        <Stack.Screen name="Number" component={Number} options={{ headerShown: false }}/>
        <Stack.Screen name="Password" component={Password} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
    
        <Stack.Screen name="Store" component={Store} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeLogin" component={HomeLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="Recomplete" component={Recomplete} options={{ headerShown: false }}/>
        <Stack.Screen name="ReservaList" component={ReservaList} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="TableingResult" component={TableingResult} options={{ headerShown: false }}/>
        <Stack.Screen name="UserOrder" component={UserOrder} options={{ headerShown: false }}/>
        <Stack.Screen name="Reservation" component={Reservation} options={{ headerShown: false }}/>
        <Stack.Screen name="StoreInfo" component={StoreInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="WatingSetup" component={WatingSetup} options={{ headerShown: false }}/>
        <Stack.Screen name="ReviewList" component={ReviewList} options={{ headerShown: false }}/>
        <Stack.Screen name="SettingsScreen" options={{ headerShown: false }}>
          {props => <SettingsScreen {...props} logout={logout} />}
        </Stack.Screen>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
        <Stack.Screen name="ReviewModify" component={ReviewModify} options={{ headerShown: false }}/>
        <Stack.Screen name="UserInquiry" component={UserInquiry} options={{ headerShown: false }}/>
        <Stack.Screen name="InquiryCheck" component={InquiryCheck} options={{ headerShown: false }}/>
        <Stack.Screen name="NoticeList" component={NoticeList} options={{ headerShown: false }}/>
       
        
      </Stack.Navigator>
    </NavigationContainer>
  );
  
  // 안녕~
}



