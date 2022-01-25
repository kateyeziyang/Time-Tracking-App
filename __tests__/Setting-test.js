/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { SettingScreen } from '../screens/Setting';

it('renders correctly', () => {
  const tree = renderer
    .create(<SettingScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});
