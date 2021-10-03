import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {TextInput} from "react-native-web";

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
            .then(res => res.json())
            .then(res => {
                setDetailData(res)
            })
            .catch(er => {
                console.log(er);
            });
    }

    console.log(detailData);

    return(
        <View style={{flex: 1}}>
            <View style={styles.topWrapper}>
                <View style={styles.topContent}>
                    <View style={styles.contactNameWrapper}>
                        <MaterialCommunityIcons name="account-circle-outline" size={34} color="blue"/>
                        <Text style={styles.contactName}>{dataApp.name}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomWrapper}>
                <View style={styles.bottomContent}>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Текст отзыва .."
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topWrapper: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    bottomWrapper:{
        flex: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
    },
    bottomContent: {
        padding: 20,
    },
    topContent: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
    },
    contactNameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contactName: {
        fontWeight: '600',
        fontSize: 16,
        padding: 10
    },
    textInputWrapper: {
      flex: 2,
    },
    textInput:{
        height: 40,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
    }
});
