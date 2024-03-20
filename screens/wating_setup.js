import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const WatingSetup = () => {
  const [inputText, setInputText] = useState('');
  const [count, setCount] = useState(4); // 시작 인원수를 4로 설정합니다.
  const [waitingCount] = useState(3); // 현재 대기 인원을 3명으로 설정합니다.

  // 인원수를 증가시키는 함수
  const incrementCount = () => {
    if (count < 10) {
      setCount(prevCount => prevCount + 1);
    }
  };

  // 인원수를 감소시키는 함수
  const decrementCount = () => {
    if (count > 1) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerTitle}>웨이팅</Text>
      </View>
      <Text style={styles.waitingCountText}>현재 {waitingCount}명 대기중</Text>
      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>매장명</Text>
          <Text style={styles.input}>스페셜 나이트 충장점</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.inputGroup}>
          <Text style={styles.label}>본인 포함 식사하실 인원</Text>
          <View style={styles.participants}>
            <TouchableOpacity onPress={decrementCount} style={styles.iconButton}>
              <AntDesign name="minuscircleo" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.count}>{count}</Text>
            <TouchableOpacity onPress={incrementCount} style={styles.iconButton}>
              <AntDesign name="pluscircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.caution}>주의사항</Text>
        {/* 주의사항 내용 */}
        <Text style={styles.precautionsText}>
         - 원격 줄서기 신청 후 매장에 연락없이 방문하지 않으면 사용이 제한될 수 있습니다.
        </Text>
        <View style={styles.divider} />
        <View style={styles.inputGroup}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4}
            onChangeText={setInputText}
            value={inputText}
            placeholder="최대 50자까지 작성 가능"
          />
          <Text style={styles.counter}>요청사항 {inputText.length} / 50</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>줄서기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 20, // Add some bottom margin to space out the header
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 30, // Increase top margin to space out from the waiting count
    padding: 20,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  textArea: {
    
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    // Set a fixed height that can contain at least three lines
    height: 80, // Adjust this value as needed for your layout
  },

  inputGroup: {
   
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
     
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  counter: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  button: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e1e1e1',
    marginVertical: 10,
  },
  iconButton: {
    padding: 10,
  },
  count: {
    fontSize: 16,
    marginHorizontal: 10, // 간격 조정
  },

  precautionsText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10, // Add space below the precautions text
  },
  
  waitingCountText: {
    fontSize: 30, // Increased font size
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', // Ensure text is centered
    marginVertical: 20, // Add vertical margin for spacing
    alignSelf: 'center', // Center in the parent view
  },
  

});

export default WatingSetup;
