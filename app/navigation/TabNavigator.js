import { Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppContext from '../components/AppContext';
import AccountsNavigator from './AccountsNavigator';
import BottomTabImage from '../components/BottomTabImage';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import MemoriesScreen from '../screens/MemoriesScreen';
import MoreInfoScreen from '../screens/MoreInfoScreen';
import NewMemoryScreen from '../screens/NewMemoryScreen';

const Tab = createBottomTabNavigator();

import { getCurrUser } from '../controller/logic';

export default function TabNavigator() {
  const context = useContext(AppContext);
  const [user, setUser] = useState(getCurrUser());

  let image;
  
  
  return (
      <Tab.Navigator screenOptions={{
            tabBarActiveBackgroundColor: ColorPicker.primaryColor,
            tabBarInactiveBackgroundColor: ColorPicker.inActiveColor
          }}>
        
        <Tab.Screen 
            lazy={false}
            name="Account" 
            unmountOnBlur={true} 
            component={AccountsNavigator}  
            options={{
                headerShown: false, 
                tabBarIcon: () =>
                  <BottomTabImage 
                    img={styles.img}
                  />
            }}
        />
        <Tab.Screen 
            name="Memory" 
            component={MemoriesScreen}  
            options={{
                headerShown: false, 
                tabBarIcon: () => 
                    <CustomIcon size={40} 
                    name="image-multiple"
                    iconColor='#FFF'
                    backgroundColor={ColorPicker.otherColor} />
            }}
        />
        <Tab.Screen 
            name="Add" 
            component={NewMemoryScreen}  
            options={{
                headerShown: false, 
                tabBarIcon: () => 
                    <CustomIcon size={40} 
                    name="plus-box"
                    iconColor='#FFF'
                    backgroundColor={ColorPicker.otherColor} />
            }}
        />
        <Tab.Screen 
            name="MoreInfo"
            component={MoreInfoScreen}  
            options={{
                headerShown: false, 
                tabBarIcon: () => 
                    <CustomIcon size={40} 
                    name="more"
                    iconColor='#FFF'
                    backgroundColor={ColorPicker.otherColor} />
            }}
        />
      </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    img: {
        borderRadius: 250,
        flex: 1,
        height: 40,
        marginTop: 2,
        width: 30,
        
    }
})