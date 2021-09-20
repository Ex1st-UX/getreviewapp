import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Welcome} from "./inc/pages/Welcome";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Welcome/>
        </NavigationContainer>
    );
}