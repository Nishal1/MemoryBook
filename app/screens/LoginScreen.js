import { StyleSheet,
    ScrollView,
    View,
    ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppContext from '../components/AppContext';
import AppTextInput from '../components/AppTextInput';
import ColorPicker from '../config/ColorPicker';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';
import ValidationMessage from '../components/ValidationMessage';

import { authenticate, 
    beginSession, 
    getUser } from '../controller/logic';

const schema = Yup.object().shape(
    {
        username: Yup.string().required().label("Username"),
        password: Yup.string().required().min(4).max(8).label("Password")
    }
);

export default function LoginScreen({navigation}) {
    const context = useContext(AppContext);
    return (
        <Screen style={styles.container}>
            <ImageBackground
                source={require('../assets/welcome.jpg')}
                style={styles.background}
                blurRadius={0.9}
            >
              <ScrollView>
                <View style={styles.mainContainer}>
                <StyleText>Login</StyleText>
                    <Formik
                        initialValues={{username: "", password: ""}}
                        onSubmit={(values, {resetForm}) => {
                            if(authenticate(values)) {
                                resetForm();
                                beginSession(values);
                                let userLoggedIn = getUser(values.username);
                                context.setCurrUser(userLoggedIn);
                                navigation.navigate('AccountHome', {
                                    screen: 'Account',
                                    params: {
                                        screen: 'AccountHome1',
                                        params: {
                                           currUser: userLoggedIn
                                        }
                                    }
                                });
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
                                {touched.username && errors.username && errors.username.length > 0
                                 &&<ValidationMessage text={errors.username} />}
                                <AppTextInput 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="lock"
                                    keyboardType="default"
                                    onBlur={() => setFieldTouched("password")}
                                    onChangeText = {handleChange("password")}
                                    placeholder="Password"
                                    secureTextEntry 
                                    value={values.password} 
                                />
                                {touched.password && errors.password && errors.password.length > 0 && <ValidationMessage text={errors.password} />}
                            </View>
                            <View style={styles.buttonsContainer}>
                                <AppButton 
                                    title="Login"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </>
                    )}
                    </Formik>
                </View>
              </ScrollView>            
            </ImageBackground>
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
        height: 550,
        marginTop: '25%',
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