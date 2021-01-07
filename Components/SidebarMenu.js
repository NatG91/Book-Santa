import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert, FlatList} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer'
import db from '../config'
import firebase from 'firebase/app'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

export default class SidebarMenu extends Component{
    state={
        userId: firebase.auth().currentUser.email,
        image: '#', 
        name: '', 
        docId: ''
    }
    selectPicture=async()=>{
        const {cancelled, uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, 
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        })
        if(!cancelled){
            this.setState({
                image:uri,

            })
            this.uploadImage(uri, this.state.userId)
        }
    }
    uploadImage=async(uri, imageName)=>{
        var response = await fetch(uri)
        var blob = await response.blob()
        var ref = firebase.storage().ref().child("user_profiles/"+imageName)
        return ref.put(blob).then((response)=>{
            this.fetchImage(imageName)
        })
    }
    fetchImage=()=>{
        var storageRef=firebase.storage().ref().child("user_profiles/"+imageName)
        storageRef.getDownloadURL().then((url)=>{
            this.setState({
                image: url
            })
            .catch=((error)=>{
                this.setState({
                    image: "#"

                })
            })
        })
    }
    getUserProfile=()=>{
        db.collection('users').where('emailId', '==', this.state.userId)
        .onSnapshot((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                this.setState({
                    name: doc.data().firstName+" "+ doc.data().lastName 
                })
            })
        })
    }
    componentDidMount(){
        this.fetchImage(this.state.userId)
        this.getUserProfile()
    }
    render(){
        return(
    <View style={styles.container}>
        <View style={{flex:0.5, alignItems: 'center', backgroundColor: 'white'}}>
            <Avatar
            rounded
            source={{
                uri: this.state.image
            }}
            size="medium"
            onPress={()=>{
                this.selectPicture()
            }}
            containerStyle={styles.imageContainer}
            showEditButton
            />
            <Text style={{fontWeight:"100", fontSize: 20, padding: 10}}>
                {this.state.name}
            </Text>
        </View>
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