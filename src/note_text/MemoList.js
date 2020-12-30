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

import { useSelector, useDispatch } from 'react-redux';
import { readMemoAsync } from '../store/actions/memoAction';

import MemoAdd from "./MemoAddEdit";

export default function MemoList() {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const uid = useSelector(state => state.auth.uid);
  const dispatch = useDispatch();
  const notes = useSelector(state => state.memo.notes);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const db = firebase.firestore();

  useEffect(() => {
    //讀取資料
    async function readData() {
        try {
            // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
            // console.log('uid', uid);
            dispatch(readMemoAsync(uid));
            // console.log("note", notes);
            setIsLoading(false);
        }//try
        catch (e) { console.log(e); }
    }//readData
    readData();
  }, [modalVisible]);

  function hide() {
    setModalVisible(false);
  }

  function add() {
    console.log("add");
    setSelectedId("");
    setModalVisible(true);
  }

  function update(id) {
    console.log("update index:" + id);
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
        memo={notes}
        id={selectedId}
        hide={hide}
      />
    </SafeAreaView>
  );
}
