import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Modal,
  ScrollView,
    } from 'react-native';
import {Divider} from 'react-native-elements'
import {create} from 'apisauce'
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
  Button,
  Item,
  Label,
  Input,
  Form } from 'native-base';

export default class reportScreen extends React.Component {
  static navigationOptions = {
    title:'Отчет',
    header: null
    }
  constructor(props){
    super(props)
    this.state = { isLoading:true, infoIsVisible:false, reportIsVisible:false}
  }

  compilateText(){
        var data = this.props.navigation.state.params.data.report_data;
        //console.log(data)
        var groupData = data.group_data;
        var replacementData = data.replacement_data;

        var usualLessons = [];
        for (var i = 0; i< groupData.usual.groups.length; i++){
          usualLessons.push(<Text>{groupData["usual"]["groups"][i]["name"]} - <Text style={{fontWeight:'bold'}}>{groupData["usual"]["groups"][i]["lessons_num"]}</Text></Text>)
        }

        usualLessons.push(<Text>Список - <Text style={{fontWeight:'bold'}}>{groupData["usual"]["lesson_list"]}</Text></Text>);
        usualLessons.push(<Text>Количество уроков - <Text style={{fontWeight:'bold'}}>{groupData["usual"]["lessons_num"]}</Text></Text>);

        var individualLessons = [];
        for (var i = 0; i< groupData["individual"]["groups"].length; i++){
            individualLessons.push(<Text>{groupData["individual"]["groups"][i]["name"]} - <Text style={{fontWeight:'bold'}}>{groupData["individual"]["groups"][i]["lessons_num"]}</Text></Text>);
        }
        individualLessons.push(<Text>Количество уроков - <Text style={{fontWeight:'bold'}}>{groupData["individual"]["lessons_num"]}</Text></Text>);

        var corporateLessons = [];
        for (var i = 0; i< groupData["corporate"]["groups"].length; i++){
            corporateLessons.push(<Text>{groupData["corporate"]["groups"][i]["name"]} - <Text style={{fontWeight:'bold'}}>{groupData["corporate"]["groups"][i]["lessons_num"]}</Text></Text>);
        }
        corporateLessons.push(<Text>Количество уроков - <Text style={{fontWeight:'bold'}}>{groupData["corporate"]["lessons_num"]}</Text></Text>);

        var replaced = [];
        var replacedData = replacementData["replaced"];
        for (var i=0;i<replacedData["lessons"].length;i++){
            replaced.push(<Text>{replacedData["lessons"][i]["date"]} - {replacedData["lessons"][i]["name"]} - {replacedData["lessons"][i]["original_teacher"]}</Text>) ;
        }
        replaced.push(<Text>Всего замен: <Text style={{fontWeight:'bold'}}>{replacedData["lessons"].length}</Text></Text>);

        var wasReplaced = [];
        var wasReplacedData = replacementData["was_replaced"];
        for (var i=0;i<wasReplacedData["lessons"].length;i++){
            wasReplaced.push(<Text>
                {wasReplacedData["lessons"][i]["date"]} -
                {wasReplacedData["lessons"][i]["name"]} -
                {wasReplacedData["lessons"][i]["sub_teacher"]} -
                {wasReplacedData["lessons"][i]["sickness"]}
            </Text>);
        }
        wasReplaced.push(<Text>Всего замен: <Text style={{fontWeight:'bold'}}>{wasReplacedData["lessons"].length}</Text></Text>);
        //console.log(wasReplaced)
        this.setState({reportIsVisible:true,
          usualLessons:usualLessons,
          individualLessons:individualLessons,
          corporateLessons:corporateLessons,
          replaced:replaced,
          wasReplaced:wasReplaced})
    }
    sendReport(){
            var id = this.props.navigation.state.params.data;
            console.log(id);
            console.log(this.state.sportSpanding);
            console.log(this.state.sportPlaces);
            console.log(this.state.comment);
            console.log(this.state.responsibility);

            var postData = {
                id: id,
                sport_spending_value: this.state.sportSpanding,
                sport_place: this.state.sportPlaces,
                responsibility: this.state.responsibility,
                comment: this.state.comment
            };
            const api = create({
             baseURL: "http://a.e-a-s-y.ru/api"
           })
           // api.get('/teacher_profile/update_report.json',postData)
           //     .then((response)=>{
           //       console.log(response)
           //       Alert.alert("Данные сохранены.")
           //     })

        }




