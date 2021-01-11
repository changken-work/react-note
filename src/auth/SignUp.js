import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
import { useSelector } from 'react-redux';

import styles from '../styles';

export default function SignUp() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [canRegister, setCanRegister] = useState(true);
  const uid = useSelector(state => state.auth.uid);

  const signUp = async () => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({
        displayName: displayName,
      });
      setDisplayName('');
      setEmail('');
      setPassword('');
      setMessage('');
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    if (firebase.auth().currentUser !== null)
      console.log(firebase.auth().currentUser.uid);
  }, []);

  useEffect(() => {
    setCanRegister(uid !== '');
  }, [uid]);

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>SignUp</Text>
      <TextInput
        style={styles.textInput}
        placeholder="請輸入姓名"
        value={displayName}
        onChangeText={text => setDisplayName(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="請輸入Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="請輸入密碼"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <Button onPress={signUp} title="註冊" disabled={canRegister} />
      <Text>{message.toString()}</Text>
    </View>
  );
}
