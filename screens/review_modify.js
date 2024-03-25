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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  FontAwesome,
  Ionicons,
  Entypo,
  FontAwesome5,
  FontAwesome6,
  AntDesign,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

// Header 컴포넌트
const Header = ({ totalCafes, onSortPress }) => {
  // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => console.log("뒤로 가기")}>
          <Ionicons name="arrow-back" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <Text style={styles.headerText}>리뷰 수정</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};

// ReviewItem 컴포넌트
const ReviewItem = ({ review, onEdit, onDelete, onImageUpdate }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedReview, setEditedReview] = useState(review.text);
  const [editedRating, setEditedRating] = useState(review.rating);
  const [storeImages, setStoreImages] = useState([]);

  // 별점을 표시하는 로직
  const renderStars = (rating, editable = false) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={!editable}
          onPress={() => {
            if (editable) {
              setEditedRating(i);
            }
          }}
        >
          <FontAwesome
            name={i <= rating ? "star" : "star-o"}
            size={15}
            color="orange"
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // 매장 사진 업로드를 위한 함수
  const handleSelectImage = async () => {
    if (storeImages.length >= 3) {
      alert("최대 3개의 이미지만 추가할 수 있습니다.");
      return;
    }
  
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
  
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!pickerResult.cancelled) {
      const imageUri = pickerResult.uri ? pickerResult.uri : pickerResult.assets[0].uri;
      const updatedImages = storeImages.length < 3 ? [...storeImages, imageUri] : storeImages;
      setStoreImages(updatedImages); // Update local state
      onImageUpdate(review.id, updatedImages); // Update parent component state
    }
  };
  
  const handleRemoveStoreImage = (index) => {
    setStoreImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        {/* 매장 이름 표시 */}
        <Text style={styles.cafeName}>{review.cafeName}</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditMode(!isEditMode)}
        >
          <Text style={styles.editButtonText}>
            {isEditMode ? "취소" : "리뷰 수정"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* 이미지 출력 부분 */}
      <View style={styles.imageContainer}>
        {/* 편집된 이미지 미리보기 */}
        {isEditMode || (review.image && review.image !== "")
          ? [...storeImages, review.image]
              .filter((imageUri) => imageUri) // 빈 문자열이 아닌 URI만 필터링
              .map((imageUri, index) => (
                <View key={index} style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.reviewImage}
                    resizeMode="cover"
                  />
                  {/* 이미지 삭제 버튼 */}
                  {isEditMode && (
                    <TouchableOpacity
                      onPress={() => handleRemoveStoreImage(index)}
                      style={styles.deleteImageIcon}
                    >
                      <Ionicons name="close-circle" size={24} color="red" />
                    </TouchableOpacity>
                  )}
                </View>
              ))
          : null}
        {/* 이미지 추가 버튼 */}
        {isEditMode && (
          <TouchableOpacity
            onPress={handleSelectImage}
            style={styles.uploadImageIcon}
          >
            <AntDesign name="pluscircle" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>

      {/* 수정 모드인 경우 리뷰 내용과 별점을 입력할 수 있는 입력 필드 출력 */}
      {isEditMode ? (
        <>
          <TextInput
            value={editedReview}
            onChangeText={setEditedReview}
            style={styles.reviewTextInput}
          />
          <View style={styles.stars}>{renderStars(editedRating, true)}</View>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              setIsEditMode(false);
              // 수정된 리뷰 내용과 별점을 상위 컴포넌트로 전달하여 처리
              onEdit(review.id, editedReview, editedRating);
            }}
          >
            <Text style={styles.saveButtonText}>수정 완료</Text>
          </TouchableOpacity>
        </>
      ) : (
        // 일반 출력 상태일 때는 리뷰 내용과 별점을 표시
        <>
          <View style={styles.reviewContent}>
            <View style={styles.stars}>{renderStars(editedRating)}</View>
            <Text>{review.text}</Text>
          </View>
          <Text style={styles.reviewDate}>{review.date}</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => onDelete(review.id)}
            >
              <Text style={styles.deleteButtonText}>리뷰 삭제</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const ReviewModify = () => {
  const [reviews, setReviews] = useState([
    {
      id: "1",
      cafeName: "한강이 토끼소",
      text: "커피가 맛있어요~^^",
      image: "",
      rating: 4,
      date: "2024-03-05 17:30:00",
    },
    {
      id: "2",
      cafeName: "보미 케이크",
      text: "케이크가 너무 달아요~",
      image: "",
      rating: 3,
      date: "2024-03-04 17:30:00",
    },
    {
      id: "3",
      cafeName: "카페 사랑",
      text: "분위기가 좋네요!",
      image: "",
      rating: 5,
      date: "2024-03-03 17:30:00",
    },
  ]);

  const handleEditReview = (id, text, rating) => {
    // 여기에 DB 업데이트 로직을 추가하세요.
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, text, rating } : review
      )
    );
  };

  const handleDeleteReview = (id) => {
    // 여기에 DB 삭제 로직을 추가하세요.
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleImageUpdate = (reviewId, imageUris) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        // Ensure the images array doesn't exceed 3 items
        const updatedImages = imageUris.slice(0, 3);
        return { ...review, image: updatedImages.join(",") };
      }
      return review;
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onEdit={handleEditReview}
            onDelete={handleDeleteReview}
            onImageUpdate={handleImageUpdate}
          />
        ))}
      </ScrollView>
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
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 129,
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
  reviewItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewTextInput: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    padding: 8,
  },
  reviewContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cafeName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  editButtonText: {
    color: "white",
    fontSize: 12,
  },
  reviewContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginRight: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: "gray",
  },
  deleteButton: {
    width: 58,
    backgroundColor: "#ff3b30",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    fontSize: 12,
    alignSelf: "center",
    color: "white",
  },
  reviewImage: {
    width: 80, // 컨테이너의 전체 너비를 차지하도록 설정
    height: 80, // 고정된 높이
    marginBottom: 10,
    borderRadius: 10, // 이미지의 모서리를 둥글게
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePreviewContainer: {
    marginRight: 10,
  },
  deleteImageIcon: {
    marginTop: -15,
    alignSelf: "center",
    zIndex: 1,
  },
  uploadImageIcon: {
    marginLeft: 10,
  },
});

export default ReviewModify;