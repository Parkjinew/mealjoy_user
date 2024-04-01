import React, { useEffect, useState } from 'react';
import {
  View, Image, Text, StyleSheet,  TouchableOpacity,
  ScrollView, SafeAreaView, KeyboardAvoidingView, Platform,ActivityIndicator
} from 'react-native';

import { Entypo, FontAwesome6, FontAwesome } from '@expo/vector-icons';
import {  Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';




const FavoriteStore = ({route}) => {
  const navigation = useNavigation();
  const { FavoriteStore } = route.params;
  const [restaurants, setRestaurants] = useState(FavoriteStore);
  const [userInfo, setUserInfo] = useState(null);

  const [fontsLoaded, setFontsLoaded] = useState(false);
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

  const handleHeartIconPress = async () => {
    console.log(userInfo)
    if (userInfo) { // userInfo 상태를 통해 로그인 상태 확인
      try {
        const response = await axios.post('http://119.200.31.63:8090/botbuddies/favorite', { id: userInfo[0].user_id });
        navigation.navigate('FavoriteStore', { FavoriteStore: response.data });
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    } else {
      navigation.navigate('HomeLogin');
    }
  };
  const handleUserIconPress = () => {
    if (userInfo) {
      // 사용자가 로그인 상태면, 개인정보수정 페이지로 네비게이션
      navigation.navigate('SettingsScreen');
    } else {
      // 사용자가 로그인 상태가 아니면, 로그인 페이지로 네비게이션
      navigation.navigate('HomeLogin');
    }
  };

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


    if (!restaurants || restaurants.length === 0) {
      // 관심 매장이 없을 경우 표시할 내용
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>관심 매장이 없습니다.</Text>
        </View>
      );
    }

    const restaurantItems = [];
    for (let i = 0; i < restaurants.length; i++) {
      const item = restaurants[i];
      const categoryLabel = categoryLabels[item.category_seq] || '기타';
      restaurantItems.push(
      <TouchableOpacity key={item.store_seq} onPress={() => storeinfo(item.store_seq)}>
    <View  style={styles.restaurantItem}>
        <Image source={{uri : item.store_IMG}} style={styles.restaurantImage} />
      <View style={styles.restaurantDetailContainer}>
        <View style={styles.restaurantNameAndIcon}>
            <Text style={[styles.restaurantName,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>{item.store_name}</Text>
        </View>
          <Text style={[styles.restaurantcategory,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}>{categoryLabel}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={[styles.restaurantRating,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 12 }]}>{item.averageRating}</Text>
          </View>
          <Text style={[styles.restaurantReviews,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 12 }]}>{item.reviewCount}개의 리뷰</Text>
  
      </View>
    </View>
      </TouchableOpacity>
      );
  }
  return restaurantItems;
};

  const Stack = createStackNavigator();

  const waitPage = async() => {
    try{
      const response = await axios.post('http://119.200.31.63:8090/botbuddies/waitInfo', {user_id : userInfo[0].user_id})
      const storeData = await axios.post('http://119.200.31.63:8090/botbuddies/getStoreName', {store_seq : response.data.store_seq})
      navigation.navigate('TableingResult', {waitInfo : response.data, store : storeData.data.store_name})
    } catch(error){
      console.error(error);
    }
  }

  
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
      <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ScrollView>
            <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backrow}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>관심매장 목록</Text>
          <View style={{ paddingHorizontal: 16 }}></View>
          
        </View>
        <View>
            <Text style={[styles.total,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 15 }]}>총 {restaurants.length}개</Text></View> 

          {renderRestaurants()}
        </ScrollView>
      </KeyboardAvoidingView>
      
          

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Main')}>
          <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => waitPage()}>
        <FontAwesome6 name="users-line" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
        <Ionicons name="chatbubbles" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome name="heart" size={24} color="#ff3b30" onPress={handleHeartIconPress}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={handleUserIconPress}>
          <FontAwesome6 name="user" size={24} color="#ff3b30" />
        </TouchableOpacity>
        </View>

    </SafeAreaView>
  );
  
};
const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center', // 가운데 정렬
    marginTop: 20, // 상단 여백
  },
  emptyText: {
    fontSize: 16, // 텍스트 크기
    color: '#666', // 텍스트 색상
  },
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
          paddingVertical:3
        },
        restaurantRating: {
          marginLeft: 5,
          fontSize: 14,
        },
        restaurantReviews: {
          fontSize: 12,
          color: '#666',
          marginTop:3
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
        marginTop:Platform?.OS === "android"? 40 :0,
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