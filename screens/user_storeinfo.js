import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, Linking, Alert   } from 'react-native';
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
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);
  

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const getImageSource = (imageUri) => {
    return imageUri ? { uri: imageUri } : require('../assets/logo.png');
  };

  const order = async(store_seq) => {
    if(isLoggedIn){
      try{
        const response = await axios.post('http://211.227.224.159:8090/botbuddies/storeinfo', {id : store_seq})
        const tableList = await axios.post('http://211.227.224.159:8090/botbuddies/getTable', {store_seq : store_seq})
        
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
      const response = await axios.post('http://211.227.224.159:8090/botbuddies/waitInfo', {user_id : userInfo[0].user_id})
      navigation.navigate('TableingResult', {waitInfo : response.data, store : store.store_name})
    } catch(error){
      console.error(error);
    }
  }

  const waiting = async(store_seq) => {
    if(isLoggedIn){
      try{
        console.log("waiting");
        
        const response = await axios.post('http://211.227.224.159:8090/botbuddies/waitState', {user_id : userInfo[0].user_id})
        
        console.log(response.data);

        if(response.data == 0){
          const response = await axios.post('http://211.227.224.159:8090/botbuddies/getCount', {store_seq : store.store_seq})
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
        const response = await axios.post('http://211.227.224.159:8090/botbuddies/getReserv', {store_seq : store.store_seq})
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
    const response = await axios.post('http://211.227.224.159:8090/botbuddies/reviewPage',{store_seq:store.store_seq})
    navigation.navigate("ReviewList", {reviewList:response.data, store_seq:store.store_seq})
    
  }

  const openMap = (searchQuery) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://map.naver.com/v5/search/${encodedQuery}`;
  
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handlePress = (store_seq, open_state) => {
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

    }else{
      if (store.category_seq === 2 || store.tableCount > 0) {
        order(store_seq);
      } else {
        waiting(store_seq);
      }
    }
    
  };

  


  

  return (

    
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={{uri : store.imageFilename}} // Replace with your image path
        />
        
        <View style={styles.body}>

        <View style={styles.starContainer}>
        <Text style={styles.title}>{store.store_name}</Text>
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
          <Text style={styles.reviewCount}>{store.reviewCount}개 리뷰 ▷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.telContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => openMap(store.store_name)}>
            <AntDesign name="enviroment" size={20} color="black" />
            <Text style={styles.iconText}>매장위치</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL(`tel:${store.store_phone}`)}>
            <Foundation name="telephone" size={20} color="black" />
            <Text style={styles.iconText}>전화번호</Text>
          </TouchableOpacity>
          {store.category_seq!=2 &&<TouchableOpacity style={styles.iconContainer} onPress={() => reservation()}>
            <FontAwesome name="calendar-check-o" size={18} color="black" />
            <Text style={styles.iconText}>예약하기</Text>
          </TouchableOpacity>}
        </View>
        <Text style={styles.subtitle}>{store.store_desc}</Text>
        

        {menu.map((food) => {
          console.log(typeof(food.image))
        
          return(
            <View key={food.menu_seq} style={styles.foodItem}>

              <Image
                  style={styles.foodImage}
                  source={getImageSource(food.menu_img)}
                />
              <View style={styles.foodInfo}>
                <Text style={styles.foodTitle}>{food.menu_name}</Text>
                <Text style={styles.fooddiscription}>{food.menu_desc}</Text>
              </View>
              </View>
          )
        })}
        </View>

      </ScrollView>

      {/* {store.open_state === '1' && ( */}
      <SafeAreaView>
        <TouchableOpacity style={store.open_state === '0' ? styles.endTimeButton : styles.orderButton} onPress={() => handlePress(store.store_seq, store.open_state)}>
          <Text style={styles.orderButtonText}>
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
