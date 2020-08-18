import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Stream from './src/screens/Stream';
import Viewer from './src/screens/Viewer';
import { Permissions } from 'react-native-unimodules';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    Permissions.askAsync(Permissions.CAMERA, Permissions.AUDIO_RECORDING)
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stream" component={Stream} />
        <Stack.Screen name="Viewer" component={Viewer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;