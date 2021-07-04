import React from 'react';
import { SafeAreaView, Image, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import User from '../User';
import firebase from 'firebase';
import { View, Right } from 'native-base';

import Iconicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Header, Left, Body, Button, Title } from 'native-base';

export default class SystemRoom extends React.Component {
  static navigationOptions = {
    header: null,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <Header style={{ backgroundColor: "white" }}>
          <Left>
            <Button transparent onPress={() => navigation.navigate("Group")}>
              <Iconicon name="ios-arrow-dropleft-circle" size={30} color="#555555" />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#006666', fontSize: 30, fontWeight: 'bold' }}>Chats</Title>
          </Body>
          {/* <Button transparent onPress={() => navigation.navigate("Profile")}>
            <Icon name={"user-circle-o"} size={30} color="#555555" />
          </Button> */}
        </Header>
      )
    }
  }

  state = {
    name: [],
    nameITSoft: [],
    nameITSys: [],
    group: [],
    Room: [],
    dbRef: firebase.database().ref('group2'),
  }


  // componentDidMount
  componentDidMount() {

    this.state.dbRef.on('child_added', (val) => {
      let person = val.val();
      person.password = val.key;
      if (person.password === User.password) {
        User.name = person.name;
        User.nameITSoft = person.nameITSoft;
        User.nameITSys = person.nameITSys;
        User.email = person.email;
        User.group = person.group;
        User.image = person.image ? person.image : null;
      }
      else {
        this.setState((prevState) => {
          return {
            Room: [...prevState.Room, person],
          }
        })
      }
    })
  }

  componentWillUnmount() {
    this.state.dbRef.off()
  }

  renderRow = ({ item }) => {
    return (
      <View>
        <View style={{ marginTop: 10 }}></View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Chat', item)}
            style={{ flexDirection: 'row', alignItems: 'center',  borderBottomColor: "#ccc", backgroundColor: '#DDDDDD', width: '95%', marginLeft: 10, borderRadius: 10 }}>              
            <Image
              source={item.image ? { uri: item.image } : require('../images/user.png')}
              style={{ width: 42, height: 32, resizeMode: 'contain', borderRadius: 20, marginRight: 10, marginLeft:10 }}
            />
            <View style={{
                backgroundColor: '#fff',
                width: 2,
                height: 50,
              }} />
            <Text style={{ fontSize: 20, marginLeft:10}}>{item.name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { height } = Dimensions.get('window');
    return (
      <View>
        {/* <Image source={(require("../images/7.png"))}
          style={{ position: "absolute", bottom: -400, right: -225 }} /> */}
        <View>
          <FlatList
            style={{ height }}
            data={this.state.Room}
            renderItem={this.renderRow}
            keyExtractor={(item) => item.email}
          // ListHeaderComponent={() => <Text style={{ fontSize: 30, marginVertical: 10, marginLeft: 10, fontWeight: "bold", textDecorationLine: 'underline', color: 'white' }}>Chats</Text>}
          />
        </View>
      </View>
    )
  };
}