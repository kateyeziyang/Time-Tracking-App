import * as React from 'react';
import { Text, View } from 'react-native';

/**
 * Default screen when github haven't return anything.
 * @return A waiting page
*/
export function LoadingScreen() {
  return (
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Loading...</Text>
    </View>
  );
}
