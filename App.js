import React from "react";
import { StyleSheet, Text, View, Button, LogBox } from "react-native";

import Wrapper from "./src/note_index/wrapper";
// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./src/store/reducers";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <Provider store={store}>
      <Wrapper></Wrapper>
    </Provider>
  );
}
