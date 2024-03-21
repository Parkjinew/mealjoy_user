import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button, Linking  } from 'react-native';
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


const StoreInfo = ({route}) => {
  const data = {route}.route.params;
  const store = data.store;
  const menu = data.menu;
  console.log(store);
  console.log(menu);

  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const getImageSource = (imageUri) => {
    return imageUri ? { uri: imageUri } : require('../assets/logo.png');
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
          <TouchableOpacity>
          <Text style={styles.reviewCount}>{store.reviewCount}개 리뷰 ▷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.telContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <AntDesign name="enviroment" size={20} color="black" />
            <Text style={styles.iconText}>매장위치</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL(`tel:${store.store_phone}`)}>
            <Foundation name="telephone" size={20} color="black" />
            <Text style={styles.iconText}>전화번호</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome name="calendar-check-o" size={18} color="black" />
            <Text style={styles.iconText}>예약하기</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>{store.store_desc}</Text>
        

        {menu.map((food) => {
          console.log(typeof(food.image))
        
          return(
            <View key={food.id} style={styles.foodItem}>

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

      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>
          {/* 테이블 수 가져오기 수정필요 */}
          {store.tableCount === 0 ? '줄서기' : '주문하기'}
        </Text>
      </TouchableOpacity>


      
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="search" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome5 name="robot" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="heart" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <FontAwesome6 name="user" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
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
