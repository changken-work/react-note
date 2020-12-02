import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

import styles from '../styles';

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../store/actions';

export default function SignIn() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(login(email));
      setEmail('');
      setPassword('');
      setMessage('');
    } catch (error) {
      dispatch(logout());
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
      <Text>{message.toString()}</Text>
      <Text>{state.email}</Text>
    </View>
  );
}
