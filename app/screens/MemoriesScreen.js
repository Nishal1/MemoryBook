import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ColorPicker from '../config/ColorPicker';
import ListView from '../components/ListView';
import Screen from '../components/Screen';

import { getImgs } from '../controller/logic';


export default function MemoriesScreen() {
  const imageList = getImgs();
  return (
    <Screen >
      <View style={styles.container}>
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
        />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorPicker.offWhite,
  }

})