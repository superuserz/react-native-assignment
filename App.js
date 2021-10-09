import * as React from 'react';
import { StyleSheet } from 'react-native';
import ContactListScreen from './components/screens/ContactListScreen';
import StarredContactListScreen from './components/screens/StarredContactsListScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewContactScreen from './components/screens/NewContactScreen'
import UpdateContactScreen from './components/screens/UpdateContactScreen'
import { init } from './components/helpers/db'
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';


init().then(() => {
  console.log('Initialized DB')
}).catch(err => {
  console.log(err);
})


export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ContactListScreen"
          component={ContactListScreen}
          options={({ navigation }) => ({
            title: 'Contacts',
          })}
        />
        <Stack.Screen
          name="NewContactScreen"
          component={NewContactScreen}
          options={({ navigation }) => ({
            title: 'Add Contact'
          })}
        />
        <Stack.Screen
          name="StarredContactListScreen"
          component={StarredContactListScreen}
          options={({ navigation }) => ({
            title: 'Starred Contacts'
          })}
        />
        <Stack.Screen
          name="UpdateContactScreen"
          component={UpdateContactScreen}
          options={({ navigation }) => ({
            title: 'Update Contact'
          })}
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


