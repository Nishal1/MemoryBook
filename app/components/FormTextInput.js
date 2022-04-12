import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ColorPicker from '../config/ColorPicker'

export default function FormTextInput({...otherProps}) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPicker.offWhite,
        borderBottomWidth: 1,
        flexDirection: 'row',
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