import React,{Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';
import db from '../config'
import firebase from 'firebase/app'

export default class MyHeader extends Component {
    constructor(props){
        super(props)
        this.state={
            userId : firebase.auth().currentUser.email,
            value:""
        }
    }

    


getUnreadMessageNumbers(){
db.collection('all_notifications').where('notification_status',"==", "unread").where("targeted_user_id","==", this.state.userId)
.onSnapshot((snapshot)=>{
    var unreadNotifications=snapshot.docs.map((doc)=>{
        doc.data()
    })
    this.setState({
        value: unreadNotifications.length
    })
})
}
componentDidMount(){
    this.getUnreadMessageNumbers()
}

Badgecon=()=>{
    return(
        <View>
<Icon name='bell' type='feather' color="black" size={25}
            onPress={()=>{
                this.props.navigation.navigate('Notifications')
            }}
            />
            <Badge
            value={this.state.value}
            containerStyle={{
                position: 'absolute',
                top: -4,
                right: -4
            }}
            />
        </View>
    )
}

render(){
        return(
            <Header 
            leftComponent={
            <Icon name='bars' type='font-awesome' color="black" onPress={()=>
                this.props.navigation.toggleDrawer()
            }/>
        }
            centerComponent={{text:this.props.title, style:{color:'lightblue',fontSize:20,fontWeight: "bold"}}} 
            rightComponent={<this.Badgecon{
                ...this.props
            }/>}
            backgroundColor='white'
            />
        )

        }
    }