import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, AsyncStorage, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import styles from '../constants/styles';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import MateIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { SafeAreaView } from 'react-navigation';

export default class upLoadImage extends React.Component {

  state = {
    imageSource: '',
  }

  uriToBlob = (uri) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('Lỗi không tải được ảnh'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  }

  uploadImageFile = async () => {
    const file = await this.uriToBlob(this.state.imageSource.uri);
    firebase.storage().ref(`MyTestIMG_File/.png`)
      .put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => this.updateImage(url))
      .catch(error => {
        this.setState({
          upload: false,
        });
        Alert.alert('Lỗi không tải được ảnh');
      })
  }

  updateImage = (imageUrl) => {
    this.setState({
      upload: false, imageSource: { uri: imageUrl }
    })
  }

  _handleChangeUploadImage = () => {
    // const options = {
    //   quality: 0.7, allowsEditting: true, mediaType: 'photo',
    //   noData: true,
    //   storageOptions: {
    //     skipBackup: true, waitUntilSaved: true, path: 'images',
    //     cameraRoll: true,
    //   }
    // }

    ImagePicker.showImagePicker(response => {
      if (response.error) {
        console.log(error)
      }
      else if (!response.didCancel) {
        this.setState({
          upload: true,
          imageSource: { uri: response.uri }
        }, this.uploadImageFile)
      }
    })
  }

  // ------------------------------------------------
  uploadImageToFirebase = (blob) =>{
    return new Promise((resolve, reject)=>{
      var storageRef = firebase.storage().ref();
      storageRef.child('MyTestIMG_File/photo.jpg').put(blob,{
        contentType:'image/jpeg'
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
  }

  _handleIMG
  // ------------------------------------------------

  render() {
    return (
      <SafeAreaView>
        <Image style={{ borderRadius: 60, width: 80, height: 80, resizeMode: 'cover', marginBottom: 10, marginTop: 10 }} source={{ uri: this.props.imageSource }} />

        <TouchableOpacity onPress={this._handleChangeUploadImage} style={styles.sendButton}>
          <Icon5 name='images' size={20} style={{ marginLeft: -4, marginTop: -2, color: 'white' }} />
        </TouchableOpacity>

      </SafeAreaView>

    )
  }

}