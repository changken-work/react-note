import { useIsFocused } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ListItem, Icon } from "react-native-elements";
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

import { useSelector, useDispatch } from "react-redux";
import { readMemoAsync, getDocId } from "../store/actions/memoAction";

import MemoAdd from "./MemoAddEdit";

export default function MemoList() {
  LogBox.ignoreLogs(["Possible Unhandled"]);

  // 此頁是否被選取
  const isFocused = useIsFocused();

  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [memos, setMemos] = useState({
    title: "",
    content: "",
    tag: [],
  });

  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.memo.notes);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  useEffect(() => {
    // 進出此頁時作動
    const loading = async () => {
      if (!uid.length && isFocused) {
        alert("請先登入");
      }
      setIsLoading(true);
    };
    const readData = async () => {
      dispatch(readMemoAsync(uid));
    };
    const way = async () => {
      await loading();
      await readData();
      // console.log("===============");
      // console.log(
      //   "note:" +
      //     notes.map((obj) => {
      //       obj.content;
      //     })
      // );
      // console.log(notes);
      setIsLoading(false);
    };
    way();
  }, [isFocused]);

  useEffect(() => {
    // 關閉時作動
    // if (!modalVisible) {
    //   //讀取資料
    //   const readData = async () => {
    //     try {
    //       dispatch(readMemoAsync(uid));
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   };
    //   readData().then(() => {
    //     console.log(notes);
    //   });
    // }
  }, [modalVisible]);

  function hide() {
    setSelectedId("");
    setMemos({
      title: "",
      content: "",
      tag: [],
    });
    setModalVisible(false);
  }
  // 新增按鈕
  function add() {
    console.log("add");
    setSelectedId("");
    setModalVisible(true);
  }
  // 點紀事更新用
  function update(id) {
    console.log("update index:" + id);
    // console.log("update docRefId:" + docRefId);
    const docRefId = notes[id].id;
    setMemos({
      title: notes[id].title,
      content: notes[id].content,
      tag: notes[id].tag,
    });
    setSelectedId(docRefId);
    setModalVisible(true);
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem bottomDivider>
        <ListItem.Content>
          <TouchableOpacity onPress={() => update(index)}>
            <ListItem.Title style={styles.titlefont}>
              {item.title}
            </ListItem.Title>
            {item.content.length <= 30 ? (
              <Text>{item.content}</Text>
            ) : (
              <Text>{item.content.substring(0, 30)}...</Text>
            )}
          </TouchableOpacity>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <SafeAreaView style={styles.memocontainer}>
      {!isLoading ? (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item, index) => "" + index}
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator color="red" size="large" animating={isLoading} />
        </View>
      )}

      <Fab onPress={() => add()}>
        <Icon name="add" color="#fff" />
      </Fab>
      <MemoAdd
        modalVisible={modalVisible}
        memo={memos}
        hide={hide}
        id={selectedId}
      />
    </SafeAreaView>
  );
}
