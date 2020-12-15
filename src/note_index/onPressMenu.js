import React, { useState, useEffect } from 'react';
import { Header, ListItem, Icon } from 'react-native-elements';
import { StyleSheet, SafeAreaView, TextInput, View, Button, Modal, LogBox, Text } from "react-native";


import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function PressMenu(props) {
    LogBox.ignoreLogs(['Setting a timer']);


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }
    const db = firebase.firestore();

    return (
        <SafeAreaView>
            <Modal animationType="fade" visible={props.modalVisible} transparent={true} style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.memoTitle}>主旨：NA</Text>
                    </View>
                    <View style={styles.ContentContainer}>
                        <Text style={styles.memoContent}>內容</Text>
                        <Text style={styles.memoContent}>na</Text>
                    </View>
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

    },
    modalView: {
        backgroundColor:"#fffff0",
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        padding: 20,
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
    TitleContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    ContentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    memoTitle:{
        fontSize: 32,
        color: '#000',
    },
    memoContent: {
        fontSize: 24,
        color: '#000',
    }
});