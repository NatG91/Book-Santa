import React,{Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Header, Icon, Badge} from 'react-native-elements';

export default class MyHeader extends Component {
    constructor(props){
        super(props)
        this.state={
            value:""
        }
    }



getUnreadMessageNumbers(){
db.collection('all_notification').where('notification_status',"==", "unread").onSnapshot((snapshot)=>{
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

const Badgecon=(props)=>{
    return(
        <View>
<Icon name='bell' type='feather' color="white" size={25}
            onPress={()=>{
                props.navigation.navigate('Notifications')
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


        return(
            <Header 
            leftComponent={
            <Icon name='bars' type='font-awesome' color="white" onPress={()=>{
                props.navigation.toggleDrawer()
            }}/>
        }
            centerComponent={{text:props.title, style:{color:'lightblue',fontSize:20,fontWeight: "bold"}}} 
            rightComponent={<Badgecon{
                ...props
            }/>}
            backgroundColor='white'
            />
        )

        }
    }
