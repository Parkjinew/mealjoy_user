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








// Header 컴포넌트
const Header = () => {
  return (
    <View>
      <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => console.log("뒤로 가기")}>
        <Ionicons name="arrow-back" size={24} color="#ff3b30" />
      </TouchableOpacity>
      <Text style={styles.headerText}>리뷰</Text>
    </View>
      <View style={styles.divider} />
    </View>
  );
};


const reviewsData2 = [
  {
    customerName: "고객1",
    rating: 5,
    imageUri: [require('../assets/cake.png'),
    require('../assets/cake.png'),
    require('../assets/cake.png')],
    reviewText: "정말 맛있어요 ",
    owner: "맛있게 드쇼"
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: require('../assets/cake.png'),
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  {
    customerName: "고객1",
    rating: 5,
    imageUri: "string",
    reviewText: "정말 맛있어요",
  },
  // ... 더 많은 리뷰들
];
const ReviewCard = ({ review }) => {
    // 별점을 렌더링하는 함수
    const renderStars = () => {
        return Array.from({ length: review.review.score }, (_, i) => (
          <AntDesign key={i} name="star" size={24} color="#ffd700" />
        ));
      };
      
  
    // 이미지를 렌더링하는 함수
    const renderImages = () => {
        // 이미지 URI 배열이 주어지지 않았거나 비어있으면 아무것도 렌더링하지 않습니다.
        if (!review.reviewImg || review.reviewImg.length === 0) {
          return null;
        }
  
      const imagesArray = Array.isArray(review.reviewImg) ? review.reviewImg : [review.reviewImg];
      
      console.log("image", imagesArray)
  
      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {imagesArray.map((img) => {
            // // URI가 문자열이 아니라면, 즉 로컬 이미지 리소스라면 그대로 사용
            // if (typeof uri !== 'string') {
            //   return <Image key={uri.img_seq} source={uri} style={styles.reviewImage} />;
            // }
            // // 원격 이미지 URI 처리 (예시로 http 또는 https로 시작하는 경우만 유효하다고 가정)
            // if (uri.imageFilename.startsWith('http') || uri.imageFilename.startsWith('https')) {
            //   return <Image key={uri.img_seq} source={{ uri:uri.imageFilename }} style={styles.reviewImage} />;
            // }
            // return null; // 유효하지 않은 경우 렌더링하지 않음
            <Image key={img.img_seq} source={{uri : img.imageFilename}} style={styles.reviewImage} />
          })}
          
        </ScrollView>
      );
    };
  
    return (
        <View style={styles.reviewCard}>
        <Text style={styles.customerName}>{review.review.user_id}</Text>
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          {renderStars()}
        </View>
        {renderImages()}
        <Text style={styles.reviewText}>{review.review.details}</Text>
        {review.review.answer && ( // owner 정보가 있을 때만 렌더링
          <View style={styles.ownerContainer}>
            <Text style={styles.ownername}>사장님</Text>
            <Text style={styles.ownerText}>{review.review.answer}</Text>
          </View>
        )}
      </View>
    );
  };
  
  
  

const RatingSummary = ({ reviews }) => {
  const maxReviews = Math.max(...reviews.map((r) => r.count));

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>리뷰 평점</Text>
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

const reviewsData = [
  { rating: 5, count: 5825 },
  { rating: 4, count: 3181 },
  { rating: 3, count: 0 },
  { rating: 2, count: 0 },
  { rating: 1, count: 0 },
];

const ReviewList = ({route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState("date");
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);
  const [filter, setFilter] = useState("all"); // 'all' 또는 'replied'
  const [displayLimit, setDisplayLimit] = useState(10); // 초기에 보여질 리뷰 수

  const reviewList = {route}.route.params.reviewList;
  console.log(reviewList[0])


  // 리뷰 데이터에서 답변이 있는 리뷰만 필터링하는 함수
  const repliedReviews = reviewList.filter((review) => review.review.answer);

  // 현재 필터에 따라 보여줄 리뷰 리스트를 결정하는 함수
  const displayedReviews = filter === "all" ? reviewList : repliedReviews;


  const [sortOption, setSortOption] = useState("ranking"); // 기본 정렬 옵션을 '랭킹순'으로 설정합니다.
  
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
  const handleSelectSortOption = (option) => {
    console.log(`선택된 정렬 옵션: ${option}`);
    // sortOption 상태를 업데이트합니다.
    // 여기서는 예시로 상태를 로그로 출력하고 있습니다.
    // 실제 애플리케이션에서는 이 상태를 바탕으로 리뷰 목록을 정렬해야 합니다.
    setSortOption(option);

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
                <Text style={styles.modalButtonText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={onClose} style={styles.closeButtonContainer}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
          </View>
          </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <Header />
    <ScrollView>
      <RatingSummary reviews={reviewsData} />
      <View style={styles.divider} />
      <View style={styles.headerContainer}>
        <Text style={styles.subText}>최근 리뷰 10개</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.sortButtonContainer}>
          <Text style={styles.sortButtonText}>최신순</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#ff3b30" />
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
      
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
      marginRight: 170,
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
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // 모달 배경을 반투명하게 설정
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
      borderRadius: 6,
      padding: 16,
      borderColor: "#ff3b30",
      borderWidth: 1,
      margin: 10,
      shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
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
      padding: 10,
      borderWidth: 1,
      borderColor: "#ff3b30",
      borderRadius: 6,

    },
    customerName: {
      fontWeight: "bold",
      fontSize: 18,
    },
    reviewText:{
        fontSize: 16,

    },
    reviewImage: {
      width: 150, // 이미지 크기에 맞게 조절해주세요.
      height: 150, // 이미지 크기에 맞게 조절해주세요.
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        paddingHorizontal: 10,
        marginTop: 10,
      },
      sortButtonContainer: {
        flexDirection: 'row', // 아이콘과 텍스트를 가로로 나란히 배열합니다.
        alignItems: 'center', // 세로축(center)을 기준으로 아이콘과 텍스트를 중앙 정렬합니다.
        backgroundColor: "#fff", // 배경색
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor:"#ff3b30",
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
        marginBottom:20,
    }
      
  });
export default ReviewList;