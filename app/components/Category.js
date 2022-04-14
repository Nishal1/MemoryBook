import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';

import AppText from './AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from './CustomIcon';

export default function Category({getCateg, isCategDisplay, isEditScreen}) {
  const [categorySelected, setCategory] = useState("");

  return (
    <View style={styles.container}>
        <View style={styles.catContainer}>
            {!isEditScreen ? 
                categorySelected !== "" && isCategDisplay !== ""? 
                <AppText style={styles.catText}>{categorySelected}</AppText> : 
                <AppText style={styles.catText}>Select category</AppText>
            :
                categorySelected !== "" && isCategDisplay !== ""? 
                <AppText style={styles.catText}>{categorySelected}</AppText> : 
                <AppText style={styles.catText}>{isCategDisplay}</AppText>
            }
        </View>
        <Menu>
            <MenuTrigger>
                <CustomIcon 
                    size={50} 
                    name="chevron-down-circle"
                    iconColor='#FFF'
                    backgroundColor={ColorPicker.otherColor} 
                />
            </MenuTrigger>

            <MenuOptions style={styles.optionsContainer}>
                <MenuOption style={styles.options} onSelect={() => {
                    console.log("clicked")
                    setCategory('Fruits');
                    getCateg('Fruits');
                }}>
                    <AppText style={styles.text}>Fruits</AppText>
                </MenuOption>
                <MenuOption style={styles.options} onSelect={() => {
                    setCategory('Sports');
                    getCateg('Sports');
                }}>
                    <AppText style={styles.text}>Sports</AppText>
                </MenuOption>
                <MenuOption style={styles.options} onSelect={() => {
                    setCategory('City');
                    getCateg('City');
                }}>
                    <AppText style={styles.text}>City</AppText>
                </MenuOption>
                <MenuOption style={styles.options} onSelect={() => {
                    setCategory('Nature');
                    getCateg('Nature');
                }}>
                    <AppText style={styles.text}>Nature</AppText>
                </MenuOption>
                <MenuOption style={styles.options} onSelect={() => {
                    setCategory('Food');
                    getCateg('Food');
                }}>
                    <AppText style={styles.text}>Food</AppText>
                </MenuOption>
                <MenuOption style={styles.options} onSelect={() => {
                    setCategory('Fun');
                    getCateg('Fun')
                }}>
                    <AppText style={styles.text}>Fun</AppText>
                </MenuOption>
            </MenuOptions>
        </Menu>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    catContainer: {
        marginLeft: 16
    },
    catText: {
        color: '#D3D3D3'
    },
    optionsContainer: {
        backgroundColor: ColorPicker.offWhite,
        padding: 1,
        width: '100%',
        padding: 7
    },
    options: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: ColorPicker.secondaryColor
    },
    text: {
        fontSize: 14,
        marginTop: 8
    }
})