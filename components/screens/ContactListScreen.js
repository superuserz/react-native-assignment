
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Contacts from '../contact/Contacts';
import { retrieveData } from '../helpers/db'
import { Ionicons } from '@expo/vector-icons';

function ContactListScreen({ navigation }) {

    const [contacts, setContacts] = useState([])
    var list = [];
    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            console.log('Refreshed!');
            retrieveData().then((result) => {

                for (let i = 0; i < result.rows._array.length; i++) {
                    list.push(
                        <View style={styles.flexNavbarContainer} key={i}>
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
                    {<Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50, borderRadius: 50, }} />}
                    <View>
                        <Text
                            style={styles.itemStyle}
                            onPress={() => getItem(item)}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, maxHeight: 100 }}>
                        <Ionicons
                            style={{ justifyContent: 'center', alignSelf: 'center' }}
                            name={item.starred === 1 ? 'md-star-sharp' : 'md-star-outline'}
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
                <View style={styles.container}>
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

export default ContactListScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    flexNavbarContainer: {

    },
    contactsContainer: {
        // borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end', //pushing new contact to right
    },
    itemStyle: {
        padding: 15,
        fontSize: 25
    },
    itemSeparatorStyle: {
        height: 20,
        width: '100%',
        // backgroundColor: '#C8C8C8',
        backgroundColor: 'white',
    },

});
