import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    View,
    Text, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert, 
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';


const SignUp = () => {
    // 상태 변수들을 선언합니다.
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    // 중복 확인 함수 (Dummy implementation)
    const checkDuplicate = () => {
        console.log('중복 확인 중...');
        // 여기에 실제 중복 확인 API 요청 로직을 구현하세요.
        setIsDuplicate(false); // 예시: 중복 없음
    };

    // 비밀번호 일치 확인
    useEffect(() => {
      if (password && confirmPassword) {
          setPasswordMatch(password === confirmPassword);
      }
  }, [password, confirmPassword]); 

    // 모든 입력 필드 검증
    const verifyInputs = () => {
        if (!username || !password || !confirmPassword || !name || !phoneNumber) {
            Alert.alert('오류', '모든 필드를 입력해주세요.');
            return false;
        }
        if (isDuplicate) {
            Alert.alert('오류', '아이디 중복을 확인해주세요.');
            return false;
        }
        if (!passwordMatch) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    // 회원가입 처리 함수 (Dummy implementation)
    const handleSignUp = () => {
        if (verifyInputs()) {
            console.log('회원가입:', username);
            // 여기에 실제 회원가입 API 요청 로직을 구현하세요.
            Alert.alert('성공', '회원가입이 완료되었습니다.', [
                { text: 'OK', onPress: onGoBack },
            ]);
        }
    };

  return (
       <SafeAreaView style={styles.container}>
            <ScrollView style={styles.container}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>아이디*</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.input}
                                onChangeText={text => { setUsername(text); setIsDuplicate(false); }}
                                value={username}
                                placeholder="아이디를 입력하세요"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={styles.checkButton} onPress={checkDuplicate}>
                                <Text style={styles.checkButtonText}>중복확인</Text>
                            </TouchableOpacity>
                        </View>
                        {isDuplicate && <Text style={styles.errorText}>이미 사용중인 아이디입니다.</Text>}

                        <Text style={styles.label}>비밀번호*</Text>
                        <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        placeholder="********"
                        secureTextEntry={true}
                    />

                        <Text style={styles.label}>비밀번호 확인*</Text>
                        <TextInput
                        style={styles.input}
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="********"
                        secureTextEntry={true}
                    />
                        {passwordMatch ? 
                        (password.length > 0 && confirmPassword.length > 0) && <Text style={styles.successText}>비밀번호가 일치합니다.</Text> :
                        <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
                    }


        {/* 이름 입력 */}
        <Text style={styles.label}>이름*</Text>
        <TextInput
          style={[styles.input, styles.inputFull]}
          onChangeText={setName}
          value={name}
          placeholder="홍길동"
        />

        {/* 전화번호 입력 */}
        <Text style={styles.label}>전화번호*</Text>
        <TextInput
          style={[styles.input, styles.inputFull]}
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="010-1234-5678"
          keyboardType="phone-pad" // 숫자 키패드를 기본으로 표시합니다.
        />

          {/* 회원가입 버튼 */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonKakao} >
      <Image
        source={require('../assets/Kakaostart.png')} // Make sure the path is correct
        style={styles.kakaoLoginImage}
      />
    </TouchableOpacity>

        </View>
        </ScrollView>
      </SafeAreaView>

   
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    // 추가적인 스타일링...
},
successText: {
    color: 'green',
    // 추가적인 스타일링...
},
     // ... 기존 스타일 ...
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    // 로고가 중앙에 오도록 헤더를 정의합니다.
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom:-30
    //backgroundColor: '#f2f2f2',
  },
  headerText: {
    // 새로 추가된 회원가입 텍스트 스타일
    fontSize: 20,
    fontWeight: 'bold',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  backButton: {
    // 뒤로가기 버튼 위치 조정
    position: 'absolute',
    left: 20,
    zIndex: 10,
    paddingTop:40
  },

  logo: {
    width: 300,
    height: 150,
    alignSelf: 'center',// 로고를 스스로 정 중앙에 위치하도록 설정
    // 로고 스타일 기타 속성들...
  },
  
  form: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    color: '#333',
    marginBottom: 8,
    marginTop: 10
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    padding: 10,
    marginRight: 8,
    borderRadius: 4,
  },
  checkButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 4,
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',

  },
  signUpButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontWeight: 'bold',
 

  },
  buttonKakao: {
    backgroundColor: '#FEE500',
    padding: 2, // 전체 패딩을 조정하여 버튼의 높이와 너비를 조절
    borderRadius: 4, // 모서리 둥글기
    alignItems: 'center',
    marginTop: 8, // '회원가입' 버튼과의 상단 여백
    marginBottom: 16, // 하단 여백
  },


  signUpButton: {
    // 회원가입 버튼 스타일 조정
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16, // 위 버튼과 일관된 여백 제공
  },

  kakaoLoginImage: {
    width: '100%',
    resizeMode: 'contain',
  },


  
});

export default SignUp;