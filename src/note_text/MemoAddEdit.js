import React, {useState, useEffect} from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { SafeAreaView, TextInput, View, Button, TouchableOpacity, Modal, LogBox } from "react-native";
import { Menu, Divider, Provider } from 'react-native-paper';

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function MemoAddEdit(props) {  
  LogBox.ignoreLogs(['Setting a timer']);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(()=>{
    // console.log(props.memo);
    setTitle(props.memo.title);
    setContent(props.memo.content);
  },[props.id]);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  function renew() {
    async function sendData () {
      try {    
      const result = props.id
      // console.log(result);
        ? console.log("update")
        : add()
      props.hide();}
      catch (e){
        console.log("error:"+e);
      }
    }
    sendData();
  }

  async function add() {
    try {
      const docRef = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").add({
        title: title,
        content: content
      });
      console.log(docRef.id);
      setTitle("");
      setContent("");
      props.hide();
    }
    catch(error) {
      console.error("Error adding document: ", error);
    }
  }

  // async function update(id) {
  //   //未成功
  //   // const docRef = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").doc(id).set({
  //   //   title: title,
  //   //   content: content
  //   // });
  //   // setTitle(props.memo.title);
  //   console.log("success!");
  // }

  function cancel(){
    setTitle("");
    setContent("");
    props.hide();
  }

  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={props.modalVisible}>
        <Header
          style={{flex: 1}}
          containerStyle={{height: 60}}
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                console.log("Cancelled");
                cancel();
              }}
            >
              <Icon name="arrow-back" color='#fff' />
            </TouchableOpacity>
          }
          centerComponent={{ text: 'Memo', style: { color: '#fff', fontSize: 20 } }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                console.log("Open menu");
              }}
            >
              <Icon name="more-vert" color='#fff' />
            </TouchableOpacity>
          }
        />

        <View style={{flex: 2}}>
          <TextInput
            placeholder="標題"
            style={styles.topicInput}
            value={title} 
            onChangeText={text=>setTitle(text)}
          />
          <TextInput
            placeholder="請輸入記事內容..."
            style={styles.noteInput}
            multiline={true}
            value={content} 
            onChangeText={text=>setContent(text)}
          />
        </View>
        <Button style={{flex: 1}} onPress={renew} title="確定"/>
      </Modal>
    </SafeAreaView>

    
 );
}