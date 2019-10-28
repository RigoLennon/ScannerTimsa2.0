import { StyleSheet, Dimensions } from 'react-native';

var {height} = Dimensions.get('window');
var {width} = Dimensions.get('window');
var box_count = 3; //test
var boxScan_count = 2; //test
var box_height = height / box_count;
var box_heightScan = height / boxScan_count;
//const { width, height } = Dimensions.get('window');
const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default StyleSheet.create({
    //Pantalla inicial
    container: {
        flex: 1, 
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    box: {
        height: box_height,
        alignItems: 'center'
    },
    box1:{
        backgroundColor: '#FFF',
        flex: 5,
        justifyContent: 'center'
    },
    box2: {
        backgroundColor: '#edeaea',
        flex:5,
        justifyContent: 'center'
    },
    footer: {
        backgroundColor: '#02326D',
        flex: .5,
        justifyContent: 'center'
    },
    textWelcome: {
        alignSelf: 'center',
        //fontFamily: 'Roboto', --Usar cuando sea un dispositivo Android
        fontWeight: 'bold',
        fontSize: (width * .05, height * .05),
        marginTop: 5,
        marginBottom: 15,
        color: '#02326D'
    },
    textDefault: {
        //fontFamily: 'Roboto', -- --Usar cuando sea un dispositivo Android
        fontSize: 15,
        color: '#02326D'
    },
    textFooter: {
        //fontFamily: 'Roboto', -- --Usar cuando sea un dispositivo Android
        fontSize: 12,
        color: '#FFF',
        alignSelf: 'center'
    },

    //Pantalla de escaner
    scanContainer: {
        /*flex: 1, 
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 16*/
        flex: 1, 
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    scanBox: {
        height: box_heightScan,
        alignItems: 'center'
    },
    scanBoxCamera: {
        backgroundColor: 'black',
        flex: 10,
        justifyContent: 'center'
    },
    scanBoxButtons: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },


    preview: {
        height: winHeight, //Cambiar en un futuro
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60, 
        borderColor: '#FFFFFF',
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
});