import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import SignIn from './src/auth/SignIn';
import SignUp from './src/auth/SignUp';
import SignOut from './src/auth/SignOut';
import Index from './src/note_index/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NoteText from './src/note_text/MemoList';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/store/reducer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to lists"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

const store = createStore(reducer);

const Stack = createStackNavigator();


function INDEX(navigation) {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen name="Profile" component={Index} options={{
        headerTitle: "HOME",
        headerStyle: { backgroundColor: '#ffffff'},
        headerLeft: () => (
          <Icon name='menu' size={24} color='black' containerStyle={{marginLeft:10}}
            onPress={() => navigation.navigation.toggleDrawer()}
          />
        )
        
      }}/>
    </Stack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
const TabsScreen = () =>(
  <Tab.Navigator>
        <Tab.Screen name="SignOut" component={SignOut} />
          <Tab.Screen name="SignIn" component={SignIn} />
          <Tab.Screen name="SignUp" component={SignUp} />
  </Tab.Navigator>
);
function SIGNIN(navigation) {
  return (
    <Stack.Navigator independent={true}>
      <Stack.Screen name="Profile" component={SignIn} options={{
        headerTitle: "SIGN-IN",
        headerStyle: { backgroundColor: '#ffffff' },
        headerLeft: () => (
          <Icon name='menu' size={24} color='black' containerStyle={{ marginLeft: 10 }}
            onPress={() => navigation.navigation.toggleDrawer()}
          />
        )

      }} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="SignIn">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="NoteText" component={NoteText} />
          <Drawer.Screen name="SignIn" component={SIGNIN} />
          <Drawer.Screen name="SignUp" component={SignUp} />
          <Drawer.Screen name="SignOut" component={SignOut} />
          <Drawer.Screen name="Index" component={INDEX} />
          <Drawer.Screen name="Home2" component={TabsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
