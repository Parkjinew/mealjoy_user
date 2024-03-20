import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from 'react-native';
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
import IMP from 'iamport-react-native'; 
import axios from 'axios';



const TableButton = ({ id, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.tableButton, selected && styles.selectedTableButton]}
      onPress={onPress}
    >
      <Text style={[styles.tableButtonText, selected && styles.selectedTableButtonText]}>
        {`${id}인석`}
      </Text>
    </TouchableOpacity>
  );

  

  const CheckBox = ({ selected, onPress }) => (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={selected ? 'checksquare' : 'checksquareo'} size={24} color="#ff3b30" />
    </TouchableOpacity>
  );


  const MenuItem = ({ food, onSelect, onIncrement, onDecrement, quantity }) => {
    return (
      <View
        style={[styles.foodItem, quantity > 0 ? styles.selectedFoodItem : null]}
        onPress={() => onSelect(food.id)}
        activeOpacity={0.6}
      >
        <Image style={styles.foodImage} source={food.image} />
        <View style={styles.foodInfo}>
          <Text style={styles.foodTitle}>{food.title}</Text>
          <Text style={styles.fooddiscription}>{food.discription}</Text>
          <Text style={styles.foodprice}>{food.price}</Text>
        </View>
        <View style={styles.stepperContainer}>
          <TouchableOpacity onPress={() => onDecrement(food.id)} style={styles.stepperButton}>
            <Text style={styles.stepperButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => onIncrement(food.id)} style={styles.stepperButton}>
            <Text style={styles.stepperButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

export default function user_order({navigation}){
  const [selectedFoods, setSelectedFoods] = useState([]);
     const [quantities, setQuantities] = useState({});

   

      const onIncrement = (foodId) => {
        const newQuantity = (quantities[foodId] || 0) + 1;
        setQuantities({ ...quantities, [foodId]: newQuantity });
      };
    
      const onDecrement = (foodId) => {
        const newQuantity = quantities[foodId] > 0 ? quantities[foodId] - 1 : 0;
        setQuantities({ ...quantities, [foodId]: newQuantity });
      };

      const toggleFoodSelection = (foodId) => {
        if (selectedFoods.includes(foodId)) {
          setSelectedFoods(selectedFoods.filter(id => id !== foodId));
        } else {
          setSelectedFoods([...selectedFoods, foodId]);
        }
      };
    const foodData = [
        {
          id: '1',
          title: '지중해 타코',
          discription: '매콤한 양념의 타코',
          rating: '4.1',
          price: '20,000원',
          image: require('./assets/taco.jpg'),
        },
        {
          id: '2',
          title: '레드 소스 불고기 볼',
          discription: '바삭하게 튀긴 불고기볼',
          rating: '4.6',
          price: '18,000원',
          image: require('./assets/bol.jpg'),
        },
        // Add more food items here
      ];

      const totalPrice = foodData.reduce((acc, food) => {
        // 가격에서 숫자만 추출하고, 수량을 곱합니다.
        const price = parseInt(food.price.replace(/[^0-9]/g, ""), 10); // '20,000원'에서 '20000'으로 변환
        const quantity = quantities[food.id] || 0;
        return acc + price * quantity;
      }, 0);

    const [selectedTable, setSelectedTable] = useState(null);

    const toggleTableStatus = (id) => {
      setSelectedTable(id === selectedTable ? null : id);
    };


  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const [tables, setTables] = useState([
    { id: 1, status: "available", selected: false },
    { id: 2, status: "available", selected: false },
    { id: 4, status: "available", selected: false },
    { id: 6, status: "available", selected: false },
    { id: 8, status: "available", selected: false },
  ]);
  
  
 
        
        
        const TableStatus = ({ number, selected, onToggle }) => (
          <TouchableOpacity
            style={[styles.tableButton, selected && styles.selectedTableButton]}
            onPress={onToggle}
          >
            <Text
              style={[
                styles.tableButtonText,
                selected && styles.selectedTableButtonText,
              ]}
            >
              {`${number}인석`}
            </Text>
          </TouchableOpacity>
        );

        {tables.map((table) => (
            <TableStatus
              key={table.id}
              number={table.id}
              selected={table.selected}
              onToggle={() => toggleTableStatus(table.id)}
            />
          ))}

          

        return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.image}
          source={require('./assets/food.jpeg')} // Replace with your image path
        />
        
        <View style={styles.body}>

        <View style={styles.starContainer}>
        <Text style={styles.title}>타코</Text>
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
          <Text style={styles.starRating}>5.0</Text>
          <TouchableOpacity>
          <Text style={styles.reviewCount}>1,111개 리뷰 ▷</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.telContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <AntDesign name="enviroment" size={20} color="black" />
            <Text style={styles.iconText}>매장위치</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Foundation name="telephone" size={20} color="black" />
            <Text style={styles.iconText}>전화번호</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome name="calendar-check-o" size={18} color="black" />
            <Text style={styles.iconText}>예약하기</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>타코가 맛있는 집</Text>
        
        

        <View style={styles.tableButtonContainer}>
        {tables.map((table) => (
          <TableButton
            key={table.id}
            id={table.id}
            selected={table.id === selectedTable}
            onPress={() => toggleTableStatus(table.id)}
          />
        ))}
      </View>

      
      {foodData.map((food) => (
  <MenuItem
    key={food.id}
    food={food}
    selected={selectedFoods.includes(food.id)}
    onSelect={() => toggleFoodSelection(food.id)}
    onIncrement={() => onIncrement(food.id)}
    onDecrement={() => onDecrement(food.id)}
    quantity={quantities[food.id] || 0} // 이미 정의된 prop입니다.
  />
))}




        </View>

      </ScrollView>

       <TouchableOpacity style={styles.orderButton} onPress={() => navigation.push('Payment')}>
        <Text style={styles.orderButtonText} >
          {`${totalPrice.toLocaleString()}원 주문하기`}
        </Text>
      </TouchableOpacity> 

      <SafeAreaView>
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
      </SafeAreaView>
    </View>
  );

  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
    marginTop: 10,
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
    marginLeft:10,
  },
  telContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
    marginLeft:10,
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
    marginLeft: 10,
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
  fooddiscription: {
    fontSize: 15,
    color: 'gray',
  },
  foodprice: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
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
  tableContainer: {
    flexDirection: "row",
  justifyContent: "space-between", // 이 부분을 추가하세요
  alignItems: "center",
  marginBottom: 10,
  },
  tableText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 50,
    marginRight: 5,
  },
  statusButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ff3b30",
    width:200,
    height:40,
    marginBottom:5,
    marginRight:20,
  },
  occupied: {
    backgroundColor: "#ff3b30",
  },
  statusText: {
    color: "black",
    marginLeft: 5,
    marginRight: 5,
    textAlign:'center',
    marginTop:5
  
  }, tableButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15, // 좌우 여백
    paddingVertical: 8, // 상하 여백
    margin: 5,
    borderWidth: 1,
    borderColor: '#ff3b30',
    borderRadius: 20,
    marginLeft:-4,
  },
  selectedTableButton: {
    backgroundColor: '#ff3b30'
  },
  tableButtonText: {
    color: 'black', // 기본 상태의 텍스트 색상입니다.
    textAlign: 'center',
    fontSize: 16,
  },
  selectedTableButtonText: {
    color: 'white', // 선택 상태의 텍스트 색상입니다.
  },
  tableButtonContainer: {
    flexDirection: 'row', // 버튼을 가로로 배열합니다.
    justifyContent: 'space-evenly', // 버튼 사이에 고르게 간격을 줍니다.
    paddingVertical: 10, // 위 아래 패딩을 줍니다.
    marginLeft: 10,
   
  },
  foodItem: {
flexDirection: 'row',
  padding: 10,
  alignItems: 'center',
  justifyContent: 'space-between', // 이 부분 추가
  },
  selectedFoodItem: {
    backgroundColor: '#F0F0F0', // 선택 시 배경색입니다.
    weight: '100%',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#929292',
    borderRadius: 10,
  },
  stepperButton: {
    padding: 10,
    borderColor: '#929292',
   
  },
  stepperButtonText: {
    fontSize: 18,
    color: '#000000',
  },
  quantityText: {
    padding: 10,
    fontSize: 18,
    color: '#000000',
  },
});
