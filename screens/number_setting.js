import React, { useState, useEffect } from 'react';
import { View,Alert, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Number = () => {
  // 설정 항목의 state와 로직이 필요하면 여기에 추가하세요.
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [inputText, setInputText] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          // 저장된 userInfo가 있으면 JSON으로 파싱하여 상태를 업데이트합니다.
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.log(error);
        // 에러 처리 로직을 추가할 수 있습니다.
      }
    };
    
    fetchUserInfo();
  }, []);

  const numbersetting = async () => {
    // 서버로부터 데이터를 받아오는 로직 구현
    try {
      await axios.post('http://119.200.31.63:8090/botbuddies/numbersetting', {  id: userInfo[0].user_id,
      inputText:inputText });
      const updatedUserInfo = { ...userInfo[0], user_phone: inputText }; // 닉네임 변경
      await AsyncStorage.setItem('userInfo', JSON.stringify([updatedUserInfo])); // AsyncStorage 업데이트
      setUserInfo([updatedUserInfo]); // 애플리케이션 상태 업데이트
      // 사용자에게 성공 메시지 표시
      Alert.alert("닉네임 변경", "닉네임이 성공적으로 변경되었습니다.", [{
        text: "확인", onPress: () => navigation.navigate('Setting')
      }]);
    } catch (error) {
      console.error("Error fetching Review Management data:", error);
      // 오류 처리 로직, 필요에 따라 사용자에게 알림 등
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>휴대폰 번호 변경</Text>
        
      </View>

      <ScrollView >
     
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>새로운 휴대폰 번호를 입력해주세요</Text>    
        </View>
        <View style={styles.numbersetting}>
        <TextInput
            style={styles.input}
            placeholder={userInfo?.[0]?.user_phone}
            value={inputText}
            onChangeText={setInputText}
            keyboardType="numeric"
          />
        </View>

      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={numbersetting}>
        <Text style={styles.setting}>변경 하기</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backbutton:{
    zIndex:666
  },
    numbersetting:{
        backgroundColor:'#efefef',
        alignSelf:'center',
        width:350,
        height:45,
        borderRadius:5
    },
    input:{
        paddingTop:13,
        paddingLeft:10
    },

    setting:{
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:-23
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor: '#fff',
    paddingTop:15
  },
  tabItem: {
    backgroundColor: 'gray',
    borderRadius: 3,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: 350
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#efefef',
    paddingBottom:20,
    paddingTop:20
  },
  infoText: {
    fontSize: 16,
    fontWeight:'bold'
  },
  valueText: {
    color: '#8e8e8e',
  },
  footer: {
    padding: 10,
    alignItems:'center',
  },
  button: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    borderColor: '#ff3b30',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // 여기에 추가 스타일을 정의하세요.
});



export default Number;
