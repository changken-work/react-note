import React, {useState, useEffect} from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { SafeAreaView, TextInput, View, Button, TouchableOpacity, Modal, LogBox } from "react-native";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function MemoAdd(props) {  
  LogBox.ignoreLogs(['Setting a timer']);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function add() {
    try {
      const docRef = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").add({
        title: title,
        content: content
      });
      console.log(docRef.id);
      setTitle("");
      setContent("");
      props.update();
    }
    catch(error) {
      console.error("Error adding document: ", error);
    }
  }

  function cancel(){
    setTitle("");
    setContent("");
    props.update();
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
        <Button style={{flex: 1}} onPress={add} title="新增"/>
      </Modal>
    </SafeAreaView>

    
 );
}