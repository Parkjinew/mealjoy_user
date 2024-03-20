import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HorizontalDivider = () => {
  return <View style={styles.horizontalDivider} />;
};

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};


// Header 컴포넌트
const Header = ({ totalCafes, onSortPress }) => {
  // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
  return (
    <View>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => console.log("뒤로 가기")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>나의 예약 내역 리스트</Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};


const ReservaList = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Your scrollable content */}
      <Header/>
      <HorizontalDivider />
      <Card>
      {/* 첫 번째 예약리스트 항목 */}
      <View style={styles.detailBox}>
        {/* 첫 번째 예약 상세 정보 */}
          {/* ... */}
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>홍콩반점</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>이용예정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>예약 일시</Text>
          <Text style={styles.detailValue}>2024-03-06 (수) 19:43</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>요청사항</Text>
          <Text style={styles.detailValue}>내용없음</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>인원</Text>
          <Text style={styles.detailValue}>5명</Text>
        </View>
       
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>매장상세보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>예약취소</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Card>
      <Card>
        {/* ... 추가 예약 항목들 ... */}
        {/* 두 번째 예약리스트 항목 */}
        <View style={styles.detailBox}>
          {/* 두 번째 예약 상세 정보, 텍스트를 원하는 대로 변경하세요 */}
          <View style={styles.detailRow}>
            <Text style={styles.detailTitle}>센세이스시</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>이용완료</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>예약 일시</Text>
            <Text style={styles.detailValue}>2024-03-05 (목) 12:00</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>요청사항</Text>
            <Text style={styles.detailValue}>초밥 위에 생강 추가</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>인원</Text>
            <Text style={styles.detailValue}>8명</Text>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>매장상세보기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>리뷰쓰기</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Card>
      </ScrollView>
        {/* ...하단 탭 바... */}
      
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} >
          <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Icon name="search" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} >
          <FontAwesome5 name="robot" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} >
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
  safeArea: {
    flex: 1,
    backgroundColor: 'white' // 이 색상은 상태 표시줄 배경색과 일치해야 합니다.
  },
  card: {
    // React Native에서는 px 단위 대신 숫자를 사용합니다.
    marginTop: 20,
    marginHorizontal: 18,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ff3b30', // 빨간색 테두리를 회색으로 변경합니다.
    backgroundColor: 'white', // 카드 배경색을 흰색으로 설정합니다.
    padding: 10, // 내부 패딩을 추가하여 내용과 테두리 사이에 공간을 만듭니다.
    marginBottom: 10, // 다음 카드와의 간격
  
    
    // width, height는 대부분 상황에 따라 조정이 필요합니다.
    // 예를 들어, flex를 사용하거나 padding과 margin으로 크기를 조정할 수 있습니다.
     // 예시 padding 값, 필요에 따라 조절하세요.
     // 다음 카드와의 간격
  },
  // 나의 예약리스트 헤더 아래에 밑줄을 추가합니다.
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between', // 왼쪽에 아이콘, 오른쪽에 텍스트를 배치하기 위해 변경
    paddingHorizontal: 10,
    paddingVertical: 5, // 위아래 패딩을 추가하여 헤더의 높이를 조절합니다.
  
    
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
    borderBottomWidth: 1, // 밑줄 추가
   
  },
  detailBox: {
    padding: 16,
    borderRadius: 5, // 둥근 모서리 추가
    borderWidth: 1, // 테두리 추가
    borderColor: '#white', // 테두리 색상
    marginBottom: 10, // 박스 간 간격 추가
    backgroundColor: 'white', // 박스 배경색 설정
  },
  // ... other styles you already have
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingBottom: 10, // 추가적인 하단 여백을 제공합니다
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#white',
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
    flex: 1, // 이전 marginLeft를 제거하고 flex를 사용하여 텍스트를 중앙에 위치시킵니다.
    textAlign: 'center', // 텍스트를 중앙으로 정렬합니다.
  },

   // 예약 상세 정보를 감싸는 박스에 검은색 테두리를 추가합니다.(2개감싸져잇어서 이걸 fff로 해두니사라짐 ㅠ)
   detailBox: {
    borderRadius: 5, // 둥근 모서리를 유지합니다.
    borderWidth: 1, // 테두리 추가
    borderColor: '#fff', // 테두리 색상을 검은색으로 설정합니다.
    padding: 4,
    marginBottom: 5, // 다음 상자와의 간격
    backgroundColor: '#fff', // 박스 배경색을 흰색으로 설정합니다.
  },
  wait: {
 
    flex: 1, // Add this to make sure the container takes full available space
    justifyContent: 'center', // This will vertically center the content
    alignItems: 'center', // This will horizontally center the content
    paddingVertical: 16, // Optional: Add some vertical padding
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailLabel: {
    
    color: 'grey',
  },
  detailwait:{
    fontSize:30,
    fontWeight:'bold',
  },
  detailValue: {
    color: 'black',
  },
  actionRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center', // 중앙으로 정렬
  },
  actionButton: {
    marginLeft: 10, // '매장상세보기' 버튼과 왼쪽 끝 사이의 간격을 조절합니다.
    marginRight: 10, // '예약취소' 버튼과의 간격을 추가합니다.
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'red',
 
  
  },
  actionButtonText: {
    color: 'black',
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
    marginLeft : 129,
  },
 // ...기존의 스타일들...
 headerContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: 'center', // 중앙 정렬을 위해 추가
  padding: 10,
},
headerText: {
  fontSize: 18,
  fontWeight: "bold",
  // marginLeft을 제거하고 아래 스타일 추가
  textAlign: 'left', // 텍스트 중앙 정렬
  flex: 1, // 컨테이너에서 남은 공간을 모두 차지하도록
},
// ...기존의 스타일들...

horizontalDivider: {
  height: 1, // 구분선의 높이를 1로 설정하여 선처럼 보이게 합니다.
  backgroundColor: '#E9E9E9', // 구분선의 색상을 설정합니다.
  marginHorizontal: 12, // 좌우 마진을 12로 설정합니다.
  borderRadius: 2, // 구분선의 모서리를 약간 둥글게 합니다.
},
});




export default ReservaList;
