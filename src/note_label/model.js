import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  TouchableHighlight,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Button, Text, TextInput, View } from "react-native";
import styles from "../styles";
// redux
import { useSelector, useDispatch } from "react-redux";
import { add, del, delAll, editTag } from "../store/actions/labelAction";
// tag
import TagInput from "react-native-tags-input";

export default function ProductAdd(props) {
  // redux
  const dispatch = useDispatch();
  const label = useSelector((state) => state.label.label);
  // useState
  const [desc, setDesc] = useState("");
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("#2196F3");

  // tag data
  const [tags, setTags] = useState({ tag: "", tagsArray: [] });
  // tags更新
  const updateTagState = (state) => {
    setTags(state);
  };

  useEffect(() => {
    if (tags.tagsArray.length === 0) {
      setColor("#cccccc");
      setShow(true);
    } else {
      setColor("#2196F3");
      setShow(false);
    }
  }, [tags]);

  // 按下確定後關閉用(更新)
  const update = () => {
    let tag = tags.tagsArray;
    let index = props.modelIndex;

    props.updateInAdd(index, tag);
    props.setModalVisible(false);
  };

  useEffect(() => {
    if (props.modalVisible) {
      const foundIndex = label.findIndex((x) => x.id == props.modelIndex);
      let temp = [];
      let finalTags = [];
      let arr = label[foundIndex].tag;
      arr.map((obj) => {
        temp.push(obj.data);
      });
      finalTags = { tag: "", tagsArray: temp };
      console.log(finalTags);
      setTags(finalTags);
    }
  }, [props.modalVisible]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
      >
        <View style={modal.centeredView}>
          <View style={modal.modalView}>
            <Text style={{ fontSize: 23 }}>id:{props.modelIndex}</Text>
            {/* <TextInput
              style={styles.input}
              placeholder="輸入Tag"
              value={desc}
              onChangeText={(text) => setDesc(text)}
            /> */}
            <View style={modal.input}>
              <TagInput
                placeholder="修改..."
                label="完成後Enter"
                labelStyle={{ color: "#000", fontSize: 12 }}
                updateState={updateTagState}
                tags={tags}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableHighlight
                style={{
                  ...modal.openButton,
                  backgroundColor: color,
                  flexDirection: "row",
                  margin: 10,
                }}
                onPress={() => {
                  update();
                }}
                disabled={show}
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
