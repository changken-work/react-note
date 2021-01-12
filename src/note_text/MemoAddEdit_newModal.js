import React, { useState, useEffect } from "react";
import { Header, ListItem, Icon, Button } from "react-native-elements";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  LogBox,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
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
// modal套件
import Modal from "react-native-modal";
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
    if (props.id) {
      // console.log(notes[props.id]);
      setTitle(props.memo.title);
      setContent(props.memo.content);
      // tag
      let tagsArray = props.memo.tag;
      setTags({ tag: "", tagsArray: tagsArray });
    } else {
      setTags({ tag: "", tagsArray: [] });
      setTitle("");
      setContent("");
    }
  }, [props.id]);

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();

  async function renew() {
    const sendData = async () => {
      try {
        props.id
          ? // console.log(result);
            update(props.id)
          : add();
        // await props.hide();
      } catch (e) {
        console.log("error:" + e);
      }
    };
    const clean = async () => {
      props.hide();
    };
    await sendData();
    await clean();
  }

  function add() {
    let tag = tags.tagsArray;
    dispatch(addMemoAsync(uid, title, content, tag));
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
    props.hide();
  }

  function cancel() {
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
    <View>
      {/* <Modal
        isVisible={props.modalVisible}
        onSwipeComplete={() => cancel()}
        onBackdropPress={() => cancel()}
        swipeDirection={["up", "down"]}
        hasBackdrop={true}
        backdropOpacity={0}
        backdropColor="white"
        avoidKeyboard={true}
      >
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
      </Modal> */}

      <Modal
        isVisible={props.modalVisible}
        onSwipeComplete={() => cancel()}
        onBackdropPress={() => cancel()}
        swipeDirection={["up", "down"]}
        avoidKeyboard={true}
      >
        <View style={modal.centeredView}>
          <View style={modal.modalView}>
            {/* <Header
              containerStyle={{
                backgroundColor: "white",
                color: "black",
              }}
              rightComponent={showDeleteButton()}
            /> */}
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
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
                // label="使用space新增標籤"
                // labelStyle={{
                //   color: "MemoAdd.jsgrey",
                //   fontSize: 12,
                //   width: 150,
                // }}
                style={{ width: "100%" }}
                updateState={updateTagState}
                tags={tags}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                style={{
                  ...modal.openButton,
                  backgroundColor: "#2196F3",
                  flexDirection: "row",
                  margin: 10,
                }}
                onPress={renew}
              >
                <Text style={modal.textStyle}>確定</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{
                  ...modal.openButton,
                  backgroundColor: "#2196F3",
                  flexDirection: "row",
                  margin: 10,
                }}
                onPress={cancel}
              >
                <Text style={modal.textStyle}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modal = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },

  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 100,
    paddingVertical: 70,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: 200,
  },
});
