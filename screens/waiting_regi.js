import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, FontAwesome5, Entypo, FontAwesome6 } from '@expo/vector-icons';

const WaitingRegi = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>MealJoy</Text>
      </View>

      <View style={styles.content}>
      <View style={styles.iconAndMessageContainer}>
        <AntDesign name="checkcircle" size={60} color="red" />
        <Text style={styles.confirmationMessage}>박지뉴 고객님!</Text>
        <Text style={styles.confirmationMessage}>웨이팅이 접수 되었습니다.</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailTitle}>웨이팅 번호 : 3번</Text>
          <Text style={styles.detailTitle}>내 웨이팅 : 1분</Text>
          <Text style={styles.detailTitle}>웨이팅 예상시간 : 약 9분</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.confirmButton]}>
            <Text style={styles.buttonText}>완료</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Main')}>
            <Entypo name="home" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('SearchResult')}>
            <FontAwesome name="search" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} >
            <FontAwesome5 name="robot" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('ReviewWrite')}>
            <FontAwesome name="heart" size={24} color="#ff3b30" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('OrderList')}>
            <FontAwesome6 name="user" size={24} color="#ff3b30" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    zIndex: 10,
  },
  headerTitle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  // 기존 스타일은 유지하고, content 스타일만 수정합니다.
  content: {
    alignItems: 'center',
    // justifyContent를 'space-between'으로 변경하여 내부 요소들 사이에 공간을 분배합니다.
    justifyContent: 'space-between',
    // content 뷰의 높이를 적절하게 조정하여 내부 요소들 사이의 공간을 만듭니다. 필요에 따라 값 조정이 가능합니다.
    height: '90%', // 이 값은 여러분의 화면 크기나 내용에 따라 조정될 수 있습니다.
    width: '100%', // 내부 요소들이 화면 전체 너비를 사용하도록 설정합니다.
    paddingVertical: -50, // 상단과 하단에 패딩을 추가하여 간격을 만듭니다.
  },
  // 나머지 스타일은 이전과 동일합니다.
  iconAndMessageContainer: {
    // marginTop을 추가하여 아이콘과 메시지를 내립니다. 필요에 따라 값을 조정할 수 있습니다.
    marginTop: 170, // 이 값은 적절한 간격에 따라 조정하세요.
    alignItems: 'center', // 아이콘과 텍스트를 가운데 정렬합니다.
  },
  confirmationMessage: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 0,
    marginTop: 10,
  },
  detail: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
   
  },
  detailTitle: {
    fontSize: 16,
    marginVertical: 3,
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 50,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  confirmButton: {
    backgroundColor: 'red',
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor: '#fff',
    paddingBottom: 10,
    paddingTop: 10
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },

  // Removed styles.footer for simplicity as it's not being used in this example.
});

export default WaitingRegi;