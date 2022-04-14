import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();
//this navigator is available when user is not signed in
export default function AppNavPublic() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
          name="Welcome"
          component={WelcomeScreen} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{title: "Go back"}}
        />
        <Stack.Screen 
          name="Register"
          component={RegisterScreen}
          options={{title: "Go back"}} 
        />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})