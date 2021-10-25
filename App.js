import React from 'react';
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