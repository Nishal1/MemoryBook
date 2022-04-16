import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import AppText from './AppText'
import ColorPicker from '../config/ColorPicker'

import { textLengthReducer } from '../controller/logic';

export default function ListView({image, title, onPress}) {
  const newTitle = textLengthReducer(title);
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <View style={styles.imageContainer}>
            {isFinite(image)?
              <Image 
                source={image}
                style={styles.img}
              /> :
              <Image 
                source={{uri: image}}
                style={styles.img}
              /> 
            }
            
            <AppText style={styles.text}>{newTitle}</AppText>
          </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1/3,
        borderRadius: 20,
        backgroundColor: ColorPicker.primaryColor,
        margin: 3,
        elevation: 20,
        shadowColor: ColorPicker.black,
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
      marginRight: 'auto',
      color: ColorPicker.white
    }
})