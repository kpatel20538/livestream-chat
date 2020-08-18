import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import Stream from './src/screens/Stream';
import Viewer from './src/screens/Viewer';

const Stack = createStackNavigator();

function App() {
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