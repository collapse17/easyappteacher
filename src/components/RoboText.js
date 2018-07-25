import React from 'react';
import {Font} from 'expo'
import { StyleSheet,
        Text
    } from 'react-native';


export default class RoboText extends React.Component {
  constructor(props){
    super(props)
    this.state={isLoading:true}
  }
  async componentDidMount(){
    await Font.loadAsync({
    'SansRounded': require('../../assets/fonts/SNR65.otf'),
    'SansRoundedBold': require('../../assets/fonts/ttf/Arial-RoundedBold.ttf'),
  }).then(()=>this.setState({isLoading:false}))

  }
  render() {
    var st = this.props.sText;
    if (this.state.isLoading==true) {return(null)}
    else
return (
  <Text style={styles.text,st}>{this.props.children}</Text>
)

    }
  }



const styles = StyleSheet.create({
  text: {
    fontFamily:'SansRounded'
  },
});
