import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Platform, Image } from 'react-native';
import { AntDesign, Ionicons, Foundation } from '@expo/vector-icons';

const StoreDetail = () => {
  const foodData = [
    {
      id: '1',
      title: '지중해 타코',
      description: '매콤한 양념의 타코',
      rating: '4.1',
      reviews: '908 리뷰',
      image: require('../assets/chin.png'),
      con: '현재 이용가능',
    },
    {
      id: '2',
      title: '레드 소스 불고기 볼',
      description: '바삭하게 튀긴 불고기볼',
      rating: '4.6',
      reviews: '420 리뷰',
      image: require('../assets/chin.png'),
      con: '품절',
    },
  ];

  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => setFavorite(!favorite);

  const openMap = (searchQuery) => {
    const encodedQuery = encodeURIComponent(searchQuery);
    const url = `https://map.naver.com/v5/search/${encodedQuery}`;
  
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/chin.png')}
      />
      <View style={styles.body}>
        <View style={styles.starContainer}>
          <Text style={styles.title}>타코</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={30}
              color={favorite ? "#ff3b30" : "#ff3b30"}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => openMap("타코")}>
          <View style={styles.telContainer}>
            <AntDesign name="enviroment" size={24} color="black" />
            <Text style={styles.iconText}>매장위치</Text>
          </View>
        </TouchableOpacity>

        {foodData.map((food) => (
          <View key={food.id} style={styles.foodItem}>
            <Image
              style={styles.foodImage}
              source={food.image}
            />
            <View style={styles.foodInfo}>
              <Text style={styles.foodTitle}>{food.title}</Text>
              <Text style={styles.foodDescription}>{food.description}</Text>
              <Text style={styles.foodReviews}>{food.reviews}</Text>
              <Text>{food.con}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  body: {
    padding: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  telContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  iconText: {
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  foodItem: {
    flexDirection: 'row',
    marginTop: 20,
  },
  foodImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  foodInfo: {
    marginLeft: 10,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodDescription: {
    fontSize: 14,
  },
  foodReviews: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default StoreDetail;
