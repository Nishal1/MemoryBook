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
            Username: {email}
        </AppText>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPicker.secondaryColor,
        flex: 0.5,
        padding: 20,
        marginTop: 50,
        elevation: 20,
        shadowColor: ColorPicker.black,
        borderRadius: 10,
        justifyContent: 'space-around',
    },
    text: {
      fontSize: 16
    }
})