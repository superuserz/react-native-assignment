import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ContactListScreen from './components/screens/ContactListScreen';

export default function App() {

  return (
    <View style={styles.container}>
      <ContactListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', //bring new contact button container to top
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 50,
    padding: 2
  }
});


