import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Header, ListItem, Icon, CheckBox } from "react-native-elements";

import { Item, Input } from "native-base";

// redux
import { useSelector, useDispatch } from "react-redux";
// 引入action
import {
  addTodoList,
  deleteTodo,
  finishTodo,
  deleteFinish,
} from "../store/actions/checkListAction";
import { readList, changeModalVisible } from "../store/actions/checkboxAction";
import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";
// 資料儲存格式待思考
function checkTest(props) {
  const [todoDec, setTodoDec] = useState("");
  // useSelector 來抓取(select)reducer裡的state
  const todoList = useSelector((state) => state.checkList.todoList);
  const finishList = useSelector((state) => state.checkList.finishList);
  const modalVisible = useSelector((state) => state.checkbox.modalVisible);
  const uid = useSelector((state) => state.auth.uid);

  //
  const [title, setTitle] = useState("");
  const [todolist, settodolList] = useState("");
  const [finishlist, setfinishlist] = useState("");

  const [id, setId] = useState("");

  useEffect(() => {
    // console.log(props.memo);
    setId(props.id);
    setTitle(props.checkbox.title);
    settodolList(props.checkbox.todoList);
    setfinishlist(props.checkbox.finishList);
  }, [props.id]);
  // useDispatch 可以幫將我們想要做的action傳遞到reducer
  const dispatch = useDispatch();
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();
  function renew() {
    async function sendData() {
      try {
        const result = props.id ? update(props.id) : add();
        console.log("result:", result);
        props.hide();
      } catch (e) {
        console.log("error:" + e);
      }
    }
    sendData();
  }

  async function add() {
    try {
      const eachTodoList = [];
      const eachFinishList = [];

      todoList.forEach((item) => {
        // console.log("item.todoDec:", item.todoDec);
        eachTodoList.push(item.todoDec);
      });
      finishList.forEach((item) => {
        // console.log("item.finishDec:", item.finishDec);
        eachFinishList.push(item.finishDec);
      });
      // console.log("add()-todoList:", todoList);
      const docRef = await db
        .collection("users")
        .doc(uid)
        .collection("checkboxes")
        .add({
          title: title,
          todoList: eachTodoList,
          finishList: eachFinishList,
        });
      // console.log(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    dispatch(changeModalVisible(false));
    // console.log("todoList", todoList);
  }
  async function update(id) {
    const eachTodoList = [];
    const eachFinishList = [];

    todoList.forEach((item) => {
      // console.log("item.todoDec:", item.todoDec);
      eachTodoList.push(item.todoDec);
    });
    finishList.forEach((item) => {
      // console.log("item.finishDec:", item.finishDec);
      eachFinishList.push(item.finishDec);
    });
    // console.log("success!" + id);
    const docRef = await db
      .collection("users")
      .doc(uid)
      .collection("checkboxes")
      .doc(id)
      .set({
        title: title,
        todoList: eachTodoList,
        finishList: eachFinishList,
      })
      .then(function () {
        console.log("update success!");
      })
      .then(() => {
        setTitle("");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
  async function deleteCheckList(index) {
    try{
    await db
      .collection("users")
      .doc(uid)
      .collection("checkboxes")
      .doc(index)
      .delete()
     
        // setModalVisible(false);
        dispatch(changeModalVisible(false));
        console.log("delete success!");
     
    }
      catch(error){
        console.error("Error removing document: ", error);
      };
  }


  // 新增
  function handleAddTodo() {
    dispatch(addTodoList(todoDec));
    setTodoDec("");
    // console.log("dispatch todoDec:", todoDec);
  }

  // 刪除Todo
  function handleDeleteTodo(todoIndex) {
    // console.log("handleDeleteTodo:", todoIndex);

    dispatch(deleteTodo(todoIndex));
  }
  // 刪除finishList
  function handleDeleteFinish(finishIndex) {
    // console.log("handleDeleteFinish:", finishIndex);
    dispatch(deleteFinish(finishIndex));
  }

  // 完成
  function handleFinishTodo(todoDec, toIndex) {
    // console.log("handleFinishTodo-id:", todoDec + toIndex);
    dispatch(deleteTodo(toIndex));
    dispatch(finishTodo(todoDec));
  }
  function cancelFinishTodo(finishDec, finishIndex) {
    // console.log("handleFinishTodo-id:", finishDec + finishIndex);
    dispatch(deleteFinish(finishIndex));
    dispatch(addTodoList(finishDec));
  }
  function cancel() {
    dispatch(changeModalVisible(false));
    
  }
 

  return (
    <>
      <SafeAreaView>
        <Modal animationType="slide" visible={modalVisible}>
          {/* TouchableWithoutFeedback : 當在輸入時，按空白處可讓keyboard收起來 */}

          <Header
            style={{ flex: 1 }}
            containerStyle={{ height: 80 }}
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
           
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  deleteCheckList(id);
                }}
              >
                <Icon name="delete" color="#fff" />
              </TouchableOpacity>
            }
          />

          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <TextInput
                placeholder="標題"
                style={styles.topicInput}
                value={title}
                color="black"
                onChangeText={(text) => setTitle(text)}
              />
              {todoList.map((todo, index) => {
                return (
                  <View key={`todo-${index}`} style={styles.todoItem}>
                    {/* 如果這條todo是完成的(回傳true)，那就套用styles.finishText */}
                    {/* <Text style={isFinish(index) && styles.finishText} /> */}
                    {/* <Text>
                      {index + 1} / {todo}/{todo.id}
                    </Text> */}
                    <View style={{ flexDirection: "row" }}>
                    
                      <Icon
                        raised
                        name="close"
                        color="#f50"
                        reverse
                        onPress={() => handleDeleteTodo(index)}
                      />
                     
                      <CheckBox
                        onPress={() => handleFinishTodo(todo.todoDec, index)}
                        title={todo.todoDec}
                        color="green"
                        checked={false}
                      />
                    </View>
                  </View>
                );
              })}
              {finishList.map((finish, index) => {
                return (
                  <View key={`finish-${index}`} style={styles.todoItem}>
                    {/* 如果這條todo是完成的(回傳true)，那就套用styles.finishText */}
                    {/* <Text style={isFinish(index) && styles.finishText} /> */}
                    {/* <Text>
                      {index + 1} / {todo}/{todo.id}
                    </Text> */}
                    <View style={{ flexDirection: "row" }}>
                      
                      <Icon
                        raised
                        name="close"
                        color="#f50"
                        reverse
                        onPress={() => handleDeleteFinish(index)}
                      />
                      <CheckBox
                        onPress={() =>
                          cancelFinishTodo(finish.finishDec, index)
                        }
                        title={finish.finishDec}
                        color="green"
                        checked={true}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </TouchableWithoutFeedback>

          {/* KeyboardAvoidingView: 為了讓輸入框不要被keyboard遮住 */}
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.footer}>
              <Item>
                <Input
                  placeholder="請輸入事項"
                  value={todoDec}
                  returnKeyType="send" //改變鍵盤右下角變為送出
                  onSubmitEditing={handleAddTodo} //按下鍵盤右下鍵 執行submit(新增)
                  onChangeText={(val) => setTodoDec(val)}
                />
                <Button onPress={() => renew()} title="save" color="red" />
              </Item>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  topicInput: {
    marginTop: 0,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
  },

  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },

  finishText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },

  footer: {
    marginBottom: 36,
    // flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "stretch",

    paddingHorizontal: 16,
  },
});

export default checkTest;
