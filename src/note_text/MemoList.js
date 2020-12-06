import React, {useState, useEffect} from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { StatusBar, SafeAreaView, TextInput, View, Text, FlatList, Modal,  TouchableOpacity } from "react-native";
import { Fab } from "native-base";
import { Button, Menu, Divider, Provider } from 'react-native-paper';

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

import MemoAdd from "./MemoAdd";

export default function MemoList() { 
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [memos, setMemos] = useState([
    // {title:"iPhone 7", content:'000000000000000000000000000=30'},
    // {title:"iPhone 8", content:'0123456789101112131415161718>30'},
    // {title:"iPhone X", content:'gjfyfftrsgdgdd'},
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

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const db = firebase.firestore();

  async function readData(){
    const newMemos=[];
    try {
      // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
      const querySnapshot = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").get();
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().title);
        // console.log(doc.data().content); 
        const newMemo = {
          title:doc.data().title,
          content:doc.data().content,
        }
        newMemos.push(newMemo);       
      });//foreach
      setMemos(newMemos);
    }//try
  catch(e){console.log(e);}
  }//readData

  useEffect(()=>{
    readData();}
    ,[modalVisible]
  );

  function update(newMemo){
    setMemos(oldMemos=>[...oldMemos, newMemo]);
    setModalVisible(false);
  }

  function hide(){
    setSelectedId("");
    setModalVisible(false);
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
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Icon name="arrow-back" color='#fff' />
            </TouchableOpacity>
          }
          centerComponent={{ text: 'Memo', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                openmenu
              }}
            >
              <Icon name="more-vert" color='#fff' />
            </TouchableOpacity>
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