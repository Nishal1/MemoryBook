import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name="Welcome"
            component={WelcomeScreen} 
            options={{headerShown: false}}
        />
        <Stack.Screen name="login" component={LoginScreen}/>
        <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})