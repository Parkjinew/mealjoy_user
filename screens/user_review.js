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
  Platform,
  TextInput,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
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
      <Text style={[styles.headerText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>리뷰</Text>
    </View>
      <View style={styles.divider} />
    </View>
  );
};


const ReviewCard = ({ review, userInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImagePress = (img) => {
    setSelectedImage(img);
    setModalVisible(true);
  };

  const imagesArray = review.reviewImg || [];
    // 별점을 렌더링하는 함수
    const renderStars = () => {
        return Array.from({ length: review.review.score }, (_, i) => (
          <AntDesign key={i} name="star" size={13} color="#ffd700" />
        ));
      };
      
  
    // 이미지를 렌더링하는 함수
    const renderImages = () => {
        // 이미지 URI 배열이 주어지지 않았거나 비어있으면 아무것도 렌더링하지 않습니다.
        if (!review.reviewImg || review.reviewImg.length === 0) {
          return null;
        }
  
      const imagesArray = Array.isArray(review.reviewImg) ? review.reviewImg : [review.reviewImg];
      
      
      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {imagesArray.map((img) => {
            // URI가 문자열이 아니라면, 즉 로컬 이미지 리소스라면 그대로 사용
            if (typeof img.imageFilename !== 'string') {
              return <Image key={img.img_seq} source={{uri:img.img_filename}} style={styles.reviewImage} />;
            }
            // 원격 이미지 URI 처리 (예시로 http 또는 https로 시작하는 경우만 유효하다고 가정)
            if (img.imageFilename.startsWith('http') || img.imageFilename.startsWith('https')) {
              return <Image key={img.img_seq} source={{uri:img.img_filename}} style={styles.reviewImage} />;
            }
            return null; // 유효하지 않은 경우 렌더링하지 않음
          })}
          
        </ScrollView>
      );
    };
  
    return (
        <View style={styles.reviewCard}>
                   
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

    <Image
      source={require('../assets/user.png')}
      style={styles.userImage}
    />
        <Text style={[styles.customerName, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 15 }]}>{review.user_nick}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom:4 }}>
          {renderStars()}
        </View>
        
        <Text style={[styles.reviewTitleText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>{review.review.title}</Text>
        <Text style={[styles.reviewText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 15 }]}>{review.review.details}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imagesArray.map((img, index) => (
          <TouchableOpacity key={index} onPress={() => handleImagePress(img.img_filename)}>
            <Image source={{ uri: img.img_filename }} style={styles.reviewImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <Image source={{ uri: selectedImage }} style={styles.expandedImage} />
        </TouchableOpacity>
      </Modal>


        {review.review.answer && ( // owner 정보가 있을 때만 렌더링
          <View style={styles.ownerContainer}>
             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
             <Image
          source={require("../assets/owner2.png")}
          style={styles.ownerImage}
        />
            <Text style={[styles.ownername, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 13 }]}>사장님</Text>
            </View>
            <Text style={[styles.ownerText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 16 }]}>{review.review.answer}</Text>
          </View>
        )}

      </View>
    );
  };
  
  
  

