const admin = require('firebase-admin');
const firebaseAdminKey = require('./firebaseAdminKey.json');
const firebaseClientKey = require('./firebaseClientKey.json');
const firebase = require("firebase/app");

module.exports =  {
 admin: admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminKey),
    databaseURL: 'https://web2-lastproject.europe-west.firebasedatabase.app',
  }),
  client: firebase.initializeApp(firebaseClientKey)
}


