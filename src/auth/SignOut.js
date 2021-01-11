import React, { useState, useEffect } from 'react';
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
  const [canLogout, setCanLogout] = useState(false);
  const state = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const signOut = async () => {
    try {
      dispatch(logoutAsync());
      console.log('登出成功!');
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    setCanLogout(state.uid === '');
  }, [state.uid]);

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>SignOut</Text>
      <Button onPress={signOut} title="登出" disabled={canLogout} />
      <Text>{message.toString()}</Text>
      {/* <Text>{state.uid}</Text>
      <Text>{state.email}</Text> */}
    </View>
  );
}
