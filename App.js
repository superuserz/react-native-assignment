import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import ContactListScreen from './components/screens/ContactListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewContactScreen from './components/screens/NewContactScreen'
import { init } from './components/helpers/db'


init().then(() => {
  console.log('Initialized DB')
}).catch(err => {
  console.log(err);
})

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ContactListScreen"
          component={ContactListScreen}
          options={{ title: 'Contacts' }}
        />
        <Stack.Screen
          name="NewContactScreen"
          component={NewContactScreen}
          options={{ title: 'Create New Contact' }}
        />
      </Stack.Navigator>
    </NavigationContainer>

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


