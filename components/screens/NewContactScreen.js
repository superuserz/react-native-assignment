import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native'
import { insertData } from '../helpers/db'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

function NewContact({ navigation }) {

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

    const handlePress = async () => {
        let isValidForm = true;
        if (!username) {
            isValidForm = false;
            alert('Please Provide Name');
        } else if (!mobile) {
            isValidForm = false;
            alert('Please Enter Mobile Number');
        }

        if (isValidForm) {
            const insertResult = await insertData(username, mobile, landline, image, starred).then(() => {
            }).catch(err => {
                console.log(err);
            })
            navigation.navigate('ContactListScreen')
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
                <TextInput returnKeyType='done' clearButtonMode='always' style={styles.input} placeholder="Enter Name" onChangeText={(e) => setUsername(e)}></TextInput>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Mobile</Text>
                <TextInput clearButtonMode='always' maxLength={10} keyboardType='phone-pad' style={styles.input} placeholder="Enter Mobile Number" onChangeText={(e) => setMobile(e)}></TextInput>
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Landline</Text>
                <TextInput clearButtonMode='always' maxLength={10} keyboardType='phone-pad' style={styles.input} placeholder="Enter Landline Number" onChangeText={(e) => setLandline(e)}></TextInput>
            </View>
            <View>
                <Button
                    onPress={handlePress}
                    name="md-checkmark-done-circle-outline"
                    title="Add Contact"
                    style={{ alignSelf: 'center' }}
                />
            </View>
        </View >
    );
}
export default NewContact;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'flex-start'
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



