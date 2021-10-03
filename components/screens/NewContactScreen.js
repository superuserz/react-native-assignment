import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { insertData } from '../helpers/db'
import { retrieveData } from '../helpers/db'

function NewContact() {

    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [resultSet, setResultSet] = useState([]);

    const handlePress = async () => {
        const insertResult = await insertData(username, mobile, landline).then(() => {
        }).catch(err => {
        })

        const retrieveresult = await retrieveData();
        setResultSet(retrieveresult.rows._array);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput style={styles.input} placeholder="Enter Name" onChangeText={(e) => setUsername(e)}></TextInput>
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
            <View>
                <Text>Debug Text (can be disabled later. Only for Illustration Demo Purpose)</Text>
            </View>
            <View>
                <Text> {JSON.stringify(resultSet[resultSet.length - 1])}</Text>
            </View>

        </View >
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



