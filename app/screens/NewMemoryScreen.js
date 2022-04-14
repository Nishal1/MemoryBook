import { Image, StyleSheet,  
    ScrollView, TouchableOpacity,
    View } from 'react-native';
import React, { useState } from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Category from '../components/Category';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import FormTextInput from '../components/FormTextInput';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';
import ValidationMessage from '../components/ValidationMessage';

import { getCurrUser, addMemory } from '../controller/logic';

const schema = Yup.object().shape(
    {
        title: Yup.string().required().label("Title")
    }
);

export default function NewMemoryScreen({navigation}) {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const getSelectedCategory = (categ) => {
    setCategory(categ);
  }
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
                    initialValues={{title: "", img: null}}
                    onSubmit={(values, {resetForm}) => {
                        resetForm();
                        if(category === "") {
                            alert("Please select a category");
                            return;
                        }
                        console.log("here")
                        if(image != null) {                            
                            const newMemory = {...values, ...image, category: category}
                            console.log(newMemory);
                            addMemory(newMemory, getCurrUser().id);
                            resetForm();
                            setImage(null);
                            setCategory("");
                            navigation.navigate('Memory', {
                                screen: 'Memory',
                                params: {
                                   refresh: true
                                }
                            });
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
                                value={values.title}   
                            />
                            {touched.title && errors.title && errors.title.length > 0 &&<ValidationMessage text={errors.title} />}
                            <Category 
                                getCateg={getSelectedCategory}
                                isCategDisplay={category}
                                isEditScreen={false}
                            />
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
                                        style={styles.img}/>
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
      backgroundColor: ColorPicker.otherColor1
    },
    background: {
      flex: 1
    },
    mainContainer: {
      backgroundColor: ColorPicker.otherColor2,
      borderWidth: 10,
      borderColor: ColorPicker.khaki,
      justifyContent: 'center',
      alignItems: 'center',
      height: 600,
      marginTop: '10%',
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
    },
    img: {
        height: 100, 
        width: 100,
        borderRadius: 20,
        opacity: 0.5
    }
  });
  