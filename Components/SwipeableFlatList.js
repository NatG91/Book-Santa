import React,{Component} from 'react';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view'
import {Header, Icon, Badge, ListItem} from 'react-native-elements';
import db from '../config'
import firebase from 'firebase/app'

export default class SwipeableFlatList extends Component{
    constructor(props){
    super(props)
    this.state={
        allNotifications: this.props.allNotifications
    }
}

updateMarkAsRead=(notification)=>{
db.collection('all_notifications').doc(notification.doc_id).update({
    "notification_status": "read"
})
}

onSwipeValueChange=swipeData=>{
    var allNotifications=this.state.allNotifications
    const {key, value}=swipeData;
    if(value<-Dimensions.get('window').width){
      const newData=[...allNotifications]  
      const preIndex=allNotifications.findIndex(item=>item.key===key)
      this.updateMarkAsRead(allNotifications[preIndex])
      newData.splice(preIndex,1)
      this.setState({
          allNotifications:newData
      })
    }
}
renderItem=data=>(

    <ListItem
    leftElement={<Icon name= "Book" type="feather" color="black"/>}
    title={data.item.book_name}
    subtitle={data.item.message}
    titleStyle={{color:"black",fontWeight:"bold"}}
    bottomDivider
    />
)
renderHiddenItem=()=>{
    <View syle={styles.rowBack}>
        <View style={styles.backRightButton, styles.backRightButtonRight}>
            <Text style={styles.backTextWhite}>
                
            </Text>
        </View>
    </View>
}

render(){
    return(
        <View>
          <SwipeListView
          disableRightSwipe
          data={this.state.allNotifications}
          renderItem={this.renderItem}
          renderHiddenItem={this.renderHiddenItem}
          onSwipeValueChange={this.onSwipeValueChange}
          rightOpenValue={-Dimensions.get('window').width}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          />
        </View>
    )

    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
        fontWeight:'bold',
        fontSize:15
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#29b6f6',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 100,
    },
    backRightBtnRight: {
        backgroundColor: '#29b6f6',
        right: 0,
    },
});