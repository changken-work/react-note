import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import * as firebase from "firebase";
import * as FirebaseCore from "expo-firebase-core";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

import styles from "../styles";

import { useSelector, useDispatch } from "react-redux";
import { login, loginAsync, loginAutoAsync } from "../store/actions/authAction";
import useFirebase from "../hooks/useFirebase";

export default function SignIn() {
  const db = useFirebase();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [canLogin, setCanLogin] = useState(true);

  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      dispatch(loginAsync(email, password));
      setEmail("");
      setPassword("");
      setMessage("");
      console.log("登入成功! " + state.uid);
    } catch (error) {
      setMessage(error);
    }
  };

  const retrieveAccount = () => {
    dispatch(
      loginAutoAsync((email, password) => {
        setEmail(email);
        setPassword(password);
      })
    );
    console.log("登入成功! " + state.uid);
  };

  /**
   * 生物辨識處理函數
   * @param function successCallback 在生物辨識成功之下所要執行的函數
   * @param function failureCallback 在生物辨識失敗之下所要執行的函數
   * @param function notSupportedCallback 在不支持生物辨識設備之下所要執行的函數
   */
  const handleBiometric = async (
    successCallback,
    failureCallback,
    notSupportedCallback
  ) => {
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const hasHardWare = await LocalAuthentication.hasHardwareAsync();
    const biometricRecords = await LocalAuthentication.isEnrolledAsync();

    if (types.length > 0 && hasHardWare && biometricRecords) {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: "請做生物辨識認證",
        cancelLabel: "取消生物辨識",
        fallbackLabel: "生物辨識失敗!",
        disableDeviceFallback: false,
      });

      if (res.success) {
        successCallback();
      } else {
        LocalAuthentication.cancelAuthenticate();
        failureCallback();
      }
    } else {
      notSupportedCallback();
    }
  };

  useEffect(() => {
    handleBiometric(
      retrieveAccount,
      () => {
        alert("有些地方有問題!");
      },
      retrieveAccount
    );
  }, []);

  useEffect(() => {
    setCanLogin(state.uid !== "");
  }, [state.uid]);

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>觀迎使用</Text>
      <TextInput
        style={styles.textInput}
        placeholder="請輸入Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="請輸入密碼"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <Button onPress={signIn} title="登入" disabled={canLogin} />
      <Text>{message.toString()}</Text>
      {/* <Text>{state.uid}</Text>
      <Text>{state.email}</Text> */}
    </View>
  );
}
