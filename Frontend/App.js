import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Button, Image, View, Platform, LogBox } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Screens/Home'
import Upload from './Screens/Upload';
import How from './Screens/How'
import Pro from './Screens/Pro';
import Processing from './Screens/Processing';
import Report from './Screens/Report';
import Ipsaver from './Screens/Ipsaver'
import Cameraupload from './Screens/Cameraupload';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
const Stack = createStackNavigator()

function Mystack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Cameraupload" component={Cameraupload} options={{ headerShown: false }} />
      <Stack.Screen name="Upload" component={Upload} options={{ headerShown: false }} />
      <Stack.Screen name="How" component={How} options={{ headerShown: false }} />
      <Stack.Screen name="Pro" component={Pro} options={{ headerShown: false }} />
      <Stack.Screen name="Processing" component={Processing} options={{ headerShown: false }} />
      <Stack.Screen name="Report" component={Report} options={{ headerShown: false }} />
      <Stack.Screen name="Ipsaver" component={Ipsaver} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Mystack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

