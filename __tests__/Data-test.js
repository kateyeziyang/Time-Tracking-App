/**
 * @format
 */

import 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { DataScreen } from '../screens/Data';

it('renders correctly when no data is available', () => {
  const tree = renderer
    .create(<DataScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders nothing when data is not of correct format', async() => {
  let ext = {"mykey1": [{"end": "invalidDate", "start": "invalidDate", "tag": "Sleep"}]};

  const tree = renderer
    .create(<DataScreen extra={ext}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders correctly when data is of correct format', async() => {
  let ext = {"04/12/20": [{"end": "2020-04-12T22:12:46.752Z", "start": "2020-04-12T22:12:46.752Z", "tag": "Sleep"}]};

  const tree = renderer
    .create(<DataScreen extra={ext}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
