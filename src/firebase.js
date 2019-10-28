import Firebase from 'firebase';

//Configuracion que nos da FireBase por defecto
let config = {
    apiKey: "AIzaSyDsz8PxAy56yDodgc7RKKdUwFRcIIq_wYQ",
    authDomain: "scannertimsa1.firebaseapp.com",
    databaseURL: "https://scannertimsa1.firebaseio.com",
    projectId: "scannertimsa1",
    storageBucket: "scannertimsa1.appspot.com",
    messagingSenderId: "644560512261",
    appId: "1:644560512261:web:ec74f4ed85f6410df1c36c"
};

let app = Firebase.initializeApp(config);

export const db = app.database();