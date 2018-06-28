import React from 'react';
import { StyleSheet,
         Text,
         View,
        Image,
      TextInput,
    } from 'react-native';
import loginScreen from './src/screens/loginScreen.js'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { createStackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
const RootStack = createStackNavigator(
  {
    login: loginScreen
  },
  {

    initialRouteName: 'login'
  },
  navigationOptions: {
    title: 'Welcome'
  }
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
