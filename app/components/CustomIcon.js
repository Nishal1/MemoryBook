import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomIcon({name, size=40, iconColor="black", backgroundColor}) {
  return (
    <View style={{width: size, height: size, backgroundColor, borderRadius: size/2, alignItems: 'center', justifyContent: 'center'}}>
        <MaterialCommunityIcons 
            name={name}
            size={size * 0.6}
            color={iconColor}
        />
    </View>
  )
}

const styles = StyleSheet.create({})