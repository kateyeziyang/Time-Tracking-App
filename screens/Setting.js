import * as React from 'react';
import { useState } from 'react';
import { Text, View, Dimensions, TextInput, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { setNewPwd } from '../common/commonFunctions';

/**
 * App lock screen.
 * @return a page to set up your app lock.
*/
export function SettingScreen() {
    const [curPwd, onChangeText1] = React.useState('');
    const [newPwd, onChangeText2] = React.useState('');
    const alert1 = () => { Alert.alert("OK", "Successfully remove app lock."); }
    const alert2 = () => { Alert.alert("OK", "Successfully set up your app lock."); }
    const alert3 = () => { Alert.alert("Sorry", "Your current password is wrong."); }

  return(
    <View style={{flex: 1}}>
      <View elevation={5} style={{flex:0.12, flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#f7be16'}}>
        <View style={{width: 130}} >
        </View>
        <View style={{width: 120, justifyContent: 'center', alignItems: 'center'}} >
          <Text style={styles.screenTitle}>
          App  Lock
          </Text>
        </View>
        <View style={{width: 20}} >
        </View>
        <View style={{width: 180, height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Button
          onPress={() => {
            setNewPwd(curPwd, newPwd, alert1, alert2, alert3);
            onChangeText1("");
            onChangeText2("");
          }}
          title="Save" type="outline"
          buttonStyle={styles.buttonStyle}/>
        </View>
      </View>
      <View style={{paddingLeft:20, paddingRight: 20}}>
        <View style={{padding:20}}>
          <Text style={styles.bigText}>
          Your current 4-digit PIN:
          </Text>
          <Text style={styles.smallText}>
          When you don't have one, leave it blank.
          </Text>
          <View style={{alignItems: 'center', padding: 20}}>
            <View style={{width: 80}}>
              <TextInput keyboardType="numeric" secureTextEntry={true} value={curPwd}
              style={{borderColor: '#ec9b3b', borderWidth: 2, backgroundColor: 'white', fontFamily:'monospace'}}
              maxLength={4} onChangeText={curPwd => onChangeText1(curPwd)}>
              </TextInput>
            </View>
          </View>
        </View>
        <View style={{paddingLeft:20, paddingRight: 20}}>
          <Text style={styles.bigText}>
          Your new 4-digit PIN:
          </Text>
          <Text style={styles.smallText}>
          Leave it blank if you don't want app lock.
          </Text>
          <View style={{alignItems: 'center', padding: 20}}>
            <View style={{width: 80}}>
              <TextInput keyboardType="numeric" secureTextEntry={true} value={newPwd}
              style={{borderColor: '#ec9b3b', borderWidth: 2, backgroundColor: 'white', fontFamily:'monospace'}}
              maxLength={4} onChangeText={newPwd => onChangeText2(newPwd)}>
              </TextInput>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 14,
    fontStyle: "italic"
  },
  screenTitle: {
    fontSize: 25,
    color: 'white',
  },
  buttonStyle: {
    backgroundColor: 'white',
  },
});
