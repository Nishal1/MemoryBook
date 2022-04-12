import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import AppText from './AppText'
import CustomIcon from './CustomIcon'

export default function FilterOptionView({backgroundColor, icon, iconColor,  
    onPress, title, style}) {
  return (
    <View style={styles.container}>
        <TouchableOpacity  onPress={onPress}>
            <View style={styles.iconContainer}>
                <CustomIcon 
                    iconColor={iconColor}
                    name={icon}
                    size={55}
                    style={styles.icon}
                />
                <AppText style={styles.text}>{title}</AppText>   
            </View>
        </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1/3,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    iconContainer: {
        width: '100%',
        height: 100
    },
    icon: {
        width: '100%',
        height: 50
    },
    text: {
        width: '100%',
        height: 50,
        marginLeft: '30%'
    }
})