import React, {useState, useEffect} from 'react';
import { Header, ListItem } from 'react-native-elements';
import { SafeAreaView, TextInput, View, Text, FlatList } from "react-native";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

const data =[
  {title:"iPhone 7", content:'000000000000000000000000000>30'},
  {title:"iPhone 8", content:'gjfyfftrsgdgdd'},
]

export default function MemoList() { 

  const renderItem = ({ item, index }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          {
            (item.content.length <= 30) 
            ? <Text>{item.content}</Text>
            : <Text>
                {item.content.substring(0,30)}...
              </Text>
          }
        </ListItem.Content>
      </ListItem>
    );
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

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
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
      </View>
      
    </SafeAreaView>

      
  );
}