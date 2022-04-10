import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ColorPicker from '../config/ColorPicker'

export default function AppTextInput({icon}, ...otherProps) {
  return (
    <View style={styles.container}>
      {icon && 
        <MaterialCommunityIcons 
            name={icon}
            size={22}
            color={ColorPicker.primaryColor}/>
      }
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e0e0eb",
        flexDirection: 'row',
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
        width: '100%'
   },
   textInput: {
    fontSize: 20,
    fontFamily: 'Roboto',
    marginLeft: 10,
    flex: 1
    }
})