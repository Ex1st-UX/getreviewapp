import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {Home} from "./Home";
import {AntDesign} from '@expo/vector-icons';
import {FlatList} from "react-native-web";

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
                        onPress={() => navigation.navigate('BeforeStart')}
                    />
                </View>
            </View>
        );
    }

    // Слайд "Настройки перед использованием"
    const BeforeStart = () => {
        const navigation = useNavigation();

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>Как пользоваться?</Text>
                    <Text style={styles.text}>1. Проверьте, что у приложения есть доступ к контактам</Text>
                    <Text style={styles.text}>2. Нажмите далее</Text>
                </View>
                <View style={{flex: 1}}>
                    <Button
                        title="Далее"
                        color={'blue'}
                        onPress={() => navigation.navigate('Home')}
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
                name="BeforeStart"
                component={BeforeStart}
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
        </Stack.Navigator>
    );
}

// Стили
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