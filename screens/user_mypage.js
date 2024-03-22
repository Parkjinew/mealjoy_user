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

const HeaderContainer = () => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => console.log("뒤로 가기 버튼 클릭")}>
        <Ionicons name="arrow-back" size={24} color="#ff3b30" />
      </TouchableOpacity>
      <Text style={styles.headerText}>마이페이지</Text>
      <TouchableOpacity onPress={() => console.log("알림 버튼 클릭")}>
        <Ionicons name="notifications" size={24} color="#ff3b30" />
      </TouchableOpacity>
    </View>
  );
};

const SettingsScreen = () => {
  const [isLocationEnabled, setLocationEnabled] = useState(false); // 위치 정보 사용 상태
  const [isChatbotEnabled, setChatbotEnabled] = useState(false); // 챗봇 활성화 상태를 추가
  const [appState, setAppState] = useState(AppState.currentState); // 현재 앱 상태를 저장할 state

  // 사용자의 위치 정보 사용 권한 상태를 확인하고 업데이트하는 함수
  const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setLocationEnabled(status === "granted");
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

  const toggleChatbotSwitch = () => {
    setChatbotEnabled(!isChatbotEnabled);
    console.log(
      "챗봇 활성화 상태:",
      !isChatbotEnabled ? "활성화됨" : "비활성화됨"
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        <HeaderContainer />
        <View style={{ flex: 1 }}>
          <View style={styles.menuItem}>
            <Ionicons name="person-outline" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigateToScreen("Profile")}
            >
              내 정보
            </Text>
          </View>

          <View style={styles.menuItem}>
            <FontAwesome name="heart-o" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigateToScreen("Favorites")}
            >
              관심 매장 목록
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Octicons name="check-circle" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigateToScreen("Profile")}
            >
              예약 목록
            </Text>
          </View>

          <View style={styles.menuItem}>
            <Entypo name="chat" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigateToScreen("Profile")}
            >
              문의하기
            </Text>
          </View>

          <View style={styles.menuItem}>
            <MaterialIcons name="rate-review" size={24} color="#ff3b30" />
            <Text
              style={styles.menuItemText}
              onPress={() => navigateToScreen("Profile")}
            >
              리뷰 관리
            </Text>
          </View>

          {/* 추가 메뉴 아이템 여기에... */}

          <View style={styles.divider} />

          {/* 위치 정보 허용 스위치 */}
          <View style={styles.infoManagementContainer}>
            <Text style={styles.infoManagementText}>위치 정보 허용</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isLocationEnabled ? "#ff3b30" : "white"}
              ios_backgroundColor="#3e3e3e"
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
              thumbColor={isChatbotEnabled ? "#ff3b30" : "white"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleChatbotSwitch}
              value={isChatbotEnabled}
            />
          </View>
        </View>

        {/* 탭 바 부분 */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem}>
            <Entypo name="home" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="search" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <FontAwesome5 name="robot" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Icon name="heart" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <FontAwesome6 name="user" size={24} color="#ff3b30" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuItem: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#ff3b30", // 이 부분은 이미지의 텍스트 색상에 맞게 조정하세요.
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
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;