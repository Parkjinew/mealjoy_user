import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView,Alert, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import md5 from 'react-native-md5';
const Password = () => {
  // 설정 항목의 state와 로직이 필요하면 여기에 추가하세요.
  const navigation = useNavigation();
  const [inputPassword, setInputPassword] = useState('');

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



  const handlePasswordChange = () => {
    // 비밀번호가 일치하는지 확인
    if (md5.hex_md5(inputPassword) === userInfo[0].user_pw) {
      // 일치하면 비밀번호 변경 페이지로 이동
      navigation.navigate('ChangePassword'); // 변경할 비밀번호 페이지의 스택 내비게이션 이름으로 변경해야 함
    } else {
      // 일치하지 않으면 알림 표시
      Alert.alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>비밀번호 변경</Text>
        <View style={{width:24}}/>
      </View>

      <ScrollView >
     
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>안전한 변경을 위해 현재 비밀번호를 확인할게요</Text>  
        </View>
       

        <View style={styles.nicksetting}>
        <TextInput
            style={styles.input}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
            value={inputPassword}
            onChangeText={setInputPassword}
          />
        </View>

      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={handlePasswordChange}>
        <Text style={styles.setting}>다음</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backbutton:{
    zIndex:666
  },
    find:{
        fontSize:13,
        color:'gray'
    },
    passwordRecovery: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft:20,
        marginTop:-9,
        marginBottom:20
    },
    search:{
        flexDirection:'row',
    },
    nicksetting:{
        backgroundColor:'#efefef',
        alignSelf:'center',
        width:"90%",
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginTop:Platform?.OS === 'android'? 40 : 0,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',

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



export default Password;
