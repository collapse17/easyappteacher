import React from 'react'
import {Text, View, StyleSheet, ImageBackground, Modal, TouchableOpacity, Dimensions, ScrollView} from 'react-native'
import {LinearGradient} from 'expo';
import FlipCard from "react-native-flip-card-view"
import {
  Container,
  Content,
  List,
  ListItem,
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
  import {
    Divider,
    Card
  } from 'react-native-elements'
import RoboText from '../../../components/RoboText.js'
import HTML from 'react-native-render-html';
export default class NewsComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {moreIsVisible:false}
  }
  _renderFront() {
    const item = this.props.item;
        return (
            <View style={{flex:1,height:100}}>
            <ImageBackground source={require('../../../../assets/images/news-placeholder.png')} style={styles.backgroundImage}>
  <LinearGradient colors={['transparent', '#C70505']} start={[2,0.4]} style={styles.linearGradient}>
  <View style={{alignItems:'flex-end', flex:1, flexDirection:'row'}}>
  <View style={{padding:30}}>
  <RoboText sText={{fontSize:24, color:'white', fontWeight:'bold'}}>{item.date}</RoboText>
  <RoboText sText={{fontSize:30,color:'white', fontWeight:'bold'}}>{item.title}</RoboText>

  </View>
  </View>
  </LinearGradient>
            </ImageBackground>
            </View>);
    }
  //Desired screen view method in back page
    _renderBack() {
      const item = this.props.item;
        return (
            <View style={{flex:1,height:100}}>
            <View style={{backgroundColor:"rgba(255,255,255,0.9)", flex:1,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'rgba(255,255,255,0.9)', borderLeftColor:'rgb(237,63,67)'}}>
            <Header transparent >
                <Body>
                  <Title style={{color:'black', fontWeight:'bold'}}></Title>
                </Body>
              </Header>
              <Divider/>
              <Container style={{paddingLeft:10}}>
              <ScrollView>
              <Text style={{fontSize:24,fontWeight:'bold'}}>{item.date}</Text>
              <Text style={{fontSize:30, fontWeight:'bold'}}>{item.title}</Text>
              <HTML html={item.text} />
              </ScrollView>

                    </Container>


            </View>

            </View>);
    }
  render(){
    const item = this.props.item;
    return(
      <View style={{flex:1
        }}>
<FlipCard style={{flex: 1}}
                    velocity={2} // Velocity makes it move
                    tension={1} // Slow
                    friction={2} // Oscillate a lot
                    renderFront={this._renderFront()}
                    renderBack={this._renderBack()}/>
      </View>)
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,

  },

  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      borderRadius:10,
      borderWidth:4,
      borderColor:'gray'

  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.3
  }
});
