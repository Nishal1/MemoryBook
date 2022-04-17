import { Image, Modal, 
    StyleSheet, TouchableOpacity, 
    View } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

import AppButton from '../components/AppButton';
import AppContext from '../components/AppContext';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import DetailsCard from '../components/DetailsCard';
import Screen from '../components/Screen';

import { editProfileImage, endSession, getUser } from '../controller/logic';

const defaultPic = require('../assets/defaultProfile.png')

export default function AccountScreen({ navigation }) {
  const context = useContext(AppContext);
  const currUser = getUser(context.signedInUser.username);
  const [isModalVisible, setVisibility] = useState(false);
  const [image, setImage] = useState(null);
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.cancelled === true) {
        return;
    }
    setImage({ source: pickerResult.uri });
  }

  const Menu = () => (
    <View style={styles.sideMenuContainer}>
        <View style={styles.topMenu}>
            <TouchableOpacity onPress={() => { 
                setVisibility(false);
                setImage(null);
            }}>
                <MaterialCommunityIcons 
                    name="arrow-left"
                    size={25}
                    color={ColorPicker.offWhite}
                />
            </TouchableOpacity>
            <AppText style={styles.drawerText}>
                Hi, {currUser.name.split(" ")[0]}
            </AppText>
        </View>

        <View>
            <AppText style={styles.drawerText2}>
            Edit profile picture:        
            </AppText>
            <TouchableOpacity 
                style={styles.imageButton}
                onPress={openImagePickerAsync}>
                <CustomIcon 
                    name="camera" 
                    size={80} 
                    iconColor={ColorPicker.otherColor1} 
                    backgroundColor={ColorPicker.inActiveColor} 
                />
                {!image && currUser.profilePic &&
                    <Image 
                        source={isFinite(currUser.profilePic) ? currUser.profilePic
                        :{uri: currUser.profilePic}} 
                        style={styles.img2}/>
                }   
                {image && 
                    <Image 
                        source={{ uri: image.source }} 
                        style={styles.img2}
                    />
                }
            </TouchableOpacity>
            {image && 
            <AppButton onPress={() => {
                editProfileImage(currUser, image);
                setImage(null);
                setVisibility(false);
                navigation.navigate('Account');
            }} 
                title="Save image" />
            } 
        </View>
        
        <View>
            <AppButton 
                color="red"
                icon={<CustomIcon 
                        size={24} 
                        name="logout-variant"
                        iconColor='#FFF'
                        backgroundColor={ColorPicker.otherColor}
                />}
                onPress={() => {
                    setImage(null);
                    setVisibility(false);
                    context.setCurrUser(null);
                    endSession();
                    navigation.navigate('WelcomeScreen');
                }}
                title="Log out"  
            />
        </View>
    </View>
  );

  return (
    <Screen style={styles.container}>  
        <View style={styles.body}>
            <TouchableOpacity onPress={() => setVisibility(true)}>
                <MaterialCommunityIcons 
                    name="menu"
                    size={50}
                    color={ColorPicker.primaryColor}
                />
            </TouchableOpacity>
            {currUser.profilePic && 
                <Image 
                    source={isFinite(currUser.profilePic) ? currUser.profilePic
                        :{uri: currUser.profilePic}} 
                    style={styles.img}
                />
            }
            {!currUser.profilePic && <Image style={styles.img} source={defaultPic}/>}
            <View style={styles.profileContainer}>
                <View style={styles.text}>
                    <AppText>{currUser.name}</AppText>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <DetailsCard 
                    name={currUser.name}
                    username={currUser.username}
                    email={currUser.email}        
                />
            </View>
        </View>
        <Modal 
            animationType="fade"
            statusBarTranslucent={false}
            transparent={true}
            visible={isModalVisible} 
        >
            <Menu />
        </Modal>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        backgroundColor: ColorPicker.otherColor1
    },
    button: {
        width: '25%',
        marginBottom: 50,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    profileContainer: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    img: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: '30%',
        marginLeft: 'auto',
        marginRight: 'auto' 
    },
    text: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10
    },
    detailsContainer: {
        margin: 10,
        height: 200,
        marginBottom: 100
    },
    sideMenuContainer: {
        backgroundColor: ColorPicker.primaryColor,
        flex: 1,
        justifyContent: 'space-between',
        padding: 16
    },
    drawerText: {
        color: ColorPicker.offWhite
    },
    drawerText2: {
        color: ColorPicker.offWhite,
        fontSize: 25,
        marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    topMenu: {
        flexDirection: 'row'
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    img2: {
        height: 100, 
        width: 100,
        borderRadius: 40,
        opacity: 0.5
    },
})