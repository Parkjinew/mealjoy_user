import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
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
const Stack = createStackNavigator();


export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null); // 초기값을 null로 설정

  useEffect(() => {
    async function getInitialRouteName() {
      try {
        const chatbotEnabled = await AsyncStorage.getItem('chatbotEnabled');
        if (chatbotEnabled !== null && JSON.parse(chatbotEnabled)) {
          setInitialRouteName('ChatBot'); // 챗봇이 활성화되어 있으면 'ChatBot'으로 설정
        } else {
          setInitialRouteName('Main'); // 그렇지 않으면 'Main'으로 설정
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
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }}/>
        <Stack.Screen name="ReviewModify" component={ReviewModify} options={{ headerShown: false }}/>
        <Stack.Screen name="UserInquiry" component={UserInquiry} options={{ headerShown: false }}/>
        <Stack.Screen name="InquiryCheck" component={InquiryCheck} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
  
  // 안녕~
}



