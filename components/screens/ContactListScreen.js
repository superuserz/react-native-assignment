
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'
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
                        <View style={styles.contactsContainer} key={i}>
                            <Text>{result.rows._array.name}</Text>
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

    return (
        <View>
            <View style={styles.flexNavbarContainer}>
                <Button title="Add New Contact" onPress={navigate} />
            </View>
            {/* <View style={styles.contactsContainer}>
                <Contacts contact={contacts}></Contacts>
            </View> */}
            {/* <View style={styles.contactsContainer}>
                <Text>{JSON.stringify(contacts)}</Text>
            </View> */}
            {list}

        </View>

    )
}

export default ContactListScreen

const styles = StyleSheet.create({
    flexNavbarContainer: {

    },
    contactsContainer: {
        borderWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end', //pushing new contact to right
    }

});
