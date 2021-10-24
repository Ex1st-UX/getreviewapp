import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Button} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {TextInput} from "react-native-web";

export const Detail = props => {
    const [detailData, setDetailData] = useState([]);
    const [reviewRaiting, setReviewRaiting] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const dataApp = props.route.params.item;
    const goldStarsComments = <Ionicons style={{paddingRight: 10}} name="star-outline" size={20} color="gold"/>

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

    const handlerClickStar = (stars) => {
        setReviewRaiting(stars)
        renderStarsContact(stars);
    }

    // рендер звезд рейтинга открытой карточки
    const renderStarsContact = (stars) => {
        let arStars = [],
            colorStar,
            i;

        for (i = 1; i < 6; i++) {
            let tmpI = i;

            if (stars >= tmpI) {
                colorStar = 'gold';
            } else {
                colorStar = 'grey';
            }

            arStars[i] = (
                <Ionicons onClick={() => handlerClickStar(tmpI)} style={{paddingRight: 10}} value={tmpI}
                          name="star-outline" size={24} color={colorStar}/>
            );
        }

        return arStars;
    }

    // Отправляем отзыв на сервер
    const addReview = () => {
        const URL = 'http://188.225.45.35/api/add-review.php';

        const arData = {
            id: dataApp.id,
            raiting: reviewRaiting,
            text: reviewText
        };

        fetch(URL, {
            method: 'POST',
            body: JSON.stringify(arData)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
            })
    }

    const renderStarsComments = (raiting) => {
        let arStars = [],
            i;

        for (i = 0; i != raiting; i++) {
            arStars[i] = (goldStarsComments);
        }

        return arStars;
    }

    // Рендерим отзывы
    const renderReview = ({item}) => {
        let raiting = item.raiting;

        return (
            <View style={styles.reviewItemCard}>
                <View style={styles.reviewRaitingStarsWrapper}>
                    {renderStarsComments(raiting)}
                </View>
                <View>
                    <Text style={styles.reviewText}>{item.textReview}</Text>
                </View>
            </View>
        );
    }

    return (
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
                    <View style={styles.reviewRaitingStarsWrapper}>
                        {renderStarsContact(reviewRaiting)}
                    </View>
                    <View style={styles.reviewInputWrapper}>
                        <TextInput
                            style={styles.reviewInput}
                            placeholder="Текст отзыва .."
                            onChangeText={setReviewText}
                            multiline
                            numberOfLines={4}
                        />
                        <View style={styles.submitReviewButton}>
                            <Button
                                title="ОСТАВИТЬ ОТЗЫВ"
                                color={'blue'}
                                onPress={addReview}
                            />
                        </View>
                    </View>
                    <View>
                        <FlatList
                            data={detailData.review}
                            renderItem={renderReview}
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
    bottomWrapper: {
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
    reviewInputWrapper: {
        flex: 2,
    },
    reviewInput: {
        maxHeight: 100,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        textAlignVertical: 'top',
    },
    submitReviewButton: {
        marginVertical: 15
    },
    reviewListWrapper: {},
    reviewItemCard: {
        paddingTop: 20,
    },
    reviewRaitingStarsWrapper: {
        flexDirection: 'row',
        paddingBottom: 15,
    },
    reviewText: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
    }
});