  async componentDidMount(){
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  }).then(()=>this.setState({isLoading:false}));
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api"
   })
   //api.get('groups.json',{api_user:{email:this.state.login,password:this.state.password}})
      // .then((response)=>console.log(response))

  }
  render() {
    if (this.state.isLoading==true){return(<View></View>)}
    else
    return (
      <Container style={{flex:1, backgroundColor:'white'}}>
      <Header transparent style={{backgroundColor:'white'}}>
      <Left style={{padding:10}}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('profileTab')}>
      <Icon name='arrow-back' />
      </TouchableOpacity>
      </Left>
        <Body>
          <Title style={{color:'black'}}>Отчеты</Title>
        </Body>
        <Right style={{padding:10}}>

            <Icon name='help'/>

        </Right>
      </Header>

      <Modal onRequestClose={()=>this.setState({infoIsVisible:false})} visible={this.state.infoIsVisible} transparent={true}>
      <View style={{margin:20, backgroundColor:'white', borderLeftWidth:10, borderLeftColor:'red', flex:1, borderRadius:10}}>
      <Header transparent style={{backgroundColor:'white'}}>
      <Left style={{padding:10}}>
      <TouchableOpacity onPress={()=>this.setState({infoIsVisible:false})}>
      <Icon name='arrow-back' />
      </TouchableOpacity>
      </Left>
        <Body>
          <Title style={{color:'black'}}>Инструкции</Title>
        </Body>

      </Header>
      <Divider/>
<ScrollView>
<Container style={{paddingLeft:10}}>
      <Text>Дорогой учитель, нужно проверить количество отведенных тобою уроков, чтобы количество соответствовало реальности
                (так как на основе этих данных рассчитывается твоя зарплата и зарплата другого учителя).</Text>
<Text style={{paddingTop:20, paddingLeft:10}}>
              Если ты нашел расхождения:
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>

              - в обычных группах - проставь посещаемость за все дни месяца;
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              -  в индивидуальных уроках - проверь длительность этих уроков и посещения за эти уроки;
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              -  если нет информации о корпорации, в которой ты ведешь уроки, проверь, есть ли группа, в которой ты ведешь;
              </Text>
              <Text style={{paddingTop:10, paddingLeft:10}}>
              Если ты кого-то заменял, а информации об этом нет, скажи этому учителю, чтобы отметил это в своих группах;
              </Text>
              <Text style={{paddingTop:10, paddingLeft:10}}>
              Если тебя заменяли в этом месяце, нужно внести эту информацию:
              зайди в группу, в которой тебя заменяли;
                нажми на вкладку «Уроки» и выбери дату урока;
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              - зайди в группу в которой тебя заменяли;
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              -  нажми на вкладку "Уроки" и выбери дату урока;
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              -  нажми "Редактировать"
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              -  В строке "Заменяющий учитель" укажи имя того, кто тебя заменял;
              </Text>
              <Text style={{paddingTop:20, paddingLeft:25}}>
              -  Нажми галочку "По болезни" (если это было по болезни)
              </Text>
</Container>
</ScrollView>
      </View>
      </Modal>

      <Modal onRequestClose={()=>this.setState({reportIsVisible:false})} visible={this.state.reportIsVisible} transparent={true}>
      <View style={{margin:20, backgroundColor:'white', borderLeftWidth:10, borderLeftColor:'red', flex:1, borderRadius:10}}>
      <Header transparent style={{backgroundColor:'white'}}>
      <Left style={{padding:10}}>
      <TouchableOpacity onPress={()=>this.setState({reportIsVisible:false})}>
      <Icon name='arrow-back' />
      </TouchableOpacity>
      </Left>
        <Body>
          <Title style={{color:'black'}}>Отчет за месяц</Title>
        </Body>

      </Header>
      <Divider/>
      <ScrollView>
      <Container style={{paddingLeft:10, marginVertical:10}}>
              <Text></Text>
              <Text style={{fontWeight:'bold'}}>Обычные уроки:</Text>
              <Text></Text>
              {this.state.usualLessons}
              <Text></Text>
              <Text style={{fontWeight:'bold'}}>Индивидуальные уроки:</Text>
              <Text></Text>
              {this.state.individualLessons}
              <Text></Text>
              <Text style={{fontWeight:'bold'}}>Корпоративные уроки:</Text>
              <Text></Text>
              {this.state.corporateLessons}
              <Text></Text>
              <Text style={{fontWeight:'bold'}}>Замены:</Text>
              <Text></Text>
              <Text style={{fontWeight:'bold'}}>Я заменял(а):</Text>
              <Text></Text>
              {this.state.replaced}
              <Text></Text>
              <Text style={{fontWeight:'bold'}}>Меня заменяли:</Text>
              <Text></Text>
              {this.state.wasReplaced}
      </Container>
      </ScrollView>
      </View>
      </Modal>

      <Divider/>

      <Content style={{paddingHorizontal:20, marginVertical:40}}>
          <Form>
          <View style={{marginTop:20,flexDirection:'row', justifyContent:'space-between'}}>

          <Button info rounded  style={{marginLeft:20}} onPress={()=>this.setState({infoIsVisible:true})}>
          <Text style={{ fontWeight:'bold'}}>Инструкции</Text>
          </Button>
          <Button info rounded  style={{marginRight:20}} onPress={()=>this.compilateText()}>
          <Text style={{ fontWeight:'bold'}}>Отчет за месяц</Text>
          </Button>

          </View>
            <Item floatingLabel last>
              <Label>Траты на спорт</Label>
              <Input onChangeText={(text)=>this.setState({sportSpanding:text})} />
            </Item>
            <Item floatingLabel last style={{marginTop:40}}>
              <Label>Куда ходите</Label>
              <Input onChangeText={(text)=>this.setState({sportPlaces:text})}/>
            </Item>
            <Item floatingLabel last style={{marginTop:40}}>
              <Label>Комментарий</Label>
              <Input multiline={true} numberOfLines={8} onChangeText={(text)=>this.setState({comment:text})}/>
            </Item>
            <Item floatingLabel last style={{marginTop:40}}>
              <Label>Ответственность</Label>
              <Input onChangeText={(text)=>this.setState({responsibility:text})}/>
            </Item>
            <Button light rounded full style={{ marginTop:40, alignSelf:'center'}} onPress={()=>this.sendReport()} >
            <Text style={{fontSize:20, fontWeight:'bold'}}>СОХРАНИТЬ</Text>
            </Button>
          </Form>
        </Content>
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
