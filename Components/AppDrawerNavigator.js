import React,{Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppNavigator} from './Navigator'
import SidebarMenu from './SidebarMenu'
import SettingScreen from '../Screens/SettingScreen'
import MyDonationsScreen from '../Screens/MyDonationsScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen:AppNavigator,
        },
        Donations:{
            screen: MyDonationsScreen,
        },
    Settings: {
        screen: SettingScreen
    }
    },
    {contentComponent:SidebarMenu},
    {intitialRouteName:'Home'}
)