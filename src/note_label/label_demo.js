import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addLabel, delLabel, delAllLabel } from "../store/actions/labelAction";
export default function label_demo() {
  const [ldata, setLdata] = useState("");

  const [inputtxt, setInputtxt] = useState("");
  const [show, setShow] = useState(true);
  const label = useSelector((state) => state.label.label);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("==========");
    console.log("監聽(id):" + label.map((item) => Object.values(item)[0]));
    console.log("監聽(data):" + label.map((item) => Object.values(item)[1]));
  }, [label]);

  function add(data) {
    dispatch(addLabel(data));
  }

  function del(id) {
    dispatch(delLabel(id));
  }

  function delAll() {
    dispatch(delAllLabel());
  }
  return (
    <View style={styles.container}>
      <View>
        {label.map((data, index) => {
          return (
            <View key={index} style={styles.todoItem}>
              <Text>
                id: {label.length !== 0 ? data.id : ldata}
                {/* id: {label.length !== 0 ? label.map((x) => x.id) : ldata} */}
              </Text>
              <Text>
                data: {label.length !== 0 ? data.label : ldata}
                {/* data: {label.length !== 0 ? label.map((x) => x.label) : ldata} */}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Button onPress={() => add(inputtxt)} title="Tag"></Button>
                <Button onPress={() => del(index)} title="刪除"></Button>
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
        <Button onPress={() => add(inputtxt)} title="新增"></Button>
        {/* <Text>{inputtxt}</Text> */}
        <Button onPress={() => delAll()} title="刪除全部"></Button>
      </View>
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
