import React from 'react';
import { StyleSheet,
        TouchableOpacity,
         View,
        Image,
      TextInput,
      ActivityIndicator,
      Dimensions

    } from 'react-native';
import Reactotron from 'reactotron-react-native'

import NewsComponent from './components/NewsComponent'
import { FormLabel, FormInput, FormValidationMessage, Button, Divider } from 'react-native-elements'
import {create} from 'apisauce'
import { Container, Content, List, ListItem, Text, Separator, Body, Header,Icon, Left, Right, Title, Tab, Tabs } from 'native-base';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import TeachersMenu from '../../components/TeachersMenu.js'
import * as Animatable from 'react-native-animatable';
export default class reportScreen extends React.Component {
  constructor(props){
    super(props)
    this.state = {isLoading:true, activeSlide:0,menuVisible:false}
  }
  static navigationOptions = {
    title:'Новости',
    header: null
    }
    get pagination () {
        const { news, activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={news.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'rgba(237,63,67, 0.2)'}}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 8,
                  backgroundColor: 'rgba(237,63,67, 0.92)'
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
                  backgroundColor: 'rgba(255, 255, 255, 0.92)'
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

  async componentDidMount(){
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  }).then(()=>this.loadingData());

  }

  loadingData(){
        const api = create({
         baseURL: "http://a.e-a-s-y.ru/api"
       })
        api.get('posts.json')
        .then(res => {
            Reactotron.log(res);
            var data = res.data;
            var result = [];
            for (var i=0; i<data.length; i++){
                result.push({title:data[i]['title'], date: this.getFormatedDate(data[i]['created_at']), text: data[i]['body'], image:data[i]['photo']});
            }
            this.setState({
                news: result,
                isLoading:false,
            });
            Reactotron.log(result)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    getFormatedDate(str){
        var year = [
            {name: "Января"}, {name: "Февраля"}, {name: "Марта"}, {name: "Апреля"},
            {name: "Мая"}, {name: "Июня"}, {name: "Июля"}, {name: "Августа"},
            {name: "Сентября"}, {name: "Октября"}, {name: "Ноября"}, {name: "Декабря"},
        ];
        var date = str.substr(0,10);
        var dateArr = date.split("-");
        if (dateArr.length===3){
            var result = dateArr[2]+" "+year[parseInt(dateArr[1], 10)-1].name;
            return result;
        } else {
            return "";
        }
    }

    _renderItem ({item, index}) {
          return (
            <NewsComponent item={item}/>
          );
      }
  render() {

    if (this.state.isLoading==true){return(<View style={{alignItems:'center', justifyContent:'center', flex:1}}><ActivityIndicator size='large'/></View>)}
    else{
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
            <Title style={{color:'black'}}>Новости</Title>
          </Body>

        </Header>
        <Divider/>
        <Animatable.View animation="fadeInRight" style={{
          flex:1,
          paddingTop:10,
          }}>

        <Carousel style={{alignSelf:'center', paddingLeft:10,color:'rgba(255,255,255,0.7)'}} layout={'stack'} layoutCardOffset={18}
                ref={(c) => { this._carousel = c; }}
                data={this.state.news}
                renderItem={this._renderItem}
                sliderWidth={Dimensions.get('window').width}
                itemWidth={Dimensions.get('window').width-60}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
              />
              <View style={{padding:5}}/>

        </Animatable.View>
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
