import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import AuthLoadingScreen from './Screen/AuthLoadingScreen';
import ChatScreen from './Screen/ChatScreen';
import ProfileScreen from './Screen/ProfileScreen';

import RegistScreen from './Screen/RegistScreen';
import RegistScreen_System from './Screen/RegistScreen_System';

import SoftwareRoom from './Room/SoftwareRoom';
import SystemRoom from './Room/SystemRoom';
import GroupScreen from './Screen/GroupScreen';

import upLoadImage from './Screen/upLoadImage';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,

  RegistScreen: RegistScreen,
  Regist_System: RegistScreen_System,

  SoftwareRoom: SoftwareRoom,
  SystemRoom: SystemRoom,

  upLoadImage: upLoadImage,

});

AppStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = navigation.state.index === 0;

  return {
    tabBarVisible
  };
};

const AuthStack = createStackNavigator({ Login: LoginScreen });

const TabNavigator = createBottomTabNavigator(
  {
    Chat: {
      screen: AppStack,
      navigationOptions: {
        tabBarLabel: 'Chat',
        tabBarIcon: ({ tintColor }) => (
          <Ionicon name={"md-chatboxes"} size={30} color={tintColor} />
        )
      }
    },
    Group: {
      screen: GroupScreen,
      navigationOptions: {
        tabBarLabel: 'Nhóm',
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcon name="account-group" size={30} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ({ tintColor }) => (
          <Icon name={"user-circle-o"} size={30} color={tintColor} />
        )
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "#707070",
      showLabel: true,
      style: {
        backgroundColor: '#ECECEC'
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: TabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);


// remove library form package.json => npm uninstall --save "your library"
// change name app: The generator does not override the strings.xml file located in android/app/src/main/res/values/, so you have to change the app_name variable manually
//change icon for app in: ReactProject\firebasechat\android\app\src\main\res