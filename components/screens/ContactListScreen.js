
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { retrieveData } from '../helpers/db'
import { Ionicons } from '@expo/vector-icons';
import * as SCREENS from '../helpers/Screens'

function ContactListScreen({ navigation }) {

    const [contacts, setContacts] = useState([])
    var list = [];

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    onPress={() => navigation.navigate(SCREENS.NEW_CONTACT_SCREEN)}
                    name="md-create-outline"
                    size={30}
                    style={{ marginRight: 20 }}
                />
            ),
            headerLeft: () => (
                <Ionicons
                    name="md-menu-sharp"
                    size={30}
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.openDrawer()}
                />
            )
        })
    })

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            retrieveData().then((result) => {
                // for (let i = 0; i < result.rows._array.length; i++) {
                //     list.push(
                //         <View key={i}>
                //             <Text>{result.rows._array}</Text>
                //         </View>
                //     );
                // }

                setContacts(result.rows._array);

            })
        });
        return onFocus;
    }, [])

    const ItemSeparatorView = () => {
        return (
            <View style={styles.itemSeparatorStyle} />
        );
    };

    const navigateToUpdateScreen = (contactId) => {
        navigation.navigate(SCREENS.UPDATE_CONTACT_SCREEN, { id: contactId });
    }

    const contactsView = (item, key) => {
        return (
            <View key={key}>
                <View style={{ flex: 1, flexDirection: 'row', maxHeight: 100 }}>
                    {<Image source={{ uri: item.imageUri }} style={{ width: 50, height: 50, borderRadius: 50, marginTop: 8 }} />}
                    <View>
                        <Text
                            style={styles.contactLabel}
                            onPress={() => viewContact(item)}>
                            {item.name}
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, maxHeight: 100 }}>
                        <Ionicons
                            style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 20 }}
                            name='md-pencil'
                            size={25}
                            onPress={() => { navigateToUpdateScreen(item.id) }}
                        />
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

    const viewContact = (contact) => {
        navigation.navigate(SCREENS.UPDATE_CONTACT_SCREEN, { id: contact.id });
    };
    const navigateToStarredContacts = () => {
        navigation.navigate(SCREENS.STARRED_CONTACT_LIST_SCREEN);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View>
                {/* <Button title="View Starred Contacts" onPress={navigateToStarredContacts} /> */}
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

export default ContactListScreen

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

});
