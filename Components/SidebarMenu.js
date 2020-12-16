import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert, FlatList} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import db from '../config'
import firebase from 'firebase/app'

export default class SidebarMenu extends Component{
    render(){
        return(
    <View style={styles.container}>
        <View style={styles.drawerContainer}>
    <DrawerItems {...this.props}/>
        </View>
        <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} 
            onPress={()=>{
                  this.props.navigation.navigate('Welcome')
                  firebase.auth().signOut()
            }}>
                <Text style={styles.logoutText}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    </View>

        )
    }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
    },
    drawerContainer:{
        flex: 0.7,
      },
    logoutContainer:{
        flex:0.3,
        justifyContent: 'flex-end',
        paddingBottom:31,
    },
    logoutButton:{
        width:'100%',
        height:30,
        justifyContent:"center",
        padding:10
    },
    logoutText:{
        fontSize:32,
        fontWeight: 'bold',
    }
      })