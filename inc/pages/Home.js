import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Contacts} from "./Contacts";
import {Profile} from "./Profile";
import {Detail} from "./Detail";

const Tab = createBottomTabNavigator();

export const Home = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTintColor: 'white',
                headerStyle: {
                    backgroundColor: 'blue',
                },
                tabBarStyle: {
                    backgroundColor: '#ededed',
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                    fontWeight: '400'
                },
            }}
        >
            <Tab.Screen
                name="Контакты"
                component={Contacts}
                options={{
                    tabBarActiveTintColor: 'blue',
                    tabBarHideOnKeyboard: false,
                    tabBarLabel: '',
                    tabBarIcon: ({focused, color}) => (
                        <Feather focused={focused} name="phone" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Профиль"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarActiveTintColor: 'blue',
                    tabBarIcon: ({focused, color}) => (
                        <AntDesign focused={focused} name="contacts" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
