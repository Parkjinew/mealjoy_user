import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Button,
  TextInput,
    Alert,
    Platform,
    ActivityIndicator
} from "react-native";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Font from 'expo-font';
// Header 컴포넌트
const Header = () => {
    const navigation = useNavigation();
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={[styles.headerText,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>문의 확인</Text>
        <Ionicons name="arrow-back" size={24} color="white" />
      </View>
    </View>
  );
};

// InquiryForm 컴포넌트
const InquiryCheck = ({route}) => {
    const { inquiryCheck } = route.params;
    const [inquiry, setinquiry] = useState(inquiryCheck);
  
const [fontsLoaded, setFontsLoaded] = useState(false);

    const hasInquiries = inquiry && inquiry.length > 0;


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
         <Header />
    <ScrollView style={styles.inquiryContainer}>
    {hasInquiries ? (
            inquiry.map((inquiry, index) => (
                <View key={index} style={styles.inquiryItem}>
                    {/* 문의 제목 */}
                    {/* <Text style={[styles.inquiryTitle,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>문의 제목</Text> */}
                    <Text style={[styles.inquiryContent,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>Q : {inquiry.title}</Text>

                    {/* 문의 내용 */}
                    {/* <Text style={[styles.inquiryTitle,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>문의 내용</Text> */}
                    <Text style={[styles.inquiryContent,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 16 }]}>{inquiry.details}</Text>

                    {/* 관리자 답변이 있을 경우에만 표시 */}
                    {inquiry.answer && (
                        <View style={styles.answerContainer}>
                            <Text style={[styles.inquiryTitle,{ fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>A : 관리자</Text>
                            <Text style={[styles.inquiryContent2,{ fontFamily: 'KBO-Dia-Gothic_light', fontSize: 16}]}>{inquiry.answer}</Text>
                        </View>
                    )}
                </View>
            ))
            ) : (
                <Text style={styles.noInquiriesText}>문의내역이 없습니다.</Text>
            )}
        </ScrollView>
        </SafeAreaView>
  );
};



const styles = StyleSheet.create({

    inquiryContainer: {
        flex: 1,
        backgroundColor: "#fff",
        
    },
    inquiryItem: {
        padding: 20,
        backgroundColor: "#fff",
        marginBottom: 30,
        marginHorizontal: 10,
        borderRadius: 5,
        // iOS 그림자
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        // Android 그림자
        elevation: 3,
    },
    noInquiriesText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    // 스크롤뷰 스타일 추가
    scrollView: {
        flex: 1,
    },
    inquiryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inquiryContent2: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
    },
    inquiryContent: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
    },
    answerContainer: {
      width:"100%",
        marginTop: 10,
        paddingHorizontal: 15, // 좌우 패딩 조정
        paddingVertical: 10, // 상하 패딩 조정
        backgroundColor: "#eeeeee", // 말풍선 배경색 설정
        borderRadius: 10, // 테두리 둥글게 설정
        alignSelf: 'flex-start', // 말풍선을 왼쪽 정렬
        // iOS 전용 그림자
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        // Android 전용 그림자
        elevation: 2,
    },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // SafeAreaView 색상을 배경색과 일치시키기
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    padding: 10,
    marginBottom: 5,
    marginTop:10,
    paddingBottom:20,
    borderBottomWidth:1,
    borderColor:"#eeeeee",
    marginTop:Platform.OS === "android"? 40 :0
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
    padding: 15,
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
export default InquiryCheck;