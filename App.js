import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-get-random-values';

import AppContext from './app/components/AppContext';
import AppNavigator from './app/navigation/AppNavigator';
import AppNavPublic from './app/navigation/AppNavPublic';

export default function App() {
  const [currentUser, setCurrUser] = useState(null); //used to keep track of the user signed in
  const userConfig = {
    signedInUser: currentUser,
    setCurrUser
  }
  return (
    <AppContext.Provider value={userConfig}>
      <MenuProvider>
        <NavigationContainer>
          {userConfig.signedInUser ? <AppNavigator /> : <AppNavPublic />}
        </NavigationContainer>
      </MenuProvider>
    </AppContext.Provider>
  );
}
