import React from 'react';
import { Text, AsyncStorage, TextInput, View, Alert, Image } from 'react-native';
import User from '../User';
import styles from '../constants/styles';
import firebase from 'firebase';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Body, Button, Title } from 'native-base';

export default class LoginScreen extends React.Component {

    state = {
        name: "",
        email: "",
        password: "",
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    static navigationOptions = {
        header: null
    }

    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: (
    //             <Header style={{ backgroundColor: "white" }}>
    //                 <Body style={{ alignItems: 'center' }}>
    //                     <Title style={{ color: '#006666', fontWeight: 'bold' }}>
    //                         <Icon name="wechat" size={20} color="#006666" />
    //                         <Text>{"\t\t"}</Text>Chat Nội Bộ</Title>
    //                 </Body>
    //             </Header>
    //         )
    //     }
    // }

    onLoginPress = async () => {
        // if(this.state.name == this.state.name && this.state.password == this.state.password && this.state.email == this.state.email)
        // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        //     .then(() => {this.props.navigation.navigate('App'); }, (error) => { Alert.alert(error.message); });

        if (this.state.email !== this.state.email) {
            Alert.alert('Thông báo', 'Bạn đã nhập sai email');
        }
        else if (this.state.email == "") {
            Alert.alert('Thông báo', 'Email không được rỗng');
        }

        else if (this.state.password !== this.state.password) {
            Alert.alert('Thông báo', 'Bạn đã nhập sai số điện thoại');
        }
        else if (this.state.password == "") {
            Alert.alert('Thông báo', 'Số điện thoại không được rỗng');
        }
        else {

            // firebase.database().ref('users/' + User.email).set({name:this.state.name});
            // this.props.navigation.navigate('App');
            await AsyncStorage.setItem('userPassword', this.state.password);
            User.password = this.state.password;
            User.name = this.state.name;
            User.email = this.state.email;
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(() => {
                    this.props.navigation.navigate('App');
                },
                    (error) => {
                        Alert.alert('Thông báo lỗi', 'Bạn đã nhập sai hoặc tài khoản không tồn tại');
                    }
                )

            // await AsyncStorage.setItem('userPassword', this.state.password);
            // User.password = this.state.password;
            // firebase.database().ref('users/' + User.password).set({ name: this.state.name });

            // this.props.navigation.navigate('App');
        }

    }


    render() {
        return (
            <View style={{ marginTop: 70, alignItems: "center", }}>
                <Image source={(require("../images/5.png"))}
                    style={{ position: "absolute", bottom: -400, right: -225 }} />


                {/* <TextInput style={{ width: 200, height: 40, borderWidth: 1 }}
                    value={this.state.name}
                    onChangeText={(text) => { this.setState({ name: text }) }}
                    placeholder="Name"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                /> */}

                <TextInput style={{ width: 300, height: 40, color: 'black', backgroundColor: '#CCCCCC', borderRadius: 10 }}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 20 }} />

                <TextInput style={{ width: 300, height: 40, color: 'black', backgroundColor: '#CCCCCC', borderRadius: 10 }}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder="Số điện thoại"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                {/* <Button title="Login" onPress={this.onLoginPress} /> */}
                <Button onPress={this.onLoginPress}
                    style={{ width: '40%', height: '15%', backgroundColor: '#006666', marginTop: 20, borderRadius: 10 }}>
                    <Text
                        style={{ textAlign: 'center', flex: 1, fontWeight: 'bold', color: 'white' }}>
                        Đăng nhập
                    </Text>
                </Button>

                <View style={{ paddingTop: 80 }} />

                {/* <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                        <Text style={{ textDecorationLine: 'underline', color: 'white' }}>Chưa có tài khoản</Text> ->  <Text
                            onPress={() => this.props.navigation.navigate('Regist')}
                            style={{ color: 'red' }}
                        >Đăng kí</Text>
                    </Text>
                </View> */}

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                        <Text
                            onPress={() => this.props.navigation.navigate('RegistScreen')}
                            style={{ color: 'white' }}>Đăng kí user Software
                        </Text>
                    </Text>
                </View>

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                        <Text
                            onPress={() => this.props.navigation.navigate('Regist_System')}
                            style={{ color: 'white' }}>Đăng kí user System
                        </Text>
                    </Text>
                </View>

            </View>
        )
    };
}

