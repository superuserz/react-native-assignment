import React, { useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

// This Screen will consist of a Form
// to create a New Contact and associate and Image with that Contact.

function NewContact() {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');

    const handlePress = () => {
        console.log(name);
        console.log(mobile);
        console.log(landline);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput style={styles.input} placeholder="Enter Name" onChangeText={(e) => setName(e)}></TextInput>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Mobile</Text>
                <TextInput style={styles.input} placeholder="Enter Mobile Number" onChangeText={(e) => setMobile(e)}></TextInput>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Landline</Text>
                <TextInput style={styles.input} placeholder="Enter Landline Number" onChangeText={(e) => setLandline(e)}></TextInput>
            </View>
            <View>
                <Button title="ADD" onPress={handlePress} />
            </View>
        </View>
    );
}

export default NewContact;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        justifyContent: 'center',
    },
    inputWrapper: {
        padding: 5,
        marginBottom: 5
    },
    input: {
        borderBottomWidth: 1,
        borderColor: 'black',
        paddingBottom: 10,
        paddingRight: 10,
        paddingTop: 10,
        fontSize: 15,
    },
    inputLabel: {
        fontSize: 20
    }
});



