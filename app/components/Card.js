import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

import AppText from './AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from './CustomIcon';

export default function Card({category, created, source, title, onPressDel, onPressEdit}) {
  return (
    <View style={styles.container}>
        <View>
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

        <View style={styles.textContainer}>
            <View>
                <AppText style={styles.text}>{title}</AppText>
                <AppText style={styles.text}>{category}</AppText>
                <AppText style={styles.text}>
                    {created.getDate()}/{created.getMonth() + 1}/{created.getFullYear()}
                </AppText>
            </View>
            <Menu>
                <MenuTrigger>
                    <CustomIcon 
                        size={50} 
                        name="dots-vertical"
                        iconColor='#FFF'
                        backgroundColor={ColorPicker.otherColor} 
                    />
                </MenuTrigger>

                <MenuOptions style={styles.optionsContainer}>
                    <MenuOption style={[styles.options, styles.firstOption]} onSelect={onPressDel}>
                        <CustomIcon 
                            size={40} 
                            name="delete"
                            iconColor="#F79696"
                            backgroundColor={ColorPicker.offWhite} 
                        />
                        <AppText style={styles.subText}>Delete</AppText>
                    </MenuOption>
                    <MenuOption style={styles.options} onSelect={onPressEdit}>
                        <CustomIcon 
                            size={40} 
                            name="pencil"
                            iconColor={ColorPicker.secondaryColor}
                            backgroundColor={ColorPicker.offWhite} 
                        />
                        <AppText style={styles.subText}>Edit</AppText>
                    </MenuOption>
                </MenuOptions>
            </Menu>
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
        color: ColorPicker.offWhite,
        fontSize: 16
    },
    img: {
        width: 'auto',
        height: 200
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    optionsContainer: {
        backgroundColor: ColorPicker.offWhite,
        padding: 1
    },
    firstOption: {
        borderBottomWidth: 1,
        borderBottomColor: ColorPicker.secondaryColor
    },
    options: {
        flexDirection: 'row'
    },
    subText: {
        fontSize: 14,
        marginTop: 8
    }
})