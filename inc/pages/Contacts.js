import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

export const GetRights = props => {
    const [arContact, setContact] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const renderItem = ({item}) => {
        return (
            <Text>{item}</Text>
        );
    }

    useEffect(() => {
        getContact()
    }, []);

    const getContact = () => {
        setIsLoading(true);
        var URL = 'https://blackbeans.loc/request'

        fetch(URL)
            .then(res => res.json())
            .then(res => {
                setContact(res)
            }).finally(() => {
            setIsLoading(false)
        });

        console.log(arContact)
    }

    return (
        <View>
            <Text>Чтобы приложение смогло найти отзывы, нужно дать разешение на доступ к контактам</Text>
            <FlatList
                keyExtractor={(item) => item.toString()}
                data={arContact}
                renderItem={renderItem}
                refreshing={isLoading}
            />
        </View>
    );

}
