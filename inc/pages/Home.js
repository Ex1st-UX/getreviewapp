import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {GetRights} from "./GetRights";

const Tab = createBottomTabNavigator();

export const Contacts = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Контакты"
                    component={Welcome}
                    options={{
                        tabBarActiveTintColor: 'blue',
                        tabBarHideOnKeyboard: false,
                        tabBarLabel: 'Контакты',
                        tabBarIcon: () => (
                            <Feather name="phone" size={24} color="grey"/>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Настройки"
                    component={GetRights}
                    options={{
                        tabBarActiveTintColor: 'blue',
                        tabBarLabel: 'Настройки',
                        tabBarIcon: () => (
                            <AntDesign name="setting" size={24} color="grey"/>
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
