import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

import styles from '../styles';

export default function SignUp() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signUp = async () => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      res.user.updateProfile({
        displayName,
      });
      setDisplayName('');
      setEmail('');
      setPassword('');
      setMessage('');
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <View style={styles.form}>
      <Text>SignUp</Text>
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
      <Button onPress={signUp} title="註冊" />
      <Text>{message}</Text>
    </View>
  );
}
