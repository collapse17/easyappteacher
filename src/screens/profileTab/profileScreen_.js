import React from 'react';
import { StyleSheet,

         View,
        Image,
      TextInput,
      ActivityIndicator,
      ScrollView,
      Modal,
      TouchableOpacity
    } from 'react-native';
    import { Constants } from 'expo';
    import ActionButton from 'react-native-action-button';
import Communications from 'react-native-communications'
import UserAvatar from 'react-native-user-avatar';
import { FormLabel, FormInput, FormValidationMessage, Button, Card, Avatar, Divider,} from 'react-native-elements'
import {create} from 'apisauce'
import { Container, Content, List, ListItem, Text, Separator, Body, Header,Icon, Left, Right, Title, Tab, Tabs } from 'native-base';
export default class profileScreen extends React.Component {

    static navigationOptions = {
      title:'Уроки',
      header: null
      }
  constructor(props){
    super(props)
    this.state = { isLoading:true, profileData:{},studentsVisible:false, schoolVisible:false, eventsVisible:false}
  }
  renderViewMore(onPress){
      return(
        <Text onPress={onPress} style={{color:'rgb(237,63,67)'}}>View more</Text>
      )
    }
    renderViewLess(onPress){
      return(
        <Text onPress={onPress} style={{color:'rgb(237,63,67)'}}>View less</Text>
      )
    }
async  componentDidMount(){
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  });
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api/"
   })
   api.get('teacher_profile.json')
       .then((response)=>{this.setState({profileData:response.data,isLoading:false})
       console.log('TEACHER PROFILE response DONE')
       console.log(response.data)
       console.log('*****************************')
      })
  }
  render() {
    if (this.state.isLoading){return(<ActivityIndicator style={{flex:1, alignSelf:'center'}} size='large'/>)}else{
    return (
      <Container >
      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
       <Icon name='menu' />
       </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black'}}>Профиль</Title>
          </Body>
          <Right style={{padding:10}}>

              <Icon name='help'/>

          </Right>
        </Header>
        <Divider/>
      <View style={{flex:1, backgroundColor:'white', paddingTop:5}}>

      <Modal onRequestClose={()=>this.setState({schoolVisible:!this.state.schoolVisible})} transparent={true} animationType='slide' visible={this.state.schoolVisible}>
      <View style={{backgroundColor:"white", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>

      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({schoolVisible:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black', fontWeight:'bold'}}>Школы</Title>
          </Body>
        </Header>
        <ScrollView>
        <View>
  {
    this.state.profileData.schools.map((l, i) => (
      <View style={{padding:5, flexDirection:'row'}} key={i}>
      <UserAvatar  size="40" name={'School'}/>
      <View style={{paddingLeft:20, flex:1}}>
      <Text>{l.name}</Text>
      <Text style={{color:'gray'}}>{l.location}</Text>
      </View>
      <TouchableOpacity onPress={()=>Communications.phonecall(l.phone, true)}>
      <Icon
  name='call' />
  </TouchableOpacity>
      </View>
    ))
  }
      </View>
      </ScrollView>
        </View>
      </Modal>







      <Modal onRequestClose={()=>this.setState({studentsVisible:!this.state.studentsVisible})} transparent={true} animationType='slide' visible={this.state.studentsVisible}>
      <View style={{backgroundColor:"white", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>
      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({studentsVisible:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black'}}>Студенты</Title>
          </Body>
        </Header>

        <ScrollView>
        <View>
  {
    this.state.profileData.students.map((l, i) => (
      <View style={{padding:5, flexDirection:'row'}} key={i}>
      <UserAvatar  size="40" name={'Student'} src={'http://a.e-a-s-y.ru'+l.photo}/>
      <View style={{paddingLeft:20, flex:1}}>
      <Text>{l.student_name}</Text>
      <Text style={{color:'gray'}}>{l.group_name}</Text>
      </View>
      <TouchableOpacity onPress={()=>Communications.phonecall(l.phone, true)}>
      <Icon
  name='call' />
  </TouchableOpacity>
      </View>
    ))
  }
      </View>
      </ScrollView>
        </View>
      </Modal>

      <Modal onRequestClose={()=>this.setState({eventsVisible:!this.state.eventsVisible})} transparent={true} animationType='slide' visible={this.state.eventsVisible}>
      <View style={{backgroundColor:"white", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>
      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({eventsVisible:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black', fontWeight:'bold'}}>События</Title>
          </Body>
        </Header>
      <ScrollView>
      <Container>

              <Content>
                <List>
                <ListItem itemHeader first>
              <Text>Предстоящие события</Text>
            </ListItem>
                {
                  this.state.profileData.events.map((l, i) => (

                    <Container style={{flexDirection:'column'}} key={i}>
                    <ListItem >

                      <Body>
                <Text>{l.name}</Text>
                <Text note>{l.location} {l.date}</Text>
              </Body>
                    </ListItem>
                    </Container>



                  ))
                }


                </List>
              </Content>
            </Container>
      </ScrollView>
        </View>
      </Modal>

      <Container>

      <Container style={{alignItems:'center',   padding:20, flexDirection:'row'}}>
          <Container style={{backgroundColor:'rgb(237,63,67)', padding:30, borderRadius:10, alignItems:'center'}}>

            <Text style={{paddingBottom:10, fontSize:18, fontWeight:'bold'}}>{this.state.profileData.name}</Text>
            <UserAvatar size="100" name={this.state.profileData.name} src={'http://a.e-a-s-y.ru'+this.state.profileData.photo}/>

          </Container>
        <Container style={{paddingLeft:30, alignItems:'flex-start'}}>

        <TouchableOpacity onPress={()=>this.setState({studentsVisible:true})}><Text style={{fontSize:20, paddingBottom:10}}>Мои студенты</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({schoolVisible:true})}><Text style={{fontSize:20, paddingBottom:10}}>Список школ</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.setState({eventsVisible:true})}><Text style={{fontSize:20, paddingBottom:10}}>Мероприятия</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('reportTab',{data:this.state.profileData})}><Text style={{fontSize:20, paddingBottom:10}}>Отчеты</Text></TouchableOpacity>

        </Container>
      </Container>
    
    </Container>
      <Content>



        <List>
        {
          this.state.profileData.notifications.map((l, i) => (
            <ListItem key={l.id} style={{flex:1}}>
              <Body>
        <Text>{l.title}</Text>
        <Text note>{l.text} </Text>
      </Body>
      <Right>
      <Text>{l.date}</Text>
</Right>
            </ListItem>

          ))
        }

        </List>
        </Content>



      </View>
      </Container>
    )}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerShadowStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  }
});
