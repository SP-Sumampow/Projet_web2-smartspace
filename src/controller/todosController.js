'use strict';
const authMiddleware = require('../auth.middleware.js');
const firebase = require('../firebaseConfig');
const admin = require('firebase-admin');
const { identity } = require('lodash');

//const createDBTodo = db.collection('todos').doc(uid);

const addTodo = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
    
  
  const db = firebase.admin.firestore();
  const todoCollection = db.collection('todos')
  
  if (title === undefined || title === '') {
    res.status(400).json({'error': 'title not found'});
  }

  if (description === undefined || description === '') {
    res.status(400).json({'error': 'description not found'});
  }

  const newTodoDoc = todoCollection.doc()

  const newTodo = {
    createdAt: Date.now(),
    title: title,
    description: description,
    status: "unset",
    id: newTodoDoc.id
  }

  console.log(newTodoDoc.id)

  // Add a new document in collection "cities" with ID 'LA'
   await todoCollection.doc().set(newTodo);
   res.status(200).json(newTodo);
};

const putTodo = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.id;
    
  
  const db = firebase.admin.firestore();
  const todoCollection = db.collection('todos')
  
  if (title === undefined || title === '') {
    res.status(400).json({'error': 'title not found'});
  }

  if (description === undefined || description === '') {
    res.status(400).json({'error': 'description not found'});
  }

  const todoDoc = todoCollection.doc(id)

  const newTodo = {
    createdAt: Date.now(),
    title: title,
    description: description,
    status: "unset",
    id: id
  }

  // Add a new document in collection "cities" with ID 'LA'
   await todoDoc.set(newTodo, { merge: true });
   res.status(200).json(newTodo);
};


const getTodos = async (req, res) => {
  const db = firebase.admin.firestore();
  const snapshot = await db.collection('todos').get();

  const result = []
  snapshot.forEach(doc => {
    result.push(doc.data())
  });

  return res.status(200).json(result);
}

const deleteTodo = async (req, res) => {
  const db = firebase.admin.firestore();
  const id = req.body.id;
  try {
    await db.collection('todos').doc(id).delete(); 
    res.status(200).json({'result': "ok"});
  } catch (e) {
    res.status(400).json({'error': 'title not found'});
  }
}

module.exports = {
  addTodo,
  getTodos,
  putTodo,
  deleteTodo
};