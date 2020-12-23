import React, { useState, useEffect } from 'react';
import { Header, ListItem, Icon, Divider } from 'react-native-elements';
import { StyleSheet, SafeAreaView, TextInput, View, Button, Modal, LogBox, Text,ScrollView } from "react-native";


import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import * as FirebaseCore from 'expo-firebase-core';
// import console = require('console');

export default function PressMenu(props) {
    LogBox.ignoreLogs(['Setting a timer']);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    if (!firebase.apps.length) {
        firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
    }
    const db = firebase.firestore();

    return (
        <SafeAreaView>
            <Modal animationType="fade" visible={props.modalVisible} transparent={true} style={styles.modalContainer}>
                <View style={styles.modalView}>
                    <View style={styles.MemoContainer}>
                    <Divider style={styles.Divider} />
                    <View style={styles.TitleContainer}>
                        <Text style={styles.titleText}>新增&修改</Text>
                    </View>
                    <Divider style={styles.Divider} />
                        <View style={{flex:12}}>
                        {/* <Text style={styles.memoContent}>內容</Text> */}
                        <ScrollView style={styles.ContentContainer}>
                                <Text style={styles.contentText}>flex-start: 以開始線來對齊，例如從右至左的排列方向，最右邊即是開始線。{"\n"}flex-end: 以結束線來對齊，和上面的屬性顛倒。{"\n"}center: 以中線來對齊。{"\n"}space-between: 項目會平均分散對齊，第一個項目會位於開始線，最後一個項目位於結束線。{"\n"}space-around: 項目會平均分散對齊，每個項目之間約有二個單位的空格，第一個項目會與開始線之間有一個單位的空格，最後一個項目與結束線之間也有一個單位的空格。{"\n"}stretch (預設值): 伸展填好填滿容器(注意仍然會受到 {"\n"}min-width/max-width 的限制，也就是項目的高度或寬度限制)</Text>
                        </ScrollView>
                        </View>
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
        backgroundColor:"#e17055",
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        paddingTop: 20,
        paddingLeft:20,
        paddingRight:20,
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
    },
    MemoContainer: {
        backgroundColor: "#fab1a0",
        flex: 1,
        marginBottom:10,
        borderRadius: 5,
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
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        paddingTop:15,
        paddingRight:30,
        paddingLeft:30,
        paddingBottom: 15,
        borderColor:'#e17055',
        borderWidth:3,
        borderRadius: 10,

    },
    memoTitle:{
        height:40,
        fontSize: 18,
        color: '#000',
    },
    titleText: {
        height: 40,
        fontSize: 26,
        color: '#000',
    },
    memoContent: {
        fontSize: 24,
        color: '#000',
        marginLeft: 20,
    },
    contentText: {
        color: '#000',
        flex: 9,
        fontSize: 18,
        alignSelf: 'center',
    },
    Divider: {
        backgroundColor: '#e17055',
        margin:10,
        height:3,
        borderRadius:10,
    }
});