import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import AppText from './AppText';
import ColorPicker from '../config/ColorPicker';

export default function Card({category, created, source, title}) {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            {isFinite(source)?
            <Image 
                source={source}
                style={styles.img}
            /> :
            <Image 
                source={{uri: source}}
                style={styles.img}
            /> }
        </View>
        <View>
            <AppText style={styles.text}>{title}</AppText>
            <AppText style={styles.text}>{category}</AppText>
            <AppText style={styles.text}>{created.toLocaleTimeString('en-US')}</AppText>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorPicker.primaryColor,
        borderRadius: 10,
        elevation: 20,
        shadowColor: ColorPicker.black,
        overflow: 'hidden',
        padding: 12,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 10
    },
    text: {
        color: ColorPicker.offWhite
    },
    img: {
        width: 'auto',
        height: 200
    }
})