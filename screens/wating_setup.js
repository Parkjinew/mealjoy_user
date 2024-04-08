import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const WatingSetup = ({route}) => {
  const [inputText, setInputText] = useState('');
  const [count, setCount] = useState(4); // 시작 인원수를 4로 설정합니다.
  const data = {route}.route.params;
  const waitingCount = data.count;
  const user = data.user;
  const store = data.store;
  const navigation = useNavigation();
  
  console.log(store);

  // 인원수를 증가시키는 함수
  const incrementCount = () => {
    if (count < 10) {
      setCount(prevCount => prevCount + 1);
    }
  };

  // 인원수를 감소시키는 함수
  const decrementCount = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  const wait = async(count) => {

    try{
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/wait', {user_id : user.user_id, store_seq : store.store_seq, people_num : count, store_user:store.user_id})
      navigation.navigate("TableingResult", {waitInfo:response.data, store:store.store_name});

    } catch(error){
      console.error(error);
    }

  }

  return (
  
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <View>
          <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" /></TouchableOpacity></View>
        <View>
       <Text style={styles.waitingCountText}>현재 {waitingCount}명 대기중</Text>
          </View>
          <View></View>
        </View>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>매장명</Text>
          <Text style={styles.input}>{store.store_name}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>본인 포함 식사하실 인원</Text>
          <View style={styles.participants}>
            <TouchableOpacity onPress={decrementCount} style={styles.iconButton}>
              <AntDesign name="minuscircleo" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity onPress={incrementCount} style={styles.iconButton}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.caution}>주의사항</Text>
        {/* 주의사항 내용 */}
        <Text style={styles.precautionsText}>
         - 원격 줄서기 신청 후 방문하지 않을 시 1회 경고 후 기능이 정지됩니다.
         - 정지된 회원은 관리자에게 문의 시 검토 후 해제됩니다.
         - 일정 횟수 이상 정지된 회원은 기능이 영구 정지됩니다.
        </Text>
        <View style={styles.divider} />
        {/* <View style={styles.inputGroup}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            onChangeText={setInputText}
            value={inputText}
            placeholder="최대 50자까지 작성 가능"
          />
          <Text style={styles.counter}>요청사항 {inputText.length} / 50</Text>
        </View> */}
        <TouchableOpacity style={styles.button} onPress={() => wait(count)}>
          <Text style={styles.buttonText}>줄서기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  backbutton:{
      paddingTop:25,
      paddingLeft:20
  },
  head:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:50
  },
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 20, // Add some bottom margin to space out the header
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 30, // Increase top margin to space out from the waiting count
    padding: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textArea: {
    
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    // Set a fixed height that can contain at least three lines
    height: 80, // Adjust this value as needed for your layout
  },

  inputGroup: {
   
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
     
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e1e1e1',
    marginVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
  count: {
    fontSize: 16,
    marginHorizontal: 10, // 간격 조정
  },

  precautionsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10, // Add space below the precautions text
  },
  
  waitingCountText: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Ensure text is centered
    marginVertical: 20, // Add vertical margin for spacing
    alignSelf: 'center', // Center in the parent view
    marginLeft:-30
  },
  

});

export default WatingSetup;
