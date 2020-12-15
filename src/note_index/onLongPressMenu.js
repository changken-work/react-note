import React, { useState, useEffect } from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { StyleSheet,SafeAreaView, TextInput, View, Button,Modal, LogBox } from "react-native";


import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function PressMenu(props){
    LogBox.ignoreLogs(['Setting a timer']);


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }
    const db = firebase.firestore();

    return (
        <SafeAreaView style={{height: 150}}>
            <Modal animationType="slide" visible={props.modalVisible} transparent={true} style={styles.modalContainer}>
                <View style={styles.modalView}>
                <Button title="編輯" onPress={() => props.hide()}/>
                <Button title="刪除" />
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
        
    },
    modalView: {
        justifyContent: 'flex-end',
        flex: 1,

    },
});