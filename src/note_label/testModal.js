import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
} from "react-native";

import styles from "../styles";
// modal套件
import Modal from "react-native-modal";

const App = ({ navigation }) => {
  // 此頁是否被選取
  const isFocused = useIsFocused();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  //   const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = new Animated.Value(0);
  const springAnim = new Animated.Value(1);

  useEffect(() => {
    if (isFocused) {
      console.log("觸發");
    }
  }, [isFocused]);

  return (
    <View style={modal.container}>
      <View style={modal.buttonRow}>
        {/* <Button title="開始" onPress={() => navigation.navigate("SignIn")} /> */}
        {/* <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} /> */}
        <View style={{ flex: 1 }}>
          <Button title="Show modal" onPress={toggleModal} />
        </View>
      </View>
      <View>
        <Modal
          isVisible={isModalVisible}
          onSwipeComplete={() => setModalVisible(false)}
          onBackdropPress={() => setModalVisible(false)}
          swipeDirection={["up", "down"]}
          avoidKeyboard={true}
        >
          <View style={modal.centeredView}>
            <View style={modal.modalView}>
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
                  onSubmitEditing={() => {
                    () => secondTextInput.focus();
                  }}
                />
                <TextInput
                  placeholder="請輸入記事內容..."
                  style={styles.noteInput}
                  multiline={true}
                  value={content}
                  onChangeText={(text) => setContent(text)}
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
                  onPress={toggleModal}
                >
                  <Text style={modal.textStyle}>取消</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

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

export default App;
