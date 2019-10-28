import React from 'react';
import {
    Image,
} from 'react-native';

//Clase para tener logo en la barra superior
export default class LogoTitle extends React.Component{
    render(){
        return(
            <Image 
                source={require('../assets/img/Logotipo_HutchisonPorts.jpg')}
                style={{ width: 200, height: 30}}
            />
        );
    }
};