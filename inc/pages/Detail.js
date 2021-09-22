import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

export const Detail = props => {
    const [detailData, setDetailData] = useState(false);

    const dataApp = props.route.params.item;

    useEffect(() => {
        getContactDetail(dataApp)
    }, []);

    // Получаем всю информацию о карточке контакта
    const getContactDetail = (data) => {
        const URL = 'http://188.225.45.35/api/detail.php';

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data.id)
        })
            .then(res => res.json)
            .then(res => {
                console.log(res);
                setDetailData(res)
            })
            .catch(er => {
                console.log(er);
            });
    }

    return(
        <View>
            <Text>test</Text>
        </View>
    )
}