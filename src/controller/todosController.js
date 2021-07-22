'use strict';
const authMiddleware = require('../auth.middleware.js');
const firebase = require('../firebaseConfig');
const admin = require('firebase-admin');

//const createDBTodo = db.collection('todos').doc(uid);

const addTodo = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const allTodo = [];
    
  // authentification
  //const token = req.cookies.token
  
  //important
  // if (!token) return res.status(401).send("cookie not found");
  // const userpayload = await authMiddleware.decodeFirebaseIdToken(token)
  // if (userpayload.error) return res.status(400).json({"error": userpayload.error});
  // const user = userpayload.payload.user
  // const uid = user.uid
  
  const db = firebase.admin.firestore();
  const createDBTodo = db.collection('todos').doc(uid);
  
  // if (title === undefined || title === '') {
  //   res.status(400).json({'error': 'title not found'});
  // }

  // if (description === undefined || description === '') {
  //   res.status(400).json({'error': 'description not found'});
  // }

  const todoDoc = await db.collection('todos').doc(uid).get()
  if (todoDoc) {
    const todoDocData = userDoc.data()
    const todos = todoDocData.todos ?? []
    let todoIndex = -1
    if (todos) {
      todoIndex = todos.findIndex((todoSaved) => { todoSaved.title === title})
    }
    const hasTodo = todoIndex != -1

    const newTodo = {
      createdAt: Date.now(),
      title: title,
      description: description,
      status: "unset",
    }

    if (hasTodo) {
      delete todos[todoIndex] 
    } 

    todos.push(newTodo)

    await db.collection('todos').doc(uid).set({todos}, {merge: true});

    res.status(200).json({ newTodo});
  } else {
    res.status(404)
  }
};

const getTodos = (req, res) => {
  res.status(200).json({ "todo": [{ "title":"newTodo"}]});
}

module.exports = {
  addTodo,
  getTodos
};