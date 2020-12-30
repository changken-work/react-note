import React, {useState, useEffect} from 'react';
import { Header, ListItem, Icon, Button } from 'react-native-elements';
import { 
  SafeAreaView, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Modal, 
  LogBox, 
  StatusBar 
} from "react-native";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

import { useSelector, useDispatch } from 'react-redux';
import { addMemoAsync, updateMemoAsync } from '../store/actions/memoAction';

export default function MemoAddEdit(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const uid = useSelector(state => state.auth.uid);
  const dispatch = useDispatch();
  const notes = useSelector(state => state.memo.notes);

  useEffect(()=>{
    // console.log(notes[props.id]);
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
          ? update(props.id)
          : add()
        props.hide();}
      catch (e){
        console.log("error:"+e);
      }
    }
    sendData();
  }

  function add() {
    dispatch(addMemoAsync(uid, title, content));
    setTitle("");
    setContent("");
  }

  async function update(id) {
    // console.log("success!" + id);
    const docRefId = notes[id].id;
    console.log("doc.id: " + docRefId);
    dispatch(updateMemoAsync(uid, docRefId, title, content));
  }

  async function deleteMemo(id){
    // console.log(id + " delete");
    await db.collection("users").doc(uid).collection("notes").doc(id).delete()
    .then(function() {
      props.hide();
      console.log("delete success!");
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
  }

  function cancel(){
    setTitle("");
    setContent("");
    props.hide();
  }

  function showDeleteButton(){
    if (props.id) {
      return (
        <TouchableOpacity
          onPress={() => {
            deleteMemo(props.id);
          }}
        >
          <Icon name="delete" color='#fff' />
        </TouchableOpacity>
      )
    }else{
      // console.log("no id");
    }
  }

  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={props.modalVisible}>
        <Header
          style={{flex: 1, marginTop: StatusBar.currentHeight || 0,}}
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
            showDeleteButton()
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