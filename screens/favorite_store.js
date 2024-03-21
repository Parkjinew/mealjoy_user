import React, { useEffect, useState } from 'react';
import {
  View, Image, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, SafeAreaView, KeyboardAvoidingView, Platform,
 FlatList
} from 'react-native';

import { FontAwesome5, Entypo, FontAwesome6, FontAwesome } from '@expo/vector-icons';
import {  Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';





const FavoriteStore = ({route}) => {
  const navigation = useNavigation();
  const { FavoriteStore } = route.params;
  console.log(FavoriteStore);
  const [restaurants, setRestaurants] = useState(FavoriteStore);


  const categoryLabels = {
    '1': '한식',
    '2': '카페/디저트',
    '3': '중국집',
    '4': '분식',
    '5': '버거',
    '6': '치킨',
    '7': '피자/양식',
    '8': '일식/돈까스',
    '9': '샌드위치',
    '10': '찜/탕',
    '11': '족발/보쌈',
    '12': '샐러드',
    '13': '아시안',
    '14': '도시락/죽',
    '15': '회/초밥',
    '16': '고기/구이',
    
  };
  const storeinfo = async(id) => {
    try{
      const response = await axios.post('http://119.200.31.63:8090/botbuddies/storeinfo', {id : id})
      console.log(response.data);
      navigation.navigate('StoreInfo', response.data);
    } catch(error){
      console.error(error);
    }
    
  }

  const renderRestaurants = () => {
    const restaurantItems = [];
    for (let i = 0; i < restaurants.length; i++) {
      const item = restaurants[i];
      const categoryLabel = categoryLabels[item.category_seq] || '기타';
      restaurantItems.push(
      <TouchableOpacity onPress={() => storeinfo(item.store_seq)}>
    <View key={item.store_seq} style={styles.restaurantItem}>
        <Image source={{uri : item.store_IMG}} style={styles.restaurantImage} />
      <View style={styles.restaurantDetailContainer}>
        <View style={styles.restaurantNameAndIcon}>
            <Text style={styles.restaurantName}>{item.store_name}</Text>
        </View>
          <Text style={styles.restaurantcategory}>{categoryLabel}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.restaurantRating}>{item.averageRating}</Text>
          </View>
          <Text style={styles.restaurantReviews}>{item.reviewCount}개의 리뷰</Text>
  
      </View>
    </View>
      </TouchableOpacity>
      );
  }
  return restaurantItems;
};

  const Stack = createStackNavigator();

  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView>
            <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backrow}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>관심매장 목록</Text>
          <View style={{ paddingHorizontal: 16 }}></View>
          
        </View>
        <View>
            <Text style={styles.total}>총 {restaurants.length}개</Text></View> 

          {renderRestaurants()}
        </ScrollView>
      </KeyboardAvoidingView>
      
          

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Main')}>
          <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchResult')}>
          <FontAwesome name="search" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
          <FontAwesome5 name="robot" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome name="heart" size={24} color="#ff3b30" onPress={() => navigation.navigate('ReviewWrite')}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('OpenNaverMap')}>
          <FontAwesome6 name="user" size={24} color="#ff3b30" />
        </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
    total:{
        fontSize:15,
        fontWeight: 'bold',
        marginLeft:22,
        marginTop:20,
        marginBottom:15
    },
    backrow:{
        paddingLeft:15
      },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        flex:1,
        paddingRight:15
      },
    backButton:{
      marginTop:7
    },
    heart:{
      paddingRight:20
    },
    restaurantDetailContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    restaurantNameAndIcon: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    heartIcon: {
      marginRight: 20, // 아이콘과 이름 사이의 간격을 조
    },
      restaurantcategory:{
         
          paddingBottom:5,
      },
      restaurantItem: {
          flexDirection: 'row',
          marginVertical: 8,
          backgroundColor: '#fff',
          borderRadius: 8,
          paddingLeft:15,
          borderBottomWidth:1,
            paddingBottom:16,
            borderColor:'#ddd'
        },
        restaurantImage: {
          width: 120,
          height: 120,
          borderRadius: 8,
          marginRight: 10,
          resizeMode:'cover'
        },
        restaurantInfo: {
          justifyContent: 'center',
        },
        restaurantName: {
          fontWeight: 'bold',
          fontSize: 20,
          marginBottom:10,
            marginTop:-15
        },
        ratingContainer: {
          flexDirection: 'row',
          alignItems: 'center',
        },
        restaurantRating: {
          marginLeft: 5,
          fontSize: 14,
        },
        restaurantReviews: {
          fontSize: 12,
          color: '#666',
        },
    
    
      searchAndIconContainer: {
        flexDirection: 'row', // 로고와 벨 아이콘을 가로로 배치
        justifyContent: 'flex-start',
      },
   
   
      dropdownContainer: {
        alignSelf: 'flex-start', // 이 컨테이너 내의 요소를 왼쪽으로 정렬
        width: '30%', // 컨테이너의 너비를 header의 전체 너비로 설정
        paddingBottom:20,
        paddingTop:5
      },
      divider: {
        height: 1, // 선의 두께
        backgroundColor: '#e0e0e0', // 선의 색상
        width: '100%', // 선의 너비를 부모 컨테이너에 맞춥니다.
        marginTop: 1, // 선 위의 여백
        marginBottom: 1, // 선 아래의 여백
      },
      logo: {
        width: 300, // 로고의 너비. 필요에 따라 조절하세요.
        height: 150, // 로고의 높이. 필요에 따라 조절하세요.
        marginBottom: -40, // 로고와 검색 입력란 사이의 마진을 조절합니다.
        marginTop : -60,

      },
      safeArea: {
        flex: 1,
        backgroundColor: '#fff', // 이 배경색은 상단 노치와 하단 제스처 영역의 배경색입니다.
      },
      keyboardAvoid: {
        flex: 1,
      },
      // ... 다른 스타일들 ...
      tabBar: {
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
        backgroundColor: '#fff', // 탭 바의 배경색을 설정합니다.
      },

      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',// 중앙 정렬을 위해 space-between 사용
        justifyContent:'space-between',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom:20,
        
      },
      title: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        marginTop : -35,
      },
      searchInput: {
        flex: 1,
        padding: 10,
        backgroundColor: 'transparent', // 배경을 투명하게 설정
        color: '#424242',
      },
      dropdown: {
        marginTop: 8,
      },
      dropdownText: {
        marginTop:10,
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
      },
      content: {
        flex: 1,
        // 컨텐츠 영역 스타일링
      },
     
      tabBar: {
        height: 60,
        flexDirection: 'row',
        borderTopColor: '#ccc',
        borderTopWidth: 1,
      },
      tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },

    
      // 탭 아이템 스타일 추가
    });

export default FavoriteStore;