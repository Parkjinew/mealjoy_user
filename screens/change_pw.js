import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert } from 'react-native';
import { Ionicons, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // 
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


const ChangePassword = () => {
  // 설정 항목의 state와 로직이 필요하면 여기에 추가하세요.
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleChangePassword = () => {
    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (newPassword === confirmPassword) {
      // 일치하면 비밀번호 변경 로직 수행
      // 여기에 비밀번호 변경 로직을 작성하세요.
      Alert.alert('비밀번호가 성공적으로 변경되었습니다.');
       navigation.navigate('Setting');
    } else {
      // 일치하지 않으면 알림 표시
      Alert.alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    }
  };
return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
      <TouchableOpacity style={styles.backbutton} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>비밀번호 변경</Text>
      </View>

      <ScrollView >
     
        <View style={styles.infoItem}>
          <Text style={styles.infoText}>새로운 비밀번호를 입력해주세요</Text>    
        </View>
        <View style={styles.nicksetting}>
        <TextInput
            style={styles.input}
            placeholder="새 비밀번호"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
        <View style={styles.nicksetting}>
           <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
    </View>


      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={handleChangePassword}>
        <Text style={styles.setting}>변경 완료</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backbutton:{
    zIndex:666
  },
    nicksetting:{
        backgroundColor:'#efefef',
        alignSelf:'center',
        width:350,
        height:45,
        borderRadius:5,
        marginBottom:10
    },
    input:{
        paddingTop:13,
        paddingLeft:10
    },

    setting:{
        fontSize:18,
        color:'white',
        fontWeight:'bold'
    },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:-20
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
    backgroundColor: '#fff',
    paddingTop:15
  },
  tabItem: {
    backgroundColor: 'gray',
    borderRadius: 3,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    width: 350
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomColor: '#efefef',
    paddingBottom:20,
    paddingTop:20
  },
  infoText: {
    fontSize: 16,
    fontWeight:'bold'
  },
  valueText: {
    color: '#8e8e8e',
  },
  footer: {
    padding: 10,
    alignItems:'center',
  },
  button: {
    backgroundColor: '#ff3b30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    marginTop: 10,
    padding: 15,
    borderRadius: 5,
    borderColor: '#ff3b30',
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'bold',
  },
  // 여기에 추가 스타일을 정의하세요.
});



export default ChangePassword;
