import React, {useState, useEffect} from 'react';
import { Header, ListItem } from 'react-native-elements';
import { SafeAreaView, TextInput, View, Text, FlatList, Modal, TouchableHighlight } from "react-native";
import { Icon, Fab } from "native-base";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

const data =[
  {title:"iPhone 7", content:'000000000000000000000000000=30'},
  {title:"iPhone 8", content:'0123456789101112131415161718>30'},
  {title:"iPhone X", content:'gjfyfftrsgdgdd'},
]

export default function MemoList() { 
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [memos, setMemos] = useState([]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.titlefont}>{item.title}</ListItem.Title>
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
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TouchableHighlight
              style={styles.hideButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <Fab onPress={() => setModalVisible(true)}>
        <Icon ios="ios-add" android="md-add" />
      </Fab> 
    </SafeAreaView>

      
  );
}