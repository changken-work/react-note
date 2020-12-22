import React, { useState } from "react";
import {
  Alert,
  Modal,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Button, Text, TextInput, View } from "react-native";
import styles from "../styles";
// tag
import TagInput from "react-native-tags-input";

export default function ProductAdd(props) {
  // useState
  const [desc, setDesc] = useState("");

  // tag data
  const [tags, setTags] = useState({ tag: "", tagsArray: [] });
  // tags更新
  const updateTagState = (state) => {
    setTags(state);
  };
  // 按下確定後關閉用(更新)
  const update = () => {
    let tag = tags.tagsArray[0];
    let index = props.modelIndex;

    props.updateInAdd(index, tag);
    props.setModalVisible(false);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
      >
        <View style={modal.centeredView}>
          <View style={modal.modalView}>
            {/* <Text style={{ fontSize: 23 }}>id:{props.modelIndex}</Text> */}
            {/* <TextInput
              style={styles.input}
              placeholder="輸入Tag"
              value={desc}
              onChangeText={(text) => setDesc(text)}
            /> */}
            <View style={modal.input}>
              <TagInput
                placeholder="標籤..."
                label="enter以新增標籤"
                labelStyle={{ color: "#000", fontSize: 12 }}
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
                onPress={() => {
                  update();
                }}
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
                onPress={() => {
                  props.setModalVisible(false);
                }}
              >
                <Text style={modal.textStyle}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      {/* <Button onPress={visable} title="新增筆數"/> */}
    </View>
  );
}

const modal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
