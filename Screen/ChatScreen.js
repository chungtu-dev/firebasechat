import React from 'react';
import {
    KeyboardAvoidingView, Text, View, TextInput, Animated, FlatList, Dimensions, TouchableOpacity, Platform, Keyboard, Image, Modal, ActivityIndicator
} from 'react-native';
import { Button } from 'native-base';
import styles from '../constants/styles';
import User from '../User';
import firebase from 'firebase';
import ImagePicker from 'react-native-image-picker';


import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import MateIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const isIOS = Platform.OS === 'ios';

export default class ChatScreen extends React.Component {

    static navigationOptions = ({navigation }) => {        
        return {                    
            title: navigation.getParam('name', null),
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            person: {
                name: props.navigation.getParam('name'),
                password: props.navigation.getParam('password'),
            },
            textMessage: '',
            messageList: [],
            dbRef: firebase.database().ref('messages'),
            imageSource: User.image,
            show:false
        }
        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(60);
    }

    componentDidMount() {

        this.keyboardDidShowListener = Keyboard.addListener(isIOS ? 'keyboardDidShow' : "keyboardDidShow",
            (e) => this.keyboardEvent(e, true));

        this.keyboardDidShowListener = Keyboard.addListener(isIOS ? 'keyboardDidHide' : "keyboardDidHide",
            (e) => this.keyboardEvent(e, false));

        this.state.dbRef.child(User.password).child(this.state.person.password)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    componentWillUnmount() {
        this.state.dbRef.off();    
    }

    keyboardEvent = (event, isShow) => {
        let heightOS = isIOS ? 60 : 80;
        let bottomOS = isIOS ? 120 : 140;
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: isShow ? heightOS : 0
            }),
            Animated.timing(this.bottomPadding, {
                duration: event.duration,
                toValue: isShow ? bottomOS : 60
            })
        ]).start();
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + '' + d.getMonth() + '' + result;
        }
        return result;
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = this.state.dbRef.child(User.password).child(this.state.person.password).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.password
            }
            updates[User.password + '/' + this.state.person.password + '/' + msgId] = message;
            updates[this.state.person.password + '/' + User.password + '/' + msgId] = message;
            this.state.dbRef.update(updates);
            this.setState({ textMessage: '' });
        }
    }

    renderRow = ({ item }) => {
        return (
            <View style={{
                flexDirection: 'row',
                maxWidth: '60%',
                alignSelf: item.from === User.password ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.password ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10,
            }}>
                <Text style={{ color: '#fff', padding: 7, fontSize: 16 }}>
                    {item.message}
                </Text>
                <Text style={{ color: '#eee', padding: 3, fontSize: 12, }}>
                    {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }

    render() {
        let { height } = Dimensions.get('window');
        return (
            <KeyboardAvoidingView behavior="height" style={{ flex: 1}}>
                <Image source={(require("../images/8.png"))}
                    style={{ position: "absolute", bottom: -200, right: -125 }} />
                <Animated.View style={[styles.bottomBar, { bottom: this.keyboardHeight }]}>
                    <TextInput
                        style={styles.InputMessage}
                        value={this.state.textMessage}
                        placeholder="Aa..."
                        placeholderTextColor="#777777"
                        onChangeText={this.handleChange('textMessage')}
                    />

                    <TouchableOpacity onPress={()=>{this.setState({show:true})}} style={styles.sendButton}>
                        <Icon5 name='file-upload' size={20} style={{marginLeft:-4, marginTop:-2, color:'white'}}/>
                    </TouchableOpacity>

                    <Modal transparent={true} visible={this.state.show}>
                    <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
                    <View style={{ backgroundColor: '#ffffff', margin: 50, padding: 40, borderRadius: 10, flex: 1 }}>
                                <Text>this is a modal</Text>
                                <Button onPress={() => { this.setState({ show: false }) }}
                                    style={{ width: '40%', height: '30%', backgroundColor: '#006666', marginTop: 20, borderRadius: 10, }}>
                                    <Text
                                        style={{ textAlign: 'center', flex: 1, color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                                        <Text><MateIcon name="logout" size={20} /><Text>{'\t\t'}</Text></Text>click</Text>
                                </Button> 
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity onPress={this.sendImage} style={styles.sendButton}>
                        <Icon5 name='images' size={20} style={{marginLeft:-4, marginTop:-2, color:'white'}}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.sendMessage} style={styles.sendButton}>
                        <Icon name='send' size={20} style={{marginLeft:-8, marginTop:-2, color:'white'}}/>
                    </TouchableOpacity>

                </Animated.View>
                <FlatList
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
                    onLayout={() => this.flatList.scrollToEnd({ animated: true })}
                    style={{ paddingTop: 5, paddingHorizontal: 5, height }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<Animated.View style={{ height: this.bottomPadding }} />}
                />
                <View style={{marginHorizontal: 32, marginTop: 32, height:150}}>
                 <Image  style={{ borderRadius: 60, width: 80, height: 80, }} source={this.state.imageSource} />            
                </View>
            </KeyboardAvoidingView>
        )
    };
}
