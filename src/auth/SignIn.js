import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

import styles from '../styles';

export default function SignIn() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const signIn = async () => {
    try {
      const res = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
      setMessage('');
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <View style={styles.form}>
      <Text>SignIn</Text>
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
      <Button onPress={signIn} title="登入" />
      <Text>{message}</Text>
    </View>
  );
}
