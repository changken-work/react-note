import React, { useState, useEffect } from 'react';
import { Header, ListItem, Icon, Divider } from 'react-native-elements';
import { StyleSheet, SafeAreaView, TextInput, View, Button, Modal, LogBox, Text,ScrollView } from "react-native";


import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';

export default function PressMenu(props) {
    LogBox.ignoreLogs(['Setting a timer']);
    
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        try{
            if(props.id >= 0){
                const index = props.id;
                const selectedNote = props.memo[index];
                // console.log("selectedNote~", selectedNote);
                setId(selectedNote.id);
                setTitle(selectedNote.title);
                setContent(selectedNote.content);
            }  
        }
        catch (e) { console.log(e); }
    }, [props.id]);


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }
    const db = firebase.firestore();

    return (
        <SafeAreaView>
            <Modal animationType="fade" visible={props.modalVisible} transparent={true} style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.TitleContainer}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    <Divider style={styles.Divider} />
                        <View style={{flex:12}}>
                        {/* <Text style={styles.memoContent}>內容</Text> */}
                        <ScrollView style={styles.ContentContainer}>
                            <Text style={styles.contentText}>{content}</Text>
                        </ScrollView>
                        </View>
                        <Button title="關閉" onPress={() => props.hide()} color='#cf6a87' />
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
        backgroundColor: "#f5f6fa",
        marginTop: 110,
        marginBottom: 110,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center',
        paddingTop: 10,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 5,
        borderWidth: 3,
        borderColor:'#7f8fa6',
    },
    TitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginTop:10,
    },
    ContentContainer: {
        flex: 6,
        marginTop:5,
        marginLeft: 2,
        marginRight: 2,
        marginBottom: 10,
        paddingTop:15,
        paddingRight:20,
        paddingLeft:20,
        paddingBottom: 15,
        borderLeftWidth:2,
        borderRightWidth:2,
        borderColor: '#7f8fa6',
        // borderWidth:3,
        // borderRadius: 10,

    },
    titleText: {
        height: 30,
        fontSize: 20,
        color: '#000',
    },
    contentText: {
        color: '#000',
        flex: 9,
        fontSize: 18,
        alignSelf: 'center',
    },
    Divider: {
        backgroundColor: '#7f8fa6',
        margin:5,
        height:3,
        borderRadius:10,
    }
});