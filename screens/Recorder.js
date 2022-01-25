import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Platform, } from 'react-native';
import { Button } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';
import { submitRecord } from '../common/commonFunctions';

/**
 * Recorder screen where user will be able to customize a time period and submit.
 * @return a time recorder page.
*/
export function RecorderScreen({ curDate }) {
  /* ---time picker variables--- */
  const [startDate, setStartDate] = useState(curDate);
  const [endDate, setEndDate] = useState(curDate);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShow(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShow2(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker2 = () => {
    showMode2('date');
  };

  const showTimepicker2 = () => {
    showMode2('time');
  };

  // If set button title directy with the raw string, the newline character won't rendered correctly
  const endButtonTitle1 = "End\nDate\npicker";
  const endButtonTitle2 = "End\ntime\npicker";
  /* ---time picker variables end--- */

  /* ---Event tags variables--- */
  const [selectedValue, setSelectedValue] = useState("N/A");
  /* ---Event tags variables end--- */

  /* ---Custom variables--- */
  /* ---Custom variables end--- */

  return (
    <View style={{flex: 1}}>
      <View style={{padding: 20}}>
        <Text style={styles.bigOrange1}>
        Start time
        </Text>
        <Text style={styles.timeText}>
        {startDate.toDateString()}, {startDate.toLocaleTimeString()}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center',}}>
          <View style={{width: 80}} >
            <Button onPress={showDatepicker} title="Start date picker"
            buttonStyle={styles.buttonStyle1}
            />
          </View>
          <View style={{width: 50}} >
          </View>
          <View style={{width: 80}} >
            <Button onPress={showTimepicker} title="Start time picker"
            buttonStyle={styles.buttonStyle1}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.bigOrange1}>
        End time
        </Text>
        <Text style={styles.timeText}>
        {endDate.toDateString()}, {endDate.toLocaleTimeString()}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'center',}}>
          <View style={{width: 80}} >
            <Button onPress={showDatepicker2} title={endButtonTitle1}
            buttonStyle={styles.buttonStyle1}
            />
          </View>
          <View style={{width: 50, }} >
          </View>
          <View style={{width: 80}} >
            <Button onPress={showTimepicker2} title={endButtonTitle2}
            buttonStyle={styles.buttonStyle1}
            />
          </View>
        </View>
      </View>
      <View style={{padding: 20}}>
        <Text style={styles.bigOrange1}>
        Event Tag
        </Text>
        <View style={{alignItems: 'center'}}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Select Here" value="N/A" />
            <Picker.Item label="Study" value="Study" />
            <Picker.Item label="Work" value="Work" />
            <Picker.Item label="Relax" value="Relax" />
            <Picker.Item label="Sleep" value="Sleep" />
          </Picker>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={{width: 150}} >
          <Button titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle2}
          onPress={() => {
            submitRecord(startDate, endDate, selectedValue);
          }}
          title="Submit"
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={startDate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onStartChange}
        />
      )}
      {show2 && (
        <DateTimePicker
          testID="dateTimePicker2"
          timeZoneOffsetInMinutes={0}
          value={endDate}
          mode={mode2}
          is24Hour={true}
          display="default"
          onChange={onEndChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24,
    lineHeight: 35,
  },
  bigOrange1: {
    fontSize: 24,
    color: '#da4302',
    lineHeight: 35,
  },
  timeText: {
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 50,
  },
  buttonStyle1: {
    backgroundColor: '#00818a',
  },
  buttonStyle2: {
    borderRadius: 30,
    backgroundColor: '#032535',
  },
  buttonTitleStyle: {
    fontSize: 26,
    color: 'white',
  },
});
