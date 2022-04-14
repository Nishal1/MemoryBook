import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppContext from '../components/AppContext';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();
//This navigator is only available when a user is signed in
export default function AppNavigator() {
  const context = useContext(AppContext);
  console.log(context);
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="AccountHome"
          component={TabNavigator}
          options={{headerShown: false}} 
        />    
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})