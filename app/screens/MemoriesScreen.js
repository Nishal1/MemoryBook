import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ColorPicker from '../config/ColorPicker';
import CustomIcon from '../components/CustomIcon';
import FilterView from '../components/FilterView';
import ListView from '../components/ListView';
import Screen from '../components/Screen';

import { filterCategories, getImgs } from '../controller/logic';

export default function MemoriesScreen() {
  const [category, setCategory] = useState(null);
  let imageList = (category) ? filterCategories(category) : getImgs();
  return (
    <Screen >
      <FilterView 
        onSelectItem={item => {
          setCategory(item);
        }}
        placeholder="All Categories"
        selectedItem={category}
      />
      {category ?
          (<View style={styles.cancelButtonContainer}>
              <AppButton 
                  color="otherColor1"
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

      <View style={styles.container}>
        {imageList.length > 0 ? 
          <FlatList  
          data={imageList}
          keyExtractor={img => img.id.toString()}
          key={'#'}
          numColumns={3}
          renderItem={({item}) => 
            <ListView 
              title={item.title}
              image={item.source}
            />
          }
        />:
        <AppText style={styles.text}>
          Sorry, You don't have any memories of selected category :(
        </AppText>
        }
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPicker.offWhite,
  },
  cancelButtonContainer: {
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