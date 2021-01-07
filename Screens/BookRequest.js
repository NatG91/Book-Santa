import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import MyHeader from '../Components/Header';
import db from '../config'
import firebase from 'firebase/app'
import {BookSearch} from 'react-native-google-books'
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class BookRequest extends Component {
    constructor(){
        super();
        this.state={
            bookName: "",
            reason: "",
            userId:firebase.auth().currentUser.email,
            isBookRequestActive: "",
            request_id: "",
            requestedBookName: "",
            bookStatus: "",
            docId: "",
            userDocId: ""
        }
    }
    createUniqueID(){
        return Math.random.toString(36).substring(7)
    }
    addRequest= async (bookName,reason)=>{
        var userId=this.state.userId
        var randomRequestId=this.createUniqueID()
        db.collection("requested_books").add({
           "user_id":userId,
           "book_name":bookName,
           "reason": reason,
           "request_id":randomRequestId,
           "bookStatus": "requested"
        })
        await this.getBookRequest()
        db.collection('users').where("emailId", "==", userId).get().then()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection('users').doc(doc.id).update({
                    isBookRequestActive: true
                })
            })
        })
        this.setState({
            bookName:"",
            reason:"",
        })
        return Alert.alert("The Book Request Has Been Successful.")
    }
    receivedBooks=(bookName)=>{
        var userId=this.state.userId;
        var requestId=this.state.request_id
        db.collection('received_books').add({
            'user_id': userId,
            'bookName': book_name,
            'requestId': requestId,
            'bookStatus': "Received"
        })
    }
    getBookRequest=()=>{
        var bookRequest=db.collection('requested_books').where('user_id','==', this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
               if(doc.data().book_status!=='received'){
                   this.setState({
                       request_id: doc.data().request_id,
                       requestedBookName: doc.data().book_name,
                       bookStatus: doc.data().book_status,
                       docId: doc.id

                   })
               }
            }
            )
        }
        )
    }
    getIsBookRequestActive(){
        db.collection('users').where("emailId", "==", this.state.userId)
        .onSnapshot(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                this.setState({
                    isBookRequestActive: doc.data().isBookRequestActive,
                    userDocId: doc.id
                })
            })
        })
    }
    sendNotification=()=>{
        db.collection('users').where("emailId", "==",this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var firstName=doc.data().firstName
                var lastName=doc.data().lastName
        db.collection('all_notifcation').where("request_id", "==",this.state.request_id).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var donorId=doc.data().donor_id
                var bookName=doc.data().book_name
                db.collection('all_notifications').add({
                    'targetedUserId': donorId,
                    'message': firstName+ " " +lastName + " " + "Has Received The Book" + bookName,
                    "notificationStatus": "Unread",
                    "bookName": bookName
                })
            })
        })
            })
        })
    }
    componentDidMount(){
        this.getBookRequest()
        this.getIsBookRequestActive()
    }
    updateBookRequestStatus=()=>{
        db.collection('requested_books').doc(this.state.docId).update({
            bookStatus: 'received'            
        })
        db.collection('users').where("emailId", "==", this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                db.collection('users').doc(doc.id).update({
                    isBookRequestActive: false,

                })
            }
            )
        }
        )
    }
async getBooksFromAPI(){
    this.setState({
        bookName: bookName
        
    })
    if(bookName.lenght>2){
            var books=await BookSearch.searchbook(bookName, 'AIzaSyBLnNqWmXEmMB9r9SM9qlgWRIWFdjk3sOQ')
            this.setState({
                dataSource: books.data, 
                showFlatList: true
            })
        }
}
renderItem=({item, i})=>{
    return(
        <TouchableHighlight style={{alignItems: "center", backgroundColor: "lightblue", padding: 10, width: "90%"}}
        activeOpacity={0.6}
        underlayColor='lightblue'
        onPress={()=>{
            this.setState({
                showFlatList: false,
                bookName: item.volumeInfo.title
            })
        }}
        bottomDivider
        >
                <Text>
                    {item.volumeInfo.title}
                </Text>
        </TouchableHighlight>        
    )
}
   render(){
       if(this.state.isBookRequestActive===true){
           return(
               <View style={{flex:1, justifyContent:'center'}}>
                   <View style={{borderColor: 'red', borderWidth: 2, justifyContent: 'center', alignItems: "center", padding: 10, margin: 10}}>
                       <Text>
                           Book Name 
                       </Text>
                        <Text>
                            {this.state.requestedBookName}
                        </Text>
                        </View>
                        <View style={{borderColor: 'red', borderWidth: 2, justifyContent: 'center', alignItems: "center", padding: 10, margin: 10}}>
                            <Text>
                                Book Status:
                            </Text>
                                <Text>
                                    {this.state.book_status}
                                </Text>
                        
                   </View>
                   <TouchableOpacity styles={{borderWidth:2, borderColor: 'green', backgroundColor: 'red', alignSelf: "center", alignItems: "center", width:300, height: 30, marginTop:30}} 
                   onPress={()=>{
                       this.sendNotification()
                       this.updateBookRequestStatus()
                       this.receivedBooks(this.state.requestedBookName)

                   }}
                   >
                       <Text>
                           Received The Book
                       </Text>

                   </TouchableOpacity>
               </View>

           )
       }
       else{

       return(
        <View style={styles.container}>
          <MyHeader title="Request A Book" navigation ={this.props.navigation}/>
        <KeyboardAvoidingView style={styles.keyboardStyle}>
            <TextInput style={styles.formTextInput} placeholder={'The Name of The Book'}
            onChangeText={(text)=>{
                this.setState({
                    bookName:text
                })
            }}
            value={this.state.bookName}
            />
            <TextInput style={[styles.formTextInput,{height:300}]} placeholder={'Why Do You Need The Book?'}
            multiline numberOfLines={8}
            onChangeText={(text)=>{
                this.setState({
                    reason:text
                })
            }}
            value={this.state.reason}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{this.addRequest(this.state.bookName,this.state.reason)}}>
                <Text>
                Request The  Book
                </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </View>   
       )
    }
   } 
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },
    keyboardStyle:{
        flex:1,
        alignItems:"center",
        justifyContent: "center"
    },
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
    formTextInput:{
        width: 250,
        height: 60,
        alignSelf:"center",
        borderColor: "peach",
        borderRadius: 10,
        borderWidth: 2,
        marginTop: 21,
        padding: 11
    },


})
