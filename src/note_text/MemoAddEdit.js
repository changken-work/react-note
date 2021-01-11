import React, { useState, useEffect } from "react";
import { Header, ListItem, Icon, Button } from "react-native-elements";
import {
  SafeAreaView,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  LogBox,
  StatusBar,
} from "react-native";

import styles from "../styles";

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";

import { useSelector, useDispatch } from "react-redux";
import {
  addMemoAsync,
  updateMemoAsync,
  deleteMemoAsync,
} from "../store/actions/memoAction";
// tag
import TagInput from "react-native-tags-input";

export default function MemoAddEdit(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();
  const docRefId = useSelector((state) => state.memo.docID);

  // tag data
  const [tags, setTags] = useState({ tag: "", tagsArray: [] });
  // tags更新
  const updateTagState = (state) => {
    setTags(state);
  };

  useEffect(() => {
    // console.log(notes[props.id]);
    setTitle(props.memo.title);
    setContent(props.memo.content);
    let tagsArray = props.memo.tag;
    setTags({ tag: "", tagsArray: tagsArray });
  }, [props.id]);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function renew() {
    const sendData = async () => {
      try {
        const result = (await props.id)
          ? // console.log(result);
            update(props.id)
          : add();
        // await props.hide();
      } catch (e) {
        console.log("error:" + e);
      }
    };
    const clean = async () => {
      setTags({ tag: "", tagsArray: ["範例標籤"] });
      props.hide();
    };
    await sendData();
    await clean();
  }

  function add() {
    let tag = tags.tagsArray;
    dispatch(addMemoAsync(uid, title, content, tag));
    setTitle("");
    setContent("");
  }

  async function update(id) {
    let tag = tags.tagsArray;
    //有一個小bug(新增顯示)，應該是沒有同步的問題
    // console.log("success!" + id);
    dispatch(updateMemoAsync(uid, id, title, content, tag));
  }

  async function deleteMemo(id) {
    console.log(id + " delete");
    dispatch(deleteMemoAsync(uid, id));
    setTitle("");
    setContent("");
    props.hide();
  }

  function cancel() {
    setTitle("");
    setContent("");
    props.hide();
  }

  function showDeleteButton() {
    if (props.id) {
      return (
        <TouchableOpacity
          onPress={() => {
            deleteMemo(props.id);
          }}
        >
          <Icon name="delete" color="#fff" />
        </TouchableOpacity>
      );
    } else {
      // console.log("no id");
    }
  }

  return (
    <SafeAreaView>
      <Modal animationType="slide" visible={props.modalVisible}>
        <Header
          style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}
          containerStyle={{ height: 90 }}
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
            text: "Memo記事",
            style: { color: "#fff", fontSize: 20 },
          }}
          rightComponent={showDeleteButton()}
        />

        <View>
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
            value={content}
            onChangeText={(text) => setContent(text)}
          />
        </View>
        <View>
          <TagInput
            placeholder="新增/修改標籤..."
            label="使用space新增標籤"
            labelStyle={{ color: "#000", fontSize: 12 }}
            updateState={updateTagState}
            tags={tags}
          />
        </View>
        <Button onPress={renew} title="確定" />
      </Modal>
    </SafeAreaView>
  );
}
