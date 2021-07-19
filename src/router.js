'use strict';

const userController = require('./controller/userController');
const todoController = require('./controller/todoController');

const init = (app) => {
  // user
  app.post('/user/signUp', userController.signUp);
  app.post('/user/signIn', userController.signIn);
  app.post('/user/logout', userController.logout);
  app.get('/user', userController.getUser);

  //Todo
  app.post('/todo', todoController.postTodo);

  app.get('/', async (req, res) => {
    res.send('<h1>Projet SMART SPACE<h1>')
  });
};

module.exports = {
  init,
};
