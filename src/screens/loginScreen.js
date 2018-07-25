import React from 'react';
import { StyleSheet,
         Text,
         View,
        Image,
      TextInput,
      ActivityIndicator
    } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import {create} from 'apisauce'
export default class loginScreen extends React.Component {
  static navigationOptions = {
    header: null
    }
  constructor(props){
    super(props)
    this.state = { login: '',
                   password:'',
                    isLoading:true}
  }
   _authorize(){
    const api = create({
      baseURL: "http://a.e-a-s-y.ru/api"
    })
    //api.delete('users/sign_out.json').then((resp)=>console.log(resp))
  api.post('/users/sign_in.json',{api_user:{email:this.state.login,password:this.state.password}})
        .then((response)=>{
          console.log(response.ok)
          console.log(response.data)
          if (response.ok==false){
            this.refs.loginToast.show('Invalid password or username')
          }else{
            this.refs.loginToast.show('Welcome')
            this.props.navigation.navigate('profile')
          }

        })


  }
  _getGroups(){const api = create({
    baseURL: "http://a.e-a-s-y.ru/api"
  })

    api.get('/groups/current.json')
        .then((response)=>console.log(response))

  }

  _authPing(){const api = create({
    baseURL: "http://a.e-a-s-y.ru/api"
  })

    api.get('/helper.json')
        .then((response)=>{
          //console.log(response.status)
          console.log('PING SUCCESFULL GO TO PROFILE PAGE')
          if (response.status=='200'){ this.props.navigation.navigate('profile')}
          else {
            {this.setState({isLoading:false})}
            console.log('PING UNSUCCESFULL, GO TO LOGIN PAGE')
          }
        })

  }
  componentDidMount(){
    this._authPing();
  }
  render() {
    if (this.state.isLoading){return (<View style={{alignItems:'center', justifyContent:'center', flex:1}}><ActivityIndicator size='large' color='red'/></View>)}
    return (
      <View style={{flex:1, padding:10}}>
      <View style={{flex:1, padding:20}}>
      <Toast ref='loginToast'/>

        <Image source = {require('../../assets/images/logo.png')} />
        <Text style={{fontSize:22, fontWeight:'bold'}}>Входи!</Text>
        <Text style={{fontSize:22, fontWeight:'bold'}}>Мы тебя заждались!</Text>
        <Text>Войди с помощью своего логина</Text>
      </View>
      <View style={{flex:1, alignItems:'flex-end'}}>

      <FormInput  containerStyle={{borderColor: 'gray',  width:200, paddingBottom:20}}
      onChangeText={(text) => this.setState({login:text})}
        placeholder='Логин'
      />

      <FormInput secureTextEntry={true} containerStyle={{borderColor: 'gray',  width:200, paddingBottom:20}}
      onChangeText={(text) => this.setState({password:text})}
        placeholder='Пароль'
      />
      <Button
      onPress={() => this._authorize()}
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
