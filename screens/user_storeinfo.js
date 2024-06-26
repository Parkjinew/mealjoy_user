import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, Linking, Alert, ActivityIndicator   } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Foundation } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Dialog from 'react-native-dialog';
import * as Font from 'expo-font';



const StoreInfo = ({route}) => {
  const navigation = useNavigation();
  const data = {route}.route.params;
  const store = data.store;
  const menu = data.menu;
  console.log(store);

  const [favorite, setFavorite] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userInfo, setUserInfo] = useState(null);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [peopleNum, setPeopleNum] = useState('');



  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setIsLoggedIn(true);
        setUserInfo(parsedUserInfo);
        
        try{
          // userInfo 상태 대신 바로 parsedUserInfo를 사용합니다.
          // parsedUserInfo가 배열인지 객체인지에 따라 접근 방식을 조정해야 할 수 있습니다.
          const response = await axios.post("http://18.188.101.208:8090/botbuddies/LikeTF", {
            user_id : parsedUserInfo[0].user_id, // 여기를 적절히 조정하세요.
            store_seq: store.store_seq // store는 상위 컴포넌트나 상태에서 정의되어야 합니다.
          });
          setFavorite(response.data)
        } catch(error) {
          console.error(error)
        }
  
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };
  
    fetchUserInfo();
  }, []);  
  

  const toggleFavorite = async() => {
    if(isLoggedIn){
      setFavorite(!favorite);
      try{
        console.log("like")
        const response = await axios.post("http://18.188.101.208:8090/botbuddies/Like", {
            user_id : userInfo[0].user_id, 
            store_seq: store.store_seq,
            like: favorite
          });

      } catch(error){
        console.error(error)
      }
    } else{
      navigation.navigate('HomeLogin');
    }
    
  };

  const getImageSource = (imageUri) => {
    return imageUri ? { uri: imageUri } : require('../assets/logo.png');
  };

  const order = async(store_seq) => {
    if(isLoggedIn){
      try{
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/storeinfo', {id : store_seq})
        const tableList = await axios.post('http://18.188.101.208:8090/botbuddies/getTable', {store_seq : store_seq})
        
        navigation.navigate('UserOrder', {user_id:userInfo[0].user_id, store:response.data, tableList:tableList.data})
        
      } catch(error){
        console.error(error);
      }
  } else {
    // 로그인 상태가 아닐 때 로그인 화면으로 이동
    navigation.navigate('HomeLogin');
  }
    
  }

  

  const waitPage = async() => {
    try{
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/waitInfo', {user_id : userInfo[0].user_id})
      navigation.navigate('TableingResult', {waitInfo : response.data, store : store.store_name})
    } catch(error){
      console.error(error);
    }
  }

  const waiting = async(store_seq) => {
    if(isLoggedIn){
      try{
        console.log("waiting");
        
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/waitState', {user_id : userInfo[0].user_id})
        
        console.log(response.data);

        if(response.data == 0){
          const response = await axios.post('http://18.188.101.208:8090/botbuddies/getCount', {store_seq : store.store_seq})
          navigation.navigate('WatingSetup', {user: userInfo[0], store: store, count:response.data}); 

        } else{

          Alert.alert(
            "대기 상태 확인", // 알림 제목
            "이미 대기하고 있는 매장이 존재합니다. 테이블링 목록으로 이동하시겠습니까?", // 알림 메시지
            [
              {
                text: "아니요", // 아니요 버튼
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "확인", onPress: () => waitPage(store_seq) } // 확인 버튼을 누르면 테이블링 페이지로 이동
            ],
            { cancelable: false }
          );
          

        }

        

      } catch(error){
        console.error(error);
      }
    } else {
      // 로그인 상태가 아닐 때 로그인 화면으로 이동
      navigation.navigate('HomeLogin');
    }
    
  }

    

  const reservation = async() => {
    if(isLoggedIn){
      try{
        console.log("Reservation");
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/getReserv', {store_seq : store.store_seq})
        navigation.navigate("Reservation", {user:userInfo[0], store:store, reserveInfo:response.data});
      } catch(error){
        console.error(error);
      }
    } else {
      // 로그인 상태가 아닐 때 로그인 화면으로 이동
      navigation.navigate('HomeLogin');
    }
    
  }

  const review = async() => {
    const response = await axios.post('http://18.188.101.208:8090/botbuddies/reviewPage',{store_seq:store.store_seq})
    navigation.navigate("ReviewList", {reviewList:response.data, store_seq:store.store_seq})
    
  }

  const openMap = (searchQuery) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://map.naver.com/v5/search/${encodedQuery}`;
  
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handlePress = (store_seq, open_state, tabling_state, user_state) => {
    if(open_state == '0'){

      Alert.alert(
        "매장 오픈 전", // 알림 제목
        `오픈 시간 : ${store.open_time} ~ ${store.end_time}`, // 알림 메시지
        [
          {
            text: "확인", // 아니요 버튼
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },          
        ],
        { cancelable: false }
      );

    }else if(tabling_state == '0'){

      Alert.alert(
        "원격 줄서기를 지원하지 않는 매장입니다."
      );
  
    }else{
        if (store.category_seq === 2 || store.tableCount > 0) {
          order(store_seq);
        } else {
          if(user_state == '1'){
            Alert.alert(
              "원격 줄서기 기능 정지 회원입니다. 관리자에게 문의해주세요."
            );

          }else{
            waiting(store_seq);
          }
          
        }
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
      <ScrollView>
      <TouchableOpacity style={styles.backButton} 
          onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        <Image
          style={styles.image}
          source={{uri : store.imageFilename}} // Replace with your image path
        />
        
        <View style={styles.body}>

        <View style={styles.starContainer}>
        <Text style={[styles.title, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 25 }]}>{store.store_name}</Text>
        <TouchableOpacity onPress={toggleFavorite}>
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={30}
          color={favorite ? "#ff3b30" : "#ff3b30"}
          style={{ marginTop: 5, marginLeft: 5 }}
        />
      </TouchableOpacity>
        </View>
        <View style={styles.starContainer}>
          <AntDesign name="star" size={30} color="#FFD700" />
          <Text style={styles.starRating}>{store.averageRating}</Text>
          <TouchableOpacity onPress={() => review()}>
          <Text style={[styles.reviewCount, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 15 }]}>{store.reviewCount}개 리뷰 ▷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.telContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => openMap(store.store_name)}>
            <AntDesign name="enviroment" size={20} color="black" />
            <Text style={[styles.iconText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>매장위치</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL(`tel:${store.store_phone}`)}>
            <Foundation name="telephone" size={20} color="black" />
            <Text style={[styles.iconText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>전화번호</Text>
          </TouchableOpacity>
          {store.reserva_state!=0 &&<TouchableOpacity style={styles.iconContainer} onPress={() => reservation()}>
            <FontAwesome name="calendar-check-o" size={18} color="black" />
            <Text style={[styles.iconText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>예약하기</Text>
          </TouchableOpacity>}
        </View>
        <Text style={[styles.subtitle, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 18 }]}>{store.store_desc}</Text>
        

        {menu.map((food) => {
          console.log(typeof(food.image))
        
          return(
            <View key={food.menu_seq} style={styles.foodItem}>

              <Image
                  style={styles.foodImage}
                  source={getImageSource(food.menu_img)}
                />
              <View style={styles.foodInfo}>
                <Text style={[styles.foodTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>{food.menu_name}</Text>
                <Text style={[styles.fooddiscription, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}>{food.menu_desc}</Text>
              </View>
              </View>
          )
        })}
        </View>

      </ScrollView>

      {/* {store.open_state === '1' && ( */}
      <SafeAreaView>
        <TouchableOpacity style={store.open_state === '0' || store.tabling_state ==='0' ? styles.endTimeButton : styles.orderButton} onPress={() => handlePress(store.store_seq, store.open_state, store.tabling_state, userInfo[0].state)}>
          <Text style={[styles.orderButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>
            {store.open_state === '0' ? "오픈 전" : (store.category_seq === 2 ? "주문하기" : store.tableCount === 0 ? '줄서기' : '주문하기')}
            {/* {store.category_seq === 2 ? "주문하기" : store.tableCount === 0 ? '줄서기' : '주문하기'} */}
          </Text>
        </TouchableOpacity>
        </SafeAreaView>
      {/* )} */}


      
     
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
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 18,
    color: 'grey',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  foodItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  foodInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodRating: {
    marginLeft: 5,
    fontSize: 18,
    color: '#FF4500',
  },
  foodReviews: {
    fontSize: 16,
    color: 'grey',
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
  endTimeButton:{
    backgroundColor: '#BDBDBD', // 버튼 배경색
    borderRadius: 20, // 버튼 모서리 둥글기
    paddingVertical: 10, // 상하 패딩
    paddingHorizontal: 20, // 좌우 패딩
    justifyContent: 'center', // 내부 텍스트 센터 정렬
    alignItems: 'center', // 내부 텍스트 센터 정렬
    marginHorizontal: 20, // 좌우 마진
    marginVertical: 10, // 상하 마진
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

});

export default StoreInfo;
