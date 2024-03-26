import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView,Image,Alert } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// 상단 헤더 컴포넌트
const Header = () => {
    const navigation = useNavigation();
    return(
  <View style={styles.header}>
    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
    <View style={styles.headerTitleContainer}>
    <Text style={styles.headerTitle}>리뷰 수정</Text>
    </View>
    <View style={styles.backButton} />
  </View>
);
    };
// 각 리뷰 아이템을 표시하는 컴포넌트
const ReviewItem = ({ review, onEdit, onDelete }) => {
    const navigation = useNavigation();

    const handleDelete = async () => {
        console.log(review.review_seq)
        try {
          // 서버에 DELETE 요청을 보냅니다. 주소와 세부 설정은 실제 환경에 맞게 조정해야 합니다.
          const response = await axios.post('http://119.200.31.63:8090/botbuddies/reviewDelete',{reviewSeq: review.review_seq});
    
          if (response.status >= 200 && response.status < 300) {
            // 요청이 성공적으로 처리되면 상위 컴포넌트의 삭제 핸들러를 호출
            Alert.alert('리뷰삭제', '리뷰가 삭제되었습니다.');
            onDelete(review.review_seq);

          } else {
            // 서버에서 오류 응답을 받은 경우
            console.error('Failed to delete the review.');
          }
        } catch (error) {
          // 네트워크 오류 등의 예외 처리
          console.error('Error:', error);
        }
      };







    const imageUris = review.image_filenames 
                      ? review.image_filenames.split(",").filter(uri => uri && uri.trim() !== "").slice(0, 3) 
                      : [];
    return (
      <View style={styles.card}>
        <Text style={styles.storeName}>{review.store_name}</Text>
        <View style={styles.imageContainer}>
                {imageUris.length > 0 ? (
                    imageUris.map((uri, index) => (
                        <Image key={index} source={{ uri }} style={styles.image} />
                    ))
                ) : (
                    <Text style={styles.empty}></Text>
                )}
            </View>
        <Text style={styles.title}>{review.title} </Text>
          <Text style={styles.cardContent}>{review.details}</Text>
        <View style={styles.starContainer}>
          {/* 별점을 기반으로 별표시하기 */}
          {Array.from({ length: review.score }, (_, index) => (
            <FontAwesome key={index} name="star" size={24} color="orange" />
          ))}
        </View>
        <View style={styles.dateAndActions}>
        <Text style={styles.date}>{`리뷰 날짜: ${review.review_date}`}</Text>
          <TouchableOpacity onPress={onEdit} style={styles.editButton}>
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>삭제</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

// 리뷰 수정 화면의 메인 컴포넌트
const ReviewModify = ({ route }) => {
  // 여기에서 reviews 상태를 초기화할 수 있습니다.
  const [reviews, setReviews] = useState(route.params?.reviewModify || []);




  const handleEditReview = (id, updatedReview) => {
    // 리뷰 수정 로직
  };

  const handleDeleteReview = (reviewSeq) => {
    setReviews(reviews.filter(review => review.review_seq !== reviewSeq));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
  <Header />
  <ScrollView style={styles.scrollView}>
  {reviews.length > 0 ? (
    reviews.map((review) => (
      <ReviewItem
        key={review.review_seq} // 고유 ID를 key로 사용하는 것이 좋습니다.
        review={review}
        onEdit={() => handleEditReview(review.review_seq, review)}
        onDelete={() => handleDeleteReview(review.review_seq)}
      />
    ))
  ):(
    <View style={styles.noReviewsContainer}>
            <Text style={styles.noReviewsText}>작성한 리뷰가 없습니다.</Text>
          </View>
  )
  }
  </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noReviewsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45, // 또는 적절한 값으로 조정
    
  },
  noReviewsText: {
    fontSize: 17,
    color: '#666',
  },
    empty:{
            marginBottom:-20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 좌우 버튼과 타이틀 간 공간 동등 배분
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      headerTitleContainer: {
        position: 'absolute', // 타이틀을 헤더 중앙에 절대 위치
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 8,
        marginTop:10
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 6,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
        borderRadius: 8,
    },
    dateAndActions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 날짜와 버튼들 사이에 공간을 균등하게 배분
        marginBottom: 8,
      },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    marginVertical: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardContent: {
    marginBottom: 8,
  },
  storeName:{
    fontSize: 23,
    fontWeight: 'bold',

  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
    marginBottom:5
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft:-50,
    marginBottom:5
  },
  buttonText: {
    color: 'white',
  },
  // ... (다른 스타일 정의들)
});

export default ReviewModify;
