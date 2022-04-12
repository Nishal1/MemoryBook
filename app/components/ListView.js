import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AppText from './AppText'
import ColorPicker from '../config/ColorPicker'

import { textLengthReducer } from '../controller/logic';

export default function ListView({image, title}) {
  const newTitle = textLengthReducer(title);
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image 
            source={image}
            style={styles.img}
          />
          <AppText style={styles.text}>{newTitle}</AppText>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: ColorPicker.otherColor1,
        margin: 5
    },
    imageContainer: {
      borderRadius: 20,
      width: '100%',
      height: 170
    },
    img: {
      width: '100%',
      borderRadius: 20,
      height: 120
    },
    text: {
      fontSize: 14,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
})