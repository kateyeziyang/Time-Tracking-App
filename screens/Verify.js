import * as React from 'react';
import { useState } from 'react';
import { Text, View, Button, Dimensions, TextInput, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { checkPwd } from '../common/commonFunctions';

/**
 * Recorder screen where user will be able to customize a time period and submit.
 * @param setPassed the callback function when correct password is typed in
 * @return a time recorder page.
*/
export function VerifyScreen( {setPassed} ) {
  const [curPwd, onChangeText] = React.useState('');
  const alertWrong = () => { Alert.alert("Sorry", "Password is wrong."); }

  if (curPwd.length === 4) {
    checkPwd(curPwd, setPassed, onChangeText, alertWrong);
  }

  return(
    <View style={{flex: 1}}>
      <View elevation={5} style={{flex:0.05, flexDirection: 'row', justifyContent:'center', alignItems: 'center', padding: 15, backgroundColor: '#f7be16'}}>
        <Text style={styles.screenTitle}>
        Verification
        </Text>
      </View>
      <View style={{paddingLeft:20, paddingRight: 20, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{padding:20}}>
          <Text style={styles.bigText}>
          Your 4-digit PIN
          </Text>
          <View style={{alignItems: 'center', padding: 20}}>
            <View style={{width: 80}}>
              <TextInput keyboardType="numeric" secureTextEntry={true} value={curPwd}
              style={{borderColor: '#ec9b3b', borderWidth: 2, backgroundColor: 'white', fontFamily:'monospace'}}
              maxLength={4} onChangeText={curPwd => onChangeText(curPwd)}>
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
  screenTitle: {
    fontSize: 25,
    color: 'white',
  },
});
