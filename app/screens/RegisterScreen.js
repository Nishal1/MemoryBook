import { StyleSheet,
  ScrollView,
  View,
  ImageBackground } from 'react-native';
import React from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

import { isUniqueUser, registerUser, getUser } from '../controller/logic';


const schema = Yup.object().shape(
    {
        email: Yup.string().required().email().label("Email"),
        username: Yup.string().required().label("Username"),
        name: Yup.string().required().min(2, "Too small").max(15, "Too big").label("Name"),
        password: Yup.string().required().min(4).max(8).label("Password")
    }
);

export default function RegisterScreen({navigation}) {
return (
  <Screen style={styles.container}>
      <ImageBackground
          source={require('../assets/welcome.jpg')}
          style={styles.background}
          blurRadius={0.9}
      >
        <ScrollView>
            <View style={styles.mainContainer}>
                <StyleText>Register</StyleText>
                <Formik
                    initialValues={{email: "", 
                                    username: "",
                                    name: "",
                                    password: ""}}
                    onSubmit={(values, {resetForm}) => {
                        //push values to the user list
                        // make sure new user is not aldready registered
                        resetForm();
                        console.log(values);
                        if(isUniqueUser(values)) {
                          //push to users array
                          registerUser(values);
                          let userLoggedIn = getUser(values.username);
                          alert("Welcome "+ values.name);
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
                          alert("Username already exists");
                        }
                    }}
                    validationSchema={schema}>
                {({values, handleChange, handleSubmit, errors, setFieldTouched, touched}) => (
                    <>
                        <View style={styles.textInputContainer}>
                            <AppTextInput 
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="email"
                                keyboardType="email-address"
                                onBlur={() => setFieldTouched("email")}
                                onChangeText = {handleChange("email")}
                                placeholder="Email Address" 
                                value={values.email}   
                            />
                            {touched.email && <AppText>{errors.email}</AppText>}
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
                                autoCapitalize="words"
                                autoCorrect={false}
                                icon="account"
                                keyboardType="default"
                                onBlur={() => setFieldTouched("name")}
                                onChangeText = {handleChange("name")}
                                placeholder="Full Name"
                                value={values.name} 
                            />
                            {touched.name && <AppText>{errors.email}</AppText>}
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
                            {touched.password && <AppText>{errors.password}</AppText>}
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