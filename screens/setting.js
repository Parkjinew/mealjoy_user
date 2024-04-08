import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Setting = () => {
  // 설정 항목의 state와 로직이 필요하면 여기에 추가하세요.
  const navigation = useNavigation();
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

  useFocusEffect(
    React.useCallback(() => {
      // 페이지가 포커스 될 때마다 사용자 정보를 새로 불러옵니다.
      fetchUserInfo();
    }, [])
  );

  const fetchUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    } catch (error) {
      console.log(error);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>내 정보 수정</Text>
        
      </View>

      <ScrollView >
     
      <View style={styles.infoContainer}>
      
        
        <View style={styles.edge}>
        <View style={styles.infoItem}>
          <Text style={[styles.infoText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>아이디</Text>
          <Text style={[styles.valueText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 14 }]}>{userInfo?.[0]?.user_id}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="white" />
        </View>
        <TouchableOpacity style={styles.infoItem} onPress={() => navigation.navigate('Nick')}>
          <Text style={[styles.infoText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>닉네임</Text>
          <Text style={[styles.valueText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 14 }]}>{userInfo?.[0]?.user_nick}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />

        </TouchableOpacity>
        <TouchableOpacity style={styles.infoItem} onPress={() => navigation.navigate('Number')}>
          <Text style={[styles.infoText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>휴대폰</Text>
          <Text style={[styles.valueText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 14 }]}>{userInfo?.[0]?.user_phone}</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem} onPress={() => navigation.navigate('Password')}>
          <Text style={[styles.infoText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>비밀번호</Text>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </TouchableOpacity>
        </View>
      </View>

      </ScrollView>

      {/* 하단 탭 바 */}
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backbutton:{
    position: 'absolute', // 뒤로 가기 버튼을 절대 위치시킴
    left: 16, 
    zIndex:666,
    top: '50%',
    marginTop:5
  },
    edge:{
        borderColor:'#efefef',
        borderWidth:0.7,
        marginLeft:10,
        marginRight:10,
        borderRadius:9
    },

    infologo:{
        flex:1,
        alignItems:'center',
        marginTop:20
    },
    logo: {
        width: 300, // 로고의 너비. 필요에 따라 조절하세요.
        height: 150, // 로고의 높이. 필요에 따라 조절하세요.
        marginBottom: -20, // 로고와 검색 입력란 사이의 마진을 조절합니다.
        marginTop : -50,
      },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
    marginTop:Platform.OS === "android"? 10 :0
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
  },
  tabItem: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },


  infoContainer: {
    marginVertical: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingTop:20,
    paddingBottom:20
  },
  infoText: {
    fontSize: 16,
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



export default Setting;
