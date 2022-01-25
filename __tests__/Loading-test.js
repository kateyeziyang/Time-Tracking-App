/**
 * @format
 */

import 'react-native';
import React from 'react';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { LoadingScreen } from '../screens/loading';

it('renders correctly', () => {
  const tree = renderer
    .create(<LoadingScreen />).toJSON();

  expect(tree).toMatchSnapshot();
});
