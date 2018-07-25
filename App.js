import React          from 'react';
import './ReactotronConfig'
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert
    }                 from 'react-native';
import worksScreen    from './src/screens/works/worksScreen.js'
import loginScreen    from './src/screens/loginScreen.js'
import profileScreen  from './src/screens/profileTab/profileScreen.js'
import reportScreen   from './src/screens/profileTab/reportScreen.js'
import lessonsScreen  from './src/screens/lessons/lessonsScreen.js'
import newsScreen     from './src/screens/news/newsScreen.js'
import helperScreen   from './src/screens/helper/helperScreen.js'
import settingsScreen from './src/screens/settings/settingsScreen.js'
import { Constants }  from 'expo';
import Communications from 'react-native-communications'

import {
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
  Divider,
  Tile,
  Card}           from 'react-native-elements'
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  SafeAreaView,
  DrawerItems,
  NavigationActions}       from 'react-navigation';

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
    Footer,
    FooterTab}            from 'native-base';
import {create} from 'apisauce'
import {TeachersMenu} from './src/components/TeachersMenu.js'
const {width: SCREEN_WIDTH} = Dimensions.get("window");
const {height: SCREEN_HEIGHT} = Dimensions.get("window");
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasInternetConnection:false}
  }
  componentDidMount(){
    const api = create({
     baseURL: "http://d.e-a-s-y.ru/api"
   })
   api.get('/helper.json')
   .then((data)=>{
     if(data.problem=='NETWORK_ERROR'){Alert.alert("Упс. По всей видимости отсутствует подключение к интернету")}
     else{
       this.setState({hasInternetConnection:true})
     }
    // console.log(data.problem)

   })
  }
  render() {
    if (this.state.hasInternetConnection==false)
    {
      return(
        <View>
        <Image source={require('./assets/images/splash.png')} style={styles.splashImage}/>
        <ActivityIndicator style={styles.loadingOverlayIndicator} size='large' color='red'/>
        </View>
      )
    }
    else{
    return (
      <RootStack />
    )}
  }
}


const profileTabNavigator = createMaterialTopTabNavigator(
  {
    profileTab: {screen:profileScreen, navigationOptions: { tabBarVisible:false }},
    reportTab:  {screen:reportScreen,  navigationOptions: { tabBarVisible:false }}
  },
  {
    initialRouteName: 'profileTab',
    headerMode: 'none',
    swipeEnabled:false,
    animationEnabled:true,
    tabBarOptions: {
  tabStyle: {
    backgroundColor:'rgba(237,63,67,0.9)'
  }, style:{
    backgroundColor:'rgba(237,30,30,0.4)'
  }}
  }
)
const teacherAppDrawerNavigator = createDrawerNavigator(
  {

    profile : { screen:profileTabNavigator, navigationOptions:({navigation})=>({title:'Профиль',  drawerIcon: ({ tintColor }) => (<Image source={require('./assets/images/profile.png')}  style={{width:24,height:24}} />) })},
    works   : { screen:worksScreen,         navigationOptions:({navigation})=>({title:'Задачи',   drawerIcon: ({ tintColor }) => (<Image source={require('./assets/images/profile.png')}  style={{width:24,height:24}} />) })},
    lessons : { screen:lessonsScreen,       navigationOptions:({navigation})=>({title:'Уроки',    drawerIcon: ({ tintColor }) => (<Image source={require('./assets/images/lessons.png')}  style={{width:24,height:24}} />) })},
    news    : { screen:newsScreen,          navigationOptions:({navigation})=>({title:'Новости',  drawerIcon: ({ tintColor }) => (<Image source={require('./assets/images/news.png')}     style={{width:24,height:24}}/>) })},
    helper  : { screen:helperScreen,        navigationOptions:({navigation})=>({title:'Хелпер',   drawerIcon: ({ tintColor }) => (<Image source={require('./assets/images/helper.png')}   style={{width:24,height:24}}/>) })},
    settings: { screen:settingsScreen,      navigationOptions:({navigation})=>({title:'Настройки',drawerIcon: ({ tintColor }) => (<Image source={require('./assets/images/settings.png')} style={{width:24,height:24}}/>) })},
  },
  {

    drawerBackgroundColor: "rgba(255,255,255,0.4)"

  }
)
const RootStack = createStackNavigator(
  {
    login: loginScreen,
    profile : { screen:teacherAppDrawerNavigator,navigationOptions:({navigation})=>({header:null  })},
  },
  {
    header:null,
    initialRouteName: 'login'
  },
);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerContainer:{
    flex: 1,
  },
  statusBar: {
    backgroundColor: "#C2185B",
    height: Constants.statusBarHeight,
  },
  splashImage: {
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
},
loadingOverlayIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: Dimensions.get('window').height/1.1,
    bottom: 0,

    //alignItems: 'center',
    //justifyContent: 'center'
  }
});
