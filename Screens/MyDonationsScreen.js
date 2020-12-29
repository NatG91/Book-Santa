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
            donorName: "",
            allDonations: [],
        },
        this.requestRef=null
    }
    getDonorDetails = (userId) => {
      db.collection("users")
        .where("emailId", "==", userId)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.setState({
              donorName: doc.data().firstName + " " + doc.data().lastName,
            });
          });
        });
    };

    getAllDonations=()=>{
    this.requestRef=db.collection('all_donations').where("donorId","==",this.state.userId)
    .onSnapshot((snapshot)=>{
        var allDonations= []
        snapshot.docs.map((doc)=>{
         
          var donation = doc.data()
          
          donation["doc_id"] = doc.id
          allDonations.push(donation)
        })

        this.setState({
            allDonations:allDonations
        })
    })
    }
    sendBook=(bookDetails)=>{
        if(bookDetails.requestStatus==="Book Sent"){
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
        var donorId=bookDetails.donorId
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
      return(
            <ListItem key={i}
            title={item.book_name}
            subtitle={"Requested By: "+item.requestedBy+" Status: "+item.requestStatus}
            leftElement={<Icon name="Book" type="font-awesome" color="black"/>}
            titleStyle={{color:"black",fontWeight:"bold"}}
            rightElement={
            <TouchableOpacity style={[styles.button, {
                backgroundColor: item.requestStatus==="Book Sent"? "green": "#ff5722"
            }
            ]}
            onPress={()=>{
                this.sendBook(item)
            }}
            >
                <Text style={{color: "coral"}}>
                {item.requestStatus === "Book Sent" ? "Book Sent" : "Send Book"}
                </Text>
            </TouchableOpacity>
            }
            bottomDivider
            />
            )
    }

  componentDidMount() {
    this.getDonorDetails(this.state.userId);
    this.getAllDonations();
  }

  componentWillUnmount() {
    this.requestRef();
  }

render(){
    return(
        
<View style={{flex:1}}>
            <MyHeader title="My Donations" navigation={this.props.navigation}/>
            <View style={{flex:1}}>
            {this.state.allDonations.length===0?(
                <View>
                   <Text style={{ fontSize: 20}}>List of all book Donations</Text>
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