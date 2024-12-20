// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './context/UserContext';
import MainScreen from './screens/MainScreen';
import QRCodeScreen from './screens/QRCodeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainScreen">
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="QRCode" component={QRCodeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
