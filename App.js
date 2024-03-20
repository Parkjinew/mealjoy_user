import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from "./screens/Main";
import search_result from "./screens/search_result";
import address_change from './screens/address_change';
import chatbot from './screens/chatbot';
import OrderList from './screens/user_orderlist';
import ReviewWrite from './screens/review_write';
import FavoriteStore from './screens/favorite_store';
import Setting from './screens/setting';
import Nick from './screens/nick_setting';
import Number from './screens/number_setting';
import Password from './screens/pw_setting';
import ChangePassword from './screens/change_pw';
import StoreDetail from './screens/location';
// 수빈 수정
import storeInfo from './screens/user_storeinfo';

import Store from './screens/store';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="SearchResult" component={search_result} options={{ headerShown: false }}/>
        <Stack.Screen name="AddressChange" component={address_change} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBot" component={chatbot} options={{headerShown: false}}/>
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
        {/* 수빈 수정 */}
        <Stack.Screen name="storeInfo" component={storeInfo} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


