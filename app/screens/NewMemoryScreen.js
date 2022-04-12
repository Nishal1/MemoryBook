import { Image, StyleSheet,
    ScrollView, TouchableOpacity,
    View } from 'react-native';
import React, { useState } from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import FormTextInput from '../components/FormTextInput';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

import { getCurrUser, addMemory } from '../controller/logic';


const schema = Yup.object().shape(
    {
        title: Yup.string().required().label("Title"),
        category: Yup.string().required().label("Category")
    }
);

export default function NewMemoryScreen({navigation}) {
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
    console.log(pickerResult);
  }
  return (
    <Screen style={styles.container}>
        <ScrollView>
            <View style={styles.mainContainer}>
                <StyleText>Create new memory</StyleText>
                <Formik
                    initialValues={{title: "", 
                                    category: ""
                                }}
                    onSubmit={(values, {resetForm}) => {
                        //push values to the user list
                        // make sure new user is not aldready registered
                        resetForm();
                        if(image != null) {                            
                            const newMemory = {...values, ...image}
                            console.log(newMemory);
                            addMemory(newMemory, getCurrUser().id);
                            navigation.navigate('Memory');
                        } else {
                            alert("Please select a valid image")
                        }
                    }}
                    validationSchema={schema}>
                {({values, handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <>
                        <View style={styles.textInputContainer}>
                            <FormTextInput 
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                onBlur={() => setFieldTouched("title")}
                                onChangeText = {handleChange("title")}
                                placeholder="Title/caption" 
                                value={values.email}   
                            />
                            {touched.title && <AppText>{errors.title}</AppText>}
                            <FormTextInput 
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="default"
                                onBlur={() => setFieldTouched("category")}
                                onChangeText = {handleChange("category")}
                                placeholder="Category"
                                value={values.category} 
                            />
                            {touched.category && <AppText>{errors.category}</AppText>}
                            <TouchableOpacity 
                                style={styles.imageButton}
                                onPress={openImagePickerAsync}>
                                <CustomIcon 
                                    name="camera" 
                                    size={80} 
                                    iconColor={ColorPicker.otherColor} 
                                    backgroundColor={ColorPicker.primaryColor} />
                                {image && 
                                    <Image 
                                        source={{ uri: image.source }} 
                                        style={{height: 100, width: 100}}/>
                                }
                            </TouchableOpacity>
                           
                        </View>
                        <View style={styles.buttonsContainer}>
                            <AppButton 
                                title="Add"
                                onPress={handleSubmit}
                            />
                        </View>
                    </>
                )}
                </Formik>    
          </View>  
        </ScrollView>          
  </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 0
    },
    background: {
      flex: 1
    },
    mainContainer: {
      backgroundColor: ColorPicker.offWhite,
      borderWidth: 10,
      borderColor: ColorPicker.khaki,
      justifyContent: 'center',
      alignItems: 'center',
      height: 600,
      marginTop: '20%',
      marginLeft: 20,
      marginRight: 20,
      marginBottom: '100%',
      elevation: 20,
      shadowColor: ColorPicker.black,
      padding: 10     
    },
    textInputContainer: {
      marginTop: 50,
      marginBottom: 30
    },
    buttonsContainer: {
      marginBottom: 10
    },
    imageButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
  });
  