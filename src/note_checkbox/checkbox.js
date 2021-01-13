import React, { useState, useEffect } from 'react';
import {
  ListItem,
  CheckBox,
  Icon,
  Avatar,
  Badge,
  Image,
} from 'react-native-elements';

import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  LogBox,
  ActivityIndicator,
  Button,
  View,
} from 'react-native';
import { Fab } from 'native-base';

import styles from '../styles';

import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';
import { useSelector, useDispatch } from 'react-redux';
import { changeModalVisible } from '../store/actions/checkboxAction';
import {
  addTodoList,
  finishTodo,
  refreshFinish,
  refreshTodo,
} from '../store/actions/checkListAction';
import CheckTest from './checkTest';
import { FlatGrid } from 'react-native-super-grid';
import indexStyles from '../styles/indexStyle';

export default function checkbox() {
  const checkbox = useSelector(state => state.checkbox);
  const uid = useSelector(state => state.auth.uid);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const modalVisible = useSelector(state => state.checkbox.modalVisible);

  const [check, setCheck] = useState(false);
  const [checkboxes, setCheckboxes] = useState({
    title: '',
    finishList: [''],
    todoList: [''],
  });
  const [updateBox, setUpdateBox] = useState({
    title: '',
    finishList: [''],
    todoList: [''],
  });

  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }
  const db = firebase.firestore();
  useEffect(() => {
    async function readData() {
      const newCheckbox1 = [];
      try {
        const querySnapshot = await db
          .collection('users')
          .doc(uid)
          .collection('checkboxes')
          .get();

        querySnapshot.forEach(doc => {
          // console.log("finshList:", doc.data().finishList[0]);

          const newCheckbox = {
            id: doc.id,
            title: doc.data().title,
            finishList: doc.data().finishList,
            todoList: doc.data().todoList,
          };
          newCheckbox1.push(newCheckbox);
        });
        setCheckboxes(newCheckbox1);
        setIsLoading(false);

        // console.log("checkboxes:", checkboxes[0]["list"]);
      } catch (e) {
        //try
        // console.log(e);
      }
    } //readData
    readData();
  }, [modalVisible]);

  function update(id) {
    console.log('update index:' + id);
    checkboxes.forEach(doc => {});
    // console.log("checkboxes:", checkboxes);
    async function getCheckListId(index) {
      dispatch(refreshTodo());
      dispatch(refreshFinish());

      setUpdateBox({
        title: checkboxes[index].title,
        todoList: checkboxes[index].todoList,
        finishList: checkboxes[index].finishList,
      });
      checkboxes[index].todoList.forEach((item, index) => {
        dispatch(addTodoList(item));
      });
      checkboxes[index].finishList.forEach((item, index) => {
        dispatch(finishTodo(item));
      });

      try {
        const ref = await db
          .collection('users')
          .doc(uid)
          .collection('checkboxes')
          .get();
        // 每筆list的ID
        const docRefId = ref.docs[index].id;
        setSelectedId(docRefId);
        console.log('selectID:', docRefId);
        // setModalVisible(!modalVisible);
        dispatch(changeModalVisible(true));
      } catch (e) {
        console.log(e);
      }
    }
    getCheckListId(id);
  }

  add = async () => {
    // readData();
    dispatch(refreshTodo());
    dispatch(refreshFinish());

    // console.log("add");
    setUpdateBox({
      title: '',
      finishList: [''],
      todoList: [''],
    });
    setSelectedId('');

    console.log('modal', modalVisible);
    dispatch(changeModalVisible(true));
  };

  function hide() {
    setSelectedId('');
    dispatch(changeModalVisible(false));
  }
  // checkbox布林值
  function fsetCheck() {
    setCheck(!check);
    // console.log(check);
  }
  function hide() {
    setSelectedId('');
    dispatch(changeModalVisible(false));
  }

  const renderItem = ({ item, index }) => {
    console.log('item,index:', item, index);
    return (
      <ListItem
        key={item.id}
        bottomDivider
        containerStyle={{
          backgroundColor: '#A7767C',
          borderRadius: 5,
          justifyContent: 'center',
        }}
      >
        {/* <Avatar source={{ uri: l.avatar_url }} /> */}
        <View>
          <ListItem.Content>
            <TouchableOpacity onPress={() => update(index)}>
              {/* <ListItem.Title>{item.title}</ListItem.Title> */}
              <Text style={indexStyles.itemName}>{item.title}</Text>
              <View>
                {/* <ListItem.Subtitle>{item.list}</ListItem.Subtitle> */}

                {item.finishList.map((item, i) => (
                  <CheckBox
                    key={i}
                    center
                    title={item}
                    checked={true}
                    size={35}
                    onPress={() => fsetCheck()}
                  />
                ))}
                {item.todoList.map((item, i) => (
                  <CheckBox
                    key={i}
                    center
                    title={item}
                    size={30}
                    onPress={() => fsetCheck()}
                  />
                ))}
              </View>
            </TouchableOpacity>
          </ListItem.Content>
        </View>
      </ListItem>

      // <ListItem key={index} bottomDivider>
      //   {/* <Avatar source={{ uri: l.avatar_url }} /> */}
      //   <ListItem.Content>
      //     <TouchableOpacity onPress={() => update(index)}>
      //       <View style={[indexStyles.itemContainer, { backgroundColor: '#7f8fa6' }]}>
      //       <ListItem.Title>{item.title}</ListItem.Title>
      //       {/* <ListItem.Subtitle>{item.list}</ListItem.Subtitle> */}

      //       {item.finishList.map((item, i) => (
      //         <CheckBox center title={item} checked={true} size={10} onPress={() => fsetCheck()} />
      //       ))}
      //       {item.todoList.map((item, i) => (
      //         <CheckBox center title={item} size={10} onPress={() => fsetCheck()} />
      //       ))}
      //       </View>
      //     </TouchableOpacity>
      //   </ListItem.Content>
      // </ListItem>
    );
  };
  return (
    // <SafeAreaView style={styles.memocontainer}>
    //   {!isLoading ? (
    //     <FlatList
    //       data={checkboxes}
    //       renderItem={renderItem}
    //       keyExtractor={(item, index) => "" + index}
    //     />
    //   ) : (
    //       <View style={styles.loading}>
    //         <ActivityIndicator color="red" size="large" animating={isLoading} />
    //       </View>
    //     )}
    //   <Fab onPress={() => add()}>
    //     <Icon name="add" color="#fff" />
    //   </Fab>
    //   {/* <Button onPress={() => refresh()} title="test" color="green" /> */}
    //   <CheckTest
    //     modalVisible={checkbox.modalVisible}
    //     checkbox={updateBox}
    //     id={selectedId}
    //     hide={hide}
    //   />
    // </SafeAreaView>

    <View style={indexStyles.memocontainer}>
      {!isLoading ? (
        <>
          <FlatGrid
            itemDimension={130}
            data={checkboxes}
            style={indexStyles.gridView}
            // staticDimension={300}
            // fixed
            keyExtractor={(item, index) => '' + index}
            spacing={10}
            renderItem={renderItem}
          />
        </>
      ) : (
        <>
          <View style={styles.loading}>
            <ActivityIndicator color="red" size="large" animating={isLoading} />
          </View>
        </>
      )}
      <Fab onPress={() => add()}>
        <Icon name="add" color="#fff" />
      </Fab>
      {/* <Button onPress={() => refresh()} title="test" color="green" /> */}
      <CheckTest
        modalVisible={checkbox.modalVisible}
        checkbox={updateBox}
        id={selectedId}
        hide={hide}
      />
    </View>
  );
}
