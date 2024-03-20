import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    SafeAreaView, 
    TouchableWithoutFeedback,
    Keyboard,
    Text
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeLogin = ({ onSignUp, onKakaoLogin }) => {
  // Existing code...
  // 로그인 상태 관리
  const [loginInfo, setLoginInfo] = useState({
      id: '',
      password: '',
  });


  // 로그인 입력 핸들러
  const handleLoginChange = (name, value) => {
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // 로그인 버튼 핸들러
  const handleLogin = () => {
    // 로그인 검증 로직을 여기에 추가
    console.log('로그인 시도', loginInfo);
    // 성공 시 여기에 네비게이션 로직 추가 (예: navigation.navigate('Home'))
  };
// // 카카오 로그인 핸들러
// const onKakaoLogin = () => {
//   navigation.navigate('KakaoLogin');
// };

// // 회원가입 핸들러
// const onSignUp = () => {
//   navigation.navigate('SignUp');
// };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => alert('Go Back')}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.headerTitle}></Text>
      </TouchableOpacity>
      
      
        {/* Logo를 중앙에 배치합니다. */}
        <Image source={require('../assets/images/Logo.png')} style={styles.logo} />
      </View>
      <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>아이디*</Text>
        <TextInput
          style={styles.input}
          placeholder="아이디를 입력하세요"
          onChangeText={(value) => handleLoginChange('id', value)}
          value={loginInfo.id}
        />
          <Text style={styles.inputLabel}>비밀번호*</Text>
        <TextInput
          style={styles.input}
          placeholder="비밀번호를 입력하세요 "
          secureTextEntry={true}
          onChangeText={(value) => handleLoginChange('password', value)}
          value={loginInfo.password}
        />
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.buttonLogin]} onPress={handleLogin}>
    <Text style={styles.buttonText}>로그인</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.buttonSignUp]} onPress={onSignUp}>
    <Text style={styles.buttonText}>회원가입</Text>
  </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonKakao} onPress={onKakaoLogin}>
        <Image
        source={require('../assetsLarge.png')} // 이미지 파일 경로를 확인하세요
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
    marginTop:-70
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
    marginRight:280
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
    top: 0,
    left: 0,
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

