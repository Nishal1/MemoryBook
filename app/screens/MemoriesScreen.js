import { FlatList, Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Card from '../components/Card';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import FilterView from '../components/FilterView';
import ListView from '../components/ListView';
import Screen from '../components/Screen';

import { deleteMemory, filterCategories, getImgs } from '../controller/logic';

export default function MemoriesScreen({ route }) {
  const [category, setCategory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setVisibility] = useState(false);
  const [selectItem, setSelectItem] = useState(null);

  let imageList = (category) ? filterCategories(category) : getImgs();
  if(route.params) {
    const { refresh } = route.params;
    if(refresh) {
      setCategory(null);
    }
  }
  const handleDeleteEvent = (memory) => {
    Alert.alert(
      "Are you sure you want to delete this memory?",
      "If you delete this, it might be lost forever!",
      [
        { 
          text: "Yes", 
          onPress: () => {
            deleteMemory(memory);
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

  return (
    <Screen>
      <FilterView 
        onSelectItem={item => {
          setCategory(item);
        }}
        placeholder="All Categories"
        selectedItem={category}
      />
      <View style={styles.container}>
        {category ?
            (<View style={styles.cancelButtonContainer}>
                <AppButton 
                    color="primaryColor"
                    icon={<CustomIcon 
                            size={24} 
                            name="cancel"
                            iconColor='#FFF'
                            backgroundColor={ColorPicker.otherColor}
                    />}
                    onPress={() => {
                        setCategory(null);
                    }}
                    title="Clear All filter"  
                />
            </View>):(<></>)}
        
            {imageList.length > 0 ? 
                <FlatList  
                  data={imageList}
                  keyExtractor={img => img.id.toString()}
                  key={'#'}
                  refreshing={refreshing}
                  onRefresh={() => setCategory(null)}
                  numColumns={3}
                  renderItem={({item}) => 
                    <ListView 
                      image={item.source}
                      title={item.title}
                      onPress={() => {
                        setSelectItem(item);
                        setVisibility(true);
                      }}
                    />
                }/>:
                <AppText style={styles.text}>
                  Sorry, You don't have any memories of selected category :(
                </AppText>
        }
      </View>
      <Modal 
        animationType="fade"
        visible={isModalVisible}
        >
            {isModalVisible ? 
              <Card
                category={selectItem.category}
                created={selectItem.created}
                isView={true}
                source={selectItem.source} 
                title={selectItem.title}
                onPressDel={() => {
                  handleDeleteEvent(selectItem);
                }}
                viewOptions= {() => {
                  setSelectItem(null);
                  setVisibility(false); 
                }}
              />: <></>
            }
        </Modal>

    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPicker.otherColor1,
  },
  cancelButtonContainer: {
    backgroundColor: ColorPicker.otherColor1,
    marginBottom: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    width: '40%'
},
  text: {
    marginTop: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
})