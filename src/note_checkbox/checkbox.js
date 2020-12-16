import React, { useState, useEffect } from "react";
import { ListItem, Icon, CheckBox, Avatar } from "react-native-elements";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  LogBox,
  ActivityIndicator,
} from "react-native";
import { Fab } from "native-base";

import styles from "../styles";

import * as firebase from "firebase";
import firestore from "firebase/firestore";
import * as FirebaseCore from "expo-firebase-core";

export default function checkbox() {
  const list = [
    {
      name: "Amy Farha",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
      subtitle: "Vice President",
    },
    {
      name: "Chris Jackson",
      avatar_url:
        "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
      subtitle: "Vice Chairman",
    },
  ];
  const [check, setCheck] = useState(false);

  function add() {
    console.log("add");
    // setMemos({
    //   title: "",
    //   content: ""
    // });
    // setSelectedId("");
    // setModalVisible(true);
  }
  function fsetCheck() {
    setCheck(!check);
    console.log(check);
  }

  const renderItem = ({ item, index }) => {
    return (
      <ListItem key={item} bottomDivider>
        {/* <Avatar source={{ uri: l.avatar_url }} /> */}
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
          <CheckBox
            center
            title="Click Here"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            onPress={() => fsetCheck()}
            checked={check}
          />
        </ListItem.Content>
      </ListItem>
    );
  };
  return (
    <SafeAreaView style={styles.memocontainer}>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => "" + index}
      />
      <Fab onPress={() => add()}>
        <Icon name="add" color="#fff" />
      </Fab>
    </SafeAreaView>
  );
}
