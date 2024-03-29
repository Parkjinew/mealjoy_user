import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView,SafeAreaView,
  KeyboardAvoidingView, Alert,
  Platform,TouchableWithoutFeedback,Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Locations } from "@env";
import * as Font from 'expo-font';
const images = [
  { id: '0', uri: require('../assets/all.png'), label: '전체' },
  { id: '1', uri: require('../assets/bibi.png'), label: '한식' },
  { id: '2', uri: require('../assets/coffe.png'), label: '카페/디저트' },
  { id: '3', uri: require('../assets/chin.png'), label: '중국집' },
  { id: '4', uri: require('../assets/ddok.png'), label: '분식' },
  // 2번째 줄
  { id: '5', uri: require('../assets/bugger.png'), label: '버거' },
  { id: '6', uri: require('../assets/chick.png'), label: '치킨' },
  { id: '7', uri: require('../assets/pizza.png'), label: '피자/양식' },
  { id: '8', uri: require('../assets/don.png'), label: '일식/돈까스' },
  // 3번째 줄
  { id: '9', uri: require('../assets/sand.png'), label: '샌드위치' },
  { id: '10', uri: require('../assets/tang.png'), label: '찜/탕' },
  { id: '11', uri: require('../assets/jok.png'), label: '족발/보쌈' },
  { id: '12', uri: require('../assets/sal.png'), label: '샐러드' },
  { id: '13', uri: require('../assets/noddle.png'), label: '아시안' },
  { id: '14', uri: require('../assets/bentto.png'), label: '도시락/죽' },
  { id: '15', uri: require('../assets/shushi.png'), label: '회/초밥' },
  { id: '16', uri: require('../assets/meet.png'), label: '고기/구이' },
  {id:'17'},
  {id:'18'},
  {id:'19'}

  // ... 더 많은 이미지를 추가할 수 있습니다.
];
const dismissKeyboard = () => Keyboard.dismiss();
const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        bold: require('../assets/fonts/KBO Dia Gothic_bold.ttf'),
        medium: require('../assets/fonts/KBO Dia Gothic_medium.ttf'),
        light: require('../assets/fonts/KBO Dia Gothic_light.ttf')
      });
    }

    loadFonts();
  }, []);



  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setIsLoggedIn(true);
        setUserInfo(JSON.parse(storedUserInfo));
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    };

    fetchUserInfo();
  }, []);


  const handleHeartIconPress = async () => {
    if (isLoggedIn) {
      // 사용자가 로그인 상태일 때 수행할 작업
      try {
        // 예를 들어, 사용자 ID를 서버로 보내 관심 매장 목록을 요청하는 경우
        const response = await axios.post('http://119.200.31.63:8090/botbuddies/favorite', {id : userInfo[0].user_id});
        // 서버로부터 받은 데이터를 처리
       navigation.navigate('FavoriteStore', {FavoriteStore : response.data});
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    } else {
      // 로그인 상태가 아닐 때 로그인 화면으로 이동
      navigation.navigate('HomeLogin');
    }
  };


  const handleUserIconPress = () => {
    if (isLoggedIn) {
      // 사용자가 로그인 상태면, 개인정보수정 페이지로 네비게이션
      navigation.navigate('SettingsScreen');
    } else {
      // 사용자가 로그인 상태가 아니면, 로그인 페이지로 네비게이션
      navigation.navigate('HomeLogin');
    }
  };

  const [searchQuery, setSearchQuery] = React.useState('');
    const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState('동구 대명동');
  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // 키보드가 보일 때
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // 키보드가 숨겨질 때
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const storeList = async (id) => {
    try{
      const response = await axios.post('http://211.227.224.159:8090/botbuddies/storeList', {id : id})

      navigation.navigate('Store', {data: response.data, id : id, align:"align", selectedAddress:selectedAddress})

    } catch (error){
      console.error(error);
    }
  }
                                                                                                                          

      const [latitude, setLatitude] = useState(null);
      const [longitude, setLogitude] = useState(null);
  
      const geoLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('위치 정보 접근 권한이 거부되었습니다.');
          return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        // 여기서 필요한 위치 정보 처리를 할 수 있습니다.
        
        // 예: setSelectedAddress(`위도: ${location.coords.latitude}, 경도: ${location.coords.longitude}`);
        const { latitude, longitude } = location.coords;

    reverseGeocode(latitude, longitude);
      };
      const reverseGeocode = async (latitude, longitude) => {
        try {
          let response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Locations}&language=ko`
          );
          let responseJson = await response.json();
          if (responseJson.results.length > 0) {
            const address = responseJson.results[0].formatted_address;
            console.log(address);
            await saveAddress(address); // 선택된 주소를 저장
            setSelectedAddress(address); // 화면에 표시될 주소 상태 업데이트
          }
        } catch (error) {
          console.error(error);
        }
      };
  // const showChangeAddressPopup = () => {
  //   Alert.alert(
  //     "주소 변경",
  //     "주소를 변경하시겠습니까?",
  //     [
  //       {
  //         text: "현재 위치로 설정",
  //         onPress: () => {
  //           console.log("직접 주소 설정 화면으로 이동");
  //           // 직접 주소 설정 화면으로 이동하는 로직을 여기에 추가하세요.
  //           geoLocation()
  //         },
  //       },
  //       {
  //         text: "직접 주소 설정하기",
  //         onPress: () => {
  //           console.log("직접 주소 설정 화면으로 이동");
  //           // 직접 주소 설정 화면으로 이동하는 로직을 여기에 추가하세요.
  //           navigation.navigate('AddressChange', {
  //             onSelect: handleSelectAddress,
  //           });
  //         },
  //       },
  //       {
  //         text: "취소",
  //         onPress: () => console.log("주소 변경 취소"),
  //         style: "cancel",
  //       },
  //     ],
  //     { cancelable: false }
  //     );
    //  };
    
    const showChangeAddressPopup = () => {
      Alert.alert(
        "주소 변경",
        "주소를 변경하시겠습니까?",
        [
          { text: "현재 위치로 설정", onPress: geoLocation },
          { text: "직접 주소 설정하기", onPress: () => {
            navigation.navigate('AddressChange'); // 이 부분을 수정했습니다.
          } }, // 실제 주소 변경 로직 구현
          { text: "취소", onPress: () => console.log("주소 변경 취소"), style: "cancel" },
        ],
        { cancelable: false }
      );
    };

    const handleSelectAddress = async (addressData) => {
      const address = addressData.default_address;
      
      await saveAddress(address); // 선택된 주소를 저장
      setSelectedAddress(address);
      navigation.navigate('SearchResult', { selectedAddress: addressData.default_address });
  };

  const saveAddress = async (address) => {
    await AsyncStorage.setItem('selectedAddress', address);
  };
  
  // 주소 로드
  const isFocused = useIsFocused();
  useEffect(() => {
    // 포커스가 될 때마다 호출됩니다.
    const checkLoginStatus = async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      setIsLoggedIn(!!userInfo); // userInfo가 있으면 true, 없으면 false
    };

    checkLoginStatus();
  }, [isFocused]);
  useEffect(() => {
    if (isFocused) {
      const loadAddress = async () => {
        const address = await AsyncStorage.getItem('selectedAddress');
        if (address) {
          setSelectedAddress(address);
        }
      };
  
      loadAddress();
    }
  }, [isFocused]);

  useEffect(() => {
    const loadAddress = async () => {
      const address = await AsyncStorage.getItem('selectedAddress');
      if (address) {
        setSelectedAddress(address);
      }
    };
  
    loadAddress();
  }, []);
  
  const renderImagesRow = (imagesRow) => {
    return (
      <View style={styles.imagesRow}>
        {imagesRow.map((img) => (
          <TouchableOpacity key={img.id} style={styles.imageTouchable} onPress={() => storeList(img.id)}>
            <Image source={img.uri} style={styles.image} />
            <Text style={[styles.imageLabel, { fontFamily: 'medium', fontSize: 13 }]}>{img.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const Stack = createStackNavigator();
  const handleSearch = async () => {
    try {
      const response = await axios.post('http://119.200.31.63:8090/botbuddies/search_result', JSON.stringify({
        searchQuery: searchQuery
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log(response.data);
      navigation.navigate('SearchResult', { searchData: response.data });
      setSearchQuery('');
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };


  const waitPage = async() => {
    if (isLoggedIn) {
      console.log("호출")
    try{
      const response = await axios.post('http://119.200.31.63:8090/botbuddies/waitInfo', {user_id : userInfo[0].user_id})
      const storeData = await axios.post('http://119.200.31.63:8090/botbuddies/getStoreName', {store_seq : response.data.store_seq})
      navigation.navigate('TableingResult', {waitInfo : response.data, store : storeData.data.store_name})
    } catch(error){
      console.error(error);
    }
  }else{
    navigation.navigate("HomeLogin");
  }
  }

  return (
    
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView style={styles.content}>
    <View style={styles.container}>
      {/* 헤더 영역 */}
      <View style={styles.header}>
      <View style={styles.searchAndIconContainer}>
        <View style={{width:24}}/>
      <Image
    source={require('../assets/logo.png')}
    resizeMode="contain"
    style={styles.logo}
  />

<TouchableOpacity style={styles.bellIcon} onPress={() => navigation.navigate('Recomplete')}>
      <Feather name="bell" size={24} color="black" />
    </TouchableOpacity>
  </View>
   
    <View style={styles.searchSection}>
      <TextInput
        style={styles.searchInput}
        placeholder="지역,음식,메뉴검색"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />
      <TouchableOpacity onPress={handleSearch}>
      <EvilIcons name="search" size={24} color="black" style={styles.searchIcon}/>
      </TouchableOpacity>
    </View>
    
        <View style={styles.dropdownContainer}>
        <TouchableOpacity
  style={styles.dropdown}
  onPress={showChangeAddressPopup }
>
          <Text style={styles.dropdownText}>{selectedAddress} ▼</Text>
        </TouchableOpacity>
        </View>
      </View>
      
     <View>
      {renderImagesRow(images.slice(0, 4))}
      {renderImagesRow(images.slice(4, 8))}
      {renderImagesRow(images.slice(8, 12))}
      {renderImagesRow(images.slice(12, 16))}
      {renderImagesRow(images.slice(16, 19))}
   </View>
      {/* 메인 컨텐츠 영역 */}
     
        {/* 대형 프로모션 카드 */}
        <TouchableOpacity style={styles.promotionCard}>
          <Text style={styles.promotionText}>챗봇 밀조이 셰프!!!</Text>
          <Text style={styles.promotionSubtext}>하단 탭 가운데 아이콘을 눌러보세요!!</Text>
        </TouchableOpacity>    
 </View>
 </ScrollView>
 </KeyboardAvoidingView>
 </TouchableWithoutFeedback>
      {/* 하단 탭 바 */}
      {!keyboardVisible && (
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
        <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => waitPage()} >
        <FontAwesome6 name="users-line" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
        <Ionicons name="chatbubbles" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity  style={styles.tabItem} onPress={handleHeartIconPress}>
          <Icon name="heart" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={handleUserIconPress}>
        <FontAwesome6 name="user" size={24} color="#ff3b30" />
        </TouchableOpacity>
      </View>
 )}
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bellIcon: {
    marginTop:5,
// 벨 아이콘과 검색창 사이의 간격 조정
    // marginTop으로 벨 아이콘의 위치를 미세 조정할 수 있음
    // 벨 아이콘을 살짝 위로 올림
  },

  searchAndIconContainer: {
    flexDirection: 'row', // 로고와 벨 아이콘을 가로로 배치
    justifyContent: 'space-between',
    paddingHorizontal:20,
  },
  searchIcon: {
    padding: 10,
  },
  searchSection: {
    width:300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  dropdownContainer: {
    alignSelf: 'flex-start', // 이 컨테이너 내의 요소를 왼쪽으로 정렬
    width: '100%', // 컨테이너의 너비를 header의 전체 너비로 설정
    paddingBottom:20,
    paddingTop:5
  },
  divider: {
    height: 1, // 선의 두께
    backgroundColor: '#e0e0e0', // 선의 색상
    width: '100%', // 선의 너비를 부모 컨테이너에 맞춥니다.
    marginTop: 1, // 선 위의 여백
    marginBottom: 1, // 선 아래의 여백
  },
  logo: {
    width: 300, // 로고의 너비. 필요에 따라 조절하세요.
    height: 150, // 로고의 높이. 필요에 따라 조절하세요.
    marginBottom: -40, // 로고와 검색 입력란 사이의 마진을 조절합니다.
    marginTop : -60,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // 이 배경색은 상단 노치와 하단 제스처 영역의 배경색입니다.
  },
  keyboardAvoid: {
    flex: 1,
  },
  // ... 다른 스타일들 ...
  tabBar: {
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: '#fff', // 탭 바의 배경색을 설정합니다.
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%', // 가로로 꽉 차게 설정
    marginBottom: 20, // 여백 설정
  },
  imageTouchable: {
    alignItems: 'center', // 이미지와 라벨을 중앙 정렬
  width: 75,
  },
  image: {
    width: 75, // 이미지의 크기 설정
    height: 75, // 이미지의 크기 설정
    borderRadius: 10, // 이미지의 모서리 둥글게
  },
  imageLabel: {
    textAlign:'center',
    marginTop: 5, // 이미지와 글자 사이의 간격을 조정합니다.
    fontSize: 14, // 글자 크기를 조정합니다.
    color: '#000', // 글자 색상을 조정합니다.
    // 여기에 글자에 대한 추가 스타일을 적용할 수 있습니다.
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  header: {
    paddingTop:Platform.OS === 'android' ? 50 : 10,
    padding: 16,
    paddingBottom:-10,
    backgroundColor: '#fff', // '#f53b50'이었지만, 배경을 흰색으로 변경했습니다.
    alignItems: 'center', // 추가: 요소들을 수평 중앙에 정렬합니다.
    
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop : -35,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent', // 배경을 투명하게 설정
    color: '#424242',
  },
  dropdown: {
    marginTop: 8,
  },
  dropdownText: {
    marginTop:10,
    fontSize: 16,
    color: 'black',
    textAlign: 'left',
  },
  content: {
    flex: 1,
    // 컨텐츠 영역 스타일링
  },
  promotionCard: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ffebed',
    alignItems: 'center',
    // 그림자 효과 등 추가
  },
  promotionText: {
    fontSize: 18,
    fontWeight: 'bold',
    // 텍스트 색상 변경 등
  },
  promotionSubtext: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    // 텍스트 색상 변경 등
  },
  tabBar: {
    height: 60,
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  // 탭 아이템 스타일 추가
});

export default Main;