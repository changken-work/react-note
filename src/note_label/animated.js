import { useIsFocused } from "@react-navigation/native";
import React, { useRef, useState, useEffect } from "react";
import { Animated, Text, View, StyleSheet, Button } from "react-native";

const App = () => {
  // 此頁是否被選取
  const isFocused = useIsFocused();

  // fadeAnim will be used as the value for opacity. Initial Value: 0
  //   const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = new Animated.Value(0);
  useEffect(() => {
    if (isFocused) {
      fadeIn();
      console.log("觸發");
    }
  }, [isFocused]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    // Animated.timing(fadeAnim, {
    //   useNativeDriver: true,
    //   toValue: 1,
    //   duration: 500,
    // }).start();

    Animated.spring(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim, // Bind opacity to animated value
          },
        ]}
      >
        <Text style={styles.fadingText}>React-Note</Text>
      </Animated.View>
      <View style={styles.buttonRow}>
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue",
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16,
  },
});

export default App;
