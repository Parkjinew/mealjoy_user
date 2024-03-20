import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5, Entypo, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_KEY } from "@env";

const ChatBot = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

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
      const response = await axios.post('http://211.227.224.159:8000/predict', {
        text: inputText,
      });
  
      if (response.data && response.data.text) {
        // 챗봇의 응답을 채팅 목록에 추가

        if(response.data.text=="메뉴추천"){
          try {
            const response_chat = await axios.post(
              'https://api.openai.com/v1/chat/completions',
              {
                model: "gpt-3.5-turbo",
                messages: [
                  { role: "system", content: "You are a menu recommendation chatbot. If there are no special conditions, we basically recommend 5 menus." },
                  { role: "user", content: response.data.text }
                ]
              },
              {
                headers: {
                  'Authorization': `Bearer ${API_KEY}`
                }
              }
            );
            console.log(response_chat.data.choices[0].message.content);
            const botMessage = {
              id: String(messages.length + 2), // ID 업데이트 주의
              text: response_chat.data.choices[0].message.content,
              isUser: false,
            };
            updatedMessages = [...updatedMessages, botMessage];
            setMessages(updatedMessages);
      
          } catch (error) {
            console.error('Error generating text:', error);
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
    const deleteTimer = setTimeout(autoDeleteMessages, 10*60*1000); // 10분
    return () => clearTimeout(deleteTimer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.logoContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
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
        {/* Message List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id.toString()}
          onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
          onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
          ListFooterComponent={<View style={styles.empty} />}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.isUser ? styles.userMessageContainer : styles.botMessageContainer]}>
              {!item.isUser && <Image source={require('../assets/joy.png')} style={styles.userAvatar} />}
              <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
              {item.isUser && <Image source={item.userAvatar} style={styles.userAvatar} />}
            </View>
          )}
        />

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
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
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchResult')}>
          <FontAwesome name="search" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
        <FontAwesome name="wechat" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome name="heart" size={24} color="#ff3b30" onPress={() => navigation.navigate('ReviewWrite')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <FontAwesome6 name="user" size={24} color="#ff3b30" onPress={() => navigation.navigate('OrderList')} />
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
    flexDirection: 'row',
    paddingTop: Platform.OS === 'android' ? 50 : 10,
    justifyContent: 'flex-start',
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
  messageBubble: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#e5e5e5',
    borderRadius: 20,
    alignSelf:'flex-start'
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
