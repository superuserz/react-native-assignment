
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { retrieveStarredContacts } from '../helpers/db'
import { Ionicons } from '@expo/vector-icons';

function StarredContactListScreen({ navigation }) {

    const [contacts, setContacts] = useState([])
    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            retrieveStarredContacts().then((result) => {
                setContacts((prevData) => {
                    return result.rows._array
                });

            })
        });
        return onFocus;
    }, [])

    const ItemSeparatorView = () => {
        return (
            <View style={styles.itemSeparatorStyle} />
        );
    };

    const getInitials = (name) => {
        return name.charAt(0);
    }

    const contactsView = (item, key) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 100 }}>
                    {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.imageContainer} />}
                    {!item.imageUri && <View style={styles.blankImageContainer} >
                        <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 30 }}>{getInitials(item.name)}</Text>
                    </View>}
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
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 8
    },
    blankImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: '#00796b',
        marginTop: 8,
        justifyContent: 'center',
        alignSelf: 'center'
    }

});
