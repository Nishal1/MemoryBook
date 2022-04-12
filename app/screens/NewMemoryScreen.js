import { StyleSheet,
    ScrollView,
    View } from 'react-native';
import React from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import FormTextInput from '../components/FormTextInput';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

import { getCategories } from '../controller/logic';


const schema = Yup.object().shape(
    {
        title: Yup.string().required().label("Title"),
        category: Yup.string().required().label("Category")
    }
);

export default function NewMemoryScreen() {
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
                        console.log(values);
                        
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
                            <Dropdown 
                                label='Category'
                                data={getCategories()}
                            />
                           
                        </View>
                        <View style={styles.buttonsContainer}>
                            <AppButton 
                                title="Register"
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
      margin: 20,
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
    }
  
  });
  