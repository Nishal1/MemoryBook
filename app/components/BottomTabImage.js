import { Image, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'

import AppContext from './AppContext';

import { getUser } from '../controller/logic';

export default function BottomTabImage({img}) {
  const context = useContext(AppContext);
  const currUser = getUser(context.signedInUser.username);
  const [profileImage, setProfileImage] = useState(currUser.profilePic);
  return (
    isFinite(currUser.profilePic)?
        <Image 
            source={currUser.profilePic}
            style={img}
        /> :
        <Image 
            source={{uri: currUser.profilePic}}
            style={img}
        /> 
  )
}

const styles = StyleSheet.create({})