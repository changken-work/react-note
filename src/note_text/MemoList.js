import React, {useState, useEffect} from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { StatusBar, SafeAreaView, TextInput, View, Text, FlatList, Modal, TouchableHighlight, TouchableOpacity } from "react-native";
import { Fab } from "native-base";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

import MemoAdd from "./MemoAdd";

// const data =[
//   {title:"iPhone 7", content:'000000000000000000000000000=30'},
//   {title:"iPhone 8", content:'0123456789101112131415161718>30'},
//   {title:"iPhone X", content:'gjfyfftrsgdgdd'},
// ]

export default function MemoList() { 
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [memos, setMemos] = useState([
    {title:"iPhone 7", content:'000000000000000000000000000=30'},
    {title:"iPhone 8", content:'0123456789101112131415161718>30'},
    {title:"iPhone X", content:'gjfyfftrsgdgdd'},
  ]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <TouchableOpacity
            onPress={() => setSelected(index)}
          >
            <ListItem.Title style={styles.titlefont}>{item.title}</ListItem.Title>
            {
              (item.content.length <= 30) 
              ? <Text>{item.content}</Text>
              : <Text>
                  {item.content.substring(0,30)}...
                </Text>
            }
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    );
  };

  function update(newMemo){
    setMemos(oldMemos=>[...oldMemos, newMemo]);
    setModalVisible(false);
  }

  function hide(){
    setSelectedId("");
    setModalVisible(false);
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  return (
    <SafeAreaView style={styles.memocontainer}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />

      <Modal animationType="slide" visible={modalVisible}>
        <Header
          containerStyle={{height: 60}}
          leftComponent={
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Icon name="arrow-back" color='#fff' />
            </TouchableHighlight>
          }
          centerComponent={{ text: 'Memo', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={
            <TouchableHighlight
              onPress={() => {
                
              }}
            >
              <Icon name="more-vert" color='#fff' />
            </TouchableHighlight>
          }
        />

        <MemoAdd update={update}/>
        
      </Modal>

      <Fab onPress={() => setModalVisible(true)}>
        <Icon name="add" color='#fff'/>
      </Fab> 
    </SafeAreaView>

      
  );
}