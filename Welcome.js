import * as React from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity} from 'react-native';
import db from '../config'
import firebase from 'firebase/app'


export default class Welcome extends Component {
  constructor(){
    super()
    this.state={
      emailId:'',
      Password: ''
    }
      }
    render(){
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Book Santa
          </Text>
        </View>
        <TextInput style={styles.loginBox} placeholder="abc@example.com" keyboardType="email.address" 
               onChangeText={(text)=>
                {this.setState({
                  emailId:text
                }) }}
        />
        <TextInput style={styles.loginBox} placeholder="Password" secureTextEntry={true}onChangeText={(text)=>
                {this.setState({
                  Password:text
                }) }}
         /> 
         <TouchableOpacity style ={styles.LoginButton} onPress={()=>{this.login(this.state.emailId, this.state.Password)}}>
                <Text>Login</Text>
         </TouchableOpacity>   
         <TouchableOpacity style ={styles.LoginButton} onPress={()=>{this.signup(this.state.emailId, this.state.Password)}}>
                <Text>Sign Up[</Text>
         </TouchableOpacity>       
     </View>
      
   )}
  }
     const styles = StyleSheet.create({
  loginBox:{
      fontSize: 20,
      height: 20,
      width: 300,
      marginTop: 10,
      marginLeft: 20,
      alignItems: "center",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      alignSelf: "center",
      textAlign: "center"
  },
  LoginButton:{
    fontSize: 90,
    backgroundColor: "lightblue",
    borderRadius: 10,
    height: 20,
    marginTop: 2,
    width: 150,
    marginLeft: 20,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignSelf: "center",
    textAlign: "center"
  },
  container:{
    backgroundColor: 'lightred',
    flex: 1,

  },
  title:{
  color: 'blue',
  fontSize: 10,
  
  }
    })
  
