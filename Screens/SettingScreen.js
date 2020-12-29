import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert, FlatList} from 'react-native';
import MyHeader from '../Components/Header';
import db from '../config'
import firebase from 'firebase/app'

export default class SettingScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:'',
            firstName:'',
            lastName:'',
            phoneNumber:'',
            address:'',
            docId:''
    }
    }
    getUserDetails=()=>{
        var user = firebase.auth().currentUser;
        var email = user.email;
        console.log(email)
        db.collection('users').where('emailId','==',email).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                var data=doc.data()
                this.setState({
                    emailId: data.emailId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.contact,
                    address: data.address,
                    docId: doc.id
                })
            })
        })
    }
    updateUserDetails=()=>{
      db.collection('users').doc(this.state.docId).update({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
      })
      Alert.alert("Your Profile Has Been Updated Successfully")
    }
    componentDidMount(){
        this.getUserDetails()
    }
    render(){
        return(
<View>
    <MyHeader title="Settings" navigation ={this.props.navigation}/>
    <View style={styles.formContainer}>

    <TextInput styles={styles.formTextInput} 
              placeholder={"First Name"}
              onChangeText={(text)=>{
                this.setState({
                  firstName: text
                })
              }}
              value={this.state.firstName}
              />
               <TextInput styles={styles.formTextInput} 
              placeholder={"Last Name"}
              onChangeText={(text)=>{
                this.setState({
                  lastName: text
                })
              }}
              value={this.state.lastName}
              />
              <TextInput styles={styles.formTextInput} 
              placeholder={"Phone Number"}
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={(text)=>{
                this.setState({
                  phoneNumber: text
                })
              }}
              value={this.state.phoneNumber}
              />
              <TextInput styles={styles.formTextInput} 
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text)=>{
                this.setState({
                  address: text
                })
              }}
              value={this.state.address}
              />
               <TextInput styles={styles.formTextInput} 
              placeholder={"Email Address"}
              keyboardType={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
              value={this.state.emailId}
              />
              
              <TouchableOpacity style={styles.button} onPress={()=>{
                  this.updateUserDetails()
              }}>
            <Text style={styles.buttonText}>
                Save
            </Text>
              </TouchableOpacity>
    </View>
</View>
        )
    }
}
const styles=StyleSheet.create({
    button:{
        width: 250,
        height: 60,
        justifyContent:"center",
        alignItems: "center",
        borderRadius: 12,
        backgroundColor: "fuschia",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 15,
        marginTop:20,
        shadowOffset:{width:0,height:10}
    },
    formContainer:{
        flex:1,
        fontSize:20,
        justifyContent:"center",
        alignItems: "center",
    },
    buttonText:{
        flex:1,
        fontSize:20,
        justifyContent:"center",
        alignItems: "center",
    },
    formTextInput:{
        width: 250,
        height: 60,
        justifyContent:"center",
        alignItems: "center",
        borderRadius:11,
        borderColor:"green",
        borderWidth: 1,
        marginTop:20,
        padding:10
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
    }
})