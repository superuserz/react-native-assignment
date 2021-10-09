import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { init } from './components/helpers/db'
import { MainStackNavigator } from './components/navigation/MainStackNavigator'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SCREENS from './components/helpers/Screens'
import ContactListScreen from './components/screens/ContactListScreen';
import NewContactScreen from './components/screens/NewContactScreen'
import UpdateContactScreen from './components/screens//UpdateContactScreen'
import StarredContactListScreen from './components/screens/StarredContactsListScreen';
init().then(() => {
}).catch(err => {
})

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Contacts List"
        component={ContactListScreen}
        options={({ navigation }) => ({
          title: "Contacts List",
          headerTitle: "All Contacts",
          headerTintColor: 'grey',
          headerTitleAlign: 'left'
        })}
      />
      <Drawer.Screen
        name="Favourite Contacts"
        component={StarredContactListScreen}
        options={({ navigation }) => ({
          title: SCREENS.STARRED_CONTACT_LIST_SCREEN_TITLE,
          headerTitle: "Your Favourite Contacts",
          headerTintColor: 'grey',
          headerTitleAlign: 'left'
        })}
      />
    </Drawer.Navigator>
  )
}

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={SCREENS.CONTACT_LIST_SCREEN}
          component={DrawerNavigator}
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
    </ NavigationContainer>

  );
}



