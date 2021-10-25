import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, StyleSheet, Text, View, TextInput} from "react-native";
import { MaskedTextInput} from "react-native-mask-text";

export const Register = props => {
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const navigation = useNavigation();

    const registerSubmit = (phone) => {
        if (!userPhoneNumber.length) {
            sendError('error string empty');
        }
    }

    const sendError = (error) => {
        console.log(error);
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={{fontSize: 18, fontWeight: '500'}}>Как пользоваться?</Text>
                <Text style={styles.text}>1. Введите номер телефона, которым пользуетесь</Text>
                <View style={styles.reviewInputWrapper}>
                    <MaskedTextInput
                        mask="+7 (999) 999 99-99"
                        defaultValue="+7"
                        keyboardType="numeric"
                        style={styles.reviewInput}
                        onChangeText={(phone, rawText) => {
                            setUserPhoneNumber(phone);
                        }}
                    />
                </View>
                <Text style={styles.text}>2. Нажмите далее и согласитесь с разрешением</Text>
            </View>
            <View style={{flex: 1, marginTop: 40}}>
                <Button
                    title="Далее"
                    color={'blue'}
                    onPress={registerSubmit}
                />
            </View>
        </View>
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
    },
    reviewInput: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
        borderColor: 'grey',
        paddingBottom: 10,
        paddingTop: 10,
        textAlignVertical: 'top',
        fontWeight: '500'
    },
    reviewInputWrapper: {
        marginTop: 20,
        marginBottom: 20
    }
});