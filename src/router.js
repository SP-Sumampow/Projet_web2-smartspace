'use strict';

const userController = require('./controller/userController');

const init = (app) => {
  // user
  app.post('/user/signUp', userController.signUp);
  app.post('/user/signIn', userController.signIn);
  app.post('/user/logout', userController.logout);
  app.get('/user', userController.getUser);

  app.get('/', async (req, res) => {
    res.send('<h1>Projet smartspace<h1>')
  });
};

module.exports = {
  init,
};