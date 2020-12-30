import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAsync,
  delAll,
  addAsync,
  editTagAsync,
  deleteAsync,
} from "../store/actions/labelAction";
// model
import Model from "./model";
// tag
import TagInput from "react-native-tags-input";

export default function label_demo() {
  // 空值
  const [ldata, setLdata] = useState("");
  // 輸入一
  const [inputtxt, setInputtxt] = useState("");

  // redux
  const dispatch = useDispatch();
  const label = useSelector((state) => state.label.label);
  const user_id = useSelector((state) => state.auth.uid);

  // model data
  const [modalVisible, setModalVisible] = useState(false);
  // model index
  const [modelIndex, setModelIndex] = useState("");
  // tag data
  const [tags, setTags] = useState({ tag: "", tagsArray: [] });
  // tags更新
  const updateTagState = (state) => {
    setTags(state);
  };

  useEffect(() => {
    console.log("==========");
    // console.log("監聽(id):" + label.map((item) => Object.values(item)[0]));
    console.log(
      "監聽:\n" +
        label.map(
          (item) =>
            "id :" +
            item.id +
            " label:" +
            item.label +
            " tags:" +
            item.tag.map((obj) => "<" + obj.id + ">" + obj.data) +
            "\n"
        )
    );
    console.log("==========");
    // dispatch(addAsync());
  }, [label]);

  // useEffect(() => {
  //   console.log(tags);
  // }, [tags]);

  useEffect(() => {
    dispatch(getAsync());
  }, []);

  const addTodo = () => {
    let TagsArray = tags.tagsArray;
    dispatch(addAsync(inputtxt, TagsArray));
  };

  const delTodo = (id, uid) => {
    dispatch(deleteAsync(id, uid));
  };

  const delAllTodo = () => {
    dispatch(delAll());
  };

  // model接資料
  const updatedata = (index, modaltagsArray) => {
    dispatch(editTagAsync(index, modaltagsArray));
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
                記事: {label.length !== 0 ? data.label : ldata}
                {/* data: {label.length !== 0 ? label.map((x) => x.label) : ldata} */}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                標籤:
                {data.tag.map((obj, index) => {
                  return (
                    <Text key={index}>
                      {obj.length !== 0 ? obj.data : ldata}
                    </Text>
                  );
                })}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Button
                  onPress={() => {
                    visable();
                    setModelIndex(data.id);
                  }}
                  title="修改"
                ></Button>
                <Button
                  onPress={() => delTodo(index, data.id)}
                  title="刪除紀事"
                ></Button>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.footer}>
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

        <View>
          <TagInput
            placeholder="新增標籤..."
            // label="Enter以新增標籤"
            labelStyle={{ color: "#000", fontSize: 12 }}
            updateState={updateTagState}
            tags={tags}
          />
        </View>

        <Button onPress={() => addTodo()} title="新增"></Button>

        <Button onPress={() => delAllTodo()} title="刪除全部"></Button>
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
