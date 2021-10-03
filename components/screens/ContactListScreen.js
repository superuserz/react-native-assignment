
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import Contacts from '../contact/Contacts';
import { retrieveData } from '../helpers/db'

function ContactListScreen({ navigation }) {

    const [contacts, setContacts] = useState([])
    var list = [];
    const navigate = () => {
        console.log('Will be Navigating to New Contact List now.');
        navigation.navigate('NewContactScreen')
    }
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
                <Text
                    style={styles.itemStyle}
                    onPress={() => getItem(item)}>
                    {item.name}
                </Text>
                <ItemSeparatorView />
            </View>
        );
    };

    //Function For Click on an item
    const getItem = (contact) => {
        alert('Name : ' + contact.name + ' Mobile : ' + contact.mobile + ' Landline : ' + contact.landline);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <View style={styles.flexNavbarContainer}>
                    <Button title="Add New Contact" onPress={navigate} />
                </View>

                <View style={styles.container}>
                    {/* List Item as a function */}
                    <ScrollView>
                        {
                            //Loop of JS which is like foreach loop
                            contacts.map(contactsView)
                        }
                    </ScrollView>
                </View>

                {/* {<View style={styles.contactsContainer}>
                    <Contacts contact={contacts}></Contacts>
                </View>} */}
                {/* <View style={styles.contactsContainer}>
                <Text>{JSON.stringify(contacts)}</Text>
            </View> */}
                {/* <View>
                <Text>{JSON.stringify(list)}</Text>
            </View> */}
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
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end', //pushing new contact to right
    },
    itemStyle: {
        padding: 10,
        fontSize: 20
    },
    itemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },

});
