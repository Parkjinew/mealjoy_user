import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
    Alert,
    Platform,
    ActivityIndicator
} from "react-native";
import {
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Font from 'expo-font';
// Header 컴포넌트
const Header = ({ navigation }) => {

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>문의 하기</Text>
        <Ionicons name="arrow-back" size={24} color="white" />
      </View>
    </View>
  );
};

// InquiryForm 컴포넌트
const InquiryForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem('userInfo');
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo)); // AsyncStorage에서 불러온 userInfo 설정
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async () => {
    try {
        await axios.post('https://18.188.101.208:8090/botbuddies/userInquiry', {
            id: userInfo[0].user_id,
            title: title,
            content: content
        })
        .then(response => {
            Alert.alert("성공", "문의가 등록되었습니다.", [{
                text: "확인",
                onPress: () => navigation.goBack()
            }]);
        })
        .catch(error => {
            console.error("Error fetching Review Management data:", error);
            Alert.alert("실패", "문의 등록이 실패하였습니다.", [{
                text: "확인",
                onPress: () => navigation.goBack()
            }]);
        });
    } catch (error) {
        console.error("Error outside axios:", error);
        Alert.alert("실패", "문의 등록이 실패하였습니다.", [{
            text: "확인",
            onPress: () => navigation.goBack()
        }]);
    }

    setTitle("");
    setContent("");
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
    <View style={styles.inquiryContainer}>
      <TextInput
        style={[styles.input, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}
        value={title}
        onChangeText={setTitle}
        placeholder="제목"
      />
      <TextInput
        style={[styles.input, styles.multiline, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}
        value={content}
        onChangeText={setContent}
        placeholder="문의 내용"
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={[styles.buttonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 14 }]}>등록</Text>
      </TouchableOpacity>
    </View>
  );
};

const UserInquiry = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <InquiryForm />
      </ScrollView>

     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // SafeAreaView 색상을 배경색과 일치시키기
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    padding: 10,
    marginBottom: 30,
    marginTop:Platform.OS === "android"? 40 :5
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",

  },
  tabBar: {
    height: 60,
    flexDirection: "row",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  inquiryContainer: {
    padding: 20,
    backgroundColor: "#fff",
  },
  inquiryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "red", // 버튼 배경색
    padding: Platform.OS === "android"? 10 :15,
    borderRadius: 5,
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
    width : 100,
    height : 45,
  },
  buttonText : {
    color : 'white',
    alignSelf : 'center',
    fontWeight : 'bold',
  }
});
export default UserInquiry;