import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_KEY } from "@env";
import * as Font from 'expo-font';


const ChatBot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);
  const [userInfo, setUserInfo] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // AsyncStorage에서 불러온 userInfo 설정
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleHeartIconPress = async () => {
    console.log(userInfo)
    if (userInfo) { // userInfo 상태를 통해 로그인 상태 확인
      try {
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/favorite', { id: userInfo[0].user_id });
        navigation.navigate('FavoriteStore', { FavoriteStore: response.data });
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    } else {
      navigation.navigate('HomeLogin');
    }
  };
  const handleUserIconPress = () => {
    if (userInfo) {
      // 사용자가 로그인 상태면, 개인정보수정 페이지로 네비게이션
      navigation.navigate('SettingsScreen');
    } else {
      // 사용자가 로그인 상태가 아니면, 로그인 페이지로 네비게이션
      navigation.navigate('HomeLogin');
    }
  };
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('messages');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        } else {
          // 페이지 진입 시 대화 기록이 없을 때 웰컴 메시지 추가
          const welcomeMessage = {
            id: '1',
            text: '안녕하세요!! 저는 조이풀 셰프라고해요!! 메뉴추천, 매장검색을 도와드려요!!',
            userAvatar: require('../assets/joy.png'),
            isUser: false,
          };
          setMessages([welcomeMessage]);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages:', error);
      }
    };

    saveMessages();
  }, [messages]);

  const getLanguageDirective = (langCode) => {
    switch (langCode) {
      case 'ko':
        return "한국어로 대답해주세요.";
      case 'ja':
        return "日本語で答えてください。";
      case 'en':
        return "Please answer in English.";
      default:
        return "Please answer in English.";
    }
  }


  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = {
      id: String(messages.length + 1),
      text: inputText,
      isUser: true,
    };

    let updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
  
    setInputText('');
  
    try {
      // 서버에 메시지 전송 및 챗봇 응답 받기
      const response = await axios.post('http://18.188.101.208:8000/predict', {
        text: inputText,
      });
  
      if (response.data && response.data.text) {
        // 챗봇의 응답을 채팅 목록에 추가

        if(response.data.text=="메뉴추천"){

          const langCode = response.data.lang;
          const languageDirective = getLanguageDirective(langCode); // 언어 지시 생성
          console.log("=========================================================");
          console.log("langCode",langCode)

          try {
            const response_chat = await axios.post(
              'https://api.openai.com/v1/chat/completions',
              {
                model: "gpt-3.5-turbo",
                messages: [
                  { role: "system", content: `You are a menu recommendation chatbot. We unconditionally recommend 5 menu items that will suit your taste. We definitely recommend 5 menu items. ${languageDirective}`},
                  { role: "user", content: response.data.text }
                ]
              },
              {
                headers: {
                  'Authorization': `Bearer ${API_KEY}` 
                }
              }
            );
            // console.log(response_chat.data.choices[0].message.content);
            const botMessage = {
              id: String(messages.length + 2), // ID 업데이트 주의
              text: response_chat.data.choices[0].message.content,
              isUser: false,
            };
            updatedMessages = [...updatedMessages, botMessage];
            setMessages(updatedMessages);
      
          } catch (error) {
            console.error('Error generating text:', error);
            Alert.alert('api 요청 실패', error.message);
          }
          

        } else if(response.data.text=="매장검색"){
          const searchStoreResponse = await axios.post("http://18.188.101.208:8090/botbuddies/selectStore", {location:response.data.keyword.location, nouns:response.data.keyword.nouns})
          
          // console.log("데이터 " ,searchStoreResponse.data)

          if (searchStoreResponse.data && searchStoreResponse.data.length > 0) {
            const botMessage =  searchStoreResponse.data.map((store, index) => ({
              id: String(`${index + messages.length + 2}`),
              text: `${store.store_name}`,
              average:`${store.averageRating}`,
              reviewCount:`${store.reviewCount}`,
              desc:`${store.store_desc}`,
              storeId: store.store_seq, // 매장의 상세 정보를 조회할 때 사용할 ID
              img : store.imageFilename,
              isUser: false,
            }));
        
            updatedMessages = [...updatedMessages, ...botMessage];
            setMessages(updatedMessages);

          } else {
            // 검색된 매장이 없을 경우
            const botMessage = {
              id: String(messages.length + 2),
              text: "검색된 매장이 없습니다.",
              isUser: false,
            };
            updatedMessages = [...updatedMessages, botMessage];
            setMessages(updatedMessages);

          }
      
        }else{

          const botMessage = {
            id: String(messages.length + 2), // ID 업데이트 주의
            text: response.data.text,
            isUser: false,
          };
    
          updatedMessages = [...updatedMessages, botMessage];
          setMessages(updatedMessages);
   
          
        }


        
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  


  useEffect(() => {
    if (flatListRef.current) {
      setTimeout(() => flatListRef.current.scrollToEnd({ animated: true }), 50);
    }
    
    // console.log("messages", messages)
  }, [messages]);

  // 채팅 내역을 자동으로 지우는 함수
  const autoDeleteMessages = async () => {
    try {
      // 10분 뒤에 채팅 내역 삭제
      await AsyncStorage.removeItem('messages');
      setMessages([]);
      const welcomeMessage = {
        id: '1',
        text: '안녕하세요!! 저는 조이풀 셰프라고해요!! 메뉴추천, 매장검색을 도와드려요!!',
        userAvatar: require('../assets/joy.png'),
        isUser: false,
      };
      setMessages([welcomeMessage]);


    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  useEffect(() => {
    const deleteTimer = setTimeout(autoDeleteMessages, 600000); // 10분
    return () => clearTimeout(deleteTimer);
  }, []);

  const storeinfo = async(id) => {
    try{
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/storeinfo', {id : id})
      // console.log(response.data);
      navigation.navigate('StoreInfo', response.data);
    } catch(error){
      console.error(error);
    }
    
  }

  const waitPage = async() => {
    if (userInfo) {
    try{
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/waitInfo', {user_id : userInfo[0].user_id})
      const storeData = await axios.post('http://18.188.101.208:8090/botbuddies/getStoreName', {store_seq : response.data.store_seq})
      navigation.navigate('TableingResult', {waitInfo : response.data, store : storeData.data.store_name})
    } catch(error){
      console.error(error);
    }
  }else{
    navigation.navigate("HomeLogin")
  }
  }

  
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
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.logoContainer}>

        <Image
          source={require('../assets/logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.flexContainer}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 0})}
      >

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        ListFooterComponent={<View style={styles.empty} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("선택")
              if (item.storeId) {
                storeinfo(item.storeId);
                // console.log(item.storeId)
              }
            }}
          >
            <View style={[styles.messageContainer, item.isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
              {!item.isUser && <Image source={require('../assets/joy.png')} style={styles.userAvatar} />}
              {!item.storeId &&<View style={styles.messageBubble}>
                {/* <View>
                  {item.img && <Image source={{uri : item.img}} style={styles.imgStyle}  />}
                </View> */}
                <View>
                 <Text style={[styles.messageText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 15 }]}>{item.text}</Text>
                </View>
                </View>}

                {item.storeId &&
                  <View  style={styles.restaurantItem}>
              
                  <Image source={{uri : item.img}} style={styles.restaurantImage} />
              
              <View style={styles.restaurantDetailContainer}>
                  <View style={styles.restaurantNameAndIcon}>
                      <Text style={[styles.restaurantName, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>{item.text}</Text>
                      
                  </View>
                  <View style={styles.restaurantRatingContainer}>
              <FontAwesome name="star" size={16} color="#ffd700" />
              <Text style={styles.restaurantRating}> {item.average}</Text>
                </View>
                  <Text style={[styles.restaurantReviews, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 12 }]}>{item.reviewCount}개의 리뷰</Text>
              </View>
              </View>  }

              {item.isUser && <Image source={item.userAvatar} style={styles.userAvatar} />}
            </View>
          </TouchableOpacity>
        )}
      />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}
            placeholder="메세지를 입력하세요.."
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <FontAwesome name="send" size={24} color="#ff3b30" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Main')}>
          <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => waitPage()}>
        <FontAwesome6 name="users-line" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
        <Ionicons name="chatbubbles" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome name="heart" size={24} color="#ff3b30" onPress={handleHeartIconPress} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome6 name="user" size={24} color="#ff3b30" onPress={handleUserIconPress} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    position: 'absolute', // 절대 위치 설정
    alignSelf: 'center', // 탭 아이템의 중앙에 위치하도록 조정
    bottom:-10,
    resizeMode: 'cover',
  },
  empty: {
    height: 30,
    zIndex: -20
  },
  backButton: {
    marginLeft: 15,
    marginTop: 7
  },
  logoContainer: {
    paddingTop: Platform.OS === 'android' ? 10 : 10,
    justifyContent: 'center',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    marginBottom: 0
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: -40,
    marginTop: -60,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flexContainer: {
    flex: 1,
  },
  messageContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 27,
    marginBottom: Platform.OS === 'android' ? -15 : -15,
    zIndex: 100,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignSelf:'flex-start'
  },
  restaurantItem: {
    flexDirection: 'row',
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingLeft:15,

    paddingBottom:16,
    borderColor:'#ddd'
  },
  restaurantImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
    resizeMode:'cover'
  },
  restaurantDetailContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantNameAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantNameAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantRatingContainer:{
    flexDirection: 'row',
    marginBottom:5
  },
  restaurantRating: {
    marginLeft: 0,
    fontSize: 14,
  },
  restaurantReviews: {
    fontSize: 12,
    color: '#666',
  },
  messageBubble: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 20,
    alignSelf:'flex-start',
    alignItems:"center"
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 5
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  botMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 300
  },
  userMessageContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start'
  }
});

export default ChatBot;
