import React from 'react';
import {
  TouchableOpacity,
  View,
  Modal,
  Alert
    } from 'react-native';
import Reactotron from 'reactotron-react-native'
import {
  Divider,
  Card
} from 'react-native-elements'
import {
  create
} from 'apisauce'
  import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import {ImagePicker} from 'expo';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
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
  import DropdownAlert from 'react-native-dropdownalert';
export default class LessonComponent extends React.Component {
  constructor(props){
    super(props);
        var students = this.props.item.attendances;
        for (var i=0;i<students.length;i++) {
            students[i]["state"] = true
        }

        this.state = {
            students:students,
            attendancesModalIsVisible:false,
            addHomeworkModalIsVisible:false,
            addNewsModalIsVisible:false,
            modalData:this.props.item,
            pickedImageURI:null,
            pickedImageName:'Файл не выбран',
            homework:true,
            attendances:true,
        };

        this.setStudentStatus = this.setStudentStatus.bind(this);
        this.sendUsersState = this.sendUsersState.bind(this);
  }
  async _pickDocument()
  {
  	    let result = await Expo.ImagePicker.launchImageLibraryAsync();
  		  //alert(result.uri);
        console.log(result);
        if (result.type=='success')
        {
        this.setState({pickedImageURI:result.uri, pickedImageName:result.name, pickedResult:result})
      }
  }
  onSuccess = info => {
    if (info) {
      this.dropdown.alertWithType('success', 'Готово!', info);
    }
  };

setStudentStatus(id){
        var students = this.state.students;
        console.log('Students state change')
        for (var i=0;i<students.length;i++) {
            if (students[i]["id"] == id){
                if (students[i]["state"]==false){
                    students[i]["state"] = true;
                } else {
                    students[i]["state"] = false;
                }
            }
        }

        this.setState({
            students: students,
        });
    }
    sendNews(){
      let data = new FormData();
        data.append("post[lesson_id]", this.props.item[0].id);
        data.append("post[title]", this.state.textNewsHeader);
        data.append("post[body]", this.state.textNewsBody);
        data.append("post[photo]", this.state.pickedResult)
      Reactotron.log(data)

      const api = create({
       baseURL: "http://a.e-a-s-y.ru/api"
     })
     api.post('/posts/add_group_news',data)
        .then(res => {
            var data = res.data;
            Reactotron.log(data);
            //alert("Новость добавлена");
            this.onSuccess('Новость добавлена')
            this.props.close();
        })
        .catch(function (error) {
            Reactotron.log(error);
        });


    }
    onClick () {
    this.props.cons(2);
}
    sendUsersState(){
        var students = this.state.students;
        var data = [];

        for (var i=0; i<students.length; i++) {
            var item = { id: students[i]["id"],
                        state: students[i]["state"]
            };
            data.push(item);
        }
        const api = create({
         baseURL: "http://a.e-a-s-y.ru/api"
       })
             api.patch('/lessons/'+this.props.item.id+'/update_attendances',this.state.students)
        .then(res => {
            var data = res.data;
            console.log(this.props.item.id);
            console.log(res.ok+res.status);
            this.onSuccess('Хорошеечно')
            //if (res.status==500){this.props.onDropdownRequest('error', 'Шоибка сервера, пожалуйста, попробуйте выполнить запрос позже')}
            //Alert.alert("Данные сохранены.");
            //this.onSuccess('Данные сохранены')
            //this.props.onDropdownRequest('error')

            //this.error();
            //this.props.onDropdownRequest('error', 'Шоибка сервера, пожалуйста, попробуйте выполнить запрос позже'
        })
    }
error(){
  console.log(this.props)
  this.props.onDropdownRequest('error')

}
async componentDidMount(){
  await Expo.Font.loadAsync({
  'Sans_Rounded':require('../../../../assets/fonts/SNR65.ttf')
});
Reactotron.log(this.props.item.tasks)
// this.setState({h:this.props.item.tasks.map(function(task){
//   // if (tasks.homework==false){
//   //   this.setState({homework:false})
//   // }
//   if (task.homework!=undefined)
//     this.setState({homework : task.homework})
//   if (task.attendance!=undefined){}
//   //return task.attendance
// })})
var i = 0
var tasks = this.props.item.tasks
while (i < this.props.item.tasks.length){
  Reactotron.log('*')
  if (tasks[i].homework!=undefined){
    this.setState({homework:tasks[i].homework})
  }
   if (tasks[i].attendance!=undefined){
   this.setState({attendances:tasks[i].attendance})
 }
  i++
}
Reactotron.log(this.state)

}

