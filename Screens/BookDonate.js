import React,{Component} from 'react';
import {ListItem} from 'react-native-elements'
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert, FlatList} from 'react-native';
import MyHeader from '../Components/Header';
import db from '../config'
import firebase from 'firebase/app'

export default class BookDonate extends Component {
    constructor(){
        super();
        this.state={
            requestedBookList:[],
        }
        this.requestRef=null
    }

   getRequestedBooksList=()=>{
       this.requestRef=db.collection("requested_books")
       .onSnapshot((snapshot)=>{
           var requestedBookList=snapshot.docs.map(document=>document.data())
           this.setState({
               requestedBookList:requestedBookList
           })
       })
   } 
   componentDidMount(){
       this.getRequestedBooksList()
   }
   componentWillUnmount(){
       this.requestRef()
   }
   keyExtractor=(item, index)=>index.toString()
   renderItem=({item,i})=>{
       return(
           <ListItem key={i}
           title={item.book_name}
           subtitle={item.reason}
           titleStyle={{color:"black",fontWeight:"bold"}}
           rightElement={
           <TouchableOpacity style={styles.button} onPress={()=>{
              this.props.navigation.navigate('ReceiverDetails',{"details": item})
               console.log('ReceiverDetails')
           }}>
               <Text style={{color: "coral"}}>
                   Details
               </Text>
           </TouchableOpacity>
           }
           bottomDivider
           />
       )
   }
     render(){
       return(
        <View style={{flex:1}}>
            <MyHeader title="Donate A Book" navigation ={this.props.navigation}/>
            <View style={{flex:1}}>
            {this.state.requestedBookList===0?(
                <View style={styles.subContainer}>
                    <Text style={{fontSize:21}}>
                        A List of All of The Requested Books
                    </Text>
                </View>
            ): (
                <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedBookList}
                renderItem={this.renderItem}
                />
            )}
            </View>
        </View>   

       )
   } 
}
const styles=StyleSheet.create({
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
    subContainer:{
        flex:1,
        fontSize:20,
        justifyContent:"center",
        alignItems: "center",
    }
})