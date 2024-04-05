// App.js

import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';


const Test = () => {


    const test = async () => {
        try {
          const response = await axios.get('https://18.188.101.208:8090/botbuddies/test');
      
        } catch (error) {
          console.error("Error during the request:", error);
        }
      };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <TouchableOpacity>

      </TouchableOpacity>
    </View>




  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Test;
