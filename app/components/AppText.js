import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function AppText(props) {
  return (
      <Text style={props.style ? [styles.text, props.style]: styles.text}>
          {props.children}
      </Text>
  )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: 'Roboto'
    }
})