/**
 * @format
 */

import 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { RecorderScreen } from '../screens/Recorder';

it('renders correctly', () => {
  const dateValue = new Date("2020-04-12T22:12:46.752Z");
  const tree = renderer
    .create(<RecorderScreen curDate={dateValue}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
