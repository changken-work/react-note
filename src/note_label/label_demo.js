import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  delLabel,
  delAllLabel,
  editTag,
} from "../store/actions/labelAction";
// model
import Model from "./model";

export default function label_demo() {
  const [ldata, setLdata] = useState("");

  const [inputtxt, setInputtxt] = useState("");
  const [inputtag, setInputtag] = useState("");

  const [show, setShow] = useState(true);

  // redux
  const dispatch = useDispatch();
  const label = useSelector((state) => state.label.label);
  // model data
  const [modalVisible, setModalVisible] = useState(false);
  // model index
  const [modelIndex, setModelIndex] = useState("");

  // useEffect(() => {
  //   console.log("==========");
  //   console.log("監聽(id):" + label.map((item) => Object.values(item)[0]));
  //   console.log("監聽(data):" + label.map((item) => Object.values(item)[1]));
  //   console.log("監聽(tag):" + label.map((item) => Object.values(item)[2]));
  // }, [label]);

  const addTodo = (data, tag) => {
    dispatch(add(data, tag));
  };

  const del = (id) => {
    dispatch(delLabel(id));
  };

  const delAll = () => {
    dispatch(delAllLabel());
  };

  // model接資料
  const updatedata = (index, tag) => {
    // dispatch(add(newProduct));
    dispatch(editTag(index, tag));
  };
  // model開啟
  const visable = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View>
        {label.map((data, index) => {
          return (
            <View key={index} style={styles.todoItem}>
              {/* <Text>id: {label.length !== 0 ? data.id : ldata}</Text> */}
              <Text>
                data: {label.length !== 0 ? data.label : ldata}
                {/* data: {label.length !== 0 ? label.map((x) => x.label) : ldata} */}
              </Text>
              <Text>tag: {label.length !== 0 ? data.tag : ldata}</Text>
              <View style={{ flexDirection: "row" }}>
                <Button
                  onPress={() => {
                    visable();
                    setModelIndex(data.id);
                  }}
                  title="標籤"
                ></Button>
                <Button onPress={() => del(index)} title="刪除紀事"></Button>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.footer}>
        {show ? (
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginTop: 10,
            }}
            onChangeText={(data) => setInputtxt(data)}
            value={inputtxt}
            placeholder="請輸入事項"
          />
        ) : null}

        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            marginTop: 10,
          }}
          onChangeText={(data) => setInputtag(data)}
          value={inputtag}
          placeholder="標籤"
        />

        <Button
          onPress={() => addTodo(inputtxt, inputtag)}
          title="新增"
        ></Button>
        <Button onPress={() => delAll()} title="刪除全部"></Button>
      </View>
      <Model
        updateInAdd={updatedata}
        modalVisible={modalVisible}
        modelIndex={modelIndex}
        setModalVisible={setModalVisible}
      ></Model>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 16,
  },
  border: {
    flex: 1,
    paddingVertical: 16,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  footer: {
    marginBottom: 36,
    paddingHorizontal: 16,
  },
});
