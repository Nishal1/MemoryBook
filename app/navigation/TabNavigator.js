import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AccountScreen from '../screens/AccountScreen';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import MemoriesScreen from '../screens/MemoriesScreen';
import MoreInfoScreen from '../screens/MoreInfoScreen';

const Tab = createBottomTabNavigator();;

export default function TabNavigator() {
  return (
      <Tab.Navigator screenOptions={{activeTintColor: ColorPicker.otherColor, activeBackgroundColor: ColorPicker.primaryColor}}>
        <Tab.Screen 
            name="AccountHome" 
            component={AccountScreen}  
            options={{headerShown: false, tabBarIcon: () => <CustomIcon size={30} name="home" backgroundColor={ColorPicker.otherColor} />}}
        />
        <Tab.Screen 
            name="Memory" 
            component={MemoriesScreen}  
            options={{headerShown: false, tabBarIcon: () => <CustomIcon size={30} name="plus-circle" backgroundColor={ColorPicker.otherColor} />}} 
        />
        <Tab.Screen 
            name="MoreInfo" 
            component={MoreInfoScreen}  
            options={{headerShown: false, tabBarIcon: () => <CustomIcon size={30} name="book-open-variant" backgroundColor={ColorPicker.otherColor} />}} 
        />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})