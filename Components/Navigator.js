import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,TouchableOpacity,Alert,Image} from 'react-native';
import BookRequest from '../Screens/BookRequest.js'
import BookDonate from '../Screens/BookDonate.js'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { AppStackNavigator } from './AppStackNavigator'

export const AppNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen: AppStackNavigator,
        navigationOptions:{
            tabBarIcon: <Image source={require('../assets/request-list.png')} style={{width:20, height:20}}/>,
            tabBarLabel: "Donate Books"
        }
    },
    RequestBooks: {screen: BookRequest,
        navigationOptions:{
            tabBarIcon: <Image source={require('../assets/request-book.png')} style={{width:20, height:20}}/>,
            tabBarLabel: "Request Books"
        }
    }
})