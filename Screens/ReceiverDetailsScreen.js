import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import {Header, Card, Icon} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase/app'
import MyHeader from '../Components/Header'

export default class ReceiverDetailsScreen extends Component {
constructor(props){
  super(props)
  this.state={
    userId: firebase.auth().currentUser.email,
    receiverId: this.props.navigation.getParam('details')["user_id"],
    requestId: this.props.navigation.getParam('details')["request_id"],
    bookName: this.props.navigation.getParam('details')["book_name"],
    reason: this.props.navigation.getParam('details')["reason"],
    receiverName: '',
    receiverContact:'',
    receiverAddress: '',
    receiverRequestDocId:'',
  }
}
getReceiverDetails(){
db.collection('users').where('emailId','==', this.state.receiverId).get()
.then(snapshot=>{
  snapshot.forEach(doc=>{
    this.setState({
      receiverName: doc.data().firstName,
      receiverContact: doc.data().contact,
      receiverAddress: doc.data().address,
    })


  })
})
db.collection('requested_books').where('request_id', '==',this.state.requestId).get()
.then(snapshot=>{snapshot.forEach(doc=>{
  this.setState({
    receiverRequestDocId: doc.id
  })
})})
}

getUserDetails=(userId)=>{
  db.collection("users").where('emailId','==', userId).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      this.setState({
        userName  :doc.data().firstName + " " + doc.data().lastName
      })
    })
  })
}
updateBookStatus=()=>{
  db.collection('all_donations').add({
    "book_name":this.state.bookName,
    "request_id": this.state.requestId,
    "requestedBy": this.state.receiverName,
    "donorId": this.state.userId,
    "requestStatus": "Donor Interested",
  })
}

addNotification=()=>{
  var message = this.state.userName + " has shown interest in donating the book"
  db.collection("all_notifications").add({
    "targeted_user_id"    : this.state.receiverId,
    "donor_id"            : this.state.userId,
    "request_id"          : this.state.requestId,
    "book_name"           : this.state.bookName,
    "date"                : firebase.firestore.FieldValue.serverTimestamp(),
    "notification_status" : "unread",
    "message"             : message
  })
}
componentDidMount(){
  this.getReceiverDetails()
  this.getUserDetails(this.state.userId)
}
   render(){
       return(
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
            leftComponent={<Icon name='arrow-left' type='feather' color='black' onPress={()=>{
              this.props.navigation.goBack()
            }}/>}
            centerComponent={{
              text: "Donate Books",
              style:{color: "orange", fontSize: 20, fontWeight: "bold"}
            }}
            backgroundColor="#eaf8fe"
            />
          </View> 
          <View style={{flex:0.3}}>
            <Card title={"Book Information"} titleStyle={{fontSize:20}}>
               <Card>
                 <Text style={{fontWeight:'bold'}}>
                  Name: {this.state.bookName}
                 </Text>
               </Card>
               <Card>
                 <Text style={{fontWeight:'bold'}}>
                  Reason: {this.state.reason}
                 </Text>
               </Card>
            </Card>
          </View> 
          <View style={{flex:0.3}}>
          <Card title={"Receiver Information"} titleStyle={{fontSize:20}}>
               <Card>
                 <Text style={{fontWeight:'bold'}}>
                  Name: {this.state.receiverName}
                 </Text>
               </Card>
               <Card>
                 <Text style={{fontWeight:'bold'}}>
                  Contact: {this.state.receiverContact}
                 </Text>
               </Card>
               <Card>
                 <Text style={{fontWeight:'bold'}}>
                 Address: {this.state.receiverAddress}
                 </Text>
               </Card>
            </Card>
          </View>  
          <View style={styles.buttonContainer}>
            {this.state.receiverId!==this.state.userId?(
              <TouchableOpacity style={styles.button} onPress={()=>{
                this.updateBookStatus()
                this.addNotification()
                this.props.navigation.navigate('Donations')
              }}>
                <Text>
                  Donate Now
                </Text>
              </TouchableOpacity>
            ):null
          }
          </View>   
        </View>
       
   )}
    } 
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      buttonContainer : {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }
    })
