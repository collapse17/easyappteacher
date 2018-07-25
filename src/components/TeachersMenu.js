import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions,withNavigation} from 'react-navigation';
import {ScrollView, View, Modal, Dimensions, TouchableOpacity, StyleSheet, Image, FlatList, TouchableHighlight} from 'react-native';
import {Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title, Left, Icon, Button, Text} from "native-base";
import Communications from 'react-native-communications'
import * as Animatable from 'react-native-animatable';
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const {height: SCREEN_HEIGHT} = Dimensions.get("window");



class TeachersMenu extends Component {
  constructor(props){
    super(props)
    this.state={isVisible:false, isLoading:true}

  }
async componentDidMount(){
  await Expo.Font.loadAsync({
  'Roboto': require('native-base/Fonts/Roboto.ttf'),
  'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  'Sans_Rounded':require('../../assets/fonts/SNR65.ttf')
}).then(()=>this.setState({isLoading:false}))
}
  componentWillReceiveProps (nextProps) {
    if (!this.state.isVisible && nextProps.isVisible) {
      this.setState({ isVisible: true })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // On modal open request slide the view up and fade in the backdrop
    if (this.state.isVisible && !prevState.isVisible) {
      this._open()
    // On modal close request slide the view down and fade out the backdrop
    } else if (!this.props.isVisible && prevProps.isVisible) {
      this._close()
    }
  }
  _open(){
    this.setState({isVisible:true})
  }
  _close(){
    this.setState({isVisible:false})
  }

  Navigate(page){
    this._close();

    this.props.navigation.navigate(page)}

  render () {
if (this.state.isLoading==true){return(<View></View>)}
else
  return(
    <View style={{flex:1, alignItems:'center', justifyContent:'center', position:'absolute' }}>

    <Modal visible={this.state.isVisible} transparent onRequestClose={()=>this._close()} animationType='fade'>

    <Animatable.View animation='fadeInUpBig' style={styles.tilesContainer}>

    <Image source={require('../../assets/images/logo.png')}/>
      <View style={{flexDirection:'row', alignItems:'center'}}>

        <TouchableOpacity onPress={()=>this.Navigate('profile')}>
          <View style={styles.tileStyle}>
          <Icon style={styles.tileIcon} name='person'  />
            <Text style={styles.tileText}>Профиль</Text>

          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.Navigate('works')}>
        <View style={styles.tileStyle}>
        <Icon style={styles.tileIcon} name='menu'  />
        <Text style={styles.tileText}>Задачи</Text>

        </View>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row', alignItems:'center'}}>
      <TouchableOpacity onPress={()=>this.Navigate('lessons')}>
        <View style={styles.tileStyle}>
        <Icon style={styles.tileIcon} name='book'  />
        <Text style={styles.tileText}>Уроки</Text>

        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.Navigate('news')}>
        <View style={styles.tileStyle}>
        <Icon style={styles.tileIcon} name='paper'  />
        <Text style={styles.tileText}>Новости</Text>

        </View>
        </TouchableOpacity>
      </View>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <TouchableOpacity onPress={()=>this.Navigate('helper')}>
        <View style={styles.tileStyle}>
        <Icon style={styles.tileIcon} name='help-circle'  />
        <Text style={styles.tileText}>Хелпер</Text>

        </View>
      </TouchableOpacity>

        <View style={styles.endTileStyle}>

        <View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>this.Navigate('settings')}>
          <View style={styles.miniTileContainer}>
            <Icon name='cog'  style={styles.miniTileIcon} />
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Communications.web('http://wiki.e-a-s-y.ru')}>
          <View style={styles.miniTileContainer}>
            <Icon name='home'  style={styles.miniTileIcon} />
          </View>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row', alignItems:'stretch', flex:1}}>
        <TouchableOpacity onPress={()=>Communications.web('http://e-a-s-y.ru')}>
        <View style={styles.miniTileContainer}>
        <Image source={require('../../assets/images/blackberry.png')} style={{width:25, height:25}}/>
        </View>
        </TouchableOpacity>

        </View>
        </View>

        </View>

    </View>
    </Animatable.View>
    </Modal>
    </View>

  )
  }
}
const styles = StyleSheet.create({
  tileStyle:
  {
    backgroundColor:'rgba(255,255,255,0.7)',
    margin:10,
    borderWidth:1,
    borderColor:'rgba(237,63,67,0.9)',
    width:SCREEN_WIDTH/4,
    height:SCREEN_WIDTH/4,
    alignItems:'center',
    justifyContent:'center'
  },
  endTileStyle:{
    backgroundColor:'rgba(255,255,255,0.7)',
    margin:10,
    borderWidth:1,
    borderColor:'rgba(237,63,67,0.9)',
    width:SCREEN_WIDTH/4,
    height:SCREEN_WIDTH/4,
    padding:10,
    alignItems:'center',
    justifyContent:'center'
  },
  tileText:{
    color:'black',
    fontSize:17,
    fontWeight:'bold',
    fontFamily:'Sans_Rounded',

  },
  tileIcon:{
    color:'red',
    fontSize:45,
    textShadowColor: 'rgba(237,63,67, 0.4)',
    textShadowOffset: {width: 3, height: 4},
    textShadowRadius: 1
  },
  tilesContainer:{
    alignItems:'center',
    flex:1,
    paddingTop:30,
    backgroundColor:'rgba(255,255,255,0.9)'
  },
  miniTileContainer:{
    margin:5,
    backgroundColor:'rgba(255,255,255,0.7)',
    borderWidth:1,
    borderColor:'rgba(237,63,67,0.9)',
    width:(SCREEN_WIDTH/4)/3,
    height:(SCREEN_WIDTH/4)/3,
    justifyContent:'center'
  },
  miniTileIcon:{
    color:'red',
    textShadowColor: 'rgba(237,63,67, 0.4)',
    textShadowOffset: {width: 3, height: 4},
    textShadowRadius: 1,
    alignSelf:'center'
  }
})


export default withNavigation(TeachersMenu);
