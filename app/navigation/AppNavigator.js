import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AppContext from '../components/AppContext';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

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
        {/* <Stack.Screen 
          name="Welcome"
          component={WelcomeScreen} 
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{title: "Go back"}}
        />
        <Stack.Screen 
          name="Register"
          component={RegisterScreen}
          options={{title: "Go back"}} 
        /> */}
        
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})