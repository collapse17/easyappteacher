import React, {Component} from "react";
import {Animated, Dimensions, Platform, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet, ImageBackground, Image, Modal, ScrollView} from "react-native";
import {LinearGradient} from 'expo';
import {Body, Header, List, ListItem as Item, ScrollableTab, Tab, TabHeading, Tabs, Title, Left, Icon, Button, Container, Content} from "native-base";
import {create} from 'apisauce'
import * as Animatable from 'react-native-animatable';
import * as emoticons from 'react-native-emoticons';
import TeachersMenu from '../../components/TeachersMenu.js'
import UserAvatar from 'react-native-user-avatar';
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const {height: SCREEN_HEIGHT} = Dimensions.get("window");
const IMAGE_HEIGHT = SCREEN_HEIGHT/2;
const HEADER_HEIGHT = Platform.OS === "ios" ? 64 : 50;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT - Expo.Constants.statusBarHeight-5;
const THEME_COLOR = "rgba(237,63,67, 1.0)";
const FADED_THEME_COLOR = "rgba(237,63,67, 0.8)";
import HTML from 'react-native-render-html';
import Reactotron from 'reactotron-react-native'
export default class profileScreen extends Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  textColor = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, "white"],
    extrapolate: "clamp"
  });
  tabBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: ["white", THEME_COLOR],
    extrapolate: "clamp"
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  });
  headerBg = this.scroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: ["transparent", "transparent", THEME_COLOR],
    extrapolate: "clamp"
  });
  imgScale = this.nScroll.interpolate({
    inputRange: [-25, 0],
    outputRange: [1.1, 1],
    extrapolateRight: "clamp"
  });
  imgOpacity = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT],
    outputRange: [1, 0],
  });
  tabContent = (x, i) => <View style={{height: this.state.height}}>
    <List onLayout={({nativeEvent: {layout: {height}}}) => {
      this.heights[i] = height;
      if (this.state.activeTab === i) this.setState({height})
    }}>
      {this.state.profileData.notifications.map((l, i) => (
        <Animatable.View animation="slideInLeft" style={{padding:5, marginTop:10, borderBottomWidth:1, borderColor:'gray', flex:1}} key={i}>

        <Text>{l.title}<Text style={{color:'gray'}}>{l.date}</Text></Text>
        <Text style={{color:'gray'}}>{l.text}</Text>
        </Animatable.View>
      ))}
    </List></View>;
  heights = [500, 500];
  state = {
    activeTab: 0,
    height: 500
  };
  async  componentDidMount(){
      await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Sans_Rounded':require('../../../assets/fonts/SNR65.ttf')
    });
      const api = create({
       baseURL: "http://a.e-a-s-y.ru/api/"
     })
     api.get('teacher_profile.json')
         .then((response)=>{this.setState({profileData:response.data,isLoading:false})
         Reactotron.log('TEACHER PROFILE response DONE')
         Reactotron.log(response.data)
         Reactotron.log('*****************************')
        })
    }

  constructor(props) {
    super(props);
    this.nScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}));
    this.state={isLoading:true, menuVisible:false, eventsVisible:false, studentsVisible:false, schoolVisible:false}
  }

  render() {
        if (this.state.isLoading){return(<ActivityIndicator style={{flex:1, alignSelf:'center'}} size='large' color='red'/>)}else{

    return (
      <View style={{backgroundColor:'black'}}>
      <TeachersMenu isVisible={this.state.menuVisible}/>
      <Modal onRequestClose={()=>this.setState({schoolVisible:!this.state.schoolVisible})} transparent={true} animationType='slide' visible={this.state.schoolVisible}>
      <View style={{backgroundColor:"rgba(255,255,255,0.9)", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'rgba(255,255,255,0.9)', borderLeftColor:'rgb(237,63,67)'}}>

      <Header transparent style={{backgroundColor:'rgba(255,255,255,0.9)'}}>
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
      <View style={{backgroundColor:"rgba(255,255,255,0.9)", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'rgba(255,255,255,0.9)', borderLeftColor:'rgb(237,63,67)'}}>
      <Header transparent style={{backgroundColor:'rgba(255,255,255,0.9)'}}>
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
      <View style={{backgroundColor:"rgba(255,255,255,0.9)", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'rgba(255,255,255,0.9)', borderLeftColor:'rgb(237,63,67)'}}>
      <Header transparent style={{backgroundColor:'rgba(255,255,255,0.9)'}}>
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
                <Item itemHeader first>
              <Text>Предстоящие события</Text>
            </Item>
                {
                  this.state.profileData.events.map((l, i) => (

                    <Container style={{flexDirection:'column'}} key={i}>
                    <Item >

                      <Body>
                <Text>{l.name}</Text>
                <Text note>{l.location} {l.date}</Text>
              </Body>
                    </Item>
                    </Container>



                  ))
                }


                </List>
              </Content>
            </Container>
      </ScrollView>
        </View>
      </Modal>
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


        <Animated.View style={{position: "absolute", width: "100%",  zIndex: 1}}>
          <Header  hasTabs style={{backgroundColor: "rgba(255,255,255,0.7)",marginTop:Expo.Constants.statusBarHeight}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({menuVisible:true})}>
       <Icon style={{color:THEME_COLOR, fontSize:30}} name='apps' />
       </TouchableOpacity>
          </Left>
            <Body>
            <Title>
              <Animated.Text style={{color: THEME_COLOR, fontWeight: "bold"}}>
                Профиль
              </Animated.Text>
            </Title>
            </Body>
          </Header>
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.nScroll}}}], {useNativeDriver: true})}
          style={{zIndex: 0}}>
          <Animated.View style={{
            transform: [{translateY: Animated.multiply(this.nScroll, 0.65)}, {scale: this.imgScale}],
            backgroundColor: 'transparent'
          }}>
            <Animated.View

              style={{height: IMAGE_HEIGHT, width: "100%", opacity: this.imgOpacity, backgroundColor:'transparent', alignItems:'center', justifyContent:'center', flex:1}}>
                <View style={{flexDirection:'row'}}>

                  <Animatable.View animation="slideInLeft" style={{flex:1, justifyContent:'center', paddingLeft:7}}>
                                  <Button
                                  onPress={()=>this.setState({studentsVisible:true})}
                                  iconLeft
                                  bordered
                                  full
                                  primary
                                  style={{marginTop:7, borderColor:'red'}}>
                                  <Text style={{color:THEME_COLOR,fontFamily:'Sans_Rounded'}}>Отчеты</Text>
                                </Button>
                                  <Button
                                  onPress={()=>this.setState({eventsVisible:true})}
                                  iconLeft
                                  bordered
                                  full
                                  primary
                                  style={{marginTop:7, borderColor:THEME_COLOR, padding:2}}>
                                  <Text style={{color:THEME_COLOR,fontFamily:'Sans_Rounded', fontWeight:'bold'}}>Мероприятия</Text>
                                </Button>
                  </Animatable.View>

                  <View style={{height:IMAGE_HEIGHT, width:SCREEN_WIDTH,alignItems:'center', justifyContent:'center', flex:1 }}>
                  <Animatable.Text animation="zoomInUp">{this.state.profileData.name}</Animatable.Text>

                  <UserAvatar style={{paddingTop:5}}  size="100" name={this.state.profileData.name} src={'http://a.e-a-s-y.ru'+this.state.profileData.photo}/>
                  </View>
                  <Animatable.View animation="slideInRight" style={{ flex:1, justifyContent:'center', paddingRight:7}}>
                                  <Button
                                  onPress={()=>this.setState({schoolVisible:true})}
                                  iconLeft
                                  bordered
                                  transparent
                                  full
                                  primary
                                  style={{marginTop:7, borderColor:THEME_COLOR}}>
                                    <Text style={{color:THEME_COLOR,fontFamily:'Sans_Rounded',paddingRight:5}}>Школы</Text>
                                    </Button>
                                    <Button
                                    onPress={()=>this.setState({studentsVisible:true})}
                                    iconLeft
                                    bordered
                                    transparent
                                    full
                                    primary
                                    style={{marginTop:7, borderColor:THEME_COLOR}}>
                                    <Text style={{color:THEME_COLOR,fontFamily:'Sans_Rounded',paddingRight:5}}>Студенты</Text>
                                  </Button>
                  </Animatable.View>
                </View>

            </Animated.View>
          </Animated.View>
          <Tabs style={{paddingLeft:7, paddingRight:7}}
          tabBarBackgroundColor='rgba(255,255,255,0.2)'
            prerenderingSiblingsNumber={3}
            onChangeTab={({i}) => {
              this.setState({height: this.heights[i], activeTab: i})
            }}
            renderTabBar={(props) => <Animated.View
              style={{transform: [{translateY: this.tabY}], zIndex: 1, width: "100%", backgroundColor: "white"}}>
              <ScrollableTab {...props}
                             renderTab={(name, page, active, onPress, onLayout) => (
                               <TouchableOpacity key={page}
                                                 onPress={() => onPress(page)}
                                                 onLayout={onLayout}
                                                 activeOpacity={0.4}>
                                 <Animated.View
                                   style={{
                                     flex: 1,
                                     height: 100,

                                   }}>
                                   <TabHeading scrollable
                                               style={{
                                                 backgroundColor: "transparent",
                                                 width: SCREEN_WIDTH / 2
                                               }}
                                               active={active}>
                                     <Animated.Text style={{
                                       fontWeight: active ? "bold" : "normal",
                                       color: 'rgba(237,63,67, 1)',
                                       fontSize: 14
                                     }}>
                                       {name}
                                     </Animated.Text>
                                   </TabHeading>
                                 </Animated.View>
                               </TouchableOpacity>
                             )}
                             underlineStyle={{backgroundColor: this.textColor}}/>
            </Animated.View>
            }>
            <Tab heading="Уведомления" style={{backgroundColor:'rgba(255,255,255,0.4)'}}>
              {this.tabContent(30, 0)}
            </Tab>

          </Tabs>
        </Animated.ScrollView>

      </View>
    )}
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,

    position:'absolute',
    left:0,
    right:0,
    top:0,
    bottom:0//import LinearGradient from "react-native-linear-gradient";


  },

  backgroundImage: {
      flex: 1,
      width: null,
      height: SCREEN_HEIGHT,
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
