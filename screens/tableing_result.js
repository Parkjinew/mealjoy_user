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

// Header 컴포넌트
const Header = ({ totalCafes, onSortPress }) => {
  // 이 함수에서 sortOption과 setSortOption을 제거하였습니다.
  return (
    <View>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => console.log("뒤로 가기")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>나의 원격 줄서기 내역 </Text>
      </View>
      <View style={styles.divider} />
    </View>
  );
};



const TableingResult = ({route}) => {
  console.log({route}.route.params);
  const store = {route}.route.params.store;
  const wait = {route}.route.params.waitInfo;

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Your scrollable content */}
      <Header/>
      <HorizontalDivider />
      <View style={styles.detailBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>{store}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>이용예정</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>예약 일시</Text>
          <Text style={styles.detailValue}>{wait.create_at}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>대기번호</Text>
          <Text style={styles.detailValue}>{wait.wait_num}번</Text>
        </View>
         <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>인원</Text>
          <Text style={styles.detailValue}>{wait.people_num}명</Text>
        </View> 
        <View style={styles.wait}>
          <Text style={styles.detailwait}>남은 대기팀 : {wait.count}팀</Text>
         
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>매장상세보기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>대기등록취소</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer navigation bar */}
      {/* Include icons or images for the navigation bar as needed */}

      </ScrollView>
       <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
        <Entypo name="home" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchResult')}>
          <Icon name="search" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ChatBot')}>
        <FontAwesome5 name="robot" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FavoriteStore')}>
          <Icon name="heart" size={24} color="#ff3b30" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
        <FontAwesome6 name="user" size={24} color="#ff3b30" onPress={() => navigation.navigate('Setting')}/>
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
  
  scrollView: {
    flex: 1,
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
    paddingBottom: 40, // 추가적인 하단 여백을 제공합니다
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailBox: {
    alignSelf: 'center', // 컴포넌트를 부모의 중앙에 배치
    width: '90%', // 전체 가로 너비의 90%를 차지하도록 설정
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ff3b30',
    padding: 30, // 내부 여백을 늘림
    marginTop: 70, // 상단 여백 추가
    marginBottom: 60, // 하단 여백 추가
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
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,  // This sets the width of the border
    borderColor: '#ff3b30',  // This sets the color of the border
  },
  actionButtonText: {
    color: 'black',
  },
  headerContainer: { //여기조절(원격줄서기 내역)
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'left', // 텍스트 왼쪽 정렬
  },

  horizontalDivider: {
    height: 1,
    backgroundColor: '#E9E9E9',
    marginTop: 0,
    marginBottom: 100,
  },
  
});

export default TableingResult;
