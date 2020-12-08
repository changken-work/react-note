import React, {useState, useEffect} from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { StatusBar, SafeAreaView, TextInput, View, Text, FlatList, Modal,  TouchableOpacity, LogBox, ActivityIndicator } from "react-native";
import { Fab } from "native-base";
import { Button, Menu, Divider, Provider } from 'react-native-paper';

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

import MemoAdd from "./MemoAdd";

export default function MemoList() { 
  LogBox.ignoreLogs(['Setting a timer']);

  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    }//try
  catch(e){console.log(e);}
  }//readData

  useEffect(()=>{
    readData();}
    ,[modalVisible]
  );

  function update(newMemo){
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.memocontainer}>
      {!isLoading?
        <FlatList
          data={memos}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
        />
        :
        <View style={styles.loading}>
        <ActivityIndicator color="red" size="large" animating={isLoading} />
        </View>
      }

      <Fab onPress={() => setModalVisible(true)}>
        <Icon name="add" color='#fff'/>
      </Fab>
      <MemoAdd modalVisible = {modalVisible} update={update}/>
    </SafeAreaView>

      
  );
}