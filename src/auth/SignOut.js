import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as firebase from 'firebase';
import * as FirebaseCore from 'expo-firebase-core';

import styles from '../styles';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions';

export default function SignOut() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FirebaseCore.DEFAULT_WEB_APP_OPTIONS);
  }

  const [message, setMessage] = useState('');
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      const res = await firebase.auth().signOut();
      dispatch(logout());
    } catch (error) {
      setMessage(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={signOut} title="登出" />
      <Text>{message.toString()}</Text>
      <Text>{state.email}</Text>
    </View>
  );
}