import React from 'react';
import { SafeAreaView, Image, Text, FlatList, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import User from '../User';
import firebase from 'firebase';
import { View } from 'native-base';

import Ant from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import { Header, Left, Body, Button, Title } from 'native-base';

export default class HomeGroup extends React.Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        name: "",
        imageSource: User.image ? { uri: User.image } : require('../images/user.png'),
        upload: false,
        email: "",
        password: "",
        group: "",
        nameITSoft: "",
        nameITSys: "",
    }

    static navigationOptions = ({ navigation }) => {
        return {
            header: (
                <Header style={{ backgroundColor: "white" }}>
                    <Body>
                        <Title style={{ color: '#006666', fontWeight: 'bold',fontSize:30 }}>
                            <Icon name="globe" size={30} color="#006666" />
                            <Text>{"\t\t"}</Text>Hệ Thống Chat Nội Bộ</Title>
                    </Body>
                </Header>
            )
        }
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.containerRow1}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SoftwareRoom')}
                        style={styles.FacebookStyle}
                        activeOpacity={0.5}>
                        <Icon5 name="react" size={25} color="white" style={styles.IconStyle} />
                        <View style={styles.SeparatorLine} />
                        <Text style={styles.TextStyle}> Software </Text>
                        {/* <Ant name="login" size={25} color="white" style={styles.IconStyle} /> */}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SystemRoom')}
                        style={styles.FacebookStyle}
                        activeOpacity={0.5}>
                        <Icon name="server" size={25} color="white" style={styles.IconStyle} />
                        <View style={styles.SeparatorLine} />
                        <Text style={styles.TextStyle}> System </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.FacebookStyle}
                        activeOpacity={0.5}>
                        <Icon5 name="handshake" size={25} color="white" style={styles.IconStyle} />
                        <View style={styles.SeparatorLine} />
                        <Text style={styles.TextStyle}> Nhân Sự </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.FacebookStyle}
                        activeOpacity={0.5}>
                        <Icon5 name="calendar-check" size={25} color="white" style={styles.IconStyle} />
                        <View style={styles.SeparatorLine} />
                        <Text style={styles.TextStyle}> Kế Toán </Text>
                    </TouchableOpacity>
                </View>                

            </SafeAreaView>
        )
    };
}

const styles = StyleSheet.create({
    containerRow1: {
        paddingTop: 20,
        paddingBottom: 35,
        flex: 1,
        flexDirection: 'column',
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#485a96',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        width: "auto",
        borderRadius: 5,
        margin: 5,
    },

    IconStyle: {
        marginLeft: 20,
        marginRight: 20,
        width:30,
    },

    TextStyle: {
        color: '#fff',
        marginRight: 20,
        fontWeight: 'bold',
    },

    SeparatorLine: {
        backgroundColor: '#fff',
        width: 2,
        height: 40,
    },
});