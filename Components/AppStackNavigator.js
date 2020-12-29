import React,{Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import BookDonate from '../Screens/BookDonate'
import ReceiverDetailsScreen from '../Screens/ReceiverDetailsScreen'

export const AppStackNavigator = createStackNavigator({
    BookDonateList: {
        screen:BookDonate,
        navigationOptions:{
            headerShown:false,
        }
        },
    ReceiverDetails: {
        screen: ReceiverDetailsScreen,
        navigationOptions:{
            headerShown:false,
        }
    },
    },
    {
        intitialRouteName:'BookDonateList'
    }
)