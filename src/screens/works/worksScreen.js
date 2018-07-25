import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
  Modal,
  Alert
    } from 'react-native';
import Reactotron from 'reactotron-react-native'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Divider,
  Card
} from 'react-native-elements'
import {
  create
} from 'apisauce'
import {ImagePicker} from 'expo';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Separator,
  Body,
  Header,
  Icon,
  Left,
  Right,
  Title,
  Tab,
  Tabs,
  Form,
  Button,
  Radio,
  Input,
  Item,
  Label} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import LessonComponent from './components/LessonComponent.js'
import DropdownAlert from 'react-native-dropdownalert';
import TeachersMenu from '../../components/TeachersMenu.js'
export default class worksScreen extends React.Component {
  static navigationOptions = {
    title:'Задачи',
    header: null
    }
  constructor(props){
    super(props)
    this.state = { isLoading:true, lessons:[], attendancesModalIsVisible:false, menuVisible:false}
    //this.onError = this.onError.bind(this);
  }


  onDropdownRequest(type, value)  {
     if (type=='error'){this.onError(value)}
     this.onError('error')
     console.log('WARN is goes to parent')
  }
  onClose(data) {
    // data = {type, title, message, action}
    // action means how the alert was closed.
    // returns: automatic, programmatic, tap, pan or cancel
  }
  onError = error => {
    if (error) {
      this.dropdown.alertWithType('error', 'Ошибка', error);
    }
    console.log('err')
  };
  onInfo = info => {
    if (info) {
      this.dropdown.alertWithType('info', 'Информация', info);
    }
  };

  onSuccess = info => {
    if (info) {
      this.dropdown.alertWithType('success', 'Готово!', info);
    }
  };

  _renderItem ({item, index}) {

          return (
          <LessonComponent cons={(id) => () => {console.log('and here ' + id)}} item={item}/>
        )
    }
  async componentDidMount(){
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  })
  //.then(()=>this.setState({isLoading:false}));
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api"
   })



         api.get('/lessons/tasks.json')
        // .then((response)=>console.log(response))
        //axios.get(`http://a.e-a-s-y.ru/api/lessons.json`, {withCrgb(237,63,67)entials:true})
        .then(res => {
            var data = res.data;
            console.log(data.lessons.length+' TASKS LENGHT');
            console.log("****recieveDATA****")
            console.log(res.data)
            console.log('*****END DATA*****')
            if (data.lessons.length!=0)
            {
            //less.push(data.lessons)

            //console.log(da)
			this.setState({
                lessons: data.lessons,
                teachers: data["teachers"],
                isLoading:false,
            });}else{
              this.setState({empty:true, isLoading:false})
              console.log('close')
            }

			if (data["lessons"].length === 0){
        console.log('Lessons empty')
				this.setState({
	                empty:true,
	            });
			}

        })
        .catch((error) => {
            console.log(error);
			this.setState({
				empty:true,
			});
        });






  }
  render() {
    if (this.state.isLoading==true){return(<View style={{alignItems:'center', justifyContent:'center', flex:1}}><ActivityIndicator size='large'/></View>)}
    else{
        if(this.state.empty==true){
          return(
            <Container style={{flex:1, backgroundColor:'white'}}>
            <TeachersMenu isVisible={this.state.menuVisible}/>
            <Header transparent style={{backgroundColor:'white'}}>
                <Left style={{padding:10}}>
                <TouchableOpacity onPress={()=>this.setState({menuVisible:true})}>
             <Icon name='menu' />
             </TouchableOpacity>
                </Left>
                <Body>
                  <Title style={{color:'black'}}>Задачи</Title>
                </Body>
                {/*<Right style={{padding:10}}>

                    <Icon name='help'/>

                </Right>*/}
              </Header>
            <Divider/>
            <View style={{alignItems:'center',justifyContent:'center', flex:1}}>
            <Text style={{fontWeight:'bold', fontSize:24}}>Сегодня у тебя нет уроков:)</Text>
            </View>

            <DropdownAlert translucent={true} style={{paddingTop:20}} ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />

            </Container>
          )}
        else
    return (
      <Container style={{flex:1, backgroundColor:'white'}}>
      <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Image resizeMode='cover'
            style={{
              flex: 1
            }}
            source={require('../../../assets/images/findistchi.png')}
          />
          </View>
      <TeachersMenu isVisible={this.state.menuVisible}/>
      <Header transparent style={{backgroundColor:'rgba(255,255,255,0.7)'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({menuVisible:true})}>
       <Icon name='apps' />
       </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black'}}>Задачи</Title>
          </Body>

        </Header>
      <Divider/>
      <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
      <Carousel style={{alignSelf:'center', paddingLeft:10}} layout={'default'} layoutCardOffset={18}
              ref={(c) => { this._carousel = c; }}
              data={this.state.lessons}
              renderItem={this._renderItem}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width-60}
            />
      </View>

      <DropdownAlert translucent={true} style={{paddingTop:20}} ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />

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
});
