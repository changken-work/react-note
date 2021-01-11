import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const App = ({ navigation }) => {
  // 此頁是否被選取
  const isFocused = useIsFocused();

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  //   const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = new Animated.Value(0);
  const springAnim = new Animated.Value(1);

  useEffect(() => {
    if (isFocused) {
      fadeIn();
      console.log("觸發");
    }
  }, [isFocused]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start(({ finished }) => {
      if (finished) {
        setTimeout(() => {
          navigation.navigate("SignIn");
        }, 1500);
      }
    });

    springAnim.setValue(0.1);
    Animated.spring(springAnim, {
      useNativeDriver: true,
      toValue: 1,
      friction: 2, //弹跳系数
      tension: 10, // 控制速度
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ scale: springAnim }],
        }}
      >
        <Text style={styles.fadingText}>React-Note</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      >
        <Text style={styles.subTitleText}>生活，記事</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
        {/* <Button title="開始" onPress={() => navigation.navigate("SignIn")} /> */}
        {/* <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fadingContainer: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  subTitleText: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },
});

export default App;
