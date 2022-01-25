import * as React from 'react';
import { useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { submitRecord, clearAll, getAllItemsWrapper } from '../common/commonFunctions';
import { isValidDate } from '../common/commonFunctions';

/**
 * Read stored data and render it in human-readable format.
 * @return A page of stored data
*/
export function DataScreen({ extra }) {
  const RecordView = ({recordData, recordKey}) => {
    return (
      <Text key={recordKey}>
      {recordData}
      </Text>
    );
  };

  const ItemView = ({extraKey}) => {

    let itemData = extra[extraKey];
    let itemIndex = -1;
    let tempStart, tempEnd;

    let itemListArr = itemData.map(itemDat => {
      itemIndex++;

      if (isValidDate(itemDat.start) && isValidDate(itemDat.end)) {
        tempStart = new Date(itemDat.start);
        tempEnd = new Date(itemDat.end);
        return (
          <View key={extraKey+itemIndex+"-View"}
          style={{justifyContent: 'center', padding: 15, borderBottomColor: 'grey', borderBottomWidth: 1}}
          >
            <Text key={extraKey+itemIndex}>
            Date: {extraKey}{'\n'}
            Start: {tempStart.toLocaleString()}{'\n'}
            End: {tempEnd.toLocaleString()}{'\n'}
            Tag: {itemDat.tag}
            </Text>
          </View>
        )
      } else return(null);
    });
    return (itemListArr);
  };

  let textListArr;
  if (extra) {
    let extraKeys = Object.keys(extra);
    textListArr = extraKeys.map(extraKey => {
        return(
          <ItemView key={extraKey+"-ItemView"} extraKey={extraKey}/>
        )
    });
  } else {
    return(null);
  }

  const [data, setData] = useState(textListArr);

  return (
    <View style={{flex: 1}}>
      <View elevation={5} style={{flex:0.08, flexDirection: 'row', justifyContent: 'center',
        padding: 15, backgroundColor: '#424874'}}>
        <View style={{width: 80, height: 40}} >
          <Button onPress={()=>{ clearAll(); setData(null); }} title="Clear" type="outline"
          buttonStyle={styles.buttonStyle} titleStyle={styles.buttonTitleStyle}/>
        </View>
        <View style={{width: 220, justifyContent: 'center', alignItems: 'center'}} >
          <Text style={styles.screenTitle}>
          D A T A
          </Text>
        </View>
        <View style={{width: 80, height: 40}} >
          <Button onPress={()=>{ getAllItemsWrapper(setData); }} title="Refresh"
          buttonStyle={styles.buttonStyle2} type="outline"/>
        </View>
      </View>
      <ScrollView style={{flex: 0.5, paddingLeft: 20, paddingRight: 20, paddingBottom: 40}}>
      {data}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 25,
    color: 'white',
  },
  buttonStyle: {
    borderWidth: 0.2,
    backgroundColor: 'red',
    borderColor: 'white',
  },
  buttonStyle2: {
    borderWidth: 0,
    borderColor: 'black',
    backgroundColor: 'white',
  },
  buttonTitleStyle: {
    color: 'white',
  },
});
