import React from 'react';
import {StyleSheet, Text, View, Button, AsyncStorage} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Home} from "./Home";
import {Detail} from "./Detail";
import {Register} from "./login/Register";

export const Welcome = props => {
    const Stack = createStackNavigator();

    // Слайд "начало"
    const Welcome = () => {
        const navigation = useNavigation();

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.appName}>GetReview</Text>
                    <Text style={styles.text}>
                        Это приложение, которое позволяет ставить оценки и оставлять отзывы людям из ваших контактов
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        title="Далее"
                        color={'blue'}
                        width={'50%'}
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </View>
        );
    }

    // Основная цепочка навигации
    return (
        <Stack.Navigator
            screenOptions={{
                animationEnabled: true,
                animationTypeForReplace: 'pop',
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{
                    title: 'Начало'
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Назад'
                }}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    title: 'Назад',
                    animationEnabled: true,
                    animationTypeForReplace: 'pop',
                    headerShown: true,
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: 'blue',
                    },
                }}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        marginTop: '30%'
    },
    content: {
        flex: 1,
        color: 'blue',
        fontSize: 24,
        justifyContent: 'center',
    },
    appName: {
        color: 'blue',
        fontSize: 28,
        fontWeight: '700'
    },
    text: {
        marginTop: 10,
        color: 'grey',
        fontSize: 18,
        fontWeight: '500'
    }
});