 render() {
  var item = this.state.students
   return(
     <Container style={{flex:1}}>
     <Modal animationType="slide" visible={this.state.attendancesModalIsVisible} onRequestClose={()=>this.setState({attendancesModalIsVisible:false})} transparent={true}>
     <View style={{backgroundColor:"rgba(255,255,255,0.94)", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>
     <Header transparent style={{backgroundColor:'white'}}>
         <Left style={{padding:10}}>
         <TouchableOpacity onPress={()=>this.setState({attendancesModalIsVisible:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
         </Left>
         <Body>
           <Title style={{color:'black', fontWeight:'bold'}}>Посещения</Title>
         </Body>
       </Header>
       <Divider/>
       <Container>
       <Text style={{paddingTop:10, paddingBottom:10, fontWeight:'bold', alignSelf:'center'}}>{this.state.modalData.group_name}</Text>
       <AwesomeButtonCartman backgroundColor='rgb(237,63,67)' textColor='white' backgroundShadow='rgba(0,0,0,0.1)' backgroundDarker='rgba(0,0,0,0.1)' type='secondary' style={{marginBottom:20, marginTop:20, alignSelf:'center'}} width={300} onPress={()=>this.sendUsersState()}>Сохранить</AwesomeButtonCartman>
       <Divider/>


               <Content>
                 <List>
                 <Container style={{flexDirection:'column'}} >

                 {
                   this.state.students.map((l, i) => (
                     <ListItem key={l.id} >

                       <Body>
                 <Text>{l.student_name}</Text>
                 <Text note>{l.email} </Text>
               </Body>
               <Right>
        <Radio selected={l.state} onPress={() => this.setStudentStatus(l.id)}/>
      </Right>
                     </ListItem>
                 )) }
                 </Container>

                 </List>
               </Content>
             </Container>


     </View>
     </Modal>
     <Modal visible={this.state.addHomeworkModalIsVisible} onRequestClose={()=>this.setState({addHomeworkModalIsVisible:false})} transparent={true}>
     <View style={{backgroundColor:"white", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>
     <Header transparent style={{backgroundColor:'white'}}>
         <Left style={{padding:10}}>
         <TouchableOpacity onPress={()=>this.setState({addHomeworkModalIsVisible:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
         </Left>
         <Body>
           <Title style={{color:'black', fontWeight:'bold'}}>Добавить домашку</Title>
         </Body>
       </Header>
       <Divider/>

        </View>
     </Modal>
     <Modal visible={this.state.addNewsModalIsVisible} onRequestClose={()=>this.setState({addNewsModalIsVisible:false})} transparent={true} >
     <View style={{backgroundColor:"white", flex:1, margin:20,borderRadius:20, borderLeftWidth:15,borderRightWidth:15, borderRightColor:'white', borderLeftColor:'rgb(237,63,67)'}}>
     <Header transparent style={{backgroundColor:'white'}}>
         <Left style={{padding:10}}>
         <TouchableOpacity onPress={()=>this.setState({addNewsModalIsVisible:false})}><Icon name='arrow-back' size={30} color='white'/></TouchableOpacity>
         </Left>
         <Body>
           <Title style={{color:'black', fontWeight:'bold'}}>Добавить новость</Title>
         </Body>
       </Header>
       <Divider/>
       <Container style={{padding:10}}>
          <Content>
          <Form>
          <Item floatingLabel last>
            <Label>Заголовок</Label>
            <Input onChangeText={(text)=>this.setState({textNewsHeader:text})} />
          </Item>
          <Item floatingLabel last>
            <Label>Текст</Label>
            <Input multiline={true} numberOfLines={5} onChangeText={(text)=>this.setState({textNewsBody:text})} />
          </Item>
          </Form>
          <Label style={{paddingTop:20}}>Прикрепить файл</Label>
          <View style={{flexDirection:'row'}}>
          <Divider/>
            <Button light onPress={()=>this._pickDocument()}>
              <Text style={{paddingLeft:10}}>Выберите файл</Text>
            </Button>
            <Text>{this.state.pickedImageName}</Text>
        </View>
        <View style={{paddingTop:20}}/>
        <Button full light  style={{paddingTop:20}} onPress={()=>this.sendNews()}>
          <Text>Опубликовать</Text>
        </Button>
          </Content>
       </Container>
        </View>
     </Modal>

     <View style={{flex:1, paddingTop:30}}>
     <Content style={{flex:1 }} >
     <View  style={{backgroundColor:'rgba(255,255,255,0.7)', flex:1, alignItems:'center', justifyContent:'center', borderWidth:5, borderRadius:5, borderColor:'rgba(255,255,255,0.9)'}}>
     <Text style={{paddingTop:10, paddingBottom:10, fontWeight:'bold'}}>{this.state.modalData.group_name}</Text>
     <Divider/>
     <View style={{flex:1, paddingTop:20}}>
         <Text style={{fontWeight:'bold', fontSize:20, fontFamily:'Sans_Rounded'}}>{this.state.modalData.classroom_name}</Text>
         <Text></Text>
         <View style={{alignItems:'flex-start', backgroundColor:'rgb(237,63,67)',alignSelf:'flex-start', borderWidth:7, borderRadius:10, borderColor:'rgb(237,63,67)'}}><Text style={{color:'white', fontWeight:'bold', fontSize:20}}>{this.state.modalData.start_time} - {this.state.modalData.end_time}</Text></View>

         <Text style={{fontSize:20, alignSelf:'flex-end'}}>{ this.state.modalData.level } lvl</Text>
         <Divider style={{marginTop:20,marginBottom:20}}/>
         <View style={{alignItems:'center', paddingTop:30, paddingBottom:30}}>
         <AwesomeButtonCartman
          backgroundColor='rgb(237,63,67)'
          textColor='white'
          backgroundShadow='rgba(0,0,0,0.1)'
          backgroundDarker='rgba(0,0,0,0.1)'
          type='secondary'
          style={{marginBottom:20}}
          width={300}
          onPress={this.onClick.bind(this)}
          //onPress={()=>this.setState({attendancesModalIsVisible:true})}
          >
            <View style={{justifyContent:'space-between', flex:1, flexDirection:'row'}}>
              <Text style={{color:'white'}}>Проставить посещаемость</Text>
              {this.state.attendances && <Icon name='checkmark-circle' style={{color:'white'}}/>}
              {!this.state.attendances &&<Icon name='close-circle' style={{color:'white'}}/>}
            </View>
         </AwesomeButtonCartman>
         <AwesomeButtonCartman
          backgroundColor='rgb(237,63,67)'
          textColor='white'
          backgroundShadow='rgba(0,0,0,0.1)'
          backgroundDarker='rgba(0,0,0,0.1)'
          type='secondary'
          style={{marginBottom:20}}
          width={300}
          onPress={()=>this.setState({addHomeworkModalIsVisible:true})}>
          <View style={{justifyContent:'space-between', flex:1, flexDirection:'row'}}>
            <Text style={{color:'white'}}>Добавить домашку{this.state.homework}</Text>
            {this.state.homework && <Icon name='checkmark-circle' style={{color:'white'}}/>}
            {!this.state.homework &&<Icon name='close-circle' style={{color:'white'}}/>}

          </View>
        </AwesomeButtonCartman>

         <AwesomeButtonCartman
          backgroundColor='rgb(237,63,67)'
          textColor='white'
          backgroundShadow='rgba(0,0,0,0.1)'
          backgroundDarker='rgba(0,0,0,0.1)'
          type='secondary'
          style={{marginBottom:20}}
          width={300}
          onPress={()=>this.setState({addNewsModalIsVisible:true})}>
          <View style={{justifyContent:'space-between', flex:1, flexDirection:'row'}}>
            <Text style={{color:'white'}}>Добавить новость</Text>
            <View></View>
          </View>
          </AwesomeButtonCartman>


         </View>
         </View>
         </View>
         </Content>
     </View>
     <DropdownAlert translucent={true} style={{paddingTop:20}} ref={ref => this.dropdown = ref} onClose={data => this.onClose(data)} />

     </Container>)
 }
}
