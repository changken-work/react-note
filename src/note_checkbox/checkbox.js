import React, { useState, useEffect } from "react";
import { ListItem, CheckBox, Icon, Avatar } from "react-native-elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
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
  const [modalVisible, setModalVisible] = useState(false);

  const [check, setCheck] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    title: "",
    list: "",
  });
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();
  useEffect(() => {
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
          let i = 0;
          // console.log(doc.data().list1[0].checkDone);
          const newCheckbox = {
            title: doc.data().title,
            list: doc.data().list,
          };
          console.log("each newcheckboxes", newCheckbox);
          console.log("i:", i++);
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
    readData();
  }, [modalVisible]);
  function update(id) {
    console.log("update index:" + id);

    async function getCheckListId(index) {
      // console.log(memos[index]); // object

      // setCheckboxes({
      //   title: memos[index].title,
      //   list: memos[index].content,
      // });

      try {
        const ref = await db
          .collection("users")
          .doc("MeRcqDluKIWS1jjvmiN8")
          .collection("checkboxes")
          .get();
        // 每筆list的ID
        const docRefId = ref.docs[index].id;
        console.log("docRefId", docRefId);

        // setMemos({
        //   title: memos[index].title,
        //   content: memos[index].content,
        // });

        setSelectedId(docRefId);
        setModalVisible(true);
      } catch (e) {
        console.log(e);
      }
    }
    getCheckListId(id);
  }

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
  // checkbox布林值
  function fsetCheck() {
    setCheck(!check);
    console.log(check);
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} bottomDivider>
        {/* <Avatar source={{ uri: l.avatar_url }} /> */}
        <ListItem.Content>
          <TouchableOpacity onPress={() => update(index)}>
            <ListItem.Title>{item.title}</ListItem.Title>
            {/* <ListItem.Subtitle>{item.list}</ListItem.Subtitle> */}

            {item.list.map((item) => (
              <CheckBox
                center
                title={item}
                onPress={() => fsetCheck()}
                checked={check}
              />
            ))}
          </TouchableOpacity>
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
