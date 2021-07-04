import React from 'react';
import { SafeAreaView, Text, ActivityIndicator, View, TextInput, Image, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import User from '../User';
import firebase from 'firebase';
import { Button } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import MateIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ProfileScreen extends React.Component {


    static navigationOptions = {
        header: null,
    }


    state = {
        name: "",
        imageSource: User.image ? { uri: User.image } : require('../images/user.png'),
        upload: false,
        email: "",
        password: "",
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    _LogOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    changeName = async () => {
        if (this.state.name.length < 3) {
            Alert.alert('Error', 'Please enter valid name');
        }
        else if (User.name !== this.state.name) {
            // User.name = this.state.name;
            // this.updateUser();
            // Alert.alert('Success', 'Password changed success!');

            User.name = this.state.name;
            this.updateUser();
        }
    }

    updateUser = () => {
        firebase.database().ref('users').child(User.password).set(User);
        Alert.alert("Thông báo", "Cập nhật thành công");
    }

    changeImage = () => {
        const options = {
            quality: 0.7, allowsEditing: true, mediaType: 'photo', noData: true,
            storageOptions: {
                skipBackup: true, waitUntilSaved: true, path: 'images', cameraRoll: true,
            }
        }
        ImagePicker.showImagePicker(options, response => {
            if (response.error) {
                console.log(error)
            }
            else if (!response.didCancel) {
                this.setState({
                    upload: true,
                    imageSource: { uri: response.uri }
                }, this.uploadFile)
            }
        })
    }

    updateUserImage = (imageUrl) => {
        User.image = imageUrl;
        this.updateUser();
        this.setState({ upload: false, imageSource: { uri: imageUrl } })
    }

    uploadFile = async () => {
        const file = await this.uriToBlob(this.state.imageSource.uri);
        firebase.storage().ref(`profile_picture/${User.password}.png`)
            .put(file)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => this.updateUserImage(url))
            // .then(url =>this.setState({upload:false, imageSource:{uri:url}}))
            .catch(error => {
                this.setState({
                    upload: false,
                    imageSource: require('../images/user.png')
                });
                Alert.alert('Lỗi', 'Lỗi không tải được ảnh');
            })
    }

    uriToBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new Error('Không tải được ảnh'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
    }

    render() {
        return (
            // <SafeAreaView style={styles.container}>
            //     <TouchableOpacity onPress={this.changeImage}>
            //         {
            //             this.state.upload ? <ActivityIndicator size="large" /> : <Image style={{ borderRadius: 100, width: 100, height: 100, resizeMode: 'cover', marginBottom: 10 }} source={this.state.imageSource} />
            //         }
            //     </TouchableOpacity>

            //     <Text style={{ fontSize: 20 }}>
            //         Tên : {User.name}
            //     </Text>

            //     <Text style={{ fontSize: 20 }}>
            //         Mật khẩu : {User.password}
            //     </Text>

            //     <Text style={{ fontSize: 20 }}>
            //         Email : {User.email}
            //     </Text>

            //     <TextInput
            //         style={styles.Input}
            //         value={this.state.name}
            //         placeholder="Nhập tên thay đổi"
            //         onChangeText={this.handleChange('name')}
            //     />

            //     <TouchableOpacity onPress={this.changeName}>
            //         <Text style={styles.btnText}>Đổi tên</Text>
            //     </TouchableOpacity>

            //     <TouchableOpacity onPress={this._LogOut}>
            //         <Text style={styles.btnText}>Đăng xuất</Text>
            //     </TouchableOpacity>
            // </SafeAreaView>


            <SafeAreaView>
                <Text style={{
                    fontSize: 20,
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#777777',
                    fontWeight: 'bold',
                }}>Thay ảnh đại diện</Text>

                <TouchableOpacity onPress={this.changeImage}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {
                        this.state.upload ? <ActivityIndicator size="large" /> : <Image style={{ borderRadius: 60, width: 80, height: 80, resizeMode: 'cover', marginBottom: 10, marginTop: 10 }} source={this.state.imageSource} />
                    }
                </TouchableOpacity>

                <View style={{
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    height: "auto",
                    justifyContent: 'center',
                    backgroundColor: '#DDDDDD',
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                }}>
                    <View style={{ borderBottomWidth: 3, width: "100%", borderColor: 'white' }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, }}>
                            <Icon name='info-circle' size={18} color='#777777' />
                            <Text>{'\t'}</Text>
                            <Text style={{ color: '#777777' }}> Tên:{'\n'}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{User.name}</Text>
                        </Text>
                    </View>

                    <View style={{ marginTop: 10 }} />

                    <View style={{ borderBottomWidth: 3, width: "100%", borderColor: 'white' }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, }}>
                            <Icon5 name='mail-bulk' size={18} color='#777777' />
                            <Text>{'\t'}</Text>
                            <Text style={{ color: '#777777' }}> Email:{'\n'}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{User.email}</Text>
                        </Text>
                    </View>

                    <View style={{ marginTop: 10 }} />

                    <View style={{ borderBottomWidth: 3, width: "100%", borderColor: 'white' }}>
                        <Text style={{ fontSize: 18, marginLeft: 20, }}>
                            <Icon name='unlock-alt' size={18} color='#777777' />
                            <Text>{'\t'}</Text>
                            <Text style={{ color: '#777777' }}> Password:{'\n'}</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{User.password}</Text>
                        </Text>
                    </View>

                    {/* <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                        <Text
                            onPress={() => this.props.navigation.navigate('upLoadImage')}
                            style={{ color: 'white' }}>Upload Image
                        </Text>
                    </Text>
                </View> */}


                </View>


                <SafeAreaView style={{ alignItems: 'center' }}>
                    <Button onPress={this._LogOut}
                        style={{ width: '40%', height: '30%', backgroundColor: '#006666', marginTop: 20, borderRadius: 10, }}>
                        <Text
                            style={{ textAlign: 'center', flex: 1, color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                            <Text><MateIcon name="logout" size={20} /><Text>{'\t\t'}</Text></Text>Đăng xuất
                    </Text>
                    </Button>

                </SafeAreaView>

            </SafeAreaView>
        )
    };
}

