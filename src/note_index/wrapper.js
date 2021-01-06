import React from 'react';
import { StyleSheet, Text, View, Button, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import M_Icon from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'react-native-elements';

import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SignOut from '../auth/SignOut';
import Index from '../note_index/index';
import NoteCheckbox from '../note_checkbox/checkbox';
import NoteText from '../note_text/MemoList';
import LabelDemo from '../note_label/label_demo';

export default function Wrapper() {
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

function rootStack(navigation) {
    return (
        <Stack.Navigator independent={true}>
            <Stack.Screen
                name="HOME"
                component={Index}
                options={{
                    headerTitle: 'HOME',
                    headerStyle: { backgroundColor: '#fff' },
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
        }}>
        <Tab.Screen name="HOME" component={rootStack} options={{
            tabBarLabel: 'HOME',
            tabBarIcon: () => <M_Icon name="home" color="#333" size={24} />,
        }} />
        <Tab.Screen name="ADD" component={NOTELIST} options={{
            tabBarLabel: 'ADD',
            tabBarIcon: () => <M_Icon name="add" color="#333" size={24} />,
        }} />
        <Tab.Screen name="CHECKBOX" component={CHECKBOX} options={{
            tabBarLabel: 'CHECKBOX',
            tabBarIcon: () => <M_Icon name="check-circle" color="#333" size={24} />,
        }} />
    </Tab.Navigator>
);

function SIGNIN(navigation) {
    return (
        <Stack.Navigator independent={true}>
            <Stack.Screen
                name="Profile"
                component={SignIn}
                options={{
                    headerTitle: 'SIGN-IN',
                    headerStyle: { backgroundColor: '#ffffff' },
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
    function NOTELIST(navigation) {
        return (
            <Stack.Navigator independent={true}>
                <Stack.Screen
                    name="Profile"
                    component={NoteText}
                    options={{
                        headerTitle: 'EDIT NOTES',
                        headerStyle: { backgroundColor: '#ffffff' },
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

    function CHECKBOX(navigation) {
        return (
            <Stack.Navigator independent={true}>
                <Stack.Screen
                    name="Profile"
                    component={NoteCheckbox}
                    options={{
                        headerTitle: 'CHECKBOX',
                        headerStyle: { backgroundColor: '#ffffff' },
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
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="SignIn">
                {/* <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
                <Drawer.Screen name="NoteText" component={NOTELIST} />
                <Drawer.Screen name="NoteCheckbox" component={CHECKBOX} />
                <Drawer.Screen name="SignIn" component={SIGNIN} />
                <Drawer.Screen name="SignUp" component={SignUp} />
                <Drawer.Screen name="SignOut" component={SignOut} />
                <Drawer.Screen name="Index" component={TabsScreen} />
                {/* <Drawer.Screen name="Label" component={TodoList} /> */}
                <Drawer.Screen name="LabelDemo" component={LabelDemo} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}