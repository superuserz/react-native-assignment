import { Text, View, StyleSheet } from 'react-native'
import * as React from 'react'
function Contacts(props) {
    return (
        <View>
            <View>
                <Text style={styles.inputLabel}>Debug Text (can be disabled later. Only for Illustration Demo Purpose)</Text>
            </View>
            <View>
                <Text>{JSON.stringify(props.contacts)}</Text>
            </View>
        </View>
    )
}
export default Contacts
const styles = StyleSheet.create({
    inputLabel: {
        fontSize: 20
    }
});
