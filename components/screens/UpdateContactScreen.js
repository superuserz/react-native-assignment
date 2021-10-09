import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native'
import { insertData } from '../helpers/db'
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { retrieveDataByContactId } from '../helpers/db'
import { updateDataByContactId } from '../helpers/db'

function UpdateContactScreen({ navigation, route }) {

    const id = route.params.id;
    console.log(id);
    const [username, setUsername] = useState('');
    const [mobile, setMobile] = useState('');
    const [landline, setLandline] = useState('');
    const [resultSet, setResultSet] = useState([]);
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

    useEffect(() => {
        const onFocus = navigation.addListener('focus', () => {
            console.log('On update Screen!');
            retrieveDataByContactId(id).then((result) => {
                console.log(result);
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
        updateDataByContactId(id, username, mobile, landline, image, starred).then((result) => {
            navigation.navigate('ContactListScreen');
        })
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
            <View>
                <Ionicons
                    onPress={pickImage}
                    name="md-image-outline"
                    size={100}
                    style={{ alignSelf: 'center' }}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', maxHeight: 100 }}>
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3 }} />}
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput value={username} returnKeyType='done' clearButtonMode='always' style={styles.input} placeholder="Enter Name" onChangeText={(e) => setUsername(e)}></TextInput>
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
                    name="md-checkmark-done-circle-outline"
                    title="Update Contact"
                    style={{ alignSelf: 'center' }}
                />
            </View>
            <View>
                <Text> {JSON.stringify(resultSet[resultSet.length - 1])}</Text>
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



