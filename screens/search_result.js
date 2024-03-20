import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const SearchResult = ({ route }) => {
    const navigation = useNavigation();
    const { searchData } = route.params;
    console.log(searchData);
    const [selectedAddress, setSelectedAddress] = useState('동구 대명동');
    const [restaurants, setRestaurants] = useState(searchData);
    

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

    const [favorites, setFavorites] = useState({});

    const toggleFavorite = (id) => {
        setFavorites((currentFavorites) => ({
            ...currentFavorites,
            [id]: !currentFavorites[id],
        }));
    };
    const handleSelectAddress = (addressData) => {
      setSelectedAddress(addressData.default_address);
    };
    const renderRestaurants = () => {
        const restaurantItems = [];
        for (let i = 0; i < restaurants.length; i++) {
            const item = restaurants[i];
            restaurantItems.push(
                <View key={item.store_seq} style={styles.restaurantItem}>
                    <TouchableOpacity>
                        <Image source={require('../assets/cake.png')} style={styles.restaurantImage} />
                    </TouchableOpacity>
                    <View style={styles.restaurantDetailContainer}>
                        <View style={styles.restaurantNameAndIcon}>
                            <Text style={styles.restaurantName}>{item.store_name}</Text>
                          
                        </View>
                        <Text style={styles.restaurantCategory}>{item.category_seq}</Text>
                        <View style={styles.restaurantRatingContainer}>
              <FontAwesome name="star" size={16} color="#ffd700" />
                <Text style={styles.restaurantRating}> {item.averageRating}</Text>
                      </View>
                        <Text style={styles.restaurantReviews}>{item.reviewCount}개의 리뷰</Text>
                    </View>
                </View>
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
                                style={styles.searchInput}
                                placeholder="지역,음식,메뉴검색"
                                placeholderTextColor="#888"
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('SearchResult')}>
                                <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.dropdownContainer}>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => {
                                  navigation.navigate('AddressChange', {
                                    onSelect: handleSelectAddress,
                                  });
                                }}
                            >
                                <Text style={styles.dropdownText}>{selectedAddress} ▼</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderRestaurants()}
                </ScrollView>
            </KeyboardAvoidingView>

            {/* 하단 탭 바 */}
            {!keyboardVisible && (
                <View style={styles.tabBar}>
                    <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Main')}>
                        <Entypo name="home" size={24} color="#ff3b30" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchResult')}>
                        <Icon name="search" size={24} color="#ff3b30" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
                        <FontAwesome name="wechat" size={24} color="#ff3b30" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <Icon name="heart" size={24} color="#ff3b30" onPress={() => navigation.navigate('Store')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabItem}>
                        <FontAwesome6 name="user" size={24} color="#ff3b30" />
                    </TouchableOpacity>
                </View>
            )}

        </SafeAreaView>
    );
};

    const styles = StyleSheet.create({
      restaurantRatingContainer:{
        flexDirection: 'row'
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
            elevation: 3,
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
          // marginTop으로 벨 아이콘의 위치를 미세 조정할 수 있음
          // 벨 아이콘을 살짝 위로 올림
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