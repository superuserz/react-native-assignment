import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import * as image from 'expo-image-picker'


export default function ImageSelector() {

    const selectImageHandler = () => {
        image.launchCameraAsync();
    }

    return (
        <View>
            <Button title="Take Image" color={Colors.primary} onPress={selectImageHandler} />
        </View>
    )
}
ImageSelector

const styles = StyleSheet.create({
});
