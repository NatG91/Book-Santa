import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, FlatList} from 'react-native';
import {Header, Card, Icon, ListItem} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase/app'
import MyHeader from '../Components/Header'

export default class MyDonationsScreen extends Component {
    static navigationOptions={header:null}
    constructor(){
        super()
        this.state={
            userId: firebase.auth().currentUser.email,
            allDonations: [],
        },
        this.requestRef=null
    }
    getAllDonations=()=>{
    this.requestRef=db.collection('all_donations').where("donorId","==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allDonations= snapshot.docs.map(document=>document.data())
        this.setState({
            allDonations:allDonations
        })
    })
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.requestStatus==="Donor Interested"){
            var requestStatus="Donor Interested"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "requestStatus": "Donor Interested"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
        else{
            var requestStatus="Book Sent"
            db.collection("all_donations").doc(bookDetails.doc_id).update({
                "requestStatus": "Book Sent"
            })
            this.sendNotification(bookDetails, requestStatus)
        }
    }
    sendNotification=(bookDetails, requestStatus)=>{
        var requestId=bookDetails.request_id
        var donorId=bookDetails.donor_id
        db.collection("all_notifications").where("request_id","==",requestId).where("donor_id", "==", donorId).get()
        .then(snapshot=>{
            snapshot.forEach((doc)=>{
                var message = ""
                if(requestStatus==="Book Sent"){
                    message=this.state.donorName + "Has Sent You The Book"
                } else {
message = this.state.donorName + "Has Shown Interest In Donating The Book"
                }
                db.collection("all_notifications").doc(doc.id).update({
                    "message": message,
                    "notification_status":"unread",
                    "date": firebase.firestore.FieldValue.serverTimestamp()
                })
            })
        })
    }
    keyExtractor=(item, index)=>index.toString()
    renderItem=({item,i})=>{
            <ListItem key={i}
            title={item.book_name}
            subtitle={"Requested By:"+item.requestedBy+"Status:"+item.requestStatus}
            leftElement={<Icon name="Book" type="font-awesome" color="black"/>}
            titleStyle={{color:"black",fontWeight:"bold"}}
            rightElement={
            <TouchableOpacity style={[styles.button, {
                backgroundColor: item.requestStatus==="Book Sent"?
                "green": "red"
            }
            ]}
            onPress={()=>{
                this.sendBook(item)
            }}
            >
                <Text style={{color: "coral"}}>
                    Send The Book
                </Text>
            </TouchableOpacity>
            }
            bottomDivider
            />
    }
render(){
    return(
        <View>
<View style={{flex:1}}>
            <MyHeader title="My Donations"/>
            <View style={{flex:1}}>
            {this.state.allDonations.length===0?(
                <View>
                </View>
            ): (
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allDonations}
                renderItem={this.renderItem}
                />
            )}
            </View>
        </View>   
        </View>
    )
    
}
      }
      const styles = StyleSheet.create({
        button:{
          width:100,
          height:30,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:"#ff5722",
          shadowColor: "#000",
          shadowOffset: {
             width: 0,
             height: 8
           },
          elevation : 16
        },
        subtitle :{
          flex:1,
          fontSize: 20,
          justifyContent:'center',
          alignItems:'center'
        }
      })