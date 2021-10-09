
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { retrieveStarredContacts } from '../helpers/db'
import { Ionicons } from '@expo/vector-icons';

function StarredContactListScreen({ navigation }) {

    const [contacts, setContacts] = useState([])
    var list = [];

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            retrieveStarredContacts().then((result) => {

                for (let i = 0; i < result.rows._array.length; i++) {
                    list.push(
                        <View key={i}>
                            <Text>{result.rows._array}</Text>
                        </View>
                    );
                }

                setContacts((prevData) => {
                    return result.rows._array
                });

            })
        });
        return onFocus;
    }, [])

    const ItemSeparatorView = () => {
        return (
            // Flat List Item Separator
            <View style={styles.itemSeparatorStyle} />
        );
    };

    const contactsView = (item, key) => {
        return (
            // Flat List Item
            <View key={key}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space', maxHeight: 100 }}>
                    {<Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50, borderRadius: 50, marginTop: 8 }} />}
                    <View>
                        <Text
                            style={styles.contactLabel}
                            onPress={() => getItem(item)}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, maxHeight: 100 }}>
                        <Ionicons
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            name={item.starred === 1 ? 'md-star-sharp' : 'md-star-outline'}
                            color={item.starred === 1 ? 'orange' : 'black'}
                            size={20}
                        />
                    </View>
                </View>
                <ItemSeparatorView />
            </View >
        );
    };

    const getItem = (contact) => {
        alert('Name : ' + contact.name + ' Mobile : ' + contact.mobile + ' Landline : ' + contact.landline + ' Favourite : ' + contact.starred);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                <View style={styles.scrollViewContainer}>
                    <ScrollView>
                        {
                            contacts.map(contactsView)
                        }
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default StarredContactListScreen

const styles = StyleSheet.create({
    scrollViewContainer: {
        backgroundColor: 'white',
        width: '100%',
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '2%'
    },
    contactLabel: {
        padding: 15,
        fontSize: 25
    },
    itemSeparatorStyle: {
        height: 5,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#c0c0c0'
    }

});
