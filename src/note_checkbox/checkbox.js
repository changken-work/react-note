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
  Button,
} from "react-native";
import { Fab } from "native-base";

import styles from "../styles";

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";
import { useSelector, useDispatch } from "react-redux";
import { readList, changeModalVisible } from "../store/actions/checkboxAction";
// import ListAdd from "./checkboxAdd";
import CheckTest from "./checkTest";

export default function checkbox() {
  const state = useSelector((state) => state.checkbox);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
          // console.log(doc.data().list1[0].checkDone);
          const newCheckbox = {
            id: doc.id,
            title: doc.data().title,
            list: doc.data().list,
          };
          // const docRefId = ref.docs[index].id;
          console.log("doc:", doc.id, doc.data().title, doc.data().list);
          dispatch(readList(doc.id, doc.data().title, doc.data().list));

          console.log("each newcheckboxes", newCheckbox);

          newCheckbox1.push(newCheckbox);
        });

        setCheckboxes(newCheckbox1);
        // console.log(checkboxes1)
        // setIsLoading(false); //foreach
      } catch (e) {
        //try
        // console.log(e);
      }
    } //readData
    readData();
  }, [modalVisible]);
  async function dataCheck() {
    console.log("state.checkList", state.checkList[0]["title"]);
  }
  function update(id) {
    console.log("update index:" + id);

    // async function getCheckListId(index) {
    //   // console.log(memos[index]); // object

    //   // setCheckboxes({
    //   //   title: memos[index].title,
    //   //   list: memos[index].content,
    //   // });

    //   try {
    //     const ref = await db
    //       .collection("users")
    //       .doc("MeRcqDluKIWS1jjvmiN8")
    //       .collection("checkboxes")
    //       .get();
    //     // 每筆list的ID
    //     const docRefId = ref.docs[index].id;
    //     console.log("docRefId", docRefId);
    //     dispatch(readList(docRefId));
    //     // setMemos({
    //     //   title: memos[index].title,
    //     //   content: memos[index].content,
    //     // });

    //     setSelectedId(docRefId);
    //     setModalVisible(true);
    //     console.log("update modal", modalVisible);
    //     dispatch(changeModalVisible(modalVisible));
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    setSelectedId(id);
    dispatch(changeModalVisible(modalVisible));
    // getCheckListId(id);
  }

  add = async () => {
    // readData();

    // console.log("add");
    // setMemos({
    //   title: "",
    //   content: ""
    // });
    // setSelectedId("");
    // setSelectedId("");
    setModalVisible(true);
    console.log("modal", modalVisible);
    dispatch(changeModalVisible(modalVisible));

    // setModalVisible(true);
  };
  function hide() {
    setSelectedId("");
    setModalVisible(false);
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
      <Button onPress={() => dataCheck()} title="test" color="green" />
      <CheckTest
        modalVisible={modalVisible}
        // memo={memos}
        id={selectedId}
        // hide={hide}
      />
    </SafeAreaView>
  );
}
