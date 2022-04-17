import { FlatList, Modal, StyleSheet, 
     TouchableOpacity, 
    View } from 'react-native';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from './CustomIcon';
import FilterOptionView from './FilterOptionView';

import { getCategories } from '../controller/logic';


const categories = getCategories();

export default function FilterView({placeholder, selectedItem, onSelectItem}) {
  const [isModalVisible, setVisibility] = useState(false);
  return (
    <View>
        <View style={styles.container}>
            <TouchableOpacity>
                <AppText>{selectedItem ? selectedItem.name: placeholder}</AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisibility(true)}>
                <MaterialCommunityIcons 
                    name="filter"
                    size={24}
                    color={ColorPicker.primaryColor}
                />
            </TouchableOpacity>
        </View>
        <Modal 
            animationType="slide"
            statusBarTranslucent={false}            
            transparent={true}
            visible={isModalVisible} 
        >
            
            <BlurView intensity={100} style={styles.modal} tint="light">
                <FlatList
                    data={categories}
                    keyExtractor={categ => categ.id.toString()} 
                    key={'#'}
                    numColumns={3}
                    renderItem={({item}) => 
                        <FilterOptionView 
                            icon={item.icon}
                            iconColor={ColorPicker.primaryColor}
                            title={item.name}
                            onPress={() => {
                                setVisibility(false);
                                onSelectItem(item);
                            }}
                            backgroundColor={ColorPicker.white}
                        />
                    }
                />
                
                <TouchableOpacity onPress={() => setVisibility(false)}>
                    <CustomIcon
                        backgroundColor={ColorPicker.white} 
                        iconColor={ColorPicker.primaryColor}
                        name="close-circle"
                        size={140}
                        style={styles.closeIcon}
                    />
                </TouchableOpacity>

                
            </BlurView>
            
           
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        backgroundColor: ColorPicker.otherColor2,
        padding: 10
    },
    closeIcon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50
    },
    modal: {
        flex: 1,
        marginTop: 0,
        height: '100%'
    }
})