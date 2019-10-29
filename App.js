import React from 'react'; //si algo truena esto lo cambiaste
import {
  Button,
  View,
  Text,
  StyleSheet,
  Alert,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { MaterialCommunityIcons } from '@expo/vector-icons';


//Custom import's
import CameraPage from './src/components/camera.component';
import pickImageScreen from './src/components/pickImage';
import styles from './src/styles';
import { db } from './src/firebase';
import LogoTitle from './src/components';

//Pantalla principal
class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: () => <LogoTitle />,
  };

  render(){
    return(
      <View style={styles.container}>
    
          <View style={[styles.box, styles.box1]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Scanner')}>
              <MaterialCommunityIcons 
                name="barcode-scan" 
                size={100} 
                color="#02326D"
              />
            </TouchableOpacity>
            <Text style={styles.textDefault}>Escanear documento</Text>
            <Button onPress={() => this.props.navigation.navigate('PickImage')}/>
          </View>

          <View style={[styles.box, styles.box2]}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera') }>
              <MaterialCommunityIcons 
                name="camera" 
                size={100} 
                color="#02326D"
              />
            </TouchableOpacity>
            <Text style={styles.textDefault}>Tomar foto al documento</Text>
          </View>

          <View style={ styles.footer }>
            <Text style={styles.textFooter}>Derechos reservados</Text>
          </View>

      </View>
      
    );
  }
}


/**  ESCANER DE DOCUMENTO 
 *   ESTA FUNCION PERMITE ESCANEAR EL DOCUMENTO 
 *   Y POSTERIORMENTE GUARDAR LA INFORMACION EN LA BD**/

//Variable que se manda a FireBase con todos los datos una vez escaneado el doc
 let addScan = scan => {
   db.ref('/scan').push({
     data: scan
   });
 };

 class BarCodeScreen extends React.Component {

  //variables
  state = {
    hasCameraPermission: null,
    scanned: false,
    data: ''
  }

  //Funciones 
  //Funcion que actualiza la variable "data" cn la informacion escaneada
  handleChange = e => {
    this.setState({
      data: e.this.handleBarCodeScanned(data)
    });
  };

  //Funcion que gurda los datos en la BD
  handleSubmit = () => {
    addScan(this.state.data)
    Alert.alert('El escaneo se guardo con exito en la BD');
  };

  //Funcion que recibe los los permisos para la camara
  async componentDidMount(){
    this.getPermissionsAsync();
  };

  //Funcion que muestra y envia los datos escaneados
  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true, data: data });
    Alert.alert(`Los datos escaneados son: ${data}`);
  };

  getPermissionsAsync = async() => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted'});
  };

  //Comienza el render se añaden las condiciones
  render(){

    //Variables que reciben el estado actual de los permisos y si esta escaneado o no
    const { hasCameraPermission, scanned } = this.state;

    //Verificacion de permisos
    if(hasCameraPermission === null){
      return <Text>Solicitando permisos para la camara</Text>;
    }
    if(hasCameraPermission === false){
      return<Text>Sin acceso a la camara</Text>;
    }

    //Componentes visuales
    return(
      <View style={styles.container}>

        <View style={[styles.scanBox, styles.scanBoxCamera ]}>
          <BarCodeScanner 
            onBarCodeScanned={ scanned ? undefined: this.handleBarCodeScanned }
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={[styles.scanBox, styles.scanBoxButtons]}>
          { scanned && (
            <Button title={'Escanear de nuevo'} onPress={() => this.setState({ scanned: false })}/>
          )}

          { scanned && (
            <Button title={'Enviar datos'} onPress={this.handleSubmit}/>
          )}
        </View>
        
      </View>
    );
  }
 }
 
  //Clase de la camara
  class CameraScreen extends React.Component {
    render(){
      return(
        <View style={styles.container}>
          <CameraPage />
        </View>
      );
    }
  }

  class pickImagePage extends React.Component {
    render(){
      return(
        <View style={styles.container}>
          <pickImageScreen />
        </View>
      );
    }
  }

  //Manejo de rutas de la Aplicacion
  const RootStack = createStackNavigator({
    Home: HomeScreen,
    Scanner: BarCodeScreen,
    Camera: CameraScreen,
    PickImage: pickImagePage
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle:{
        backgroundColor: 'white'
      }
    }
  });

export default createAppContainer(RootStack);