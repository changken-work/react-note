import React, {useState, useEffect} from 'react';
import { Header } from 'react-native-elements';
import { SafeAreaView, TextInput, View, Button } from "react-native";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function MemoAdd(props) {  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function update(){
    props.update({title, content});
  }

  // if (!firebase.apps.length) {
  //   firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  // }
  // const db = firebase.firestore();

  // async function update() {
  //   try {
  //     const docRef = await db.collection("notes").add({
  //       title: title,
  //       content: content
  //     });
  //     console.log(docRef.id);
  //     setTitle("");
  //     setContent("");
  //     props.update();
  //   }
  //   catch(error) {
  //     console.error("Error adding document: ", error);
  //   }
  // }

  // function cancel(){
  //   setTitle("");
  //   setContent("");
  //   props.update();
  // }

  return (
    <SafeAreaView>
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
        <Button onPress={update} title="新增"/>      
    </SafeAreaView>

    
 );
}