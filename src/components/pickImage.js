import * as React from 'react';
import { ActivityIndicator, View, TouchableOpacity, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

import styles from '../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class PickImageScreen extends React.Component {

  state = {showIndicator: false}


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Acceso a la camara denegado',
              'Por favor de acceso a la camara para continuar');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      quality: .5
    });

    if (!result.cancelled) {
      this.setState({
        showIndicator: true
      });

      this.uploadCameraImage(result.uri, "camera-scan-")
        .then(() => {
          Alert.alert('Carga exitosa',
                      'La imagen se cargo correctamente');
        })
        .then(() =>{
          this.setState({
            showIndicator: false
          });
        })
        .catch((error) =>{
          Alert.alert(error);
        });
    }
  }

  uploadCameraImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var date = new Date().getTime();
    var ref = firebase.storage().ref().child("images/" + imageName + date);
    return ref.put(blob);
  }

  _selectImage = async () => {
    this.setState({
      showIndicator: true
    });

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1
    });

    if (!result.cancelled) {
      this.uploadSelectImage(result.uri, "select-scan-")
        .then(() => {
          Alert.alert('Carga exitosa',
                      'La imagen se cargo exitosamente');
        })
        .then(() =>{
          this.setState({
            showIndicator: false
          });
        })
        .catch((error) =>{
          Alert.alert(error);
        });
    }
  }

  uploadSelectImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var date = new Date().getTime();
    var ref = firebase.storage().ref().child("images/" + imageName + date);
    return ref.put(blob);
  }

  render() {

    if(this.state.showIndicator){
      return (
        <View style={styles.container}>
          <View style={[styles.box, styles.box1]}>
            <Text styles={styles.bigText}>Subiendo imagen espere</Text>
            <ActivityIndicator size="large" color="#02326D"/>
          </View>
        </View>
      );
    }else{

    return (
      <View style={styles.container}>
          <View style={[styles.box, styles.box1]}>
            <TouchableOpacity onPress={this._pickImage}>
              <MaterialCommunityIcons 
                name="camera" 
                size={100} 
                color="#02326D"
              />
            </TouchableOpacity>
            <Text style={styles.textDefault}>Tomar foto al documento</Text>
          </View>

          <View style={[styles.box, styles.box2]}>
            <TouchableOpacity onPress={this._selectImage}>
              <MaterialCommunityIcons 
                name="image-search" 
                size={100} 
                color="#02326D"
              />
            </TouchableOpacity>
            <Text style={styles.textDefault}>Seleccionar foto del documento</Text>
          </View>

          <View style={ styles.footer }>
            <Text style={styles.textFooter}>Derechos reservados</Text>
          </View>

      </View>
      
    );
  }
}
}