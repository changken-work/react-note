import React, {useState, useEffect} from 'react';
import { Header } from 'react-native-elements';
import { SafeAreaView, TextInput, View } from "react-native";

import styles from '../styles';

export default function PersonList() {  

  return (
    <SafeAreaView>
      <View>
        <Header
          leftComponent={{ icon: 'arrow-back', color: '#fff' }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          rightComponent={{ icon: 'more-vert', color: '#fff' }}
        />
      </View>

      <View>
        <TextInput
          placeholder="標題"
          style={styles.topicInput}
        />
        
      </View>
      
    </SafeAreaView>

    
 );
}