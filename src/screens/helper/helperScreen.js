import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
    } from 'react-native';
import DatePicker from 'react-native-datepicker'
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
  Picker,
  Label,
  Item,
  Button } from 'native-base';
import DropdownAlert from 'react-native-dropdownalert';
import TeachersMenu from '../../components/TeachersMenu.js'
export default class helperScreen extends React.Component {
  static navigationOptions = {
    title:'Отчеты',
    header: null
    }
  constructor(props){
    super(props)
    this.state = {
      isLoading:true,
      date:"2018.05.15",
      schoolSelected: undefined,
      teacherSelected:undefined,
      isVisibleModalResults:false,
      loadingResult:false,
      results:[],
      lessonId:null,
      questions:[],
      testsIsVisible:false,
      currentQuestion: 0,
  			text: "",
  			activeTrue:false,
  			activeFalse:false,
  			answers:[],
  			currentAnswer:""}
  }
  async componentDidMount(){
    //this.loadingData();
    await Expo.Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  }).then(()=>this.loadingData());
    //const api = create({
    //  baseURL: "http://a.e-a-s-y.ru/api"
  //  })
  //  api.get('groups.json',{api_user:{email:this.state.login,password:this.state.password}})
  //      .then((response)=>console.log(response))
  }
  onValueChange(value: string) {
    this.setState({
      schoolSelected: value
    });
  }
  onTeacherChange(value: string) {
    this.setState({
      teacherSelected: value
    });
  }
  loadingData(){
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api"
   })
  //  api.get('groups.json',{api_user:{email:this.state.login,password:this.state.password}})
  //      .then((response)=>console.log(response))

        api.get(`/helper.json`)
        .then(res => {
            var data = res.data;
            console.log(data);

            this.setState({
                schools: data["schools"],
                teachers: data["teachers"],
                isLoading:false,
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    searchLesson(){
      this.setState({loadingResult:true})
		console.log(this.state.date);
		console.log(this.state.teacherSelected);
		console.log(this.state.schoolSelected);
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api"
   })
		api.post(`/helper/find_lesson.json`,
			{
				date: this.state.date,
				teacher_id:this.state.teacherSelected,
				school_id:this.state.schoolSelected
			}
		)
        .then(res => {
            var data = res.data;
            console.log(data);
          this.setState({loadingResult:false})
			if (data.length !== 0){
	            this.setState({
	                results: data,
                  isVisibleModalResults:true,

	            });


			} else {
				//alert("Уроков по заданым критериям не найдено.")
        this.onInfo('Уроков по заданным критериям не найдено');

			}
        })
        .catch((error) => {
          this.onError('Ошибка связи с сервером')
            console.log(error);
        });
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
  };
  onInfo = info => {
    if (info) {
      this.dropdown.alertWithType('info', 'Информация', info);
    }
  }
  selectLesson(id){
		console.log("lesson");
		console.log(id);
		//this.props.enableHoverMenu();
    const api = create({
     baseURL: "http://a.e-a-s-y.ru/api"
    })
		api.post(`/helper/select_lesson.json`,
			{
				lesson_id: id,
			}

		)
        .then(res => {
            var data = res.data;
            console.log(data);

			if (data["questions"].length !== 0){
				this.setState({
					lessonId:id,
					questions: data["questions"],
          testsIsVisible:true,
          isVisibleModalResults:false,
				});
				//this.setPage("test");
			} else {
				alert("Ошибка")
			}
        })
        .catch((error) => {
            console.log(error);
        });


	}
///ANSWERS questions

currentAnswer(answer){
		this.setState({
			currentAnswer: answer,
		});
		// индикация
		if (answer===true){
			this.setState({
				activeTrue:true,
				activeFalse:false,
			});
		} else if (answer===false) {
			this.setState({
				activeFalse:true,
				activeTrue:false,
			});
		}
	}

	nextQuestion(){
		var i = this.state.currentQuestion;
		console.log("i = " + i + " - lng = "+ this.props.questions.length);

		this.saveAnswer(this.state.currentAnswer);

		if ((i-2) !== this.props.questions.length) {
			i++;

			this.setState({
				currentQuestion: i,
				activeFalse:false,
				activeTrue:false,
			});
		}
		this.setState({
			currentAnswer: "",
		});

	}
  saveAnswer(answer){

		//dbg
		console.log(this.props.questions[this.state.currentQuestion]["id"]);
		console.log(answer);

		// save answer in array in states
		var answers = this.state.answers;
		if (answer===""){
			answer=3;
		}
		answers.push({"id":this.props.questions[this.state.currentQuestion]["id"] , "answer":answer});
		this.setState({
			answers:answers,
		});
		console.log(this.state.answers);

		// if end
		if (this.state.currentQuestion === (this.props.questions.length-1)) {
			this.sendResults()
			this.setState({
				currentQuestion : 0,
			});
		}

	}

  render() {
    const window = Dimensions.get('window');
    if (this.state.isLoading==true){return(<View></View>)}
    else
    return (
      <Container style={{flex:1, backgroundColor:'white'}}>
      <TeachersMenu isVisible={this.state.menuVisible}/>
      <Modal visible={this.state.testsIsVisible} transparent onRequestClose={()=>this.setState({testsIsVisible:false})}>
      <View style={{alignItems:'center', justifyContent:'center'}}>
        <Card>




        </Card>
        </View>
      </Modal>
      <Modal visible={this.state.isVisibleModalResults} transparent onRequestClose={()=>this.setState({isVisibleModalResults:false})}>
      <View style={{backgroundColor:"white", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>
      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({isVisibleModalResults:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black', fontWeight:'bold'}}></Title>
          </Body>
        </Header>
        <Divider/>
        <Container>
          <Content>
            <List>
        {this.state.results.map((result, index) => (
          <ListItem key={index} onPress={()=>this.selectLesson(result.id)}>
              <Body>

                <Text note>{result.classroom_name}</Text>
                <Text style={{fontWeight:'bold'}}>{result.teacher_name}</Text>
                <Text>{result.start_time}-{result.end_time}</Text>
              </Body>
              <Right>
                <Text style={{fontWeight:'bold'}}>{result.level} lvl</Text>
              </Right>
            </ListItem>
        ))}
            </List>
          </Content>
      </Container>
      </View>
      </Modal>
      <Header transparent style={{backgroundColor:'white'}}>
          <Left style={{padding:10}}>
          <TouchableOpacity onPress={()=>this.setState({menuVisible:true})}>
       <Icon name='menu' />
       </TouchableOpacity>
          </Left>
          <Body>
            <Title style={{color:'black'}}>Хелпер</Title>
          </Body>
          <Right style={{padding:10}}>

              <Icon name='help'/>

          </Right>
        </Header>
        <Divider/>
      <Text style={{ fontSize:24, fontWeight:'bold', paddingLeft:20, paddingTop:40}}>Давай найдем урок</Text>
      <Content style={{paddingRight:30, paddingLeft:30}}>
      <View style={{flex:1,  paddingTop:50}}>
      <Form>
      <Item style={{paddingTop:20}}>
              <Label>Выбери дату</Label>
      <DatePicker
        style={{width: window.height/4}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="DD.MM.YYYY"
        minDate="01.01.2017"
        maxDate="01.01.2020"
        confirmBtnText="Подтвердить"
        cancelBtnText="Отмена"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
      </Item>
      <Item style={{paddingTop:20}}>
              <Label>Выберите школу</Label>
              <Picker
                mode="dropdown"
                placeholder="Выбери школу"
                placeholderStyle={{ color: "#2874F0" }}
                note={false}
                selectedValue={this.state.schoolSelected}
                onValueChange={this.onValueChange.bind(this)}
              >

              {this.state.schools.map((school, index) => (
        <Picker.Item key={index} label={school.name} value={school.id} />
          ))}

              </Picker>
            </Item>
            <Item style={{paddingTop:20}} >
                    <Label>Выберите учителя</Label>
                    <Picker
                      mode="dropdown"
                      placeholder="Выбери учителя"
                      placeholderStyle={{ color: "#2874F0" }}
                      note={false}
                      selectedValue={this.state.teacherSelected}
                      onValueChange={this.onTeacherChange.bind(this)}
                    >

                    {this.state.teachers.map((teacher, index) => (
              <Picker.Item key={index} label={teacher.english_name} value={teacher.id} />
                ))}

                    </Picker>
                  </Item>

                  <Button iconLeft full light style={{marginTop:40}} onPress={()=>this.searchLesson()}>
{this.state.loadingResult &&
                  <ActivityIndicator color='red'/>}
                    <Text>Найти</Text>
                  </Button>
          </Form>
      </View>
      </Content>
      <DropdownAlert translucent={true} style={{paddingTop:20}} ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />
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
