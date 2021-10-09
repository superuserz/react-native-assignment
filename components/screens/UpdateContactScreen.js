import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { getContactById } from '../helpers/db'
import { updateDataByContactId } from '../helpers/db'
import { deleteContactByContactId } from '../helpers/db'

function UpdateContactScreen({ navigation, route }) {

    const id = route.params.id;
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [image, setImage] = useState(null);
    const [starred, setStarred] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    onPress={toggleFav}
                    name={starred ? 'md-star-sharp' : 'md-star-outline'}
                    color={starred ? 'orange' : 'black'}
                    size={30}
                />
            )
        })
    })

    const toggleFav = () => {
        setStarred((prevValue) => {
            return !prevValue;
        })
    }

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'IOS') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission Not Granted. Need permission to Set Contact Image');
                }
            }
            if (Platform.OS !== 'Android') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission Not Granted. Need permission to Set Contact Image');
                }
            }
        })();
    }, []);

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            getContactById(id).then((result) => {
                if (result.rows._array[0].imageUri) {
                    setImage(result.rows._array[0].imageUri)
                }
                setUsername(result.rows._array[0].name);
                setMobile(result.rows._array[0].mobile);
                setLandline(result.rows._array[0].landline);
                setStarred(result.rows._array[0].starred === 1 ? true : false);
            })
        });
        return onFocus;
    }, [])

    const handlePress = async () => {
        let isValidForm = true;
        if (!username) {
            isValidForm = false;
            alert('Please Provide Name');
        }
        if (!mobile) {
            isValidForm = false;
            alert('Please Enter Mobile Number');
        }
        if (isValidForm) {
            updateDataByContactId(id, username, mobile, landline, image, starred).then((result) => {
                navigation.navigate('ContactListScreen');
            })
        }

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const handleDeleteAction = () => {
        deleteContactByContactId(id).then((result) => {
            alert('Contact Deleted');
            navigation.navigate('ContactListScreen');
        })
    }

    return (
        <View style={styles.container}>
            {!image && <View >
                <TouchableOpacity onPress={pickImage}><Ionicons
                    name="md-image-outline"
                    size={100}
                    style={{ alignSelf: 'center' }}
                /></TouchableOpacity>
            </View>}
            {image && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', maxHeight: 100 }}>
                <TouchableOpacity onPress={pickImage} style={{ marginTop: 10, marginBottom: 10 }}><Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} /></TouchableOpacity>
            </View>}
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput value={username} clearButtonMode='always' style={styles.input} placeholder="Enter Name" onChangeText={(e) => setUsername(e)}></TextInput>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Mobile</Text>
                <TextInput value={mobile} clearButtonMode='always' maxLength={10} keyboardType='phone-pad' style={styles.input} placeholder="Enter Mobile Number" onChangeText={(e) => setMobile(e)}></TextInput>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Landline</Text>
                <TextInput value={landline} clearButtonMode='always' maxLength={10} keyboardType='phone-pad' style={styles.input} placeholder="Enter Landline Number" onChangeText={(e) => setLandline(e)}></TextInput>
            </View>
            <View>
                <Button
                    onPress={handlePress}
                    title="Update Contact"
                    style={{ alignSelf: 'center' }}
                />
            </View>
            <View>
                <Button
                    onPress={handleDeleteAction}
                    title="Delete Contact"
                    style={{ alignSelf: 'center' }}
                />
            </View>
        </View >
    );
}
export default UpdateContactScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'flex-start',
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



