import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';

import User from '../User';
import firebase from 'firebase';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

//config firebase

  componentDidMount() {
    var config = {
      apiKey: "AIzaSyAjvDHlpDo9FwFaoJ_NXCCM2l-QMU0gY7I",
      authDomain: "chatappver1-71420.firebaseapp.com",
      databaseURL: "https://chatappver1-71420.firebaseio.com",
      projectId: "chatappver1-71420",
      storageBucket: "chatappver1-71420.appspot.com",
      messagingSenderId: "56822620720",
      appId: "1:56822620720:web:c4be96a6560b7c958703f5",
      measurementId: "G-CEV58N8YLL"
    };
    // Initialize Firebase
    if(!firebase.apps.length){
      firebase.initializeApp(config);
    }
  }

  _bootstrapAsync = async () => {
    User.password = await AsyncStorage.getItem('userPassword');    
    this.props.navigation.navigate(User.password ? 'App' : 'Auth');
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}