const RatingSummary = ({ reviews }) => {
  const maxReviews = Math.max(...reviews.map((r) => r.count));

  return (
    <View style={styles.card}>
      <Text style={[styles.cardTitle, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 18 }]}>리뷰 평점</Text>
      {reviews.map((review, index) => (
        <View key={index} style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>{`${review.rating}점`}</Text>
          <View style={styles.ratingBarContainer}>
            <View
              style={[
                styles.ratingBar,
                { width: `${(review.count / maxReviews) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.reviewCount}>{review.count}</Text>
        </View>
      ))}
    </View>
  );
};


const ReviewList = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date");
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' 또는 'replied'
  const [displayLimit, setDisplayLimit] = useState(10); // 초기에 보여질 리뷰 수
  
  const reviewData = {route}.route.params.reviewList;
  const [reviewList, setreviewList] = useState(reviewData);
  const store_seq = {route}.route.params.store_seq
  const reviewsData = [  
    { rating: 5, count: 0 },
    { rating: 4, count: 0 },
    { rating: 3, count: 0 },
    { rating: 2, count: 0 },
    { rating: 1, count: 0 },
  ];




  const updateReviewCounts = (reviewsData, reviewList) => {
    // reviewsData의 구조를 그대로 복사하여 새로운 배열을 만듭니다.
    const updatedReviewsData = reviewsData.map(review => ({ ...review }));
  
    // reviewList를 순회하면서 각 리뷰의 score에 해당하는 rating을 찾아 count를 1 증가시킵니다.
    reviewList.forEach(reviews => {
      const score = reviews.review.score;
      const reviewDataIndex = updatedReviewsData.findIndex(data => data.rating === score);
      if (reviewDataIndex !== -1) {
        updatedReviewsData[reviewDataIndex].count += 1;
      }
    });
  
    return updatedReviewsData;
  };

  const updatedReviewsData = updateReviewCounts(reviewsData, reviewList);
  console.log(updatedReviewsData);


  // 리뷰 데이터에서 답변이 있는 리뷰만 필터링하는 함수
  const repliedReviews = reviewList.filter((review) => review.review.answer);

  // 현재 필터에 따라 보여줄 리뷰 리스트를 결정하는 함수
  const displayedReviews = filter === "all" ? reviewList : repliedReviews;


  const [sortOption, setSortOption] = useState("최신순"); // 기본 정렬 옵션을 '랭킹순'으로 설정합니다.
  
  const handleShowMore = () => {
    setDisplayLimit((prevLimit) => prevLimit + 10); // 현재 표시 제한을 10 증가
  };
  useEffect(() => {
    // 정렬 로직 (랭킹순으로 정렬)
  }, [sortOption]);

  // 랭킹순 버튼을 눌렀을 때의 이벤트 핸들러
  const handleSortPress = () => {
    setModalVisible(true);
  };

  // 정렬 옵션 선택 시 이벤트 핸들러
  const handleSelectSortOption = async(option) => {
    console.log(`선택된 정렬 옵션: ${option}`);
    // sortOption 상태를 업데이트합니다.
    // 여기서는 예시로 상태를 로그로 출력하고 있습니다.
    // 실제 애플리케이션에서는 이 상태를 바탕으로 리뷰 목록을 정렬해야 합니다.
    setSortOption(option);

    try{
      const response = await axios.post('https://18.188.101.208:8090/botbuddies/reviewAlign',{option:option, store_seq:store_seq})
      setreviewList(response.data)

    }catch(error){
      console.error(error);
    }

    // 모달을 닫습니다.
    setModalVisible(false);
  };

  const SortMenu = ({ visible, onClose, onSelect }) => {

    const handleModalOuterPress = (e) => {
        if (e.target === e.currentTarget) { // 모달 내용이 아닌 바깥 부분을 터치했는지 확인
          onClose(); // 모달 닫기
        }
      };
      

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >

        <TouchableOpacity
        style={styles.centeredView}
        activeOpacity={1}
        onPress={handleModalOuterPress} // 모달 바깥 부분 터치 시 핸들러 호출
      >
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
            {["최신순", "별점 높은순", "별점 낮은순"].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalButton}
                onPress={() => onSelect(option.toLowerCase())}
              >
                <Text style={[styles.modalButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
            <Text style={[styles.modalButtonText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 16 }]}>닫기</Text>
          </TouchableOpacity>
          </View>
          </TouchableOpacity>
      </Modal>
    );
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
    <SafeAreaView style={styles.safeArea}>
    <Header />
    <ScrollView>
      <RatingSummary reviews={updatedReviewsData} />
      <View style={styles.divider} />
      <View style={styles.headerContainer}>
        <Text style={[styles.subText, { fontFamily: 'KBO-Dia-Gothic_medium', fontSize: 20 }]}>최근 리뷰 {reviewList.length}개</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.sortButtonContainer}>
          <Text style={[styles.sortButtonText, { fontFamily: 'KBO-Dia-Gothic_light', fontSize: 15 }]}>{sortOption}</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {displayedReviews.slice(0, displayLimit).map((review) => (
          <ReviewCard key={review.review.review_seq} review={review} />
          ))}
        {reviewList.length > displayLimit && (
            <TouchableOpacity onPress={handleShowMore} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>+     더보기</Text>
          </TouchableOpacity>
        )}
        </ScrollView>
    <SortMenu
      visible={modalVisible}
      onClose={() => setModalVisible(false)}
      onSelect={handleSelectSortOption}
    />

      {/* 탭 바 및 기타 UI 요소 */}
    

      {/* 탭 바 부분 */}

      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  reviewImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  expandedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },


  userImage: {
    width: 40, // 사진의 너비
    height: 40, // 사진의 높이
    borderRadius: 20, // 원형 사진을 만들기 위해 너비와 높이의 반으로 설정
    marginRight: 5, // 닉네임과의 간격
  },
  
  ownerImage: {
    width: 40, // 사진의 너비
    height: 40, // 사진의 높이
    borderRadius: 20, // 원형 사진을 만들기 위해 너비와 높이의 반으로 설정

  },
    safeArea: {
      flex: 1,
      backgroundColor: "#fff", // SafeAreaView 색상을 배경색과 일치시키기
     },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      marginRight: 160,
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
    modalContent: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 20,
      width: "100%",
      maxHeight: "50%",
    },
    modalButton: {
      paddingVertical: 15,
      borderBottomColor: "#ccc",
    },
    modalButtonText: {
      fontSize: 16,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 16,
      borderColor: "rgba(255, 0, 0, 0.3)",
      borderWidth: 1,
      margin: 10,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
    },
    ratingRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    ratingLabel: {
      fontSize: 16,
      width: 40,
    },
    ratingBarContainer: {
      flex: 1,
      height: 10,
      backgroundColor: "#e0e0e0",
      borderRadius: 5,
      marginHorizontal: 10,
    },
    ratingBar: {
      height: 10,
      backgroundColor: "#ff3b30",
      borderRadius: 5,
    },
    reviewCount: {
      fontSize: 16,
    },
    reviewCard: {
      margin: 10,
      padding: 20,
      borderRadius: 6,
      // iOS용 그림자 스타일
      shadowColor: "#eeeeee", // 그림자 색상
      backgroundColor: 'white', // 그림자가 보이려면 배경색이 있어야 합니다.
    
      // iOS용 그림자 스타일
      shadowColor: '#000', // 그림자 색
      shadowOffset: { width: 0, height: 2 }, // 그림자 방향 (이 경우 아래로)
      shadowOpacity: 0.25, // 그림자 투명도
      shadowRadius: 3.84, // 그림자 블러 반경
      
      // Android용 그림자 스타일
      elevation: 5, // Android에서는 elevation으로 그림자를 조절
    

    },
    customerName: {
      fontWeight: "bold",
      fontSize: 15,
    },
    reviewTitleText:{
      fontWeight: "bold",
      fontSize: 18,
      marginTop:5,
      marginBottom:5
    },
    reviewText:{
        fontSize: 16,
      marginBottom:5
    },
    reviewImage: {
      width: 100, // 이미지 크기에 맞게 조절해주세요.
      height: 100, // 이미지 크기에 맞게 조절해주세요.
      resizeMode: "cover",
      marginVertical: 5,
      marginRight: 10,
      borderRadius: 10,
    },
    ownerResponseInput: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 4,
      padding: 5,
    },
    filterButtonContainer : {
      flexDirection : 'row',
      justifyContent: 'space-around',
      padding : 10,
    },
    filterButton : {
      width : 150,
      height : 50,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 24,
      alignItems : 'center',
      justifyContent : 'center',
    },
    subText: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 10,
    },
    divider: {
        height: 1, // 구분선의 두께
        backgroundColor: '#e0e0e0', // 구분선 색상
        marginVertical: 10, // 위 아래 마진
    }, 
    centeredView: {
        flex: 1,
        justifyContent: "flex-end", // 하단 정렬
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
      modalView: {
        width: '100%', // 화면 너비와 일치
        maxHeight: '50%', // 화면의 절반 크기
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      modalButton: {
        marginVertical: 13,
      },
      modalButtonText: {
        fontSize: 18,
        alignSelf : 'center'
      },
      closeButtonContainer: {
        marginTop: 20,
        padding: 10,
        borderRadius: 15, // 버튼 모서리 둥글게
        alignSelf: 'center', // 이 버튼만 가운데 정렬
      },
      closeButtonText: {
        fontSize: 18,
      },
      sortButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ff3b30",
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? 40 : 10,
        padding:8
      },
      sortButtonContainer: {
        flexDirection: 'row', // 아이콘과 텍스트를 가로로 나란히 배열합니다.
        alignItems: 'center', // 세로축(center)을 기준으로 아이콘과 텍스트를 중앙 정렬합니다.
        backgroundColor: "#fff", // 배경색
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255, 0, 0, 0.7)",
      },
      sortButtonText: {
        color: "black",
        fontSize: 16,
        marginRight: 5, // 텍스트와 아이콘 사이의 간격
      },
      // 대충 만든거 삭제 쌉가넝
      categoryImage:{
        width:150,
        height:150,
      },
      // 더보기 버튼 스타일
      showMoreButton: {
        width: 150, // 버튼 폭 설정
        justifyContent: 'center', // 수평 중앙 정렬
        marginVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 30, // 좌우 패딩을 줄임
        paddingVertical: 10, // 상하 패딩을 줄임
        borderRadius: 15, // 둥근 모양을 조정
        borderColor: "#ff3b30",
        backgroundColor: "#ff3b30",
        marginLeft:120,
      },
      showMoreButtonText: {
        fontSize: 15, // 텍스트 크기 조정
        color: '#fff', // 텍스트 색상
      
      },
      // 사장답글 박스
      ownerContainer: {
        backgroundColor: '#f2f2f2', // 연한 회색 바탕색
        padding: 10, // 적절한 패딩 설정
        borderRadius: 6, // 둥근 모서리 조정
        marginTop: 5, // owner 정보와 리뷰 텍스트 사이의 간격 조정
    },
    ownerText: {
        fontSize: 16, // 적절한 폰트 크기 설정
    },
    ownername:{
        fontWeight:'bold',
    }
      
  });
export default ReviewList;