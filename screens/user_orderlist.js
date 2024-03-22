import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView,SafeAreaView,
  KeyboardAvoidingView,
  Platform,TouchableWithoutFeedback,Keyboard } from 'react-native';
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




const OrderList = ({route}) => {
    const navigation = useNavigation();
    const { OrderList } = route.params;
    const [restaurants, setRestaurants] = useState(OrderList);

    const renderRestaurants = () => {
      const restaurantItems = [];
      for (let i = 0; i < restaurants.length; i++) {
        const item = restaurants[i];
        restaurantItems.push(
      <View key={item.store_name} style={styles.menuItem}>
        <Image source={{uri : item.image_filenames}} style={styles.menuImage} />
        <View style={styles.menuDetails}>
          <Text style={styles.menuTitle}>{item.store_name}</Text>
          <Text style={styles.menuSubtitle}>{item.menu_names}</Text>
          <Text style={styles.menuPrice}>총 {item.total_amount}원</Text>
          <Text style={styles.menuSubtitle2}>24/09/23</Text>
        </View>
        <TouchableOpacity >
            <Text style={styles.orderButtonText}>리뷰 남기기</Text>
          </TouchableOpacity>
      </View>
    );
    }
    return restaurantItems;
    };


    return (
        <SafeAreaView style={styles.safeArea}>

        <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backrow}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>주문목록</Text>
          <View style={{ paddingHorizontal: 16 }}></View>
        </View>
        <View>
            <Text style={styles.total}>총 {restaurants.length}개</Text></View> 
        {renderRestaurants()}
        </ScrollView>
        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Entypo name="home" size={24} color="#ff3b30" onPress={() => navigation.navigate('Main')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchResult')}>
            <Icon name="search" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
          <FontAwesome name="wechat" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="heart" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <FontAwesome6 name="user" size={24} color="#ff3b30" />
          </TouchableOpacity>
        </View>
     
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // 이 배경색은 상단 노치와 하단 제스처 영역의 배경색입니다.
  },
    backrow:{
      paddingLeft:15
    },
  container: {
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',// 중앙 정렬을 위해 space-between 사용
    justifyContent:'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    paddingBottom:20,
    
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    flex:1,
    paddingRight:15
  },
  menuItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
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
  orderButtonText: {
    color: 'black',
    fontSize: 14,
    marginTop:2,
    
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
