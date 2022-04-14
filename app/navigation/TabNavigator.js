import { Image, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppContext from '../components/AppContext';
import AccountsNavigator from './AccountsNavigator';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import MemoriesScreen from '../screens/MemoriesScreen';
import MoreInfoScreen from '../screens/MoreInfoScreen';
import NewMemoryScreen from '../screens/NewMemoryScreen';

const Tab = createBottomTabNavigator();

import { getCurrUser, getUser } from '../controller/logic';

export default function TabNavigator() {
  const context = useContext(AppContext);
  let user = getCurrUser();
  // console.log("from tabnavigator")
  // console.log(context);
  // if(context.signedInUser) {
  //   user = getUser(context.signedInUser.username);
  // }
  // if(!user) {
  //   alert("Something went wrong");
  // }
  console.log("from tab nav")
  console.log(user);
  console.log(context);
  let image;
  if(user && user.profilePic) {
    image = user.profilePic;
  } else {
    image = require('../assets/defaultProfile.png');
  }
  return (
      <Tab.Navigator screenOptions={{
            tabBarActiveBackgroundColor: ColorPicker.primaryColor,
            tabBarInactiveBackgroundColor: ColorPicker.inActiveColor
          }}>
        
        <Tab.Screen 
            name="Account" 
            component={AccountsNavigator}  
            options={{
                headerShown: false, 
                tabBarIcon: () => 
                isFinite(image)?
                    <Image 
                      source={image}
                      style={styles.img}
                    /> :
                    <Image 
                      source={{uri: image}}
                      style={styles.img}
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