import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "./screens/Main";
import search_result from "./screens/search_result";
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
import StoreDetail from './screens/location';
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
import WaitingRegi from './screens/waiting_regi';
import WatingSetup from './screens/wating_setup';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchResult" component={search_result} options={{ headerShown: false }}/>
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
        <Stack.Screen name="StoreDetail" component={StoreDetail} options={{ headerShown: false }}/>
        <Stack.Screen name="Store" component={Store} options={{ headerShown: false }}/>
        <Stack.Screen name="HomeLogin" component={HomeLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }}/>
        <Stack.Screen name="Recomplete" component={Recomplete} options={{ headerShown: false }}/>
        <Stack.Screen name="ReservaList" component={ReservaList} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        <Stack.Screen name="TableingResult" component={TableingResult} options={{ headerShown: false }}/>
        <Stack.Screen name="UserOrder " component={UserOrder } options={{ headerShown: false }}/>
        <Stack.Screen name="Reservation" component={Reservation} options={{ headerShown: false }}/>
        <Stack.Screen name="StoreInfo" component={StoreInfo} options={{ headerShown: false }}/>
        <Stack.Screen name="WaitingRegi" component={WaitingRegi} options={{ headerShown: false }}/>
        <Stack.Screen name="WatingSetup" component={WatingSetup} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
  // 안녕~
}


