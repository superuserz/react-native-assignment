
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import Contacts from '../contact/Contacts';

const navigate = () => {
    console.log('Will be Navigating to New Contact List now.');
}


const dummyContactList = [
    {
        name: 'manmeet',
        mobile: '9015035109',
        landline: '011-2222222'
    }
]

// This Screen will have a button to create a new contact 
// Once the user clicks on that button the user will be navigated to new contact screen.

function ContactListScreen() {
    return (
        <View>
            <View style={styles.flexNavbarContainer}>
                <Button title="Add New Contact" onPress={navigate} />
            </View>
            <View style={styles.contactsContainer}>
                <Contacts></Contacts>
            </View>
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
    },

});
