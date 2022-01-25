import 'react-native-gesture-handler';
import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';

import { PlaceHolderScreen } from './screens/PlaceHolder';
import { RecorderScreen } from './screens/Recorder';
import { DataScreen } from './screens/Data';
import { AnalyzerScreen } from './screens/Analyzer';
import { LoadingScreen } from './screens/Loading';
import { SettingScreen } from './screens/Setting';
import { VerifyScreen } from './screens/Verify';
import { submitRecord, getRecordByDate, getAllItems, checkLock } from './common/commonFunctions';

export default function App() {
  return (
    <NavigationContainer>
        <Home />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();
function Home() {
  const [isPassed, setPassed] = React.useState(false);
  const [hasLock, setLock] = React.useState(0);

  checkLock(setLock);

  if (hasLock === 0) {
    return (
      <View>
      </View>
    );
  } else if (hasLock === -1 || isPassed) {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Recorder':
            iconName = 'clockcircleo';
            break;
            case 'Data':
            iconName = 'bars';
            break;
            case 'Analyzer':
            iconName = 'linechart';
            break;
            default:
            iconName = 'setting'
          }
          return(<Icon name={iconName} size={size} color={color} />);
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
      <Tab.Screen name="Recorder">
      {() => <RecorderScreen curDate={new Date()}/>}
      </Tab.Screen>
      <Tab.Screen name="Data">
      {() => <Data />}
      </Tab.Screen>
      <Tab.Screen name="Analyzer">
      {() => <AnalyzerScreen />}
      </Tab.Screen>
      <Tab.Screen name="Setting">
      {() => <SettingScreen />}
      </Tab.Screen>
      </Tab.Navigator>
    );
  } else {
    return (
      <VerifyScreen setPassed={setPassed}/>
    );
  }
}

function Data() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      return {
        ...prevState,
        isLoading: false,
        _localData: action.localData,
      };
    },
    {
      isLoading: true,
      _localData: null,
    }
  );

  React.useEffect(() => {
    getAllItems(dispatch);
  }, []);

  return (
    state.isLoading ? (
      <LoadingScreen />
    ) : (
      <DataScreen extra={state._localData}/>
    )
  );
}
