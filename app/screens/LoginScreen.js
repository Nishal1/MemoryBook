import { StyleSheet,
    Text,
    View,
    ImageBackground } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik  } from 'formik';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

import {users} from '../config/SeedData';
import { authenticate } from '../controller/logic';

const schema = Yup.object().shape(
    {
        username: Yup.string().required().label("Username"),
        password: Yup.string().required().min(6).max(8).label("Password")
    }
);

export default function LoginScreen({navigation}) {
  return (
    <Screen style={styles.container}>
        <ImageBackground
            source={require('../assets/welcome.jpg')}
            style={styles.background}
            blurRadius={0.9}
        >
            <View style={styles.mainContainer}>
            <StyleText>Login</StyleText>
                <Formik
                    initialValues={{username: "", password: ""}}
                    onSubmit={(values, {resetForm}) => {
                        if(authenticate(values)) {
                            console.log(values);
                            resetForm();
                        } else {
                            resetForm();
                            alert("Invalid login details");
                        }
                 
                    }}
                    validationSchema={schema}>
                {({values, handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <>
                        <View style={styles.textInputContainer}>
                            <AppTextInput 
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="account"
                                keyboardType="default"
                                onBlur={() => setFieldTouched("username")}
                                onChangeText = {handleChange("username")}
                                placeholder="Username" 
                                value={values.username}   
                            />
                            {touched.username && <AppText>{errors.username}</AppText>}
                            <AppTextInput 
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                keyboardType="default"
                                onBlur={() => setFieldTouched("password")}
                                onChangeText = {handleChange("password")}
                                placeholder="Password"
                                textContentType="password" 
                                value={values.username} 
                            />
                            {touched.password && <AppText>{errors.password}</AppText>}
                        </View>
                        <View style={styles.buttonsContainer}>
                            <AppButton 
                                title="Login"
                                onPress={handleSubmit}
                            />
                            <AppButton 
                                title="Go back"
                                onPress={() => navigation.goBack()}
                                color="otherColor2"
                            />
                        </View>
                    </>
                )}
                </Formik>
                
            </View>            
        </ImageBackground>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
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
        height: 500,
        marginTop: 55,
        margin: 20,
        elevation: 20,
        shadowColor: ColorPicker.black,
        padding: 10     
    },
    textInputContainer: {
        marginTop: 50,
        marginBottom: 30
    }

})