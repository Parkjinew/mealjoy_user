import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
  Linking,
  Platform,
  AppState,
} from "react-native";
import {
  Ionicons,
  Entypo,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Octicons,
} from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Location from "expo-location";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';



const HeaderContainer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerText}>마이페이지</Text>
      <TouchableOpacity >
        <Ionicons name="notifications" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const SettingsScreen = () => {
  const [isLocationEnabled, setLocationEnabled] = useState(false); // 위치 정보 사용 상태
  const [isChatbotEnabled, setChatbotEnabled] = useState(false); // 챗봇 활성화 상태를 추가
  const [appState, setAppState] = useState(AppState.currentState); // 현재 앱 상태를 저장할 state
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

  useEffect(() => {
    const getChatbotSetting = async () => {
      const chatbotSetting = await AsyncStorage.getItem('chatbotEnabled');
      if (chatbotSetting !== null) {
        setChatbotEnabled(JSON.parse(chatbotSetting));
      }
    };

    getChatbotSetting();
  }, []);

  const orderlist = async () => {
    console.log(userInfo)
    if (userInfo) { 
      try {
        const response = await axios.post('http://119.200.31.63:8090/botbuddies/orderlist', { id: userInfo[0].user_id });
        navigation.navigate('OrderList', { OrderList: response.data });
      } catch (error) {
        console.error("Error fetching OrderList:", error);
      }
    } else {
      navigation.navigate('HomeLogin');
    }
  };

  const reservaList = async () => {
    console.log(userInfo)
    if (userInfo) { 
      try {
        const response = await axios.post('http://119.200.31.63:8090/botbuddies/reservaList', { id: userInfo[0].user_id });
        navigation.navigate('ReservaList', { ReservaList: response.data });
      } catch (error) {
        console.error("Error fetching ReservaList:", error);
      }
    } else {
      navigation.navigate('HomeLogin');
    }
  };


  const handleReviewManagement = async () => {
    // 서버로부터 데이터를 받아오는 로직 구현
    try {
      const response = await axios.post('http://119.200.31.63:8090/botbuddies/reviewModify', {  id: userInfo[0].user_id });
      navigation.navigate('ReviewModify', { reviewModify: response.data });
    } catch (error) {
      console.error("Error fetching Review Management data:", error);
      // 오류 처리 로직, 필요에 따라 사용자에게 알림 등
    }
  };
 
  const inquiryCheck = async () => {
    // 서버로부터 데이터를 받아오는 로직 구현
    try {
      const response = await axios.post('http://119.200.31.63:8090/botbuddies/inquiryCheck', {  id: userInfo[0].user_id });
      navigation.navigate('InquiryCheck', { inquiryCheck: response.data });
    } catch (error) {
      console.error("Error fetching Review Management data:", error);
      // 오류 처리 로직, 필요에 따라 사용자에게 알림 등
    }
  };

  // 사용자의 위치 정보 사용 권한 상태를 확인하고 업데이트하는 함수
  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setLocationEnabled(status === "granted");
  };
  const handleLogout = async () => {
    // AsyncStorage에서 사용자 정보 제거
    await AsyncStorage.removeItem('userInfo');
    Alert.alert('로그아웃', '성공적으로 로그아웃되었습니다.');
    // 메인 페이지로 이동
    navigation.navigate('Main');
  };
  useEffect(() => {
    checkLocationPermission();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === "active") {
        // 앱이 background에서 active 상태로 변경될 때 권한 상태를 확인합니다.
        checkLocationPermission();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove(); // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
    };
  }, [appState]);

  const handleLocationSwitch = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // 권한이 거부된 경우, 사용자에게 설정으로 이동하도록 안내
      Alert.alert(
        "위치 정보 필요",
        "앱 설정에서 위치 정보 접근을 허용해주세요.",
        [
          { text: "취소", style: "cancel" },
          { text: "설정으로 이동", onPress: () => Linking.openSettings() },
        ]
      );
    } else {
      setLocationEnabled(true); // 권한이 허용된 경우, 상태 업데이트
    }
  };

  // 위치 정보 허용 스위치의 값 변경 핸들러
  const toggleLocationSwitch = async () => {
    if (isLocationEnabled) {
      // 위치 정보가 이미 허용된 상태에서 스위치를 끌 경우, 설정으로 이동 안내
      Alert.alert(
        "위치 정보 변경",
        "설정에서 위치 정보 접근을 변경하실 수 있습니다.",
        [
          { text: "취소", style: "cancel" },
          { text: "설정으로 이동", onPress: () => Linking.openSettings() },
        ]
      );
    } else {
      // 위치 정보 허용이 되어 있지 않을 때 스위치를 켜면 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // 권한이 허용된 경우
        setLocationEnabled(true);
      } else {
        // 권한이 거부된 경우
        setLocationEnabled(false); // 스위치 상태를 업데이트하지 않거나, 사용자에게 추가적인 안내를 제공할 수 있습니다.
        Alert.alert(
          "위치 정보 거부",
          "위치 정보 사용이 거부되었습니다. 앱의 기능을 완전히 사용하려면 위치 정보 접근을 허용해 주세요.",
          [{ text: "확인", style: "cancel" }]
        );
      }
    }
  };

  const toggleChatbotSwitch = async () => {
    const newState = !isChatbotEnabled;
    setChatbotEnabled(newState);
    await AsyncStorage.setItem('chatbotEnabled', JSON.stringify(newState));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <HeaderContainer />
        <View style={{ flex: 1 }}>

          <TouchableOpacity onPress={()=> navigation.navigate("Setting")}>
          <View style={styles.menuItem} >
            <Ionicons name="person-outline" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
            >
              내 정보
            </Text>
          </View>
          </TouchableOpacity>
      
        <TouchableOpacity  onPress={orderlist}>
          <View style={styles.menuItem}>
          <MaterialIcons name="restaurant-menu" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
            >
              주문목록
            </Text>
          </View>
          </TouchableOpacity>

            <TouchableOpacity onPress={reservaList}>
          <View style={styles.menuItem} >
          <FontAwesome6 name="list" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
         
            >
              예약 목록
            </Text>
          </View>
            </TouchableOpacity>


            <TouchableOpacity onPress={()=> navigation.navigate("UserInquiry")}>
          <View style={styles.menuItem}>
            <Entypo name="chat" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
         
            >
              문의하기
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => inquiryCheck()}>
          <View style={styles.menuItem}>
          <Feather name="check-circle" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
         
            >
              문의확인
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleReviewManagement(userInfo[0].user_id)}>
          <View style={styles.menuItem} >
            <MaterialIcons name="rate-review" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
           
            >
              리뷰 관리
            </Text>
          </View>
            </TouchableOpacity>
          {/* 추가 메뉴 아이템 여기에... */}

          <View style={styles.divider} />

          {/* 위치 정보 허용 스위치 */}
          <View style={styles.infoManagementContainer}>
            <Text style={styles.infoManagementText}>위치 정보 허용</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isLocationEnabled ? "white" : "white"}
              ios_backgroundColor={isLocationEnabled ? "#767577" : "white"}
              onValueChange={toggleLocationSwitch}
              value={isLocationEnabled}
            />
          </View>

          {/* 챗봇 활성화 스위치 */}

          <View style={styles.infoManagementContainer}>
            <Text style={styles.infoManagementText}>
              메인페이지 챗봇 비활성화
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isChatbotEnabled ? "white" : "white"}
              ios_backgroundColor={isChatbotEnabled ? "#767577" : "white"}
              onValueChange={toggleChatbotSwitch}
              value={isChatbotEnabled}
            />
          </View>
          <View style={styles.logoutContainer}>
       <TouchableOpacity
     style={styles.logoutButton}
     onPress={handleLogout}> 
    <Text style={styles.logoutButtonText}>로그아웃</Text>
       </TouchableOpacity>
        </View>
        </View>

        

        {/* 탭 바 부분 */}
       
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoutContainer: {
    alignItems: 'center', // 버튼을 컨테이너의 가운데로 정렬
    marginTop: 100, // 위쪽 마진 추가
    marginBottom: 20, // 아래쪽 마진 추가, 필요에 따라 조정
  },
  logoutButton: {
    paddingHorizontal: 20, // 버튼 내부 좌우 패딩
    paddingVertical: 10, // 버튼 내부 상하 패딩
    borderRadius: 25, // 버튼의 모서리를 둥글게
  },
  logoutButtonText: {
    color: "gray", // 텍스트 색상을 흰색으로
    fontSize: 14, // 텍스트 크기 설정
  },
  container: {
    flex: 1,
    backgroundColor:'white'
  },

  menuItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black", // 이 부분은 이미지의 텍스트 색상에 맞게 조정하세요.
  },
  infoManagementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  infoManagementText: {
    fontSize: 16,
  },
  divider: {
    marginVertical: 8,
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingTop:20,
    paddingBottom:30
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;