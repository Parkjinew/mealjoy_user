import React, { useState, useEffect,useCallback  } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,SafeAreaView,
  KeyboardAvoidingView,
  Platform,TouchableWithoutFeedback,Keyboard, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import * as Font from 'expo-font';



const OrderList = ({route}) => {
    const navigation = useNavigation();
    const { OrderList } = route.params;
    const [restaurants, setRestaurants] = useState(OrderList);



    const storeinfo = async(id) => {
      try{
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/storeinfo', {id : id})
        console.log(response.data);
        navigation.navigate('StoreInfo', response.data);
      } catch(error){
        console.error(error);
      }
      
    }
 

    const renderRestaurants = () => {
      const restaurantItems = [];

      if (restaurants.length === 0) {
        return (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>주문 내역이 없습니다.</Text>
          </View>
        );
      }
      for (let i = 0; i < restaurants.length; i++) {
        const item = restaurants[i];
        restaurantItems.push(
         <View key={item.order_num}> 
         <TouchableOpacity onPress={() => storeinfo(item.store_seq)}>
      <View  style={styles.menuItem}>
        <Image source={{uri : item.image_filenames}} style={styles.menuImage} />
        <View style={styles.menuDetails}>  
          <Text style={[styles.menuTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>{item.store_name}</Text>
          <Text style={[styles.menuSubtitle, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 14 }]}>{item.menu_names}</Text>
          <Text style={[styles.menuPrice, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 15 }]}>총 {item.total_amount.toLocaleString()}원</Text>
          <Text style={[styles.menuSubtitle2, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 14 }]}>주문일 : {item.order_at}</Text>
        </View>
      </View>
      </TouchableOpacity>
       {item.review_seq === null ? (
      <View style={styles.review}>
     
        <TouchableOpacity style={styles.review2} onPress={() => {
    navigation.navigate('ReviewWrite', {orderNum: item.order_num, storeName: item.store_name});
  }}>   
            <Text style={[styles.orderButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>리뷰 남기기</Text>
          </TouchableOpacity>
        
      </View>):(
            <View style={styles.review}>  
            <View style={styles.review3}>
                <Text style={[styles.orderButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>리뷰 작성 완료</Text>
              </View>
            
          </View>
             )}


      </View>
            
    );
    }
    return restaurantItems;
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
        <SafeAreaView style={styles.safeArea}>

        <ScrollView>
        {/* Header */}
       
          <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backrow}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>  
          <Text style={[styles.headerTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>주문목록</Text>
          <View style={styles.rightComponent}></View>
        </View>
        <View>  
            <Text style={[styles.total, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 15 }]}>총 {restaurants.length}개</Text></View> 
        {renderRestaurants()}
        </ScrollView>
        {/* Tab Bar */}
    
     
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45, // 또는 적절한 값으로 조정
    
  },
  emptyText: {
    fontSize: 17,
    color: '#666',
  },
  total:{
    fontSize:15,
    fontWeight: 'bold',
    marginLeft:22,
    marginTop:20,
   
},
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // 이 배경색은 상단 노치와 하단 제스처 영역의 배경색입니다.
  },
    backrow:{
      paddingLeft:15,
      position: 'absolute',
      left: 0, // 왼쪽 정렬,
      zIndex:1
    },
  container: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom:50,
    marginTop:Platform.OS === 'android' ? 10 : 0,
    
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    flex:1,
  },
  review:{
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom:10
  },
 
  menuItem: {
    flexDirection: 'row',
    padding: 16,

    paddingTop : 20
  },
  menuImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  menuDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  menuTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  menuSubtitle: {
    marginTop:5,
    color: '#666666',
    fontSize: 14,
  },
  menuSubtitle2: {
    marginTop:0,
    color: '#666666',
    fontSize: 14,
  },
  menuPrice: {
    fontSize: 16,
    color: '#ff3b30',
    marginVertical: 4,
  },
  orderButton: {
    backgroundColor:'#ff3b30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius:5,
    justifyContent:'center',
    height:40,
    marginTop:15
  },
  review3:{
    backgroundColor: 'gray', // 버튼 배경색
    borderRadius: 20,
    paddingVertical: 10, // 상하 패딩
    justifyContent: 'center', // 내부 텍스트 센터 정렬
    alignItems: 'center', // 내부 텍스트 센터 정렬
    marginHorizontal: 100, // 좌우 마진
    marginVertical: 10, // 상하 마진
  },
  review2:{
    backgroundColor: '#ff3b30', // 버튼 배경색
    borderRadius: 20,
    paddingVertical: 10, // 상하 패딩
    justifyContent: 'center', // 내부 텍스트 센터 정렬
    alignItems: 'center', // 내부 텍스트 센터 정렬
    marginHorizontal: 100, // 좌우 마진
    marginVertical: 10, // 상하 마진
  },
  orderButtonText: {
    color: 'white',
    fontSize: 17,
    marginTop:2,
    alignSelf:"center",
   
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop:3,
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  // ... 다른 스타일들
});

export default OrderList;
