import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';
import * as SecureStore from 'expo-secure-store';

import styles from '../styles';

import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../store/actions/authAction';

export default function SignOut() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [message, setMessage] = useState('');
  const state = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(logoutAsync());
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>SignOut</Text>
      <Button onPress={signOut} title="登出" />
      <Text>{message.toString()}</Text>
      <Text>{state.uid}</Text>
      <Text>{state.email}</Text>
    </View>
  );
}
