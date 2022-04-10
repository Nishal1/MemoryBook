import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity} from 'react-native';
import React from 'react';

import ColorPicker from '../config/ColorPicker';

export default function AppButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View style={props.color? [styles.button, {backgroundColor: ColorPicker[props.color]}] :styles.button}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: ColorPicker.secondaryColor,
        borderRadius: 15,
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    text: {
        color: ColorPicker.white,
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})