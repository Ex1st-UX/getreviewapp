import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import * as ExpoContacts from 'expo-contacts';
import {SectionList} from "react-native-web";
import {MaterialCommunityIcons} from '@expo/vector-icons';

export const Contacts = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [arContactBook, setContactBook] = useState([]);
    const [responseServer, setResponseServer] = useState([]);

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
        // const URL = 'http://getreviewback.loc/api/contacts.php';
        const URL = 'http://188.225.45.35/api/contacts.php';

        // var bodyFetch = [{"id":"1804","name":"+79063387054","phone":"+79063387054"},{"id":"1804","name":"+79063387054","phone":"+79063387054"},{"id":"2486","name":"+79372046253","phone":"+79372046253"},{"id":"2275","name":"(Фуллстпк 50к)","phone":"+79277707775"},{"id":"1758","name":"+7 927 787-89-38","phone":"+7 927 787-89-38"},{"id":"1758","name":"+7 927 787-89-38","phone":"+7 927 787-89-38"},{"id":"1758","name":"+7 927 787-89-38","phone":"+7 927 787-89-38"},{"id":"1509","name":"Elena Ps4","phone":"+79277711016"},{"id":"102","name":"Mashtakova Anastasia","phone":"+79879776618"},{"id":"2460","name":"SMS-поддержка Yota","phone":"0999"},{"id":"2460","name":"SMS-поддержка Yota","phone":"0999"},{"id":"2460","name":"SMS-поддержка Yota","phone":"0999"},{"id":"2460","name":"SMS-поддержка Yota","phone":"0999"},{"id":"1658","name":"Александр Домен 5flowers","phone":"89272162464"},{"id":"1523","name":"Александр Мурзаков","phone":"+79370747994"},{"id":"1523","name":"Александр Мурзаков","phone":"+79370747994"},{"id":"2462","name":"Алексей (Квартира)","phone":"+7 927 891-82-85"},{"id":"2462","name":"Алексей (Квартира)","phone":"+7 927 891-82-85"},{"id":"1625","name":"Алексей Веб","phone":"+79608452021"},{"id":"1502","name":"Алексей Квартира","phone":"89370319073"},{"id":"2457","name":"Алексей Квартира","phone":"618-28-5"},{"id":"2209","name":"Андрей","phone":"+79608416924"},{"id":"1708","name":"Андрей Электрик","phone":"89379837602"},{"id":"2455","name":"Андрей Электрик","phone":"89277798444"},{"id":"2455","name":"Андрей Электрик","phone":"89277798444"},{"id":"2280","name":"Анна Империя Печатей","phone":"+79608422041"},{"id":"189","name":"Бабуля","phone":"89171242774"},{"id":"1662","name":"Виктория","phone":"+79397088304"},{"id":"1799","name":"Виталя (Упаковка)","phone":"+7 939 701-36-21"},{"id":"2206","name":"Владимир","phone":"+79171298507"},{"id":"1628","name":"Владимир Орр","phone":"+79277843508"},{"id":"2415","name":"Даниил (Москва)","phone":"+79250026185"},{"id":"2412","name":"Даниил (Москва) 2","phone":"+79859493733"},{"id":"1777","name":"Денис Кревсун","phone":"+79608484331"},{"id":"1630","name":"Рук Маркетинга Денис","phone":"+79179602527"},{"id":"1630","name":"Рук Маркетинга Денис","phone":"+79179602527"},{"id":"1630","name":"Рук Маркетинга Денис","phone":"+79179602527"},{"id":"1620","name":"Екатерина Супервайзер","phone":"89626106511"},{"id":"1706","name":"Елена Обуч Склад","phone":"+7 927 011-39-51"},{"id":"1546","name":"Ефех","phone":"+79019401351"},{"id":"1546","name":"Ефех","phone":"+79019401351"},{"id":"1828","name":"Женя Цветторг","phone":"+79277759589"},{"id":"125","name":"Игорь","phone":"8 917 824-34-90"},{"id":"2422","name":"Инфо","phone":"88007070528"},{"id":"1787","name":"Иринка","phone":"+79270279963"},{"id":"103","name":"Кастыль","phone":"+7 (923) 779-90-69"},{"id":"1768","name":"Кастыль","phone":"+79613919556"},{"id":"1768","name":"Кастыль","phone":"+79613919556"},{"id":"2142","name":"Кирилл","phone":"79967424809"},{"id":"1775","name":"Константин Гвоздев","phone":"+79376687132"},{"id":"140","name":"Костя Билайн","phone":"+79272024858"},{"id":"2416","name":"Костяныч","phone":"+79635235523"},{"id":"170","name":"Котенева","phone":"89372015602"},{"id":"170","name":"Котенева","phone":"89372015602"},{"id":"173","name":"Крис🐀","phone":"89613923074"},{"id":"161","name":"Кручеслав","phone":"8 987 437-12-16"},{"id":"1656","name":"Лариса","phone":"+79270273806"},{"id":"101","name":"Лена Пх2","phone":"+79608446441"},{"id":"1660","name":"М","phone":"89278993918"},{"id":"1820","name":"Мама","phone":"+79879411548"},{"id":"119","name":"Мишган","phone":"89874540916"},{"id":"119","name":"Мишган","phone":"89874540916"},{"id":"1834","name":"Николай","phone":"+79277778362"},{"id":"2150","name":"Николай Сисадмин","phone":"+79869551689"},{"id":"1832","name":"Олег","phone":"+79276180670"},{"id":"1754","name":"Олеся ( Корп. )","phone":"+79372366468"},{"id":"1754","name":"Олеся ( Корп. )","phone":"+79372366468"},{"id":"813","name":"П@штет","phone":"89879851008"},{"id":"813","name":"П@штет","phone":"89879851008"},{"id":"131","name":"Паша БИЛАЙН","phone":"+79649666550"},{"id":"175","name":"Репс","phone":"89093638979"},{"id":"1614","name":"Рита","phone":"79397000764"},{"id":"176","name":"Ромариус","phone":"89967226612"},{"id":"176","name":"Ромариус","phone":"89967226612"},{"id":"1702","name":"Ромчик Новый ТЭТ 46","phone":"+7 952 284-10-50"},{"id":"560","name":"Русл1к","phone":"8 924 354-10-30"},{"id":"2474","name":"Руслан","phone":"+79991713393"},{"id":"1765","name":"Рыбакин Андрей","phone":"+79093657070"},{"id":"1694","name":"Саня Йота","phone":"+79397012626"},{"id":"1641","name":"Сафар Цветторг","phone":"89277572406"},{"id":"2413","name":"Сергей Авдеев","phone":"88007070528"},{"id":"1529","name":"Сергей Принтер ( Нов )","phone":"89179740407"},{"id":"1527","name":"Сергей Принтеры","phone":"8 917 132-62-81"},{"id":"2223","name":"Сергей Тпк","phone":"+79061292700"},{"id":"1514","name":"Софи","phone":"+79277834286"},{"id":"109","name":"Т Катя","phone":"8 917 129-85-27"},{"id":"1782","name":"Татьяна","phone":"+79277739661"},{"id":"2144","name":"Темур","phone":"89911946407"},{"id":"950","name":"Хвостатый","phone":"8 927 899-94-20"},{"id":"1653","name":"Чайкиной 50","phone":"8 927 787-19-83"},{"id":"2461","name":"Шлагбаум","phone":"792-96-2"},{"id":"2461","name":"Шлагбаум","phone":"792-96-2"},{"id":"138","name":"Юля Саня","phone":"8 987 924-69-04"},{"id":"138","name":"Юля Саня","phone":"8 987 924-69-04"},{"id":"138","name":"Юля Саня","phone":"8 987 924-69-04"},{"id":"138","name":"Юля Саня","phone":"8 987 924-69-04"}];
        var bodyFetch = await JSON.stringify(arContactBook);

        if (bodyFetch.length <= 0) {
            bodyFetch = null;
        }

        fetch(URL, {
            method: 'POST',
            body: bodyFetch
        })
            .then(res => res.json())
            .then(res => {
                setResponseServer(res);
            })
            .catch(er => {
                console.log(JSON.stringify(er));
            });
    }

    console.log(JSON.stringify(responseServer));

    const renderContact = (item) => {
        <View style={styles.cardItem}>
            <Text style={styles.cardItemPhone}>{item.phone}</Text>
            <Text style={styles.cardItemName}>{item.name}</Text>
            <Text style={styles.cardItemRaiting}>5</Text>
            <MaterialCommunityIcons name="card-account-details" size={24} color="black"/>
        </View>
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

