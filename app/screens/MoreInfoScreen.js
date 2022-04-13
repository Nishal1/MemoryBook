import { Alert, 
  FlatList, Image, Modal, ScrollView,
  StyleSheet, TouchableOpacity, 
  View } from 'react-native';
import React, { useState } from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'
import { BlurView } from 'expo-blur';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Card from '../components/Card';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import FormTextInput from '../components/FormTextInput';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

import { getCurrUser, getImgs, updateMemory } from '../controller/logic';

const schema = Yup.object().shape(
  {
      title: Yup.string().label("Title"),
      category: Yup.string().label("Category")
  }
);

export default function MoreInfoScreen({navigation}) {
  const [imageList, setImageList] = useState(getImgs());
  const [isModalVisible, setVisibility] = useState(false);
  const [memorySelected, setSelectedMemory] = useState(null);
  const [image, setImage] = useState(null);

  const handleDeleteEvent = (memory) => {
    Alert.alert(
      "Are you sure you want to delete this memory?",
      "If you delete this, it might be lost forever!",
      [
        { 
          text: "Yes", 
          onPress: () => {
            deleteMemory(memory);
            setImageList(getImgs());
            navigation.navigate('Memory', {
              screen: 'Memory',
              params: {
                refresh: true
              }
          });
        }},
        {
          text: "No",
          onPress: () => console.log("cancelled"),
          style: "cancel"
        }
      ]
    );
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
    <Screen>
      <View style={styles.container}>
          <FlatList  
            data={imageList}
            keyExtractor={img => img.id.toString()}
            key={'#'}
            renderItem={({item}) => 
              <Card
                category={item.category}
                created={item.created}
                source={item.source} 
                title={item.title}
                onPressDel={() => {
                  handleDeleteEvent(item);
                }}
                onPressEdit={() => {
                  setVisibility(true);
                  console.log(item);
                  setSelectedMemory(item);
                  console.log(memorySelected);
                }}
              />
            }
        />
        <Modal 
            animationType="fade"
            statusBarTranslucent={false}
            transparent={true}
            visible={isModalVisible} 
        >
            
            <BlurView intensity={100} style={styles.modal} tint="light">
                <ScrollView>
                  <View style={styles.mainContainer}>
                      <TouchableOpacity 
                        onPress={() => {
                          setVisibility(false);
                          setSelectedMemory(false);
                        }}
                        style={styles.closeIcon}
                      >
                          <CustomIcon
                              backgroundColor={ColorPicker.otherColor2} 
                              iconColor={ColorPicker.primaryColor}
                              name="close-circle"
                              size={70}
                              
                          />
                      </TouchableOpacity>  
                      <StyleText>Edit memory</StyleText>
                      <Formik
                          initialValues={{title: "", 
                                          category: ""
                                      }}
                          onSubmit={(values, {resetForm}) => {
                              if(values.title === "") {
                                  values.title = memorySelected.title;
                              }
                              if(values.category === "") {
                                values.category = memorySelected.category;
                              }
                              resetForm();
                              if(image != null) {             
                                  const updatedMemory = {...values, ...image}
                                  console.log(updatedMemory);
                                  console.log(getCurrUser())
                                  updateMemory(
                                    updatedMemory,
                                    memorySelected.id, 
                                    getCurrUser().id
                                  );
                                  resetForm();
                                  setImage(null);
                                  setImageList(getImgs());
                                  setVisibility(false);
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
                                      // onBlur={() => setFieldTouched("title")}
                                      onChangeText = {handleChange("title")}
                                      placeholder={"Title/caption: " + memorySelected.title} 
                                      value={values.title}   
                                  />
                                  {/* {touched.title && <AppText>{errors.title}</AppText>} */}
                                  <FormTextInput 
                                      autoCapitalize="none"
                                      autoCorrect={false}
                                      keyboardType="default"
                                      // onBlur={() => setFieldTouched("category")}
                                      onChangeText = {handleChange("category")}
                                      placeholder={"Category: " + memorySelected.category}
                                      value={values.category} 
                                  />
                                  {/* {touched.category && <AppText>{errors.category}</AppText>} */}
                                  <TouchableOpacity 
                                      style={styles.imageButton}
                                      onPress={openImagePickerAsync}>
                                      <CustomIcon 
                                          name="camera" 
                                          size={80} 
                                          iconColor={ColorPicker.otherColor} 
                                          backgroundColor={ColorPicker.primaryColor} />
                                      {memorySelected && !image &&
                                          <Image 
                                              source={isFinite(memorySelected) ?
                                                memorySelected.source:
                                                {uri: memorySelected.source}
                                              } 
                                              style={styles.img}/>              
                                      }
                                      {image && 
                                          <Image 
                                              source={{ uri: image.source }} 
                                              style={styles.img}/>
                                      }
                                      
                                  </TouchableOpacity>
                                
                              </View>
                              <View style={styles.buttonsContainer}>
                                  <AppButton 
                                      title="Update"
                                      onPress={handleSubmit}
                                  />
                              </View>
                          </>
                      )}
                      </Formik>    
                </View>  
              </ScrollView> 
            </BlurView>
        </Modal>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPicker.otherColor1,
  },
  closeIcon: {
      marginLeft: 'auto',
      marginBottom: 'auto'
  },
  modal: {
      flex: 1,
      marginTop: 0
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
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})