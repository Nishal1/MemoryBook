import { StyleSheet,
  ScrollView,
  View,
  ImageBackground } from 'react-native';
import React, { useContext } from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppContext from '../components/AppContext';
import AppTextInput from '../components/AppTextInput';
import ColorPicker from '../config/ColorPicker';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';
import ValidationMessage from '../components/ValidationMessage';

import { isUniqueUser, registerUser, getUser } from '../controller/logic';

/**
 * By default, all the fields in registration form are compulsory
 */
const schema = Yup.object().shape(
    {
        email: Yup.string().required().email().label("Email"),
        username: Yup.string().required().label("Username"),
        name: Yup.string().required().min(2, "Too small").max(15, "Too big").label("Name"),
        password: Yup.string().required().min(4).max(8).label("Password")
    }
);

export default function RegisterScreen({navigation}) {
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
                  <StyleText>Register</StyleText>
                  <Formik
                      initialValues={{email: "", 
                                      username: "",
                                      name: "",
                                      password: ""}}
                      onSubmit={(values, {resetForm}) => {
                          resetForm();
                          if(isUniqueUser(values)) { //make sure the new user is not already registered
                            registerUser(values); //add to users list & also login the user
                            let userLoggedIn = getUser(values.username);
                            context.setCurrUser(userLoggedIn); //setting the global state to help with route protection
                            alert("Welcome "+ values.name, "Have fun with your memories!"); 
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
                            //reached here => user is already registered
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
                              {touched.email && errors.email && errors.email.length > 0 &&<ValidationMessage text={errors.email} />}
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
                              {touched.username && errors.username && errors.username.length > 0 &&<ValidationMessage text={errors.username} />}
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
                              {touched.name && errors.name && errors.name.length > 0 &&<ValidationMessage text={errors.name} />}
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
                              {touched.password && errors.password && errors.password.length > 0 &&<ValidationMessage text={errors.password} />}
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
    height: 700,
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