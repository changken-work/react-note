import React, { useState, useEffect } from "react";
import { Header, ListItem, Icon, Button } from "react-native-elements";
import {
  StyleSheet,
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
    <SafeAreaView>
      <Modal animationType="slide" visible={props.modalVisible} style={mStyle.modalContainer}>
        <Header
          style={{ flex: 1}}
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
        <View style={mStyle.modalView}>
          <View>
            <TextInput
              placeholder="標題"
              style={mStyle.topicInput}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              placeholder="請輸入記事內容..."
              style={mStyle.noteInput}
              multiline={true}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <View style={mStyle.tagInput}>
              <TagInput
                placeholder="新增/修改標籤..."
                label="使用 SPACE 新增標籤"
                labelStyle={{ color: "#000", fontSize: 20 }}
                tagStyle={{ backgroundColor:"#f0932b"}}
                updateState={updateTagState}
                tags={tags}
              />
            </View>
          </View>
          <View style={{
            alignSelf: 'flex-end', position: 'absolute',
            bottom: 10, left: 0,right: 0,padding:5}}>
          <Button onPress={renew} title="確定" color='#cf6a87' />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const mStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: "#f5f6fa",
    // marginTop: 5,
    // marginBottom: 110,
    // marginLeft: 15,
    // marginRight: 15,
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    flex: 1,
  },
  topicInput: {
    width: '100%',
    paddingTop:15,
    paddingLeft:15,
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontSize: 30,
    borderWidth:2,
    borderRadius:10,
    borderColor:'#7f8fa6',
  },
  noteInput: {
    width: '100%',
    height:'35%',
    paddingLeft: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontSize: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7f8fa6',
  },
  tagInput: {
    marginTop:20,
    padding:5,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#7f8fa6',
  },
  Divider: {
    backgroundColor: '#7f8fa6',
    margin: 5,
    height: 3,
    borderRadius: 10,
  }
});