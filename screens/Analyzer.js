import * as React from 'react';
import { useState } from 'react';
import { Text, View, Dimensions, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';
import { submitPeriod, summarizeDataByTag, summarizeDataByTagAndDate, summarizeData } from '../common/commonFunctions';

import {
  PieChart,
  StackedBarChart
} from "react-native-chart-kit";

/**
 * Show statistics based on past record.
 * @return A page of stored data
*/
export function AnalyzerScreen({ extra }) {
  const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5
  };

  const [value, onChangeText] = React.useState('04/13/20');
  const [value2, onChangeText2] = React.useState('04/19/20');
  const [selectedValue, setSelectedValue] = useState("Pie");
  const [chartData, setChartData] = useState([]);

  if (extra) {
    console.log("Test condition.");
    const [chartData, setChartData] = useState(extra);
  } else {
    const [chartData, setChartData] = useState([]);
  }

  let chartImage;
  let textAnalysis;
  if (chartData.length !== 0) {
    let sumData = summarizeData(chartData);
    let numDays = Object.keys(chartData).length;
    let averageList = [sumData["Study"], sumData["Work"], sumData["Relax"], sumData["Sleep"]];
    for (let i = 0; i < averageList.length; i++) {
      averageList[i] = averageList[i] / numDays;
    }
    textAnalysis =
    <View style={{padding:10}}>
        <Text style={styles.bigText}>Average time spending per day (in mins)</Text>
        <View style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
          <Button title="Study" buttonStyle={styles.buttonStyle1} />
          <View style={{width:5}}>
          </View>
          <Text style={styles.bigText}>{averageList[0].toFixed()}</Text>
          <View style={{width:5}}>
          </View>
          <Button title="Work" buttonStyle={styles.buttonStyle2} />
          <View style={{width:5}}>
          </View>
          <Text style={styles.bigText}>{averageList[1].toFixed()}</Text>
          <View style={{width:5}}>
          </View>
          <Button title="Relax" buttonStyle={styles.buttonStyle3} />
          <View style={{width:5}}>
          </View>
          <Text style={styles.bigText}>{averageList[2].toFixed()}</Text>
          <View style={{width:5}}>
          </View>
          <Button title="Sleep" buttonStyle={styles.buttonStyle4} />
          <View style={{width:5}}>
          </View>
          <Text style={styles.bigText}>{averageList[3].toFixed()}</Text>
        </View>
      </View>
    ;
    switch (selectedValue) {
      case "Pie":
        let tagsCount = summarizeDataByTag(chartData);
        chartImage = <PieChart
                      data={tagsCount}
                      width={350}
                      height={220}
                      chartConfig={chartConfig}
                      accessor="count"
                      backgroundColor="transparent"
                      paddingLeft="15"
                    />
        break;
      case "Stacked":
        let barData = summarizeDataByTagAndDate(chartData);
        console.log(barData);
        chartImage = <StackedBarChart
                      data={barData}
                      width={350}
                      height={220}
                      chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      }}
                      style={{
                        marginVertical: 8,
                        borderRadius: 50,
                      }}
                      />
        break;
      default:
        chartImage = null;
    }
  } else {
    chartImage = null;
    textAnalysis = null;
  }

  return (
    <View style={{flex: 1, paddingLeft: 20, paddingRight: 20}}>
      <View style={{padding:10}}>
        <View style={{flexDirection: 'row', height: 30}}>
          <View style={{width: 20, height: 30, justifyContent: 'center'}} >
            <Text style={styles.circled}>❶</Text>
          </View>
          <View style={{width: 10, height: 30}} >
          </View>
          <View style={{width: 200, height: 30, justifyContent: 'center'}} >
            <Text style={styles.bigText}>Pick a Time Range</Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <View style={{width: 50, alignItems: 'center', justifyContent: 'center'}} >
        <Text>From</Text>
        </View>
        <View style={{width: 70}} >
          <TextInput
            style={{ height: 40, borderColor: '#c2e8ce', borderWidth: 2, backgroundColor: 'white' }}
            onChangeText={text => onChangeText(text)}
            value={value}
          />
        </View>
        <View style={{width: 30, alignItems: 'center', justifyContent: 'center'}} >
          <Text>To</Text>
        </View>
        <View style={{width: 70}} >
          <TextInput
            style={{ height: 40, borderColor: '#c2e8ce', borderWidth: 2, backgroundColor: 'white'}}
            onChangeText={text => onChangeText2(text)}
            value={value2}
          />
        </View>
        <View style={{width: 90, alignItems: 'center', justifyContent: 'center'}} >
          <Text style={styles.smallText}>MM/DD/YY</Text>
        </View>
      </View>
      <View style={{padding:10}}>
        <View style={{flexDirection: 'row', height: 30}}>
          <View style={{width: 20, height: 30, justifyContent: 'center'}} >
            <Text style={styles.circled}>❷</Text>
          </View>
          <View style={{width: 10, height: 30}} >
          </View>
          <View style={{width: 200, height: 30, justifyContent: 'center'}} >
            <Text style={styles.bigText}>Select Chart Type</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ height: 50, width: 190}}>
            <Picker
              selectedValue={selectedValue}
              style={{ height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
              <Picker.Item label="Pie Chart" value="Pie" />
              <Picker.Item label="Stacked-Bar Chart" value="Stacked" />
            </Picker>
          </View>
          <View style={{ width: 20}}>
          </View>
          <View style={{ width: 50, height: 30}}>
            <Button
            raised={true}
            onPress={() => {
              submitPeriod(value, value2, setChartData);
            }}
            title="OK" buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </View>
      {textAnalysis}
      {chartImage}
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
  circled: {
    fontSize: 25,
    color: '#5eb7b7'
  },
  buttonStyle: {
    borderRadius: 14,
    backgroundColor: '#fc7978'
  },
  buttonStyle1: {
    borderRadius: 14,
    backgroundColor: '#363062'
  },
  buttonStyle2: {
    borderRadius: 14,
    backgroundColor: '#4d4c7d'
  },
  buttonStyle3: {
    borderRadius: 14,
    backgroundColor: '#827397'
  },
  buttonStyle4: {
    borderRadius: 14,
    backgroundColor: '#d8b9c3'
  },
});
