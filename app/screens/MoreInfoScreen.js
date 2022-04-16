import { Alert, 
  FlatList, Image, Modal, ScrollView,
  StyleSheet, TouchableOpacity, 
  View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import React, { useState } from 'react';
import { Formik  } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker'
import { BlurView } from 'expo-blur';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Card from '../components/Card';
import Category from '../components/Category';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import FormTextInput from '../components/FormTextInput';
import Screen from '../components/Screen';
import StyleText from '../components/StyleText';

import { deleteMemory, getCurrUser, getImgs, updateMemory } from '../controller/logic';

const schema = Yup.object().shape(
  {
      title: Yup.string().label("Title")
  }
);

export default function MoreInfoScreen({navigation}) {
  const [imageList, setImageList] = useState(getImgs());
  const [isModalVisible, setVisibility] = useState(false);
  const [memorySelected, setSelectedMemory] = useState(null);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  /**
   * 
   * @param {*} categ -category chosen
   * This methods helps in saving the category picked
   * by the user when trying to update the memory
   */
  const getSelectedCategory = (categ) => {
    if(categ === "") {
      setCategory(memorySelected.category);
    }
    setCategory(categ);
  }
  /**
   * 
   * @param {*} memory -memory object to delete
   * This functions handles the delete event
   * by calling relevant method from logic.js
   */
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
  /**
   * 
   * This method helps in picking the image
   */
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
  }
  return (
    <Screen>
      <View style={styles.container}>
          
        <FlatList  
          data={imageList}
          keyExtractor={img => img.id.toString()}
          key={'#'}
          refreshing={refreshing}
          onRefresh={() => setImageList(getImgs())}
          renderItem={({item}) => 
            <Card
              category={item.category}
              created={item.created}
              isView={false}
              source={item.source} 
              title={item.title}
              onPressDel={() => {
                handleDeleteEvent(item);
              }}
              onPressEdit={() => {
                setSelectedMemory(item);
                setVisibility(true);
              }}
            />
          }
        />
        {imageList.length < 1 ? <AppText style={styles.text}>
          Sorry, You don't have any memories here :(
        </AppText>: <></>} 
        <Modal 
            animationType="fade"
            statusBarTranslucent={false}
            transparent={true}
            visible={isModalVisible} 
        >
          <MenuProvider skipInstanceCheck>  
            <BlurView intensity={100} style={styles.modal} tint="light">
                <ScrollView>
                  <View style={styles.mainContainer}>
                      <TouchableOpacity 
                        onPress={() => {
                          setVisibility(false);
                          setSelectedMemory(null);
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
                          initialValues={{title: ""}}
                          onSubmit={(values, {resetForm}) => {
                              if(values.title === "") {
                                  values.title = memorySelected.title;
                              }
                              
                              resetForm();
                              let updatedMemory = {};
                              let cat = memorySelected.category;
                              if(category !== "") {
                                cat = category;
                              }
                              if(image == null) {
                                updatedMemory = {
                                  ...values, 
                                  category: cat, 
                                  source: memorySelected.source
                                }
                              } else {
                                updatedMemory = {
                                  ...values, 
                                  category: cat, 
                                  ...image
                                }
                              }  
                              updateMemory(
                                updatedMemory,
                                memorySelected.id, 
                                getCurrUser().id
                              );
                              resetForm();
                              setImage(null);
                              setImageList(getImgs());
                              setVisibility(false);
                              navigation.navigate('Memory', {
                                screen: 'Memory',
                                params: {
                                   refresh: true
                                }
                            });
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
                                  
                                  <Category 
                                    getCateg={getSelectedCategory}
                                    isCategDisplay={memorySelected.category}
                                    isEditScreen={true}
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
                                              source={isFinite(memorySelected.source) ?
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
          </MenuProvider>  
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
  text: {
    fontSize: 18,
    marginBottom: 400,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})