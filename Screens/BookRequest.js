import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView} from 'react-native';
import MyHeader from '../Components/Header';
import db from '../config'
import firebase from 'firebase/app'

export default class BookRequest extends Component {
    constructor(){
        super();
        this.state={
            bookName: "",
            reason: "",
            userId:firebase.auth().currentUser.email,
        }
    }
    createUniqueID(){
        return Math.random.toString(36).substring(7)
    }
    addRequest=(bookName,reason)=>{
        var userId=this.state.userId
        var randomRequestId=this.createUniqueID()
        db.collection("requested_books").add({
           "user_id":userId,
           "book_name":bookName,
           "reason": reason,
           "request_id":randomRequestId
        })
        this.setState({
            bookName:"",
            reason:"",
        })
        return Alert.alert("The Book Request Has Been Successful.")
    }
   render(){
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
            <TextInput style={[styles.formTextInput,{height:300}]} placeholder={'Why Do You Need The Book'}
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
