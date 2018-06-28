import React from 'react';
import { StyleSheet,
         Text,
         View,
        Image,
      TextInput,
    } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

export default class loginScreen extends React.Component {
  static navigationOptions = {
    header: null
    }
  };
  constructor(props) {
    super(props);
    this.state = { login: 'Логин',
                   password:'Пароль'};
  }
  render() {
    return (
      <View style={{flex:1, padding:10}}>
      <View style={{flex:1, padding:20}}>
        <Image source = {require('../../assets/images/logo.png')} />
        <Text style={{fontSize:22, fontWeight:'bold'}}>Входи!</Text>
        <Text style={{fontSize:22, fontWeight:'bold'}}>Мы тебя заждались!</Text>
        <Text>Войди с помощью своего логина</Text>
      </View>
      <View style={{flex:1, alignItems:'flex-end'}}>

      <FormInput containerStyle={{borderColor: 'gray',  width:200, paddingBottom:20}}
      onChangeText={(text) => this.setState({text})}
        placeholder='Логин'
      />

      <FormInput containerStyle={{borderColor: 'gray',  width:200, paddingBottom:20}}
      onChangeText={(text) => this.setState({text})}
        placeholder='Пароль'
      />
      <Button
      title="Войти"

  loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
  titleStyle={{ fontWeight: "700" }}
  buttonStyle={{
    backgroundColor: "rgba(240, 0,0, 1)",
    width: 200,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }}
  containerStyle={{ marginTop: 30, marginBottom:30}}/>

      </View>
      <View style={{alignItems:'center', justifyContent:'center'}}>
      <Text>Забыл пароль?</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
