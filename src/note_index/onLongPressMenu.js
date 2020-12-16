import React, { useState, useEffect } from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { StyleSheet,SafeAreaView, TextInput, View, Button,Modal, LogBox } from "react-native";


import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function LongPressMenu(props){
    LogBox.ignoreLogs(['Setting a timer']);


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }
    const db = firebase.firestore();

    return (
        <SafeAreaView>
            <Modal animationType="fade" visible={props.modalVisible} transparent={true} style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <Button title="編輯" color='#fa8231'/>
                    <Button title="刪除" color='#eb3b5a'/>
                    <Button title="關閉" onPress={() => props.hide()} color='#a5b1c2' />
                </View>
            </Modal>
        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 22,
        
    },
    modalView: {
        marginLeft:0,
        marginRight: 0,
        justifyContent: 'flex-end',
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
});