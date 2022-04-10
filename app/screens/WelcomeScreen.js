import { StyleSheet, 
    Text,
    View,
    ImageBackground } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker'
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

export default function WelcomeScreen({navigation}) {
  return (
   <Screen>
        <ImageBackground
            source={require('../assets/welcome.jpg')}
            style={styles.background}
            blurRadius={0.9}
        >
            <View style={styles.mainContainer}>
                <MaterialCommunityIcons 
                    name="image-filter-hdr"
                    size={68}
                    color={ColorPicker.primaryColor}
                />
                <View style={styles.welcomeContainer}>
                    <StyleText>Welcome to memorybook!</StyleText>
                    <AppText style={styles.wlcmText}>
                        "One Solution to storing photos"
                    </AppText>
                </View>
    
                <View style={styles.buttonsContainer}>
                    <AppButton 
                        title="Login"
                        onPress={() => navigation.navigate("login")}
                    />
                    <AppButton 
                        title="Register"
                        onPress={() => navigation.navigate("register")}
                        color="otherColor2"
                    />
                </View>
            </View>

        </ImageBackground>
   </Screen>
  )
}

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    mainContainer: {
        backgroundColor: ColorPicker.offWhite,
        borderWidth: 10,
        borderColor: ColorPicker.khaki,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 0.70,
        marginTop: "40%",
        margin: 20,
        elevation: 20,
        shadowColor: ColorPicker.black      
    },
    welcomeContainer: {
        fontFamily: 'Roboto',
    },
    wlcmText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontStyle: 'italic'
    },
    buttonsContainer: {
        margin: 10,
    }
})