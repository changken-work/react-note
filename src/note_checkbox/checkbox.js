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
  refreshTodo,
} from "../store/actions/checkListAction";
// import ListAdd from "./checkboxAdd";
import CheckTest from "./checkTest";

export default function checkbox() {
  const checkbox = useSelector((state) => state.checkbox);
  const dispatch = useDispatch();
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const modalVisible = useSelector((state) => state.checkbox.modalVisible);

  const [check, setCheck] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    title: "",
    list: [""],
  });
  const [updateBox, setUpdateBox] = useState({
    title: "",
    list: [""],
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
    async function getCheckListId(index) {
      dispatch(refreshTodo());

      setUpdateBox({
        title: checkboxes[index].title,
        list: checkboxes[index].list,
      });
      checkboxes[index].list.forEach((item, index) => {
        dispatch(addTodoList(item));
      });

      console.log("title:", checkboxes[index].title);
      console.log("list:", checkboxes[index].list);
      try {
        const ref = await db
          .collection("users")
          .doc("MeRcqDluKIWS1jjvmiN8")
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

    // console.log("add");
    setUpdateBox({
      title: "",
      list: "",
    });
    setSelectedId("");
    // setSelectedId("");
    // setModalVisible(true);
    console.log("modal", modalVisible);
    dispatch(changeModalVisible(true));

    // setModalVisible(true);
  };
  async function deleteMemo(index) {
    const ref = await db
      .collection("users")
      .doc("MeRcqDluKIWS1jjvmiN8")
      .collection("checkboxes")
      .get();
    // 每筆list的ID
    const docRefId = ref.docs[index].id;
    // console.log(id + " delete");
    await db
      .collection("users")
      .doc("MeRcqDluKIWS1jjvmiN8")
      .collection("checkboxes")
      .doc(docRefId)
      .delete()
      .then(function () {
        // setModalVisible(false);
        dispatch(changeModalVisible(false));
        console.log("delete success!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  }
  function refresh() {
    console.log("refresh");
    dispatch(refreshTodo());
  }
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
            <ListItem.Title>
              {item.title}
              <TouchableOpacity
                style={{ flex: 1, alignSelf: "flex-end", margintop: 15 }}
                onPress={() => {
                  deleteMemo(index);
                }}
              >
                <Icon name="delete" color="red" />
              </TouchableOpacity>
            </ListItem.Title>
            {/* <ListItem.Subtitle>{item.list}</ListItem.Subtitle> */}

            {item.list.map((item, i) => (
              // <Badge
              //   value={item}
              //   status="success"
              //   containerStyle={{ position: "absolute", top: 30, right: -4 }}
              // />

              <CheckBox
                center
                title={item}
                // checkedIcon={
                //   <Image source={require("@assets/rubik.png")} />
                // }
                // uncheckedIcon={
                //   <Image source={require("@assets/rubik.png")} />
                // }
                onPress={() => fsetCheck()}
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
