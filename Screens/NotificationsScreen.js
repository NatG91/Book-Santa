import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView, FlatList} from 'react-native';
import SwipeableFlatList from '../Components/SwipeableFlatList'
import { ListItem, Icon } from 'react-native-elements';
import db from '../config'
import firebase from 'firebase/app'
import MyHeader from '../Components/Header'


export default class NotificationsScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            userId: firebase.auth().currentUser.email,
            allNotifications: [],
        },
        this.notificationRef=null
    }
         getNotification=()=>{
            this.notificationRef=db.collection("all_notifications").where("notification_status","==","unread").where("targeted_user_id", "==", this.state.userId)
            .onSnapshot(snapshot=>{
                var allNotifications= []
                snapshot.docs.map((doc)=>{
                    var notifications=doc.data()
                    notifications['doc_id']=doc.id
                    allNotifications.push(notifications)
                })
                this.setState({
                    allNotifications:allNotifications
                })
            })
        }
        componentDidMount(){
            this.getNotification()
        }
        componentWillUnmount(){
            this.notificationRef()
        }
        keyExtractor=(item, index)=>index.toString()
        renderItem=({item,i})=>{
                <ListItem key={i}
                title={item.book_name}
                subtitle={item.message}
                leftElement={<Icon name="Book" type="font-awesome" color="black"/>}
                titleStyle={{color:"black",fontWeight:"bold"}}
                bottomDivider
                />
        }
    render(){
        return(
    <View style={{flex:1}}>
                    <View style={{flex:0.1}}>
                <MyHeader title="Notifications" navigation={this.props.navigation}/>
                </View>
                <View style={{flex:0.9}}>
                {this.state.allNotifications.length===0?
                   
                 (
                    <View style={{flex:0.1, justifyContent:"center",alignItems:"center"}}>
                        <Text styles={{fontSize:25}}>
                        You have no unread messages.
                        </Text>
                        </View>
                 ):(
                     <SwipeableFlatList allNotifications={this.state.allNotifications}/>
                     
                 )

                }
                
            </View>   
            </View>
        )
        
    }
}
