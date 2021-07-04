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
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: ""
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
