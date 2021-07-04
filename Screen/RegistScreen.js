import React from 'react';
import { Text, Image, TextInput, View, Alert, AsyncStorage } from 'react-native';
import User from '../User';
// import styles from '../constants/styles';
import firebase from 'firebase';

import Iconicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Header, Left, Body, Button, Title } from 'native-base';


export default class RegistScreen extends React.Component {

    state = {
        nameITSoft: "",
        email: "",
        password: "",
        passwordConfirm: "",
        group: "",
        name: "",
    }

    static navigationOptions = {
        header: null
    }


    onSignupPress = async () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Thông báo", "Password nhập lại không đúng");
        }
        else if (this.state.name == "") {
            Alert.alert("Thông báo", "Tên không được rỗng")
        }
        else if (this.state.email == "") {
            Alert.alert("Thông báo", "Email không được rỗng")
        }
        else if (this.state.password == "") {
            Alert.alert("Thông báo", "Password không được rỗng")
        }
        else {
            Alert.alert('Thông báo', 'Đăng kí thành công');
            await AsyncStorage.setItem('userPassword', this.state.password);
            User.name = this.state.name;
            User.email = this.state.email;
            User.password = this.state.password;
            User.nameITSoft = this.state.name;

            // firebase.database().ref('users/' + User.password).set({ name: this.state.name, email: this.state.email, group: this.state.group });

            firebase.database().ref('users/'+User.password).set({
                name: this.state.name,
                email: this.state.email,
                password:this.state.password,
            });

            firebase.database().ref('group/'+User.password).set({
                name:this.state.name,
                email:this.state.email,
                nameITSoft:this.state.name,
            });

            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            // await AsyncStorage.clear();
            this.props.navigation.navigate('Login');
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Header style={{ backgroundColor: "white" }}>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate("Login")}>
                            <Iconicon name="ios-arrow-dropleft-circle" size={30} color="#FFCC00" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ color: '#006666', fontWeight: 'bold' }}><Icon name="user-plus" size={20} color="#006666" />
                            <Text>{"\t\t"}</Text>Đăng Kí Tài Khoản Software</Title>
                    </Body>
                </Header>
            )
        }
    }

    render() {
        return (
            <View style={{ marginTop: 70, alignItems: "center" }}>
                <Image source={(require("../images/6.png"))}
                    style={{ position: "absolute", bottom: -400, right: -225 }} />

                <TextInput style={{ width: 300, height: 40, borderBottomWidth: 1, color: 'black', backgroundColor: '#CCCCCC', borderRadius: 10 }}
                    value={this.state.name}
                    onChangeText={(text) => { this.setState({ name: text }) }}
                    placeholder="Tên"
                    keyboardType="default"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                <TextInput style={{ width: 300, height: 40, borderBottomWidth: 1, color: 'black', backgroundColor: '#CCCCCC', borderRadius: 10 }}
                    value={this.state.email}
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                <TextInput style={{ width: 300, height: 40, borderBottomWidth: 1, color: 'black', backgroundColor: '#CCCCCC', borderRadius: 10 }}
                    value={this.state.password}
                    onChangeText={(text) => { this.setState({ password: text }) }}
                    placeholder="Số điện thoại (mật khẩu)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                <TextInput style={{ width: 300, height: 40, borderBottomWidth: 1, color: 'black', backgroundColor: '#CCCCCC', borderRadius: 10 }}
                    value={this.state.passwordConfirm}
                    onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                    placeholder="Nhập lại số điện thoại (mật khẩu)"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <View style={{ paddingTop: 10 }} />

                <Button onPress={this.onSignupPress}
                    style={{ width: '40%', height: '10%', backgroundColor: '#006666', borderRadius: 10 }}>
                    <Text
                        style={{ textAlign: 'center', flex: 1, fontWeight: 'bold', color: 'white' }}>
                        Đăng kí
                    </Text>
                </Button>

                <View style={{ paddingTop: 30 }} />
                <Text style={{ fontStyle: "italic", textDecorationLine: 'underline', color: 'white' }}>Hoặc nếu đã có tài khoản</Text>
                <View style={{ paddingTop: 10 }} />


                <Button onPress={() => this.props.navigation.navigate('Login')}
                    style={{ width: '40%', height: '10%', backgroundColor: '#006666', borderRadius: 10 }}>
                    <Text
                        style={{ textAlign: 'center', flex: 1, fontWeight: 'bold', color: 'white' }}>
                        Đăng nhập
                    </Text>
                </Button>

            </View>
        )
    };
}