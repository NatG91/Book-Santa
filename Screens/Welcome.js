import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Image, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import SantaAnimation from '../Components/SantaClaus'
import db from '../config'
import firebase from 'firebase/app'
import config from '../config';


export default class Welcome extends Component {
  constructor(){
    super()
    this.state={
      emailId:'',
      Password: '',
      isModalVisible: false,
      firstName: '',
      lastName:'',
      phoneNumber:'',
      address:'',
      emailId:'',
      Password:'',
      confirmPassword:''
    }
      }
      showModal=()=>{
      return(
        <Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView style={{width:'100%'}}>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>
                Registration
              </Text>
              <TextInput style={styles.formTextInput} 
              placeholder={"First Name"}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              />
               <TextInput style={styles.formTextInput} 
              placeholder={"Last Name"}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
              />
              <TextInput style={styles.formTextInput} 
              placeholder={"Phone Number"}
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  phoneNumber: text
                })
              }}
              />
              <TextInput style={styles.formTextInput} 
              placeholder={"Adress"}
              multiline={true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
              />
              <TextInput style={styles.formTextInput} 
              placeholder={"Email Address"}
              keyboardType={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
              />
              <TextInput style={styles.formTextInput} 
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  Password: text
                })
              }}
              />
                <TextInput style={styles.formTextInput} placeholder="Confirm Password" secureTextEntry={true}onChangeText={(text)=>
                {this.setState({
                  confirmPassword:text
                }) }}
         /> 
         <View styles={styles.backButton}>
           <TouchableOpacity style={styles.registerButton} onPress={()=>this.signup(this.state.emailId,this.state.Password, this.state.confirmPassword)}>
          <Text style={styles.registerButtonText}>
          Register
          </Text>
           </TouchableOpacity>
         </View>
         <View styles={styles.backButton}>
           <TouchableOpacity style={styles.cancelButton} onPress={()=>this.setState({"isModalVisible":false})}>
          <Text styles={styles.cancelButton}>
          Cancel
          </Text>
           </TouchableOpacity>
         </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        </Modal>
      )
      }
      signup=(emailId,Password,confirmPassword)=>{
        if(Password!==confirmPassword){
      return Alert.alert("Please make sure that your passwords match.")
        } else{
    firebase.auth().createUserWithEmailAndPassword(emailId,Password)
    .then((response)=>{
return Alert.alert("Thanks for Signing Up.")
    })
    .catch(function(error){
      var errorCode=error.code
      var errormessage=error.message
      return Alert.alert(errormessage)
    })
    db.collection("users").add({
  firstName: this.state.firstName,
  lastName: this.state.lastName,
  address: this.state.address,
  emailId: this.state.emailId,
  contact: this.state.phoneNumber
   })
  }
      }
      login=(emailId,Password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,Password)
        .then((response)=>{
          this.props.navigation.navigate('DonateBooks')
        })
        .catch(function(error){
          var errorCode=error.code
          var errormessage=error.message
          return Alert.alert(errormessage)
        })
          }

      
    render(){
    return (
      <View style={styles.container}>
        <View style={{justifyContent:"center", alignItems:"center"}}>
          {
            this.showModal()
          }
        </View>
        <View>
          <Text style={styles.title}>
            Book Santa
          </Text>
        </View>
        <View>
        <TextInput style={styles.loginBox} placeholder="abc@example.com" keyboardType="email.address" 
               onChangeText={(text)=>
                {this.setState({
                  emailId:text
                })
               }
              }
        />
        <TextInput 
          style={styles.loginBox} 
          placeholder="Password" 
          secureTextEntry={true}
          onChangeText={(text)=>{
            this.setState({
                  Password:text
            }) 
          }}
         /> 
       
         <TouchableOpacity 
          style ={styles.LoginButton} 
          onPress={()=>{this.login(this.state.emailId, this.state.Password)}}>
          <Text>Login</Text>
         </TouchableOpacity>   
         <TouchableOpacity style ={styles.LoginButton} onPress={()=>this.setState({isModalVisible:true})}>
                <Text>Sign Up</Text>
         </TouchableOpacity>
         </View>   
     </View>
      
   )}
  }

const styles = StyleSheet.create({

  container:{
    backgroundColor: 'purple',
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBox:{
      fontSize:20,
      height: 20,
      width: 300,
      marginTop: 10,
      marginLeft: 20,
      alignItems: "center",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      alignSelf: "center",
      textAlign: "center",
      borderBottomWidth: 1.5,
      borderColor:"red"
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
 
  title:{
    color: 'lightblue',
    fontSize: 50,
    marginLeft: 45,
    paddingBottom: 30
  },
  backButton:{
    backgroundColor: '#FFDE59',
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
  },
  formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
  },
  modalTitle:{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  KeyboardAvoidingView:{
   flex:1,
   justifyContent: "center",
   alignItems: "center"
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
   },

    })
  
