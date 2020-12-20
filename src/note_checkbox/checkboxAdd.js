import React, { useState, useEffect } from "react";
import { Header, ListItem, Icon } from "react-native-elements";
import {
  SafeAreaView,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Modal,
  LogBox,
} from "react-native";

import styles from "../styles";

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";
import { useSelector, useDispatch } from "react-redux";
import { readList, changeModalVisible } from "../store/actions/checkboxAction";

export default function checkboxAdd(props) {
  LogBox.ignoreLogs(["Setting a timer"]);
  const state = useSelector((state) => state.checkbox);
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [title, setTitle] = useState("");
  const [list, setList] = useState([""]);
  // function update(){
  //   props.update({title, content});
  // }

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function add() {
    // console.log("modalvisible:", state.modalVisible);
    try {
      const docRef = await db
        .collection("users")
        .doc("MeRcqDluKIWS1jjvmiN8")
        .collection("ckeckboxes")
        .add({
          title: title,
          list: list,
        });
      console.log(docRef.id);
      setTitle("");
      setList("");
      //   props.update();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  function cancel() {
    dispatch(changeModalVisible(false));
    setTitle("");
    setList("");
    // props.update();
  }

  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={state.modalVisible}>
        <Header
          style={{ flex: 1 }}
          containerStyle={{ height: 60 }}
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                console.log("Cancelled");
                cancel();
              }}
            >
              <Icon name="arrow-back" color="#fff" />
            </TouchableOpacity>
          }
          centerComponent={{
            text: "checkList",
            style: { color: "#fff", fontSize: 20 },
          }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                console.log("Open menu");
              }}
            >
              <Icon name="more-vert" color="#fff" />
            </TouchableOpacity>
          }
        />

        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="標題"
            style={styles.topicInput}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            placeholder="請輸入記事內容..."
            style={styles.noteInput}
            multiline={true}
            value={list}
            onChangeText={(text) => setList(text)}
          />
        </View>
        <Button style={{ flex: 1 }} onPress={add} title="新增" />
      </Modal>
    </SafeAreaView>
  );
}
