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
    Alert
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

// Header 컴포넌트
const Header = ({ navigation }) => {

  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>문의 확인</Text>
        <Ionicons name="arrow-back" size={24} color="white" />
      </View>
    </View>
  );
};

// InquiryForm 컴포넌트
const InquiryCheck = ({route}) => {
    const { inquiryCheck } = route.params;
    const [inquiry, setinquiry] = useState(inquiryCheck);
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.inquiryContainer}>
            {inquiry.map((inquiry, index) => (
                <View key={index} style={styles.inquiryItem}>
                    {/* 문의 제목 */}
                    <Text style={styles.inquiryTitle}>문의 제목</Text>
                    <Text style={styles.inquiryContent}>{inquiry.title}</Text>

                    {/* 문의 내용 */}
                    <Text style={styles.inquiryTitle}>문의 내용</Text>
                    <Text style={styles.inquiryContent}>{inquiry.details}</Text>

                    {/* 관리자 답변이 있을 경우에만 표시 */}
                    {inquiry.answer && (
                        <View style={styles.answerContainer}>
                            <Text style={styles.inquiryTitle}>관리자 답변</Text>
                            <Text style={styles.inquiryContent}>{inquiry.answer}</Text>
                        </View>
                    )}
                </View>
            ))}
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
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        marginBottom: 10,
    },
    inquiryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    inquiryContent: {
        fontSize: 16,
        marginBottom: 20,
        lineHeight: 24,
    },
    answerContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
  safeArea: {
    flex: 1,
    backgroundColor: "#fff", // SafeAreaView 색상을 배경색과 일치시키기
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent:"space-between",
    padding: 10,
    marginBottom: 30,
    marginTop:10
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