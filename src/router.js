'use strict';


const init = (app) => {

  app.get('/', async (req, res) => {
    res.send('<h1>Projet smartspace<h1>')
  });
};

module.exports = {
  init,
};
