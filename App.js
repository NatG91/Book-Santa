import React from 'react';
import {Text, View } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import Welcome from './Screens/Welcome'
import {AppNavigator} from './Components/Navigator'
import {AppDrawerNavigator} from './Components/AppDrawerNavigator'

export default function App() {
  return (
<AppContainer/>
  );
}
const SwitchNavigator=createSwitchNavigator({
  Welcome: {screen:Welcome},
  Drawer: {screen:AppDrawerNavigator},

})
const AppContainer=createAppContainer(SwitchNavigator)
