'use strict';
const firebase = require('../firebaseConfig');
const authMiddleware = require('../auth.middleware.js');

const signUpWorker = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const badge = req.body.badge;
  const telephoneNumber = req.body.telephoneNumber;


  if (email === undefined || email === '') {
    res.status(400).json({'error': 'email not found'});
  }

  if (password === undefined || password === '') {
    res.status(400).json({'error': 'password not found'});
  }

  if (badge === undefined || badge === '') {
    res.status(400).json({'error': 'badge number not found'});
  }

  if (telephoneNumber === undefined || telephoneNumber === '') {
    res.status(400).json({'error': 'telephone number not found'});
  }

  

  await firebase.admin
      .auth()
      .createUser({
        email: email,
        emailVerified: true,
        password: password,
      })
    .then(async (userRecord) => {
        const db = firebase.admin.firestore();
        await db.collection('worker').doc(userRecord.uid).set({
          uid: userRecord.uid,
          email: userRecord.email,
          isSubscribed: false,
          telephone: telephoneNumber,
          badge: badge
        });
        res.status(200).json(userRecord);
      })
      .catch((error) => {
        console.log(error);
        res.status(406).json(error);
      });
};

const signInWorker = async (req, res) => {
  const uid = req.body.uid;


  if (uid === undefined || uid === '') {
    res.status(400).json({'uid': 'uid not found'});
  }

  firebase.admin
    .auth()
    .createCustomToken(uid)
    .then((customToken) => {

      res.cookie('token', customToken)
      res.status(200).send("login");
    })
    .catch((error) => {
      console.log('Error creating custom token:', error);
      res.status(406).json(error);
    });
};

const getUserWorker = async (req, res) => {
  // authentification
  const token = req.cookies.token

  console.log(req.cookies)

  if (!token) return res.status(401).send("cookie not found");
  const userpayload = await authMiddleware.decodeFirebaseIdToken(token)
  if (userpayload.error) return res.status(400).json({"error": userpayload.error});
  const user = userpayload.payload.user
  const uid = user.uid

  //const user = req.body.user;
  res.status(200).json(user);  
};

  const logoutWorker = async (req, res) => {
  // authentification
  const token = req.cookies.token
  console.log(token)
  if (!token) return res.status(401).send("cookie not found");
  const userpayload = await authMiddleware.decodeFirebaseIdToken(token)
  if (userpayload.error) return res.status(400).json({"error": userpayload.error});

  res.cookie('token', null)
  res.status(200).send("logout");
};


module.exports = {
  signUpWorker,
  signInWorker,
  getUserWorker,
  logoutWorker
};