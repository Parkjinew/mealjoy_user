import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const KakaoLogin = () => {
  const REST_API_KEY = '4bd3ee9077225cecefe2ff80992953a5';
  const REDIRECT_URI = 'http://localhost:8081/';

  // KakaoLoginWebView 함수가 URL에서 인증 코드를 추출합니다.
  function KakaoLoginWebView(data) {
    const exp = "code=";
    const condition = data.indexOf(exp);    
    if (condition !== -1) {
      const authorize_code = data.substring(condition + exp.length);
      console.log(authorize_code);
      // 여기에서 authorize_code를 사용하여 다음 단계를 진행하세요.
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        javaScriptEnabled={true}
        onMessage={event => KakaoLoginWebView(event.nativeEvent.url)}
      />
    </View>
  );
};

// 스타일 객체의 이름을 소문자로 시작하도록 수정합니다.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
  },
});

export default KakaoLogin;