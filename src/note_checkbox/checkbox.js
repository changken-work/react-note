import React, { useState, useEffect } from "react";
import {
  ListItem,
  CheckBox,
  Icon,
  Avatar,
  Badge,
  Image,
} from "react-native-elements";

import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  LogBox,
  ActivityIndicator,
  Button,
  View,
} from "react-native";
import { Fab } from "native-base";

import styles from "../styles";

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";
import { useSelector, useDispatch } from "react-redux";
import { readList, changeModalVisible } from "../store/actions/checkboxAction";
import {
  addTodoList,
  deleteTodo,
  finishTodo,
  refreshFinish,
  refreshTodo,
} from "../store/actions/checkListAction";
// import ListAdd from "./checkboxAdd";
import CheckTest from "./checkTest";

export default function checkbox() {
  const checkbox = useSelector((state) => state.checkbox);
  const uid = useSelector((state) => state.auth.uid);

  const dispatch = useDispatch();
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const modalVisible = useSelector((state) => state.checkbox.modalVisible);

  const [check, setCheck] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    title: "",
    finishList: [""],
    todoList: [""],
  });
  const [updateBox, setUpdateBox] = useState({
    title: "",
    finishList: [""],
    todoList: [""],
  });
  const checkList = useSelector((state) => state.checkbox.checkList);

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
          .doc(uid)
          .collection("checkboxes")
          .get();

        console.log("ggg");

        querySnapshot.forEach((doc) => {
          // console.log("finshList:", doc.data().finishList[0]);

          const newCheckbox = {
            id: doc.id,
            title: doc.data().title,
            finishList: doc.data().finishList,
            todoList: doc.data().todoList,
          };
          newCheckbox1.push(newCheckbox);
        });
        setCheckboxes(newCheckbox1);
        // console.log("checkboxes:", checkboxes[0]["list"]);
      } catch (e) {
        //try
        // console.log(e);
      }
    } //readData
    readData();
  }, [modalVisible]);
  async function dataCheck() {
    console.log("state.checkList");
  }
  function update(id) {
    console.log("update index:" + id);
    checkboxes.forEach((doc) => {});
    console.log("checkboxes:", checkboxes);
    async function getCheckListId(index) {
      dispatch(refreshTodo());
      dispatch(refreshFinish());

      setUpdateBox({
        title: checkboxes[index].title,
        todoList: checkboxes[index].todoList,
        finishList: checkboxes[index].finishList,
      });
      checkboxes[index].todoList.forEach((item, index) => {
        dispatch(addTodoList(item));
      });
      checkboxes[index].finishList.forEach((item, index) => {
        dispatch(finishTodo(item));
      });

      try {
        const ref = await db
          .collection("users")
          .doc(uid)
          .collection("checkboxes")
          .get();
        // 每筆list的ID
        const docRefId = ref.docs[index].id;
        setSelectedId(docRefId);
        console.log("selectID:", docRefId);
        // setModalVisible(!modalVisible);
        dispatch(changeModalVisible(true));
      } catch (e) {
        console.log(e);
      }
    }
    getCheckListId(id);
  }

  add = async () => {
    // readData();
    dispatch(refreshTodo());
    dispatch(refreshFinish());

    // console.log("add");
    setUpdateBox({
      title: "",
      finishList: [""],
      todoList: [""],
    });
    setSelectedId("");

    console.log("modal", modalVisible);
    dispatch(changeModalVisible(true));
  };

  function hide() {
    setSelectedId("");
    dispatch(changeModalVisible(false));

    // setModalVisible(false);
  }
  // checkbox布林值
  function fsetCheck() {
    setCheck(!check);
    console.log(check);
  }
  function hide() {
    setSelectedId("");
    // setModalVisible(false);
    dispatch(changeModalVisible(false));
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem key={index} bottomDivider>
        {/* <Avatar source={{ uri: l.avatar_url }} /> */}
        <ListItem.Content>
          <TouchableOpacity onPress={() => update(index)}>
            <ListItem.Title>{item.title}</ListItem.Title>
            {/* <ListItem.Subtitle>{item.list}</ListItem.Subtitle> */}

            {item.finishList.map((item, i) => (
              <CheckBox center title={item} onPress={() => fsetCheck()} />
            ))}
            {item.todoList.map((item, i) => (
              <CheckBox center title={item} onPress={() => fsetCheck()} />
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
      {/* <Button onPress={() => refresh()} title="test" color="green" /> */}
      <CheckTest
        modalVisible={checkbox.modalVisible}
        checkbox={updateBox}
        id={selectedId}
        hide={hide}
      />
    </SafeAreaView>
  );
}
