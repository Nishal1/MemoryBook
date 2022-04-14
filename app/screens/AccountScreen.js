import { Image,
    StyleSheet,
    Text,
    View } from 'react-native'
import React, { useContext } from 'react'

import AppButton from '../components/AppButton';
import AppContext from '../components/AppContext';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import DetailsCard from '../components/DetailsCard';
import Screen from '../components/Screen';

import { endSession, getUser } from '../controller/logic';

const defaultPic = require('../assets/defaultProfile.png')

export default function AccountScreen({navigation, route}) {
  const context = useContext(AppContext);
  const currUser = getUser(context.signedInUser.username);
  console.log("Accounts screen")
  console.log(currUser);
  return (
    <Screen style={styles.container}>
        <View style={styles.body}>
            {currUser.profilePic && <Image style={styles.img} source={currUser.profilePic}/>}
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

            <View style={styles.button}>
                    <AppButton 
                        color="red"
                        icon={<CustomIcon 
                                size={24} 
                                name="logout-variant"
                                iconColor='#FFF'
                                backgroundColor={ColorPicker.otherColor}
                        />}
                        onPress={() => {
                            context.setCurrUser(null);
                            endSession();
                            navigation.navigate('WelcomeScreen');
                        }}
                        title="Log out"  
                    />
                </View>
        </View>
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
        height: 200
    }
})