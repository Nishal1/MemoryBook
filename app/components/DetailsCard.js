import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AppButton from './AppButton';
import AppText from './AppText'
import ColorPicker from '../config/ColorPicker';
import CustomIcon from './CustomIcon';

export default function DetailsCard({name, username, email}) {
  return (
    <View style={styles.container}>
        <AppText style={styles.text}>
          Full Name: {name}
        </AppText>
        <AppText style={styles.text}>
            Username: {username}
        </AppText>
        <AppText style={styles.text}>
            Email: {email}
        </AppText>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    text: {
      backgroundColor: ColorPicker.primaryColor,
      color: ColorPicker.offWhite,
      fontSize: 16,
      padding: 20,
      elevation: 20,
      shadowColor: ColorPicker.black,
      borderRadius: 10,
    }
})