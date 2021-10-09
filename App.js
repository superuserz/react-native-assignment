import * as React from 'react';
import * as SCREENS from './components/helpers/Screens'
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { init } from './components/helpers/db'
import ContactListScreen from './components/screens/ContactListScreen';
import NewContactScreen from './components/screens/NewContactScreen'
import UpdateContactScreen from './components/screens/UpdateContactScreen'
import StarredContactListScreen from './components/screens/StarredContactsListScreen';

init().then(() => {
}).catch(err => {
})

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.CONTACT_LIST_SCREEN}
          component={ContactListScreen}
          options={({ navigation }) => ({
            title: SCREENS.CONTACT_LIST_SCREEN_TITLE
          })}
        />
        <Stack.Screen
          name={SCREENS.NEW_CONTACT_SCREEN}
          component={NewContactScreen}
          options={({ navigation }) => ({
            title: SCREENS.NEW_CONTACT_SCREEN_TITLE
          })}
        />
        <Stack.Screen
          name={SCREENS.STARRED_CONTACT_LIST_SCREEN}
          component={StarredContactListScreen}
          options={({ navigation }) => ({
            title: SCREENS.STARRED_CONTACT_LIST_SCREEN_TITLE
          })}
        />
        <Stack.Screen
          name={SCREENS.UPDATE_CONTACT_SCREEN}
          component={UpdateContactScreen}
          options={({ navigation }) => ({
            title: SCREENS.UPDATE_CONTACT_SCREEN_TITLE
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 50,
    padding: 2
  }
});


