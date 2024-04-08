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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';






const NoticeList = ({route}) => {
    const navigation = useNavigation();
    const NotiList = {route}.route.params.notice
    console.log(NotiList)

    // Header 컴포넌트
const Header = ({ totalCafes, onSortPress }) => {
    // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
    return (
      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() =>navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>나의 알림</Text>
        </View>
        <View style={styles.divider} />
      </View>
    );
  };


    return (
        <SafeAreaView style={styles.safeArea}>
          <Header />
    
          {/* 알림 목록 출력 */}
          <ScrollView>
            {NotiList.map((noti) => (
              <TouchableOpacity key={noti.noti_seq} style={styles.notiItem}>
                <Text>{noti.message}</Text>
              </TouchableOpacity>
            ))}
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
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 129,
  },
 
  icon: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  notiItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
export default NoticeList;