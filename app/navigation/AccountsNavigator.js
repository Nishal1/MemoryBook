import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import AccountScreen from '../screens/AccountScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

export default function AccountsNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="AccountHome1"
          component={AccountScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="WelcomeScreen"
          component={WelcomeScreen} 
          options={{headerShown: false}}
        />
    </Stack.Navigator>
  )
}