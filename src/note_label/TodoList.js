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
} from "react-native";
import { Item, Input } from "native-base";
// redux
import { useSelector, useDispatch } from "react-redux";
// 引入action
import {
  addTodoList,
  deleteTodo,
  finishTodo,
} from "../store/actions/labelAction";

function TodoList() {
  const [todoDec, setTodoDec] = useState("");
  // useSelector 來抓取(select)labelReducer裡的state
  const todoList = useSelector((state) => state.label.todoList);
  const finishList = useSelector((state) => state.label.finishList);

  // useDispatch 可以幫將我們想要做的action傳遞到reducer
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("==========");
    console.log("監聽(id):" + todoList.map((item) => Object.values(item)[0]));
    console.log(
      "監聽(todoDec):" + todoList.map((item) => Object.values(item)[1])
    );
  }, [todoList]);

  // 判斷是否已經完成(includes)
  function isFinish(id) {
    return finishList.includes(id);
  }

  // 新增
  function handleAddTodo() {
    dispatch(addTodoList(todoDec));
    setTodoDec("");
  }

  // 刪除
  function handleDeleteTodo(todoIndex) {
    dispatch(deleteTodo(todoIndex));
  }

  // 完成
  function handleFinishTodo(id) {
    dispatch(finishTodo(id));
  }

  return (
    <>
      {/* TouchableWithoutFeedback : 當在輸入時，按空白處可讓keyboard收起來 */}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {todoList.map((todo, index) => {
            return (
              <View key={`todo-${index}`} style={styles.todoItem}>
                {/* 如果這條todo是完成的(回傳true)，那就套用styles.finishText */}
                <Text style={isFinish(todo.id) && styles.finishText}>
                  {index + 1} / {todo.todoDec}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Button
                    onPress={() => handleDeleteTodo(index)}
                    title="DELETE"
                    color="red"
                  />
                  <Button
                    onPress={() => handleFinishTodo(todo.id)}
                    title="FINISH"
                    color="green"
                    disabled={isFinish(todo.id)}
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
          <Item regular>
            <Input
              placeholder="請輸入事項"
              value={todoDec}
              returnKeyType="send" //改變鍵盤右下角變為送出
              onSubmitEditing={handleAddTodo} //按下鍵盤右下鍵 執行submit(新增)
              onChangeText={(val) => setTodoDec(val)}
            />
          </Item>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
  },
});

export default TodoList;
