import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Button, ActivityIndicator } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import * as Font from 'expo-font';




const TableButton = ({ id, selected, onPress }) => (
    <TouchableOpacity
      style={[styles.tableButton, selected && styles.selectedTableButton]}
      onPress={onPress}
    >
      <Text style={[styles.tableButtonText, selected && styles.selectedTableButtonText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 16 }]}>
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
        <Image style={styles.foodImage} source={{uri : food.menu_img}} />
        <View style={styles.foodInfo}>
          <Text style={[styles.foodTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>{food.menu_name}</Text>
          <Text style={[styles.fooddiscription, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 15 }]}>{food.menu_desc}</Text>
          <Text style={[styles.foodprice, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>{food.price}원</Text>
        </View> 
        <View style={styles.stepperContainer}>
          <TouchableOpacity onPress={() => onDecrement(food.menu_seq)} style={styles.stepperButton}>
            <Text style={styles.stepperButtonText}>-</Text>
          </TouchableOpacity> 
          <Text style={[styles.quantityText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>{quantity}</Text>
          <TouchableOpacity onPress={() => onIncrement(food.menu_seq)} style={styles.stepperButton}>
            <Text style={styles.stepperButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  

export default function UserOrder({route}){
  const navigation = useNavigation();
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [quantities, setQuantities] = useState({});

  const data = {route}.route.params;
  const user_id = data.user_id;
  const store = data.store.store;
  const menu = data.store.menu;
  const tableList = data.tableList;
  console.log(store)

   

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

      const totalPrice = menu.reduce((acc, food) => {
        // 가격에서 숫자만 추출하고, 수량을 곱합니다.
        const price = food.price
        const quantity = quantities[food.menu_seq] || 0;
        return acc + price * quantity;
      }, 0);

      const totalCount = menu.reduce((acc, food) => {
        const quantity = quantities[food.menu_seq] || 0;
        return acc + quantity;
      }, 0);

    const [selectedTable, setSelectedTable] = useState(null);

    const toggleTableStatus = (id) => {
      setSelectedTable(id === selectedTable ? null : id);
    };


    const [tables, setTables] = useState(
      tableList.map(table => ({
        id: table.table_num,
        status: "available",
        selected: false,
      }))
    );

   

    const orderF = async() => {
      if(selectedTable == 2 || store.category_seq==2){
        Alert.alert(
          "메뉴 주문", // 알림 제목
          "1인분 이상 주문해주세요.", // 알림 메시지
          [
            {
              text: "확인", // 아니요 버튼
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }              
          ],
          { cancelable: false }
        );
      } else{
        Alert.alert(
          "메뉴 주문", // 알림 제목
          `${selectedTable-2}인분 이상 주문해주세요.`, // 알림 메시지
          [
            {
              text: "확인", // 아니요 버튼
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }              
          ],
          { cancelable: false }
        );
      }
    };

    const orderT = async(orderDetails) => {
      console.log("주문가능");
      if(store.category_seq==2){
        const response = await axios.post('https://18.188.101.208:8090/botbuddies/paycafe', {store_seq : store.store_seq, user_id:user_id, orders:orderDetails})
        
      }else{
        const response = await axios.post('https://18.188.101.208:8090/botbuddies/payment', {store_seq : store.store_seq, user_id:user_id, orders:orderDetails, selectedTable:selectedTable})
      }
      
      navigation.navigate("Payment",{totalPrice:totalPrice});
    }

    const Payment = async () => {
      // 주문 데이터 생성: 선택한 메뉴의 menu_seq와 수량
      const orderDetails = menu.filter(({ menu_seq }) => quantities[menu_seq] > 0)
          .map(({ menu_seq }) => ({
              menu_seq,
              quantity: quantities[menu_seq],
          }));

      try{
        console.log(totalCount);
        if(store.category_seq == 2){
          if(totalCount >=1){
            orderT(orderDetails);
          }else{
            orderF();
          }
        }else{

          if(selectedTable != null){  
            if(selectedTable == 2){
              if(totalCount >=1){
                orderT(orderDetails);
              }else{
                orderF();
              }
      
            } else{
              if(totalCount >= selectedTable -2){
                orderT(orderDetails);
              }else{
                orderF();
              }
            }
  
          }else{
            Alert.alert(
              "테이블 선택", // 알림 제목
              "테이블을 선택해주세요.", // 알림 메시지
              [
                {
                  text: "확인", // 아니요 버튼
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }              
              ],
              { cancelable: false }
            );
            
          }

        }
        
      } catch(error){
        console.error(error);
      }

      
  };
    
        const TableStatus = ({ number, selected, onToggle }) => (
          <TouchableOpacity
            style={[styles.tableButton, selected && styles.selectedTableButton]}
            onPress={onToggle}
          >
            <Text
              style={[
                styles.tableButtonText,
                selected && styles.selectedTableButtonText,
                { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }
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
          source={{uri: store.imageFilename}} // Replace with your image path
        />
        
        <View style={styles.body}>

        <View style={styles.starContainer}>
        <Text style={[styles.title, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 32 }]}>{store.store_name}</Text>
        </View>       
        

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

      
      {menu.map((food) => (
  <MenuItem
    key={food.menu_seq}
    food={food}
    selected={selectedFoods.includes(food.menu_seq)}
    onSelect={() => toggleFoodSelection(food.menu_seq)}
    onIncrement={() => onIncrement(food.menu_seq)}
    onDecrement={() => onDecrement(food.menu_seq)}
    quantity={quantities[food.menu_seq] || 0} // 이미 정의된 prop입니다.
  />
))}




        </View>

      </ScrollView>
          <SafeAreaView>
       <TouchableOpacity style={styles.orderButton} onPress={() => Payment()}>
        <Text style={[styles.orderButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]} >
          {`${totalPrice.toLocaleString()}원 주문하기`}
        </Text>
      </TouchableOpacity> 
      </SafeAreaView>
    </View>
  );

  
}


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
