import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, FlatList} from 'react-native';
import {Header, Card, Icon, ListItem} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase/app'
import MyHeader from '../Components/Header'

export default class MyDonationsScreen extends Component {
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
    keyExtractor=(item, index)=>index.toString()
    renderItem=({item,i})=>{
            <ListItem key={i}
            title={item.book_name}
            subtitle={"Requested By:"+item.requestedBy+"Status:"+item.requestStatus}
            leftElement={<Icon name="Book" type="font-awesome" color="black"/>}
            titleStyle={{color:"black",fontWeight:"bold"}}
            rightElement={
            <TouchableOpacity style={styles.button}>
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