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
          centerComponent={{ text: '記事', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={{ icon: 'more-vert', color: '#fff' }}
        />
      </View>

      <View>
        <TextInput
          placeholder="標題"
          style={styles.topicInput}
        />
        <TextInput
          placeholder="請輸入記事內容..."
          style={styles.noteInput}
          multiline={true}
        />
      </View>
      
    </SafeAreaView>

    
 );
}