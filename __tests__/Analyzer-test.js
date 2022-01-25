/**
 * @format
 */

import 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { AnalyzerScreen } from '../screens/Analyzer';

beforeEach(async () => {
  await AsyncStorage.clear();
});

it('renders correctly when there is no data available.', async() => {
  const tree = renderer
    .create(<AnalyzerScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly with pie chart when there is some data', async() => {
  const testValue = [{"color": "#363062", "count": 60, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Study"}, {"color": "#4d4c7d", "count": 180, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Work"}, {"color": "#827397", "count": 60, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Relax"}, {"color": "#d8b9c3", "count": 120, "legendFontColor": "#7F7F7F", "legendFontSize": 15, "name": "Sleep"}];

  const tree = renderer
    .create(<AnalyzerScreen extra={testValue}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
