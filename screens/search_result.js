import React, { useState, useEffect } from 'react';
import { View, Image,Alert, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Locations } from "@env";
import * as Font from 'expo-font';

const SearchResult = ({ route }) => {
    const navigation = useNavigation();
    const { searchData } = route.params;
    console.log(searchData);
    const [selectedAddress, setSelectedAddress] = useState('동구 대명동');
    const [restaurants, setRestaurants] = useState(searchData);
    const [searchQuery, setSearchQuery] = useState('');

    const [keyboardVisible, setKeyboardVisible] = React.useState(false);
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



    useFocusEffect(
      React.useCallback(() => {
          const loadAddress = async () => {
              const address = await AsyncStorage.getItem('selectedAddress');
              if (address) {
                  setSelectedAddress(address);
              }
          };

          loadAddress();
      }, [])
  );

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://18.188.101.208:8090/botbuddies/search_result', JSON.stringify({
        searchQuery: searchQuery
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // 검색 결과를 상태에 반영
      setRestaurants(response.data);
  
      // 검색창 내용 지우기
      setSearchQuery('');
    } catch (error) {
      console.error("Error during the request:", error);
    }
  };
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
            await saveAddress(address);
            setSelectedAddress(address); // 화면에 표시될 주소 상태 업데이트
          }
        } catch (error) {
          console.error(error);
        }
      };
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
    
    };

    const saveAddress = async (address) => {
      await AsyncStorage.setItem('selectedAddress', address);
    };
    
    // 주소 로드
   
    
    useEffect(() => {
      const loadAddress = async () => {
        const address = await AsyncStorage.getItem('selectedAddress');
        if (address) {
          setSelectedAddress(address);
        }
      };
    
      loadAddress();
    }, []);

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

    const categoryLabels = {
      '1': '한식',
      '2': '카페/디저트',
      '3': '중국집',
      '4': '분식',
      '5': '버거',
      '6': '치킨',
      '7': '피자/양식',
      '8': '일식/돈까스',
      '9': '샌드위치',
      '10': '찜/탕',
      '11': '족발/보쌈',
      '12': '샐러드',
      '13': '아시안',
      '14': '도시락/죽',
      '15': '회/초밥',
      '16': '고기/구이',
      
    };

    const storeinfo = async(id) => {
      try{
        const response = await axios.post('http://18.188.101.208:8090/botbuddies/storeinfo', {id : id})
        console.log(response.data);
        navigation.navigate('StoreInfo', response.data);
      } catch(error){
        console.error(error);
      }
      
    }
    
    const renderRestaurants = () => {

      if (restaurants.length === 0) {
        return (  
            <View style={styles.noResultsContainer}>
                <Text style={[styles.noResultsText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>검색 결과가 없습니다.</Text>
            </View>
        );
    }

        const restaurantItems = [];
        for (let i = 0; i < restaurants.length; i++) {
            const item = restaurants[i];
            const categoryLabel = categoryLabels[item.category_seq] || '기타';
            restaurantItems.push(
                    <TouchableOpacity key={item.store_seq} onPress={() => storeinfo(item.store_seq)}
                    style={{ opacity: item.open_state === '0' ? 0.3 : 1.0 }}>
                <View style={styles.restaurantItem}>
                        <Image source={{uri : item.imageFilename}} style={styles.restaurantImage} />
                    <View style={styles.restaurantDetailContainer}>
                        <View style={styles.restaurantNameAndIcon}>
                            <Text style={[styles.restaurantName, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>{item.store_name}</Text>
                            
                        </View>
                        <Text style={[styles.restaurantCategory, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>{categoryLabel}</Text>
                        <View style={styles.restaurantRatingContainer}>
              <FontAwesome name="star" size={16} color="#ffd700" />
                <Text style={[styles.restaurantRating, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 14 }]}> {item.averageRating}</Text>
                      </View>
                        <Text style={[styles.restaurantReviews, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 12 }]}>{item.reviewCount}개의 리뷰</Text>
                    </View>
                </View>
                    </TouchableOpacity>
            );
        }
        return restaurantItems;
    };

    const Stack = createStackNavigator();

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                    <View style={styles.header}>
                        <View style={styles.searchAndIconContainer}>
                            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                                <Ionicons name="arrow-back" size={24} color="#000" />
                            </TouchableOpacity>
                            <Image
                                source={require('../assets/logo.png')}
                                resizeMode="contain"
                                style={styles.logo}
                            />
                            
                            <TouchableOpacity style={styles.bellIcon}>
                                <Feather name="bell" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchSection}>
                            <TextInput
                                style={[styles.searchInput, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 13 }]}
                                placeholder="매장검색"
                                placeholderTextColor="#888"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                            <TouchableOpacity onPress={handleSearch}>
                                <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropdownContainer}>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={showChangeAddressPopup}
                            > 
                                <Text style={[styles.dropdownText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 14 }]}>{selectedAddress} ▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderRestaurants()}
                </ScrollView>
            </KeyboardAvoidingView>

          

        </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
      noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    noResultsText: {
        fontSize: 18,
        color: '#666',
    },
    restaurantCategory:{
        marginBottom:5
    },
      restaurantRatingContainer:{
        flexDirection: 'row',
        marginBottom:5
      },
      backButton:{
        marginTop:7
      },
      heart:{
        paddingRight:20
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
      heartIcon: {
        marginRight: 20, // 아이콘과 이름 사이의 간격을 조
      },
        restaurantcategory:{
            paddingTop:5,
            paddingBottom:5,
        },
        restaurantItem: {
            flexDirection: 'row',
            marginVertical: 8,
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingLeft:15,
            borderBottomWidth:1,
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
          restaurantInfo: {
            justifyContent: 'center',
          },
          restaurantName: {
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom:10,
            marginTop:-15
          },
          ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          restaurantRating: {
            marginLeft: 0,
            fontSize: 14,
          },
          restaurantReviews: {
            fontSize: 12,
            color: '#666',
          },
        bellIcon: {
          marginTop:5,
      // 벨 아이콘과 검색창 사이의 간격 조정
        },
      
        searchAndIconContainer: {
          flexDirection: 'row', // 로고와 벨 아이콘을 가로로 배치
          justifyContent: 'flex-start',
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

      
        // 탭 아이템 스타일 추가
      });

    export default SearchResult;