import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    Alert,
    Platform,
    ActivityIndicator
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';

const HomeLogin = ({ onSignUp, onKakaoLogin }) => {
  const navigation = useNavigation();
  // 로그인 상태 관리
  const [loginInfo, setLoginInfo] = useState({
      id: '',
      password: '',
  });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  // 로그인 입력 핸들러
  const handleLoginChange = (name, value) => {
    let cleanedValue = value;
    cleanedValue = cleanedValue.replace(/[^\w\s!@]/gi, '');
    setLoginInfo({ ...loginInfo, [name]: cleanedValue });
  };

  // 로그인 버튼 핸들러
  const handleLogin = async () => {
    try {
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/signin', {
            id: loginInfo.id,
            password: loginInfo.password,
        });
        
        // 서버로부터의 응답이 null인지 확인
        if (response.data === null || response.data.length === 0) {
            // 로그인 실패 처리
            Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요.');
        } else {
            // 로그인 성공 처리
            const userInfoString = JSON.stringify(response.data); // 사용자 정보를 문자열로 변환
            await AsyncStorage.setItem('userInfo', userInfoString); // AsyncStorage에 저장
            
            console.log('로그인 성공:', response.data); // 서버로부터 받은 응답 로그에 출력
            console.log('저장된 사용자 정보:', userInfoString); // 저장된 사용자 정보 로그에 출력
            Alert.alert('로그인 성공', '환영합니다!')
            navigation.navigate('Main'); // 화면 이동
        }
    } catch (error) {
        console.error('로그인 요청 실패:', error);
        Alert.alert('로그인 요청 실패', '네트워크 상태를 확인해주세요.');
    }
};
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}></Text>
      </TouchableOpacity>
      
      
        {/* Logo를 중앙에 배치합니다. */}
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
  <Text style={[styles.inputLabel,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 14 }]}>아이디*</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          onChangeText={(value) => handleLoginChange('id', value)}
          value={loginInfo.id}
        />
          <Text style={[styles.inputLabel2,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 14 }]}>비밀번호*</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요 "
          secureTextEntry={true}
          onChangeText={(value) => handleLoginChange('password', value)}
          value={loginInfo.password}
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={handleLogin}>
    <Text style={[styles.buttonText,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 14 }]}>로그인</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.buttonSignUp]} onPress={() => navigation.navigate('SignUp')}>
    <Text style={[styles.buttonText,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 14 }]}>회원가입</Text>
  </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonKakao} onPress={() => navigation.navigate('KakaoLogin')}>
        <Image
        source={require('../assets/Large.png')} // 이미지 파일 경로를 확인하세요
        style={styles.kakaoLoginImage}
        />
  </TouchableOpacity>

      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default HomeLogin;

const styles = StyleSheet.create({
  button: {
    // 공통 버튼 스타일
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonLogin: {
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    flex: 1, // 각 버튼이 동일한 크기를 가지도록 설정
    marginRight: 10, // 버튼 사이의 간격을 설정
  },
  buttonSignUp: {
    backgroundColor: 'red', // 회원가입 버튼의 배경색을 투명하게 설정
    borderColor: 'red',
    borderWidth: 1,
    flex: 1, // 각 버튼이 동일한 크기를 가지도록 설정
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: 350,
  },
  inputContainer:{
    flex:1,
    alignItems:'center',
    marginTop: Platform.OS === 'android' ? 70 : 0,
  },
  logo: {
    width: 300,
    height: 150,
    alignSelf: 'center', // This will center the logo within its container
    marginTop: 45, // Adjust space as needed
    // If resizeMode is required, uncomment the following line
    // resizeMode: 'contain', 
  },
  logoContainer: {
    alignItems: 'center', // This should center all its children horizontally
    justifyContent: 'center', // This will center its children vertically if the container has a fixed height
    // Other styles...
  },

  container: {// 여기 수정 
    
    flex: 1,
    paddingHorizontal: 16, // 좌우 여백을 주기 위해 horizontal padding 값을 조정합니다. // 상단 바 여백
    backgroundColor: 'white',
    marginTop: Platform.OS === 'android' ? -20 : -70
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // Remove padding if you want the back button to be at the very top
    
    backgroundColor: 'white',
    padding: 20,
  },
 
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    
    
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 70,
     // Adjust the space between the logo and the input fields as needed
  },
  inputLabel: {
    fontSize: 15, // 라벨의 글자 크기
    color: 'black', // 라벨의 글자 색상
    //fontWeight: 'bold',
    marginBottom: 5, // 라벨과 입력 필드 사이의 간격
    // 필요한 다른 스타일을 추가합니다.
    marginRight:Platform.OS === 'android' ? 280 : 290
  },
  inputLabel2: {
    fontSize: 15, // 라벨의 글자 크기
    color: 'black', // 라벨의 글자 색상
    //fontWeight: 'bold',
    marginBottom: 5, // 라벨과 입력 필드 사이의 간격
    // 필요한 다른 스타일을 추가합니다.
    marginRight:Platform.OS === 'android' ? 265 : 280
  },
  input: {
    // ... other input styles ...
    height: 46,
    paddingHorizontal: 8,
    backgroundColor: '#fff', // Ensure the background is white
    borderColor: '#e1e1e1', // Set the border color to light gray
    borderWidth: 1, // Set the border width
    borderRadius: 4, // You can set this to change the roundness of the corners (optional)
    color: '#333', // Set the text color inside the input
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    width: 350,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 0,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    marginTop:30,
  },
  backButton: {
    position: 'absolute',
    marginBottom:-20,
    left: Platform.OS === 'android' ? -15 : 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    
    //backgroundColor: '#f9f9f9',//배경 지워도 되고 안지워도 되고 
  },
 
  // headerTitle: {
  //   marginLeft: 135,
  //   fontWeight: 'bold',
  //   fontSize: 20,
  // },
  
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonOutline: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 0,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonYellow: {
    backgroundColor: 'yellow',
    padding: 15,
    borderRadius: 0,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonTextYellow: {
    color: 'black',
    fontWeight: 'bold',
  },
  buttonKakao: {
    backgroundColor: '#FEE500', // 카카오 색상
    borderRadius: 0,
    alignItems: 'center',
    width:350,
    height:50
  },
  
  kakaoLoginImage: {
    width: '100%', // 이미지가 버튼 크기에 맞게 조정됩니다.
    resizeMode: 'contain', // 이미지가 비율을 유지하며 버튼 안에 맞춰집니다.
  },
});