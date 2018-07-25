import React from 'react';
import { StyleSheet,
        TouchableOpacity,
         View,
        Image,
      TextInput,
    } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage,  Divider } from 'react-native-elements'
import {create} from 'apisauce'
import { Container, Content, List, ListItem, Text, Separator, Body, Header,Icon, Left, Right, Title, Tab, Tabs, Button } from 'native-base';
import TeachersMenu from '../../components/TeachersMenu.js'
export default class settingsScreen extends React.Component {
  static navigationOptions = {
    title:'Настройки',
    header: null
    }
  constructor(props){
    super(props)
    this.state = { isLoading:true, menuVisible:false}
  }
  signOut(){
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api"
   })
   api.delete('/users/sign_out.json')
       .then((response)=>console.log(response.ok))
       .then(()=>this.props.navigation.navigate('login'))
  }
  async componentDidMount(){
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  }).then(()=>this.setState({isLoading:false}));
    //const api = create({
    //  baseURL: "http://a.e-a-s-y.ru/api"
  //  })
  //  api.get('groups.json',{api_user:{email:this.state.login,password:this.state.password}})
  //      .then((response)=>console.log(response))
  }
  render() {
    if (this.state.isLoading==true){return(<View></View>)}
    else
    return (
      <Container>
      <TeachersMenu isVisible={this.state.menuVisible}/>
      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({menuVisible:true})}>
       <Icon name='menu' />
       </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black'}}>Настройки</Title>
          </Body>
          <Right style={{padding:10}}>

              <Icon name='help'/>

          </Right>
        </Header>
      <Divider/>
      <Container style={{flex:1, alignItems:'center', paddingTop:10}}>

        <Content>
          <Button rounded light onPress={()=>this.signOut()}>
            <Text style={{color:'black'}}>Выйти </Text>
          </Button>

        </Content>
      </Container>
      </Container>
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
