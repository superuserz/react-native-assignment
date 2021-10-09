import React from 'react'
import NewContactScreen from './components/screens/NewContactScreen'
import ContactListScreen from './components/screens/ContactListScreen';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

function MyDrawer() {
    return (
        <Drawer.Navigator initialRouteName="ContactListScreen">
            <Drawer.Screen name="ContactListScreen" component={ContactListScreen} />
            <Drawer.Screen name="NewContactScreen" component={NewContactScreen} />
        </Drawer.Navigator>
    )
}
export default MyDrawer
