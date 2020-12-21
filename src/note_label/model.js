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

export default function ProductAdd(props) {
  // useState
  const [desc, setDesc] = useState("");

  // 按下確定後關閉用(更新)
  function update() {
    props.updateInAdd({ desc });
    props.setModalVisible(false);
  }
  // 打開modal用
  function visable() {
    props.setModalVisible(true);
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
      >
        <View style={modal.centeredView}>
          <View style={modal.modalView}>
            <TextInput
              style={styles.index}
              placeholder="產品說明"
              value={desc}
              onChangeText={(text) => setDesc(text)}
            />
            <TextInput
              style={styles.index}
              placeholder="價格"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />

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
    padding: 35,
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
    padding: 10,
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
});
