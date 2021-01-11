import React, { useState, useEffect } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { StyleSheet, StatusBar, SafeAreaView, View, Text, TouchableHighlight, LogBox, ActivityIndicator, Button, Modal } from "react-native";
import { Fab } from "native-base";
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';
import { FlatGrid } from 'react-native-super-grid';
import LongPressMenu from "./onLongPressMenu";
import PressMenu from "./onPressMenu";

import { useSelector, useDispatch } from 'react-redux';
import { readNoteAsync } from '../store/actions/noteAction';
export default function App() {
    // const u_id = 'livaU1dFuvTRGFi5Agj52ObQYT63'
    const uid = useSelector(state => state.auth.uid);
    const dispatch = useDispatch();
    dispatch(readNoteAsync(uid));
    const notes = useSelector(state => state.note.notes);
    

    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible_pop, setModalVisible_pop] = useState(false);
    const [selectedId, setSelectedId] = useState(-1);
    // const [memos, setMemos] = useState([]);




    function show() {
        setModalVisible(true);
        // console.log(modalVisible)
    }

    function hide() {
        setModalVisible(false);
        // console.log(modalVisible)
    }

    function show_pop(index) {
        setSelectedId(index);
        setModalVisible_pop(true);
        // console.log("index", selectedId)
        // console.log("pop",modalVisible_pop)
    }


    function hide_pop() {
        console.log("index", selectedId)
        setModalVisible_pop(false);
        setSelectedId(-1);
        // // console.log("index", selectedId)
        // console.log("pop",modalVisible_pop)
    }


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }

    const db = firebase.firestore();

    useEffect(() => {
        //讀取資料
        async function readData() {
            try {
                // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
                console.log('uid', uid);
                dispatch(readNoteAsync(uid));
                console.log("note",notes)
                setIsLoading(false);
            }//try
            catch (e) { console.log(e); }
        }//readData
        readData();
        
    }
        , []
    );


    const renderItem = ({ item,index}) => {
        return (
            <TouchableHighlight onPress={() => show_pop(index)} onLongPress={() => show()}>
                <View style={[styles.itemContainer, { backgroundColor: '#7f8fa6' }]}>
                    <Text style={styles.itemName}>{item.title}</Text>
                    <Text style={styles.itemCode}>{item.content}</Text>
                </View>
            </TouchableHighlight>
        );
    };
    


    return (
        <View style={styles.memocontainer}>
        {!isLoading ?
        <>
            <FlatGrid
                itemDimension={130}
                data={notes}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                keyExtractor={(item, index) => "" + index}
                spacing={10}
                renderItem={renderItem}
            />
            <LongPressMenu modalVisible={modalVisible} hide={hide} />
            <PressMenu modalVisible={modalVisible_pop} hide={hide_pop} memo={notes} id={selectedId}/>
        </>
        :
        <>
            <View style={styles.loading}>
                <ActivityIndicator color="red" size="large" animating={isLoading} />
            </View>
        </>
        }
        </View>
    );
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 15,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '900',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        marginTop:50,
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    memocontainer: {
        flex: 1,
        flexDirection: "row",
        // marginTop: StatusBar.currentHeight || 0,
        backgroundColor:"#ced6e0",
    },
});
