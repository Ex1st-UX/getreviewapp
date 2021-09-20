import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import * as ExpoContacts from 'expo-contacts';
import {SectionList} from "react-native-web";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export const Contacts = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [arContactBook, setContactBook] = useState([]);

    useEffect(() => {
        getContactBook()
    }, []);

    // Записываем все контакты пользователя
    async function getContactBook(item) {
        const {status} = await ExpoContacts.requestPermissionsAsync();

        var arBookData = new Array();

        if (status === 'granted') {
            const {data} = await ExpoContacts.getContactsAsync({
                fields: [ExpoContacts.Fields.PhoneNumbers],
            });

            // TODO: решить проблему с тем, что телефон может быть не один
            // Пересобираем контакты пользователя в нужный массив
            for (var contactItem of data) {

                if (contactItem.phoneNumbers !== undefined) {

                    for (var phoneItem of contactItem.phoneNumbers) {
                        var book = {
                            id: contactItem.id,
                            name: contactItem.name,
                            phone: phoneItem.number
                        };
                    }
                }

                arBookData.push(book);
            }
        }

        setContactBook(arBookData);

        // Отправляем контакты на сервер
        BookContactToServer(arBookData);
    }

    // Отправляем JSON c контактами на сервер
    async function BookContactToServer(arContactBook) {
        const URL = 'http://getreviewback.loc/api/contacts.php';

        fetch(URL, {
            method: 'POST',
            // headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue'
            })
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch();
    }

    // const getContact = () => {
    //     setIsLoading(true);
    //     var URL = 'http://getreviewback.loc/api/contacts.php?pass=EFjafn3u14u1ijr'
    //
    //     fetch(URL)
    //         .then(res =>res.json())
    //         .then(res => {
    //             setContact(res)
    //         }).finally(() => {
    //         setIsLoading(false)
    //     });
    // }

    // Отрисовываем результат ответа
    return (
        <View>
            <View style={styles.cardItem}>
                <Text style={styles.cardItemPhone}>+7 905 019 66 59</Text>
                <Text style={styles.cardItemName}>Вадим</Text>
                <Text style={styles.cardItemRaiting}>5</Text>
                <MaterialCommunityIcons name="card-account-details" size={24} color="black"/>
            </View>
            {/*<FlatList*/}
            {/*    keyExtractor={(item) => item.toString()}*/}
            {/*    data={arContactBook}*/}
            {/*    renderItem={renderContact}*/}
            {/*    refreshing={isLoading}*/}
            {/*/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    cardItem: {
        padding: 20,
        flexDirection: 'row'
    },
    cardItemPhone: {
        flex: 4
    },
    cardItemName: {
        flex: 2
    },
    cardItemRaiting: {
        flex: 1
    },
    cardItemDetail: {
        flex: 1
    }
});

