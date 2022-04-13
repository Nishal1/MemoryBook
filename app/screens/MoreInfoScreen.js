import { Alert, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Card from '../components/Card';
import ColorPicker from '../config/ColorPicker';
import Screen from '../components/Screen';

import { getImgs, deleteMemory } from '../controller/logic';

export default function MoreInfoScreen({navigation}) {
  const [imageList, setImageList] = useState(getImgs());
  const handleDeleteEvent = (memory) => {
    Alert.alert(
      "Are you sure you want to delete this memory?",
      "If you delete this, it might be lost forever!",
      [
        { 
          text: "Yes", onPress: () => {
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