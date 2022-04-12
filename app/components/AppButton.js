import { StyleSheet, 
    Text, 
    View, 
    TouchableOpacity} from 'react-native';
import React from 'react';

import ColorPicker from '../config/ColorPicker';

export default function AppButton({color, icon, onPress, title}) {
  return (
    <TouchableOpacity onPress={onPress}>
        <View style={color? [styles.button, {backgroundColor: ColorPicker[color]}] :styles.button}>
            {icon && icon}
            <Text style={styles.text}>    
                {title}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
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