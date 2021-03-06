'use strict';

const userController = require('./controller/userController');
const todoController = require('./controller/todoController');
const placeController = require('./controller/placeController');
const workerController = require('./controller/workerController');
const todosController = require('./controller/todosController');

const init = (app) => {
  // user
  app.post('/user/signUp', userController.signUp);
  app.post('/user/signIn', userController.signIn);
  app.post('/user/logout', userController.logout);
  app.get('/user', userController.getUser);

  //Todo
  app.get('/todosold', todoController.getTodos);

  //new Todos
  app.post('/todo', todosController.addTodo);
  app.put('/todo', todosController.putTodo);
  app.delete('/todo', todosController.deleteTodo);
  app.get('/todos', todosController.getTodos);

  //Rooms
  app.get('/places', placeController.getPlaces);
  app.get('/fakeplaces', placeController.getFakePlaces);

  app.post('/userWorker/signUpWorker', workerController.signUpWorker);
  app.post('/userWorker/signInWorker', workerController.signInWorker);
  //app.post('/userWorker/logoutWorker', workerController.logoutWorker);
  app.get('/userWorker', userController.getUser);

  app.get('/', async (req, res) => {
    res.send('<h1>Projet SMART SPACE<h1>')
  });
};

module.exports = {
  init,
};
