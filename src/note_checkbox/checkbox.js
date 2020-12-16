import React, { useState, useEffect } from "react";
import { ListItem, Icon, CheckBox, Avatar } from "react-native-elements";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { Fab } from "native-base";

import styles from "../styles";

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";

export default function checkbox() {
  const list = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
  ];
  const [check, setCheck] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    title: "",
    list: "",
  });
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function readData() {
    const newCheckbox1 = [];
    try {
      // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
      const querySnapshot = await db
        .collection("users")
        .doc("MeRcqDluKIWS1jjvmiN8")
        .collection("checkboxes")
        .get();
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().list);
        const newCheckbox = {
          title: doc.data().title,
          list: doc.data().list,
        };
        console.log("each newcheckboxes",newCheckbox)

        newCheckbox1.push(newCheckbox);
      }); //foreach
      setCheckboxes(newCheckbox1);
      // console.log(checkboxes1)
      // setIsLoading(false);
    } catch (e) {
      //try
      // console.log(e);
    }
  } //readData

  function add() {
    readData();
    
    // console.log("add");
    // setMemos({
    //   title: "",
    //   content: ""
    // });
    // setSelectedId("");
    // setModalVisible(true);
  }
  function fsetCheck() {
    setCheck(!check);
    console.log(check);
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} bottomDivider>
        {/* <Avatar source={{ uri: l.avatar_url }} /> */}
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          {/* <ListItem.Subtitle>{item.list}</ListItem.Subtitle> */}
          <CheckBox
            center
            title={item.list[0]}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => fsetCheck()}
            checked={check}
          />
        </ListItem.Content>
      </ListItem>
    );
  };
  return (
    <SafeAreaView style={styles.memocontainer}>
      <FlatList
        data={checkboxes}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      />
      <Fab onPress={() => add()}>
        <Icon name="add" color="#fff" />
      </Fab>
    </SafeAreaView>
  );
}
