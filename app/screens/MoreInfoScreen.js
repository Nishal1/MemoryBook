import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Card from '../components/Card';
import ColorPicker from '../config/ColorPicker';
import Screen from '../components/Screen';

import { getImgs } from '../controller/logic';

export default function MoreInfoScreen() {
  const imageList = getImgs();
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
    backgroundColor: ColorPicker.otherColor1,
  }
})