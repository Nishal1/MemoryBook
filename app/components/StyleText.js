import { StyleSheet, Text, View } from 'react-native'
import React from 'react'



export default function StyleText(props) {
  return (
    <View>
        <Text style={props.style ? [styles.text, props.style]: styles.text}>
            {props.children}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Roboto',
        fontSize: 25
    }
})