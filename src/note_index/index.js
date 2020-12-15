import React, { useState, useEffect } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { StyleSheet, StatusBar, SafeAreaView, View, Text, FlatList, TouchableOpacity, TouchableHighlight, LogBox, ActivityIndicator, Button, Modal } from "react-native";
import { Fab } from "native-base";
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';
import { FlatGrid } from 'react-native-super-grid';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PressMenu from "./onLongPressMenu";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [memos, setMemos] = useState([]);

    function _onPressButton() {
        alert('You tapped the button!')
        console.log("short press")
    };

    function _onLongPressButton() {
        alert('You long-pressed the button!')
        console.log("long press")
    };

    function show() {
        setModalVisible(true);
        console.log(modalVisible)
    }

    function hide() {
        setModalVisible(false);
        console.log(modalVisible)
    }


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }

    const db = firebase.firestore();



    useEffect(() => {
        // 讀取資料
        async function readData() {
            const newMemos = [];
            try {
                // "MeRcqDluKIWS1jjvmiN8"之後改成current user uid
                const querySnapshot = await db.collection("users").doc("MeRcqDluKIWS1jjvmiN8").collection("notes").get();
                querySnapshot.forEach((doc) => {
                    // console.log(doc.data().title);
                    const newMemo = {
                        title: doc.data().title,
                        content: doc.data().content,
                    }
                    newMemos.push(newMemo);
                });//foreach
                setMemos(newMemos);
                console.log(memos)
                console.log(modalVisible)
                setIsLoading(false);
            }//try
            catch (e) { console.log(e); }
        }//readData

        readData();
    }
        , [modalVisible]
    );


    const renderItem = ({ item}) => {
        return (
            <TouchableHighlight onPress={_onPressButton} onLongPress={() => show()}>
                <View style={[styles.itemContainer, { backgroundColor: '#2ecc71' }]}>
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
                data={memos}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={renderItem}
            />
            <PressMenu modalVisible={modalVisible} hide={hide} />
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
        marginTop: 2,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
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
        marginTop: StatusBar.currentHeight || 0,
    },
});
