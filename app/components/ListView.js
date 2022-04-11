import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ListView({image, name, username, email}) {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})