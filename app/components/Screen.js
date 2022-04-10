import { StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'; 

export default function Screen(props) {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
        <View style={styles.paddingView}>
          {props.children}
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 0
    },
    paddingView: {
      flex: 1
    }
})