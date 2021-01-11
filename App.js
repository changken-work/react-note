import React from "react";
import { StyleSheet, Text, View, Button, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Icon } from "react-native-elements";
import SignIn from "./src/auth/SignIn";
import SignUp from "./src/auth/SignUp";
import SignOut from "./src/auth/SignOut";
import Index from "./src/note_index/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NoteCheckbox from "./src/note_checkbox/checkbox";

import NoteText from "./src/note_text/MemoList";
import TodoList from "./src/note_label/TodoList";
import LabelDemo from "./src/note_label/label_demo";
import animated from "./src/note_label/animated";
// redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./src/store/reducers";
import M_Icon from "react-native-vector-icons/MaterialIcons";
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Notifications")}
        title="Go to lists"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function rootStack(navigation) {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen
        name="HOME"
        component={Index}
        options={{
          headerTitle: "HOME",
          headerStyle: { backgroundColor: "#fff" },
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="black"
              containerStyle={{ marginLeft: 10 }}
              onPress={() => navigation.navigation.toggleDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

const TabsScreen = () => (
  <Tab.Navigator
    tabBarOptions={{
      // labelPosition: "beside-icon",
      activeTintColor: "black",
      style: {
        backgroundColor: "white",
      },
      labelStyle: {
        fontSize: 12,
      },
      tabStyle: {
        width: 100,
      },
    }}
  >
    <Tab.Screen
      name="HOME"
      component={rootStack}
      options={{
        tabBarLabel: "HOME",
        tabBarIcon: () => <M_Icon name="home" color="#333" size={24} />,
      }}
    />
    <Tab.Screen
      name="ADD"
      component={NoteText}
      options={{
        tabBarLabel: "ADD",
        tabBarIcon: () => <M_Icon name="add" color="#333" size={24} />,
      }}
    />
  </Tab.Navigator>
);
function SIGNIN(navigation) {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen
        name="Profile"
        component={SignIn}
        options={{
          headerTitle: "SIGN-IN",
          headerStyle: { backgroundColor: "#ffffff" },
          headerLeft: () => (
            <Icon
              name="menu"
              size={24}
              color="black"
              containerStyle={{ marginLeft: 10 }}
              onPress={() => navigation.navigation.toggleDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="SignIn">
          {/* <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
          <Drawer.Screen name="NoteText" component={NoteText} />
          <Drawer.Screen name="NoteCheckbox" component={NoteCheckbox} />
          <Drawer.Screen name="SignIn" component={SIGNIN} />
          <Drawer.Screen name="SignUp" component={SignUp} />
          <Drawer.Screen name="SignOut" component={SignOut} />
          <Drawer.Screen name="Index" component={TabsScreen} />
          <Drawer.Screen name="Home2" component={TabsScreen} />
          {/* <Drawer.Screen name="Label" component={TodoList} /> */}
          <Drawer.Screen name="LabelDemo" component={LabelDemo} />
          <Drawer.Screen name="動畫" component={animated} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
