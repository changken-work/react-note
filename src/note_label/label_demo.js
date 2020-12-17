import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addLabel, delLabel } from "../store/actions/labelAction";
export default function TodoList() {
  const [ldata, setLdata] = useState("");
  const label = useSelector((state) => state.label.label);
  const dispatch = useDispatch();

  function add(data) {
    setLdata(data);
    dispatch(addLabel(ldata));
  }

  function del() {
    dispatch(delLabel());
  }
  return (
    <View style={styles.container}>
      <Text>現在的標籤: {label}</Text>
      <Button onPress={() => add("安安")} title="新增"></Button>
      <Button onPress={() => del()} title="刪除標籤"></Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    paddingHorizontal: 16,
  },
});
