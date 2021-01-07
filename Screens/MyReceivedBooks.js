import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, FlatList} from 'react-native';
import {Header, Card, Icon, ListItem} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase/app'
import MyHeader from '../Components/Header'

export default class MyReceivedBooks extends Component {
    constructor(){
        super()
        this.state={
            userId: firebase.auth().currentUser.email,
            receivedBookList: []
        },
        this.requestRef=null
    }

    getReceivedBookList=()=>{
    this.requestRef=db.collection('requested_books').where("userId","==",this.state.userId).where("bookStatus", "==", "received")
    .onSnapshot((snapshot)=>{
        var receivedBookDetails= snapshot.docs.map((doc)=>doc.data())
        this.setState({
            receivedBookList:receivedBookList
        })
    })
    }

  componentDidMount() {
    this.getReceivedBookList()
  }

  componentWillUnmount() {
    this.requestRef();
  }

    keyExtractor=(item, index)=>index.toString()
    renderItem=({item,i})=>{
      return(
            <ListItem key={i}
            title={item.book_name}
            subtitle={item.bookStatus}
            titleStyle={{color:"black",fontWeight:"bold"}}
            bottomDivider
            />
            )
    }

render(){
    return(
        
<View style={{flex:1}}>
            <MyHeader title="Received Books" navigation={this.props.navigation}/>
            <View style={{flex:1}}>
            {this.state.receivedBookList.length===0?(
                <View>
                   <Text style={{ fontSize: 20, justifyContent: "center", alignItems: "center", alignSelf: "center"}}>A List of All of The Books That I have Received</Text>
                </View>
            ): (
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedBookList}
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