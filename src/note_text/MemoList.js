import React, {useState, useEffect} from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, LogBox, ActivityIndicator } from "react-native";
import { Fab } from "native-base";

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

import MemoAdd from "./MemoAddEdit";

export default function MemoList() { 
  LogBox.ignoreLogs(['Setting a timer']);

  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [memos, setMemos] = useState([]);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const db = firebase.firestore();

  useEffect(()=>{
    async function readData(){
      const newMemos=[];
      try {
        // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
        const querySnapshot = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").get();
        querySnapshot.forEach((doc) => {
          // console.log(doc.data().title);
          const newMemo = {
            title:doc.data().title,
            content:doc.data().content,
          }
          newMemos.push(newMemo);
        });//foreach
        setMemos(newMemos);
        setIsLoading(false);
      }//try
    catch(e){console.log(e);}
    }//readData

    readData();}
    ,[modalVisible]
  );

  function hide(){
    setSelectedId("");
    setModalVisible(false);
  }

  function add(){
    console.log("add");
    // setMemos({
    //   title: "",
    //   content: ""
    // });
    setSelectedId("");
    setModalVisible(true);
  }

  function update(id){
    console.log("update index:" + id);

    async function getMemoId(index){
      // console.log(index);
      const newMemos=[];
      try {
        const ref = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").get();
        // setMemos({
        //   title:ref.docs[index].data().title,
        //   content:ref.docs[index].data().content,
        // });
        const newMemo = {
          title:ref.docs[index].data().title,
          content:ref.docs[index].data().content,
        }
        newMemos.push(newMemo);
        console.log(newMemos);
        setMemos(newMemos);

        const docRefId = ref.docs[index].id;
        // console.log(docRefId);
        
        setSelectedId(docRefId);
        setModalVisible(true);
      }
      catch(e){console.log(e);}
    }getMemoId(id);
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <TouchableOpacity
            onPress={() => update(index)}
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

  return (
    <SafeAreaView style={styles.memocontainer}>
      {!isLoading?
        <FlatList
          data={memos}
          renderItem={renderItem}
          keyExtractor = {(item, index) => "" + index}
        />
        :
        <View style={styles.loading}>
        <ActivityIndicator color="red" size="large" animating={isLoading} />
        </View>
      }

      <Fab onPress={() => add()}>
        <Icon name="add" color='#fff'/>
      </Fab>
      <MemoAdd modalVisible={modalVisible} memo={memos} id={selectedId} hide={hide}/>
    </SafeAreaView>

      
  );
}